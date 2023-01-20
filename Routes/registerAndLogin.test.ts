import supertest from "supertest";
import { app } from "../index";
import { connectDB, disconnectDB } from "../handleMongoConnection";
import { Server } from "http";
import { register, login } from "../setupSuperTest";
const request = supertest(app);

let server: Server;

describe("Test Register and Login", () => {
  beforeAll(() => {
    server = app.listen("8080", () => {
      console.log(
        `⚡️[server]: Register and Login TEST Server is running at https://localhost:8080`
      );
    });
    connectDB();
  });
  afterAll(() => {
    disconnectDB();
    server.close();
  });

  describe("POST Register and Login", () => {
    it("User registers their account with the server", async () => {
      const res = await register(request);
      expect(res.status).toBe(200);
    });
    it("POST Login", async () => {
      const res = await login(request);
      const parsedResponse = JSON.parse(res.text);
      expect(parsedResponse.token).toBeTruthy;
      expect(parsedResponse.userId).toHaveLength(24);
      expect(res.status).toBe(200);
    });
  });
});
