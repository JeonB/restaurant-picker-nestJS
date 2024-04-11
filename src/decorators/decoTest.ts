// 데코레이터 팩토리 : 데코레이터를 생성하고 반환하는 함수
function deco(target: any, key: string, descriptor: PropertyDescriptor) {
  // target: 데코레이터가 적용된 대상 클래스의 프로토타입
  // key: 데코레이터가 적용된 대상 메서드의 이름
  // descriptor: 프로퍼티 설명자
  console.log("decoTest");
}
function deco2(value: string) {
  console.log("decoTest2");
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    console.log(value);
  };
}
class Test {
  @deco
  test() {
    console.log("test");
  }

  @deco2("Hello World")
  test2() {
    console.log("test2");
  }
}

const ta = new Test();

ta.test();
ta.test2();

// 데코레이터 팩토리
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  // target: 데코레이터가 적용된 대상 클래스의 프로토타입
  // key: 데코레이터가 적용된 멤버의 이름 (메서드 이름)
  // descriptor: 프로퍼티 설명자

  // 기존 메서드를 저장
  const originalMethod = descriptor.value;

  // 새로운 메서드를 정의
  descriptor.value = function (...args: any[]) {
    // 기존 메서드 실행 전에 로그 출력
    console.log(`Calling ${key} with arguments: ${JSON.stringify(args)}`);

    // 원래의 메서드 실행
    const result = originalMethod.apply(this, args);

    // 기존 메서드 실행 후에 로그 출력
    console.log(`${key} returned: ${JSON.stringify(result)}`);

    // 결과 반환
    return result;
  };

  // 수정된 descriptor 반환
  return descriptor;
}

// 클래스에 데코레이터 적용
class Calculator {
  @Log
  add(x: number, y: number) {
    return x + y;
  }
}

// 테스트
const calc = new Calculator();
calc.add(1, 2); // 호출 시 로그 출력
