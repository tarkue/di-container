# Custom DI container
Ознакомьтесь с принципом Dependency Inversion из SOLID.
Изучите что такое Dependency Injection (DI), IoC Container. 

Ваша задача реализовать кастомный Injector. Injector должен иметь метод get, который должен создавать
инстанс переданного класса (соответственно и создавать инстансы классов, от которых зависит класс).
Injector умеет работать только с классами, которые обозначены декоратором @Injectable. В декоратор 
можно передать объект с настройкой `{ singleton: boolean }`. Если флаг singleton = true, то 
injector должен возвращать всегда один и тот же инстанс класса. По дефолту (если не передается настройка), то класс является синглтоном. Если в injector был передан класс, который не обозначен декоратором Injectable, то должна выброситься ошибка `NullInjectableError`.

Для рефлексии используйте reflect-metadata

Стремитесь к тому, чтобы код был максимально затипизирован, постарайтесь свести к минимум использование any