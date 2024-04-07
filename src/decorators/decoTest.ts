function deco(target: any, key: string, descriptor: PropertyDescriptor) {
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
