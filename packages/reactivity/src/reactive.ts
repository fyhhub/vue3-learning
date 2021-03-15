import { isObject } from '@vue/shared'

const mutableHandlers = {}
const shallowReactiveHandlers = {}
const readonlyHandlers = {}
const shallowReadonlyHandlers = {}
export function reactive(target) {
  return createReactiveObject(target, false, mutableHandlers)
}

export function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers)
}

export function shallowReadonly(target) {
  return createReactiveObject(target, false, readonlyHandlers)

}

export function readonly(target) {
  return createReactiveObject(target, false, shallowReadonlyHandlers)
}

const reactiveMap = new WeakMap()
const readonlyMap = new WeakMap()
export function createReactiveObject(target, isReadonly, baseHandlers) {
  if (!isObject(target)) {
    return target
  }

  const proxyMap = isReadonly ? readonlyMap: reactiveMap

  const proxy = new Proxy(target, baseHandlers)
  return proxy
}

