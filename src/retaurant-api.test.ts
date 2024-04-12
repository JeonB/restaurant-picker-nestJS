import request from "supertest";
// describe: 테스트 스위트, 관련 테스트 케이스들을 그룹화하여 실행하는 단위
describe("음식점 데이터를 다루는 REST API", () => {
  it("GET /restaurants - 음식점 목록을 가져올 수 있어야 함", async () => {
    // Given
    // When
    const response = await request(app).get("/restaurants");

    // Then
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("POST /restaurants - 음식점을 추가할 수 있어야 함", async () => {
    // Given
    const newRestaurant = { name: "새로운 음식점", location: "위치" };

    // When
    const response = await request(app)
      .post("/restaurants")
      .send(newRestaurant);

    // Then
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newRestaurant);
  });

  it("PUT /restaurants/:id - 음식점 정보를 수정할 수 있어야 함", async () => {
    // Given
    const updatedRestaurant = {
      name: "수정된 음식점",
      location: "새로운 위치",
    };

    // When
    const response = await request(app)
      .put("/restaurants/1") // 존재하는 음식점의 ID로 가정합니다.
      .send(updatedRestaurant);

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedRestaurant);
  });

  it("DELETE /restaurants/:id - 음식점을 삭제할 수 있어야 함", async () => {
    // Given, when
    const response = await request(app).delete("/restaurants/1"); // 존재하는 음식점의 ID로 가정합니다.

    // Then
    expect(response.status).toBe(204);
  });
});
