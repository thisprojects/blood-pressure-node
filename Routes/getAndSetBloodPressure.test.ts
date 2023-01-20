import supertest from "supertest";
import { app } from "../index";
import { connectDB, disconnectDB } from "../handleMongoConnection";
import { Server } from "http";
import { login, register } from "../setupSuperTest";
import FormData from "form-data";

const request = supertest(app);
let server: Server;
let logInDetails: any;
const fromDate = Date();

describe("Blood Pressure Records", () => {
  beforeAll(() => {
    server = app.listen("8080", () => {
      console.log(
        `⚡️[server]: Blood Pressure Records TEST Server is running at https://localhost:8080`
      );
    });
    connectDB();
  });
  afterAll(() => {
    disconnectDB();
    server.close();
  });

  describe("User logs in and sets / gets BP records", () => {
    beforeAll(async () => {
      await register(request);
      logInDetails = await login(request);
    });

    it("Set BP records - Success", async () => {
      const { token, userId } = JSON.parse(logInDetails.text);

      const formData = new FormData();
      formData.append("systolic", "51");
      formData.append("diastolic", "25");
      formData.append("date", fromDate);
      formData.append("pulse", "55");
      const res = await request
        .post("/api/post/addBloodPressure")
        .set("auth-token", token)
        .set("id", userId)
        .send({
          systolic: "51",
          diastolic: "25",
          date: fromDate,
          pulse: "55",
        });
      expect(res.status).toBe(200);
      expect(res.text).toEqual("User Test has been updated");
    });

    it("Get BP records - Success", async () => {
      const { token, userId } = JSON.parse(logInDetails.text);

      const res = await request
        .post("/api/post/getBloodPressure")
        .set("auth-token", token)
        .set("id", userId)
        .send();

      expect(res.status).toBe(200);
      expect(res.body.bloodPressureRecords[0]).toHaveProperty("date");
      expect(res.body.bloodPressureRecords[0].systolic).toEqual("51");
      expect(res.body.bloodPressureRecords[0].diastolic).toEqual("25");
    });
  });
});
