function deco(value: string) {
  console.log('데코레이터가 평가됨');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log(value);
  };
}

class TestClass {
  @deco('HELLO')
  test() {
    console.log('함수 호출됨');
  }
}

const t = new TestClass();
t.test();

function first() {
  console.log('first(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log('first(): called');
  };
}

function second() {
  console.log('second(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log('second(): called');
  };
}

class ExampleClass {
  @first()
  @second()
  method() {
    console.log('method is called');
  }
}
