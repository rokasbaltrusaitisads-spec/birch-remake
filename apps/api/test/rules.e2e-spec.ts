import "reflect-metadata";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe("RulesController", () => {
  it("returns seeded rules", async () => {
    const response = await request(app.getHttpServer()).get("/rules").expect(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
