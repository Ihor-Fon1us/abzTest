const request = require('supertest');
const app = require('../app');

let token = '';

describe("Test the index", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the token", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/token")
      .then(response => {
        token = response.body.token;
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        done();
      });
  });
});

describe("Test the positions", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/positions")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the GET users", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/users")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the POST user", () => {
  test("It should response the POST method", done => {
    const user = {
      name: 'testuser',
      email: 'testuser@email.com',
      phone: '+380666698235',
      positions_id: 1,
    };
    const agent = request.agent(app);

    const response = agent
      
      .post("/users")
      .set('Cookie', [`accessToken=${token}`])
      .send({});
      expect(response.statusCode).toBe(200);
      done()
  });
});

