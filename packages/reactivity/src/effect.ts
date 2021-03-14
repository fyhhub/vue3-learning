export function effect(fn, options: any = {}) {
  const effect = createReactiveEffect(fn, options)

  if (!options.lazy) {
    effect();
  }
  return effect
}
let uid = 0
function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {

  }
  effect.id = uid++
  effect._isEffect = true // 用于表示这个是响应式effect
  return effect
}
