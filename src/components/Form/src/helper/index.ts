import { useI18n } from '@/hooks/web/useI18n'
import { PlaceholderModel, FormSchema, ComponentNameEnum, ColProps } from '../types'
import { isFunction } from '@/utils/is'
import { firstUpperCase, humpToDash } from '@/utils'
import { set, get } from 'lodash-es'

const { t } = useI18n()

/**
 *
 * @param schema 对应组件data
 * @returns returnTipInfoobject
 * @description 用于自动Setplaceholder
 */
export const setTextPlaceholder = (schema: FormSchema): PlaceholderModel => {
  const textMap = [
    ComponentNameEnum.INPUT,
    ComponentNameEnum.AUTOCOMPLETE,
    ComponentNameEnum.INPUT_NUMBER,
    ComponentNameEnum.INPUT_PASSWORD
  ]
  const selectMap = [
    ComponentNameEnum.SELECT,
    ComponentNameEnum.TIME_PICKER,
    ComponentNameEnum.DATE_PICKER,
    ComponentNameEnum.TIME_SELECT,
    ComponentNameEnum.SELECT_V2
  ]
  if (textMap.includes(schema?.component as ComponentNameEnum)) {
    return {
      placeholder: t('common.inputText')
    }
  }
  if (selectMap.includes(schema?.component as ComponentNameEnum)) {
    // 一些范围选择器
    const twoTextMap = ['datetimerange', 'daterange', 'monthrange', 'datetimerange', 'daterange']
    if (
      twoTextMap.includes(
        ((schema?.componentProps as any)?.type ||
          (schema?.componentProps as any)?.isRange) as string
      )
    ) {
      return {
        startPlaceholder: t('common.startTimeText'),
        endPlaceholder: t('common.endTimeText'),
        rangeSeparator: '-'
      }
    } else {
      return {
        placeholder: t('common.selectText')
      }
    }
  }
  return {}
}

/**
 *
 * @param col 内置栅格
 * @returns return栅格property
 * @description 合并传入进来的栅格property
 */
export const setGridProp = (col: ColProps = {}): ColProps => {
  const colProps: ColProps = {
    // If span exists, means user priority is higher, so no default grid needed
    ...(col.span
      ? {}
      : {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12
        }),
    ...col
  }
  return colProps
}

/**
 *
 * @param item 传入的组件property
 * @returns 默认Add clearable property
 */
export const setComponentProps = (item: FormSchema): Recordable => {
  // const notNeedClearable = ['ColorPicker']
  // Split and combine events
  const onEvents = (item?.componentProps as any)?.on || {}
  const newOnEvents: Recordable = {}

  for (const key in onEvents) {
    if (onEvents[key]) {
      newOnEvents[`on${firstUpperCase(key)}`] = (...args: any[]) => {
        onEvents[key](...args)
      }
    }
  }

  const componentProps: Recordable = {
    clearable: true,
    ...item.componentProps,
    ...newOnEvents
  }
  // Need to delete extra properties
  if (componentProps.slots) {
    delete componentProps.slots
  }
  if (componentProps.on) {
    delete componentProps.on
  }
  return componentProps
}

/**
 *
 * @param formModel formdata
 * @param slotsProps 插槽property
 */
export const setItemComponentSlots = (slotsProps: Recordable = {}): Recordable => {
  const slotObj: Recordable = {}
  for (const key in slotsProps) {
    if (slotsProps[key]) {
      if (isFunction(slotsProps[key])) {
        slotObj[humpToDash(key)] = (...args: any[]) => {
          return slotsProps[key]?.(...args)
        }
      } else {
        slotObj[humpToDash(key)] = () => {
          return slotsProps[key]
        }
      }
    }
  }
  return slotObj
}

/**
 *
 * @param schema Formform结构化array
 * @param formModel FormMoel
 * @returns FormMoel
 * @description 生成对应的formModel
 */
export const initModel = (schema: FormSchema[], formModel: Recordable) => {
  const model: Recordable = { ...formModel }
  schema.map((v) => {
    if (v.remove) {
      delete model[v.field]
    } else if (v.component !== 'Divider') {
      // const hasField = Reflect.has(model, v.field)
      const hasField = get(model, v.field)
      // 如果先前已经有值存在，则不进行重新赋值，而是采用现有的值
      set(
        model,
        v.field,
        hasField !== void 0 ? get(model, v.field) : v.value !== void 0 ? v.value : undefined
      )
      // model[v.field] = hasField ? model[v.field] : v.value !== void 0 ? v.value : undefined
    }
  })
  return model
}
