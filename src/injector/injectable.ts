import 'reflect-metadata';

export const INJECTABLE_METADATA_KEY = 'injectable' as const;

export type InjectableOptions = {
  singleton?: boolean
}

export function Injectable(
  injectableOptions: InjectableOptions = {}
): ClassDecorator {
  return function (target: Object) {
    Reflect.defineMetadata(
      INJECTABLE_METADATA_KEY, 
      injectableOptions, 
      target
    );
  };
}
