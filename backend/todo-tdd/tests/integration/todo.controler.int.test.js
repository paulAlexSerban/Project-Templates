const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock/new-todo.json');
const endpointUrl = '/todos/';
let firstTodo = require('../mock/all-todos.json')[0];
let newTodoId;
const toDoId = '5f9a4e3c3f1c7d1e8c5c1b7c'
const connectDatabase = require('../../config/database');
const testData = { title: 'Make integration test for PUT', done: true };

let con = null;
beforeAll(async () => {
    con = await connectDatabase();
    if (con && con.connection && con.connection.host) {
        console.log(`Connected to MongoDB at ${con.connection.host}`);
    }
});

describe(endpointUrl, () => {
    test('GET ' + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();
        firstTodo = response.body[0];
    })

    test('GET by Id ' + endpointUrl + ':todoId', async () => {
        const response = await request(app).get(endpointUrl + firstTodo._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.done).toBe(firstTodo.done);
    })

    test('GET todoId doesnt exist' + endpointUrl + ':todoId', async () => {
        const response = await request(app).get(endpointUrl + toDoId );
        expect(response.statusCode).toBe(404);
    })

    it('should be connected to database', async () => {
        expect(con).not.toBeNull();
    });

    it('POST ' + endpointUrl, async () => {
        const response = await request(app).post(endpointUrl).send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
        newTodoId = response.body._id;
    });

    test('PUT ' + endpointUrl + ':todoId', async () => {
        const response = await request(app).put(endpointUrl + newTodoId).send(testData);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(testData.title);
        expect(response.body.done).toBe(testData.done);
    })

    test('should return 404 on PUT ' + endpointUrl + ':todoId doesnt exist', async () => {
        const response = await request(app).put(endpointUrl + toDoId).send(testData);
        expect(response.statusCode).toBe(404);
    })

    test('DELETE', async () => {
        const response = await request(app).delete(endpointUrl + newTodoId).send();
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(testData.title);
        expect(response.body.done).toBe(testData.done);
    })

    test('should return 404 on DELETE ' + endpointUrl + ':todoId doesnt exist', async () => {
        const response = await request(app).delete(endpointUrl + toDoId).send();
        expect(response.statusCode).toBe(404);
    })

    it('should return error 500 on malformed data with POST' + endpointUrl, async () => {
        const response = await request(app).post(endpointUrl).send({ title: 'Missing done property' });
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({
            message: 'Todo validation failed: done: Path `done` is required.',
        });
    });
});

afterAll(async () => {
    await con.connection.close();
});
