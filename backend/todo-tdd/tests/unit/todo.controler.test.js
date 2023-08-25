const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock/new-todo.json');
TodoModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

/**
 * Initialize test suite
 */
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
    it('should return 201 response code', () => {
        TodoController.createTodo(req, res, next);
        // response code is 201
        expect(res.statusCode).toBe(201);
        // response is sending the response
        expect(res._isEndCalled()).toBeTruthy();
    });

    /**
     * Test if response is json
     */
    it('should return json body in response', () => {
        TodoModel.create.mockReturnValue(newTodo);
        TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });
});
