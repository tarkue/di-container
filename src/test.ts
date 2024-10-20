import { Injector, Injectable, NullInjectableError } from "./task.js";

export const createSimpleInstance = () => {
  @Injectable()
  class SimpleService {}

  const injector = new Injector();
  const instance = injector.get(SimpleService);

  if (instance instanceof SimpleService) {
    console.log('OK: DI создал инстанс класса с декоратором Injectable');
    return;
  }
  console.log('FAIL: "DI не создал инстанс класса, помеченного декоратором Injectable');
};

export const errorCreatingInstance = () => {
  class SimpleService {}

  const injector = new Injector();
  try {
    const instance = injector.get(SimpleService);
    console.log('FAIL: DI не выбросил ошибку при попытке инстансирования класса без Injectable');
  } catch (e) {
    if (e instanceof NullInjectableError) {
      console.log('OK: DI выбросил ошибку NullInjectableError, при попытке инстансирования класса без Injectable');
      return;
    }
    console.log('FAIL: DI выбросил неверную ошибку при попытке инстансирования класса без Injectable');
  }
};

export const singletonCreating = () => {
  @Injectable({
    singleton: true,
  })
  class SimpleService {}

  const injector = new Injector();
  if (injector.get(SimpleService) === injector.get(SimpleService)) {
    console.log('OK: Создает singleton инстанс');
    return
  }
  console.log('FAIL: Сервисы обьявлены синглтонами, но инджектор создает разные инстансы');
};

export const signletonByDefault = () => {
  @Injectable()
  class SimpleService {}

  const injector = new Injector();
  if (injector.get(SimpleService) === injector.get(SimpleService)) {
    console.log('OK: Создает singleton инстанс');
    return
  }
  console.log('FAIL: Сервисы синглтоны, но инджектор создает разные инстансы');
}

export const notSignletonTest = () => {
  @Injectable({
    singleton: false,
  })
  class SimpleService {}

  const injector = new Injector();
  if (injector.get(SimpleService) !== injector.get(SimpleService)) {
    console.log('OK: Инджектор создает разные инстансы сервиса (singleton: false)');
    return;
  }
  console.log('FAIL: Инджектор создает одинаковые инстансы сервиса (singleton: false)');
  
}

export const resolvingDeps = () => {
  @Injectable()
  class AnotherService {}

  @Injectable()
  class MainService {
    constructor(
      private readonly anotherService: AnotherService,
    ) {
      if (!this.anotherService) {
        throw new Error();
      }
    }
  }

  const injector = new Injector();
  try {
    const instance = injector.get(MainService);
    console.log('OK: Инджектор создал сервис и зарезолвил зависимости');
  } catch (e) {
    console.log('FAIL: Инджектор не зарезолвил зависимости');
  }
}

export const resolvingManyDeps = () => {
  @Injectable()
  class InnerAnotherService {}

  @Injectable()
  class AnotherService {
    constructor(
      private readonly inner: InnerAnotherService,
    ) {
      if (!this.inner) {
        throw new Error();
      }
    }
  }

  @Injectable()
  class AnotherSecondService {}

  @Injectable()
  class MainService {
    constructor(
      private readonly anotherService: AnotherService,
      private readonly anotherSecondService: AnotherSecondService,
    ) {
      if (!this.anotherService) {
        throw new Error();
      }
      if (!this.anotherSecondService) {
        throw new Error();
      }
    }
  }

  const injector = new Injector();
  try {
    const instance = injector.get(MainService);
    console.log('OK: Инджектор создал сервис и зарезолвил зависимости зависимостей');
  } catch (e) {
    console.log('FAIL: Инджектор не зарезолвил зависимости зависимостей');
  }
}

createSimpleInstance();
errorCreatingInstance();
singletonCreating();
signletonByDefault();
notSignletonTest();
resolvingDeps();
resolvingManyDeps();