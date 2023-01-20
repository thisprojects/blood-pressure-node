import { SuperTest, Test } from "supertest";

export const user = {
  fname: "Test",
  lname: "smith",
  email: "test@smith.com",
  password: "123456",
};

// const user = new FormData();
// user.append("fname", "Test");
// user.append("lname", "smith");
// user.append("email", "test@smith.com");
// user.append("password", "123456");

// const loginData = new FormData();
// user.append("email", "test@smith.com");
// user.append("password", "123456");

export const register = (request: SuperTest<Test>) =>
  request.post("/api/post/register").send(user);

export const login = (request: SuperTest<Test>) =>
  request
    .post("/api/post/login")
    .send({ email: user.email, password: user.password });
