import { Slots } from 'vue'
import { isFunction } from '@/utils/is'

export const getSlot = (slots: Slots, slot = 'default', data?: Recordable) => {
  // Reflect.has determines whether an object has a certain property
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`)
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn) return null
  return slotFn(data)
}
