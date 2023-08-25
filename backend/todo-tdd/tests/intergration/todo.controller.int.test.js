const request = require('supertest');
const app = require('../../app');
const endpointUrl = '/todos/';
const newTodo = require('../mock/new-todo.json');

describe(endpointUrl, () => {
    it('POST' + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newTodo)
            .expect(201)
            .then((res) => {
                expect(res.body.title).toBe(newTodo.title);
                expect(res.body.done).toBe(newTodo.done);
            });
    });
});

