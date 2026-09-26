import { DESTINATION_TYPES, TODO_DEFAULTS, TODO_DEFAULTS_ABROAD } from '../constants'
import { getDestinationType } from './luggage'
import { uid } from '../utils/id'

// 根据出行类型生成默认待办名称列表（出国计划在基础清单上补充护照签证、货币兑换、转换插头）
export function defaultTodoNames(tripType) {
  const isAbroad = getDestinationType(tripType) === DESTINATION_TYPES.ABROAD
  return isAbroad ? [...TODO_DEFAULTS, ...TODO_DEFAULTS_ABROAD] : [...TODO_DEFAULTS]
}

// 生成默认待办清单
export function generateDefaultTodos(tripType) {
  return defaultTodoNames(tripType).map((name) => ({ id: uid(), name, done: false }))
}

// 出行类型变化后需要补充的模板差异（只增不减）
function todoTemplateDiff(oldTripType, newTripType) {
  const wasAbroad = getDestinationType(oldTripType) === DESTINATION_TYPES.ABROAD
  const isAbroad = getDestinationType(newTripType) === DESTINATION_TYPES.ABROAD
  if (isAbroad && !wasAbroad) return [...TODO_DEFAULTS_ABROAD]
  return []
}

// 把模板差异合并进现有待办：仅补充缺失项，不改动用户已增删或勾选的内容
export function mergeTodoTemplateDiff(todos, oldTripType, newTripType) {
  const existing = new Set((todos || []).map((t) => t.name))
  const additions = todoTemplateDiff(oldTripType, newTripType)
    .filter((name) => !existing.has(name))
    .map((name) => ({ id: uid(), name, done: false }))
  return [...(todos || []), ...additions]
}
