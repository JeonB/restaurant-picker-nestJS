import { FastifyInstance } from "fastify";
import { createServer } from "http";
import { Server } from "http";
import { handleData } from "@_kakaoAPI/keyword_search";
import fp from "fastify-plugin";
import { createConnection, getConnection } from "typeorm";
import { Restaurant } from "@_modules/restaurant/entity";
import { jest } from "@jest/globals";
import { User } from "../user/entity";
let server: FastifyInstance;
let httpServer: Server;

beforeAll(async () => {
  await createConnection({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    entities: [Restaurant],
  });

  server = require("fastify")();
  const router = require("@_modules/restaurant/router");

  server.register(
    fp(async () => {
      // Your router code here
      server.register(router);
    })
  );

  httpServer = createServer(server as any);
  await new Promise<void>((resolve) => {
    httpServer.listen(0, () => {
      resolve();
    });
  });
});

afterAll(async () => {
  await getConnection().destroy();
  httpServer.close();
});
beforeEach(() => {
  server.db = {
    restaurant: getConnection().getRepository(Restaurant),
    user: getConnection().getRepository(User),
  };
});
describe("Restaurant Router", () => {
  it("should return hello world on root path", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(response.json()).toEqual({ hello: "world!" });
  });

  it("should return a list of restaurants", async () => {
    // Mock the server.db.restaurant.find() method
    const mockFind = jest.spyOn(server.db.restaurant, "find");
    mockFind.mockResolvedValue([
      {
        id: 1,
        place_name: "Restaurant 1",
        category_name: "Korean Food",
        distance: 0,
        phone: "",
        place_url: "",
        x: "",
        y: "",
        created_at: "",
        updated_at: "",
      },
      {
        id: 2,
        place_name: "Restaurant 2",
        category_name: "Chinese Food",
        distance: 0,
        phone: "",
        place_url: "",
        x: "",
        y: "",
        created_at: "",
        updated_at: "",
      },
    ]);

    const response = await server.inject({
      method: "GET",
      url: "/restaurants",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(response.headers["access-control-allow-origin"]).toEqual("*");
    expect(response.json()).toEqual([
      {
        id: 1,
        place_name: "Restaurant 1",
        category_name: "Korean Food",
        distance: 0,
        phone: "",
        place_url: "",
        x: "",
        y: "",
        created_at: "",
        updated_at: "",
      },
      {
        id: 2,
        place_name: "Restaurant 2",
        category_name: "Chinese Food",
        distance: 0,
        phone: "",
        place_url: "",
        x: "",
        y: "",
        created_at: "",
        updated_at: "",
      },
    ]);

    // Restore the original server.db.restaurant.find() method
    mockFind.mockRestore();
  });

  it("should return restaurants matching the category name", async () => {
    // Mock the server.db.restaurant.find() method
    const mockFind = jest.spyOn(server.db.restaurant, "find");
    mockFind.mockResolvedValue([
      {
        id: 1,
        place_name: "Restaurant 1",
        category_name: "Korean Food",
        distance: 0,
        phone: "",
        place_url: "",
        x: "",
        y: "",
        created_at: "",
        updated_at: "",
      },
      {
        id: 2,
        place_name: "Restaurant 2",
        category_name: "Chinese Food",
        distance: 0,
        phone: "",
        place_url: "",
        x: "",
        y: "",
        created_at: "",
        updated_at: "",
      },
    ]);

    const response = await server.inject({
      method: "GET",
      url: "/restaurants/Korean",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(response.headers["access-control-allow-origin"]).toEqual("*");
    expect(response.json()).toEqual([
      {
        id: 1,
        place_name: "Restaurant 1",
        category_name: "Korean Food",
        distance: 0,
        phone: "",
        place_url: "",
        x: "",
        y: "",
        created_at: "",
        updated_at: "",
      },
      {
        id: 2,
        place_name: "Restaurant 2",
        category_name: "Chinese Food",
        distance: 0,
        phone: "",
        place_url: "",
        x: "",
        y: "",
        created_at: "",
        updated_at: "",
      },
    ]);

    // Restore the original server.db.restaurant.find() method
    mockFind.mockRestore();
  });
});
