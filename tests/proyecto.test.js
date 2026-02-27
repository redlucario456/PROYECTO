const request = require("supertest");
const app = require("../app");
const sequelize = require("../config/db");

describe("API Proyectos", () => {

  test("GET /api/proyectos responde correctamente", async () => {
    const res = await request(app).get("/api/proyectos");
    expect(res.statusCode).toBe(200);
  });

  test("GET / responde correctamente", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

});

afterAll(async () => {
  await sequelize.close();
});
