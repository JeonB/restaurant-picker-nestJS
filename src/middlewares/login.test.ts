// 가짜 사용자 데이터 타입 정의
type UserDB = {
  [username: string]: string;
};

// 로그인 함수
function login(username: string, password: string, userDB: UserDB): boolean {
  if (username in userDB && userDB[username] === password) {
    return true;
  } else {
    return false;
  }
}

// 로그인 테스트
describe("로그인 함수 단위 테스트", () => {
  const fakeUserDB = {
    jeonb: "abcd123",
  };
  // 로그인 성공 테스트
  test("로그인 성공", () => {
    const successResult = login("jeonb", "wrong_password", fakeUserDB);
    expect(successResult).toBeTruthy();
  });
  // 로그인 실패 테스트
  test("로그인 실패", () => {
    const failureResult = login("jeonb", "abcd123", fakeUserDB);
    expect(failureResult).toBeFalsy();
  });
});

// 테스트 실행 npm test
