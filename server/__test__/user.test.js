const request = require("supertest");
const app = require("../app");

const { sequelize, User, Comment } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

const user1 = {
  username: "zaza",
  email: "zaz@gmail.com",
  password: "ayam321",
};

beforeAll(async () => {
  await queryInterface.bulkInsert("Users", [
    {
      username: user1.username,
      email: user1.email,
      password: hashPassword(user1.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /login", () => {
  describe("Success", () => {
    test("login should access token", async () => {
      let { body, status } = await request(app).post("/login").send(user1);

      expect(status).toBe(200);
      expect(body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("Failed", () => {
    test("email required", async () => {
      let { body, status } = await request(app).post("/login").send({
        email: "",
        password: "ayam321",
      });

      expect(status).toBe(400);
    });

    test("password required", async () => {
      let { body, status } = await request(app).post("/login").send({
        email: "zaz@gmail.com",
        password: "",
      });

      expect(status).toBe(400);
    });

    test("invalid email", async () => {
      let { body, status } = await request(app).post("/login").send({
        email: "adakah@gmail.com",
        password: "ayam321",
      });

      expect(status).toBe(401);
    });
    test("invalid password", async () => {
      let { body, status } = await request(app).post("/login").send({
        email: "juns@gmail.com",
        password: "ayam3211",
      });

      expect(status).toBe(401);
    });
  });
});
