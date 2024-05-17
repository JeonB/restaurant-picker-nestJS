import request from "supertest";
<<<<<<< HEAD
describe("음식점 데이터를 다루는 REST API", () => {
  it("GET /restaurants - 음식점 목록을 가져올 수 있어야 함", async () => {
    const response = await request(app).get("/restaurants");

=======
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastify from "fastify";

// 가짜 응답 데이터
const fakeRestaurants = [
  { id: 1, name: "음식점 A", location: "위치 A" },
  { id: 2, name: "음식점 B", location: "위치 B" },
];

// Fastify 애플리케이션 생성
const app: FastifyInstance = fastify();

// GET /restaurants 라우트 정의
app.get(
  "/restaurants",
  async (request: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send(fakeRestaurants);
  }
);

// POST /restaurants 라우트 정의
app.post(
  "/restaurants",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const newRestaurant = request.body;
    // 실제로 데이터베이스에 추가하는 것이 아니라 가짜 응답을 반환
    reply.code(201).send(newRestaurant);
  }
);

// PUT /restaurants/:id 라우트 정의
app.put(
  "/restaurants/:id",
  async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const id = request.params.id;
    const updatedRestaurant = request.body;
    // 실제로 데이터베이스를 수정하는 것이 아니라 가짜 응답을 반환
    reply.code(200).send(updatedRestaurant);
  }
);

// DELETE /restaurants/:id 라우트 정의
app.delete(
  "/restaurants/:id",
  async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const id = request.params.id;
    // 실제로 데이터베이스에서 삭제하는 것이 아니라 가짜 응답을 반환
    reply.code(204).send();
  }
);

// 테스트 코드
describe("음식점 데이터를 다루는 REST API", () => {
  it("GET /restaurants - 음식점 목록을 가져올 수 있어야 함", async () => {
    // When: /restaurants 에 GET 요청을 보냈을 때
    const response = await request(app).get("/restaurants");

    // Then: 응답 상태코드는 200이어야 하고, 응답 바디는 가짜 음식점 목록이어야 함
>>>>>>> 1d06dbfd23da0cd42b7ad2da5a1633072bf6b339
    expect(response.status).toBe(200);
    expect(response.body).toEqual(fakeRestaurants);
  });

  it("POST /restaurants - 음식점을 추가할 수 있어야 함", async () => {
    // Given: 새로운 음식점 데이터
    const newRestaurant = { name: "새로운 음식점", location: "위치" };

    // When: /restaurants 에 POST 요청을 보냈을 때
    const response = await request(app)
      .post("/restaurants")
      .send(newRestaurant);

    // Then: 응답 상태코드는 201이어야 하고, 응답 바디는 새로운 음식점 데이터와 일치해야 함
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newRestaurant);
  });

  it("PUT /restaurants/:id - 음식점 정보를 수정할 수 있어야 함", async () => {
    // Given: 수정된 음식점 데이터와 음식점 ID
    const updatedRestaurant = {
      name: "수정된 음식점",
      location: "새로운 위치",
    };
    const restaurantId = 1; // 가짜 음식점의 ID로 가정

    // When: /restaurants/:id 에 PUT 요청을 보냈을 때
    const response = await request(app)
      .put(`/restaurants/${restaurantId}`)
      .send(updatedRestaurant);

    // Then: 응답 상태코드는 200이어야 하고, 응답 바디는 수정된 음식점 데이터와 일치해야 함
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedRestaurant);
  });

  it("DELETE /restaurants/:id - 음식점을 삭제할 수 있어야 함", async () => {
    // Given, When: /restaurants/:id 에 DELETE 요청을 보냈을 때
    const restaurantId = 1; // 가짜 음식점의 ID로 가정
    const response = await request(app).delete(`/restaurants/${restaurantId}`);

    // Then: 응답 상태코드는 204여야 함
    expect(response.status).toBe(204);
  });
});
