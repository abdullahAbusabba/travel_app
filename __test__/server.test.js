
const app = require('../src/server/index.js')
const supertest = require('supertest')

describe("Test the root path", () => {
    test("It should response the GET method", done => {
        supertest(app)
            .get("/get-data")
            .then(response => {
                expect(response.statusCode).toEqual(200);
                done();
            });
    });
});