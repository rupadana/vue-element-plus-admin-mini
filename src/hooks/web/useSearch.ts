import { ref, unref, nextTick } from 'vue'
import { FormSchema, FormSetProps } from '@/components/Form'
import { SearchExpose, SearchProps } from '@/components/Search'

export const useSearch = () => {
  // Searchinstance
  const searchRef = ref<SearchExpose>()

  /**
   * @param ref Searchinstance
   * @param elRef ElForminstance
   */
  const register = (ref: SearchExpose) => {
    searchRef.value = ref
  }

  const getSearch = async () => {
    await nextTick()
    const search = unref(searchRef)
    if (!search) {
      console.error('The Search is not registered. Please use the register method to register')
    }
    return search
  }

  // 一些内置的method
  const methods = {
    /**
     * @description Setsearch组件的props
     * @param field FormItem的field
     */
    setProps: async (props: SearchProps = {}) => {
      const search = await getSearch()
      search?.setProps(props)
      if (props.model) {
        search?.setValues(props.model)
      }
    },

    /**
     * @description Setform的值
     * @param data 需要Set的data
     */
    setValues: async (data: Recordable) => {
      const search = await getSearch()
      search?.setValues(data)
    },

    /**
     * @description Setschema
     * @param schemaProps 需要Set的schemaProps
     */
    setSchema: async (schemaProps: FormSetProps[]) => {
      const search = await getSearch()
      search?.setSchema(schemaProps)
    },

    /**
     * @description 新增schema
     * @param formSchema 需要新增data
     * @param index 在哪里新增
     */
    addSchema: async (formSchema: FormSchema, index?: number) => {
      const search = await getSearch()
      search?.addSchema(formSchema, index)
    },

    /**
     * @description Deleteschema
     * @param field Delete哪个data
     */
    delSchema: async (field: string) => {
      const search = await getSearch()
      search?.delSchema(field)
    },

    /**
     * @description Getformdata
     * @returns form data
     */
    getFormData: async <T = Recordable>(): Promise<T> => {
      const search = await getSearch()
      return search?.formModel as T
    }
  }

  return {
    searchRegister: register,
    searchMethods: methods
  }
}
