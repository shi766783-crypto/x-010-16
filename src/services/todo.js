import { DESTINATION_TYPES, TODO_DEFAULTS, TODO_DEFAULTS_ABROAD } from '../constants'
import { getDestinationType } from './luggage'
import { uid } from '../utils/id'

// 生成默认待办清单（按出行类型区分国内 / 国外，仅在创建计划时调用）
export function generateDefaultTodos(tripType) {
  const names = [...TODO_DEFAULTS]
  if (getDestinationType(tripType) === DESTINATION_TYPES.ABROAD) {
    names.push(...TODO_DEFAULTS_ABROAD)
  }
  return names.map((name) => ({ id: uid(), name, done: false }))
}
