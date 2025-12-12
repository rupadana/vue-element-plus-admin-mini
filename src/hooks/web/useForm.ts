import type { Form, FormExpose } from '@/components/Form'
import type { ElForm, ElFormItem } from 'element-plus'
import { ref, unref, nextTick } from 'vue'
import { FormSchema, FormSetProps, FormProps } from '@/components/Form'

export const useForm = () => {
  // Frominstance
  const formRef = ref<typeof Form & FormExpose>()

  // ElForminstance
  const elFormRef = ref<ComponentRef<typeof ElForm>>()

  /**
   * @param ref Forminstance
   * @param elRef ElForminstance
   */
  const register = (ref: typeof Form & FormExpose, elRef: ComponentRef<typeof ElForm>) => {
    formRef.value = ref
    elFormRef.value = elRef
  }

  const getForm = async () => {
    await nextTick()
    const form = unref(formRef)
    if (!form) {
      console.error('The form is not registered. Please use the register method to register')
    }
    return form
  }

  // 一些内置的method
  const methods = {
    /**
     * @description Setform组件的props
     * @param props form组件的props
     */
    setProps: async (props: FormProps = {}) => {
      const form = await getForm()
      form?.setProps(props)
      if (props.model) {
        form?.setValues(props.model)
      }
    },

    /**
     * @description Setform的值
     * @param data 需要Set的data
     */
    setValues: async (data: Recordable) => {
      const form = await getForm()
      form?.setValues(data)
    },

    /**
     * @description Setschema
     * @param schemaProps 需要Set的schemaProps
     */
    setSchema: async (schemaProps: FormSetProps[]) => {
      const form = await getForm()
      form?.setSchema(schemaProps)
    },

    /**
     * @description 新增schema
     * @param formSchema 需要新增data
     * @param index 在哪里新增
     */
    addSchema: async (formSchema: FormSchema, index?: number) => {
      const form = await getForm()
      form?.addSchema(formSchema, index)
    },

    /**
     * @description Deleteschema
     * @param field Delete哪个data
     */
    delSchema: async (field: string) => {
      const form = await getForm()
      form?.delSchema(field)
    },

    /**
     * @description Getformdata
     * @returns form data
     */
    getFormData: async <T = Recordable>(): Promise<T> => {
      const form = await getForm()
      return form?.formModel as T
    },

    /**
     * @description Getform组件的instance
     * @param field form项唯一标识
     * @returns component instance
     */
    getComponentExpose: async (field: string) => {
      const form = await getForm()
      return form?.getComponentExpose(field)
    },

    /**
     * @description GetformItem组件的instance
     * @param field form项唯一标识
     * @returns formItem instance
     */
    getFormItemExpose: async (field: string) => {
      const form = await getForm()
      return form?.getFormItemExpose(field) as ComponentRef<typeof ElFormItem>
    },

    /**
     * @description GetElForm组件的instance
     * @returns ElForm instance
     */
    getElFormExpose: async () => {
      await getForm()
      return unref(elFormRef)
    },

    getFormExpose: async () => {
      await getForm()
      return unref(formRef)
    }
  }

  return {
    formRegister: register,
    formMethods: methods
  }
}
