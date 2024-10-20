import { 
  INJECTABLE_METADATA_KEY, InjectableOptions 
} from './injectable.js';
import 'reflect-metadata';
import { NullInjectableError } from './null-injectable-error.js';
import { InjectableObject } from './types.js';

export class Injector {
  private static _singletons = new Map<string, Object>();

  public get<T extends Object>(service: InjectableObject<T>): T {
    const injectableOptions: InjectableOptions = Reflect.getMetadata(
      INJECTABLE_METADATA_KEY, service
    );

    if (!injectableOptions) {
      throw new NullInjectableError('Injectable not found');
    }

    if (injectableOptions.singleton ?? Injector._singletons.has(service.name)) {
      return this._getOrCreateSingleton(service);
    }

    return this._createInstance(service);
  }

  private _createInstance<T>(service: InjectableObject<T>): T {
    return new service(...this._getDependencies(service));
  }

  private _getDependencies<T>(service: InjectableObject<T>): Object[] {
    const dependencies = Reflect.getOwnMetadata('design:paramtypes', service) || [];
    return dependencies.map(dependency => this.get(dependency));
  }

  private _getOrCreateSingleton<T>(service: InjectableObject<T>): T {
    if (!Injector._singletons.has(service.name)) {
      Injector._singletons.set(service.name, this._createInstance(service));
    }
    return Injector._singletons.get(service.name) as T;
  }
}
