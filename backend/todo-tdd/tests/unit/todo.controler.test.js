const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock/new-todo.json');
const allTodos = require('../mock/all-todos.json');
const toDoId = '5f9a4e3c3f1c7d1e8c5c1b7c';
const connectDatabase = require('../../config/database');
let con = null;
beforeAll(async () => {
    con = await connectDatabase();
    if (con && con.connection && con.connection.host) {
        console.log(`Connected to MongoDB at ${con.connection.host}`);
    }
});

// TodoModel.create = jest.fn();
// TodoModel.find = jest.fn();
// TodoModel.findById = jest.fn();
// TodoModel.findByIdAndUpdate = jest.fn();
// TodoModel.findByIdAndDelete = jest.fn();
// all of the above declarations can be substiruted by the following:
jest.mock('../../model/todo.model');


let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('TodoController.deleteTodo', () => {
    it('should have a deleteTodo function', () => {
        expect(typeof TodoController.deleteTodo).toBe('function');
    })

    it('should call findByIdAndDelete', async () => {
        req.params.todoId = toDoId;
        await TodoController.deleteTodo (req, res, next);
        expect(TodoModel.findByIdAndDelete).toBeCalledWith(toDoId);
    })

    it('should return 200 OK and deleted todomodel', async () => {
        TodoModel.findByIdAndDelete.mockReturnValue(newTodo);
        await TodoController.deleteTodo (req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newTodo);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it('should handle errors', async () => {
        const errorMessage = { message: 'Error deleting' };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await TodoController.deleteTodo (req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })

    it('should return 404 when item doesnt exist', async () => {
        TodoModel.findByIdAndDelete.mockReturnValue(null);
        await TodoController.deleteTodo (req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
})

describe('TodoController.updateTodo', () => {
    it('should have a updateTodo function', () => {
        expect(typeof TodoController.updateTodo).toBe('function');
    });

    it('should update with TodoModel.findByIdAndUpdate', async () => {
        req.params.todoId = toDoId;
        req.body = newTodo;
        await TodoController.updateTodo(req, res, next);

        expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(toDoId, newTodo, {
            new: true,
            useFindAndModify: false,
        });
    });

    it('should return a  response with json data and http code 200', async () => {
        req.params.todoId = toDoId;
        req.body = newTodo;
        TodoModel.findByIdAndUpdate.mockReturnValue(newTodo);
        await TodoController.updateTodo(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    })

    it('should handle errors', async () => {
        const errorMessage = { message: 'Error' };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await TodoController.updateTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })

    it('should return 404 when item doesnt exist', async () => {
        TodoModel.findByIdAndUpdate.mockReturnValue(null);
        await TodoController.updateTodo(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
});

describe('TodoController.getTodoById', () => {
    it('should have a getTodoById function', () => {
        expect(typeof TodoController.getTodoById).toBe('function');
    });

    it('should call TodoModel.findById with route parameters', async () => {
        req.params.todoId = toDoId;
        await TodoController.getTodoById(req, res, next);
        expect(TodoModel.findById).toBeCalledWith(toDoId);
    });

    it('should return json body and response code 200', async () => {
        TodoModel.findById.mockReturnValue(newTodo);
        await TodoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newTodo);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return 404 when item doesnt exist', async () => {
        TodoModel.findById.mockReturnValue(null);
        await TodoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should handle errors', async () => {
        const errorMessage = { message: 'error finding todoModel' };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findById.mockReturnValue(rejectedPromise);
        await TodoController.getTodoById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });

    it('should return 404 when item doesnt exist', async () => {
        TodoModel.findById.mockReturnValue(null);
        await TodoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});

describe('TodoController.getTodos', () => {
    /**
     * Test if getTodos is a function
     */
    it('should have a getTodos function', () => {
        expect(typeof TodoController.getTodos).toBe('function');
    });

    /**
     * Test if TodoModel.find is called
     */
    it('should call TodoModel.find({})', async () => {
        await TodoController.getTodos(req, res, next);
        expect(TodoModel.find).toHaveBeenCalledWith({});
    });

    /**
     * Test if status code is 200
     */
    it('should return 200 response code', async () => {
        await TodoController.getTodos(req, res, next);
        // response code is 200
        expect(res.statusCode).toBe(200);
        // response is sending the response
        expect(res._isEndCalled()).toBeTruthy();
    });

    /**
     * Test if response is json
     */
    it('should return json body in response', async () => {
        TodoModel.find.mockReturnValue(allTodos);
        await TodoController.getTodos(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allTodos);
    });

    /**
     * Test error handling
     */
    it('should handle errors', async () => {
        const errorMessage = { message: 'Error finding' };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.find.mockReturnValue(rejectedPromise);
        await TodoController.getTodos(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('TodoController.createTodo', () => {
    beforeEach(() => {
        req.body = newTodo;
    });

    /**
     * Test if createTodo is a function
     */
    it('should have a createTodo function', () => {
        expect(typeof TodoController.createTodo).toBe('function');
    });

    /**
     * Test if TodoModel.create is called with newTodo as parameter
     */
    it('should call TodoModel.create', () => {
        req.body = newTodo;
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    });

    /**
     * Test if status code is 201
     */
    it('should return 201 response code', async () => {
        await TodoController.createTodo(req, res, next);
        // response code is 201
        expect(res.statusCode).toBe(201);
        // response is sending the response
        expect(res._isEndCalled()).toBeTruthy();
    });

    /**
     * Test if response is json
     */
    it('should return json body in response', async () => {
        TodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    /**
     * Test error handling
     */
    it('should handle errors', async () => {
        const errorMessage = { message: 'Done property missing' };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromise);
        await TodoController.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

afterAll(async () => {
    await con.connection.close();
});
