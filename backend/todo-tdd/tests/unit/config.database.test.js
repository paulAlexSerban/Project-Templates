const mongoose = require('mongoose');
const connectDatabase = require('../../config/database');

// Mocking mongoose's connect function
jest.mock('mongoose', () => {
    return {
        connect: jest.fn(),
    };
});

describe('connectDatabase', () => {
    // Mock console.error before running tests
    console.error = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should connect to database successfully', async () => {
        mongoose.connect.mockResolvedValueOnce({
            connection: {
                host: 'some-host',
            },
        });

        const con = await connectDatabase();

        expect(con).toBeTruthy();
        expect(mongoose.connect).toHaveBeenCalled();
    });

    it('should handle connection errors', async () => {
        mongoose.connect.mockRejectedValueOnce(new Error('Some error'));

        const con = await connectDatabase();

        expect(con).toBeNull();
        expect(console.error).toHaveBeenCalledWith('Error connecting to database', expect.any(Error));
    });
});
