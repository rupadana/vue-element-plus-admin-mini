import { reactive } from 'vue'
import { eachTree, treeMap, filter } from '@/utils/tree'
import { FormSchema } from '@/components/Form'
import { TableColumn } from '@/components/Table'
import { DescriptionsSchema } from '@/components/Descriptions'

export type CrudSchema = Omit<TableColumn, 'children'> & {
  search?: CrudSearchParams
  table?: CrudTableParams
  form?: CrudFormParams
  detail?: CrudDescriptionsParams
  children?: CrudSchema[]
}

interface CrudSearchParams extends Omit<FormSchema, 'field'> {
  // Whether to hide in query item
  hidden?: boolean
}

interface CrudTableParams extends Omit<TableColumn, 'field'> {
  // Whether to hide table header
  hidden?: boolean
}

interface CrudFormParams extends Omit<FormSchema, 'field'> {
  // Whether to hide form item
  hidden?: boolean
}

interface CrudDescriptionsParams extends Omit<DescriptionsSchema, 'field'> {
  // Whether to hide form item
  hidden?: boolean
}

interface AllSchemas {
  searchSchema: FormSchema[]
  tableColumns: TableColumn[]
  formSchema: FormSchema[]
  detailSchema: DescriptionsSchema[]
}

// Filter all structures
export const useCrudSchemas = (
  crudSchema: CrudSchema[]
): {
  allSchemas: AllSchemas
} => {
  // 所有结构data
  const allSchemas = reactive<AllSchemas>({
    searchSchema: [],
    tableColumns: [],
    formSchema: [],
    detailSchema: []
  })

  const searchSchema = filterSearchSchema(crudSchema)
  // @ts-ignore
  allSchemas.searchSchema = searchSchema || []

  const tableColumns = filterTableSchema(crudSchema)
  allSchemas.tableColumns = tableColumns || []

  const formSchema = filterFormSchema(crudSchema)
  allSchemas.formSchema = formSchema

  const detailSchema = filterDescriptionsSchema(crudSchema)
  allSchemas.detailSchema = detailSchema

  return {
    allSchemas
  }
}

// Filter Search structure
const filterSearchSchema = (crudSchema: CrudSchema[]): FormSchema[] => {
  const searchSchema: FormSchema[] = []
  const length = crudSchema.length

  for (let i = 0; i < length; i++) {
    const schemaItem = crudSchema[i]
    const searchSchemaItem = {
      component: schemaItem?.search?.component || 'Input',
      ...schemaItem.search,
      field: schemaItem.field,
      label: schemaItem.label
    }

    searchSchema.push(searchSchemaItem)
  }

  return searchSchema
}

// Filter table structure
const filterTableSchema = (crudSchema: CrudSchema[]): TableColumn[] => {
  const tableColumns = treeMap<CrudSchema>(crudSchema, {
    conversion: (schema: CrudSchema) => {
      if (!schema?.table?.hidden) {
        return {
          ...schema.table,
          ...schema
        }
      }
    }
  })

  // First filter may have undefined so need second filter
  return filter<TableColumn>(tableColumns as TableColumn[], (data) => {
    if (data.children === void 0) {
      delete data.children
    }
    return !!data.field
  })
}

// Filter form structure
const filterFormSchema = (crudSchema: CrudSchema[]): FormSchema[] => {
  const formSchema: FormSchema[] = []
  const length = crudSchema.length

  for (let i = 0; i < length; i++) {
    const formItem = crudSchema[i]
    // Determine whether to hide
    const formSchemaItem = {
      component: formItem?.form?.component || 'Input',
      ...formItem.form,
      field: formItem.field,
      label: formItem.label
    }

    formSchema.push(formSchemaItem)
  }

  return formSchema
}

// Filter descriptions structure
const filterDescriptionsSchema = (crudSchema: CrudSchema[]): DescriptionsSchema[] => {
  const descriptionsSchema: FormSchema[] = []

  eachTree(crudSchema, (schemaItem: CrudSchema) => {
    // Determine whether to hide
    if (!schemaItem?.detail?.hidden) {
      const descriptionsSchemaItem = {
        ...schemaItem.detail,
        field: schemaItem.field,
        label: schemaItem.detail?.label || schemaItem.label
      }

      // Delete unnecessary fields
      delete descriptionsSchemaItem.hidden

      descriptionsSchema.push(descriptionsSchemaItem)
    }
  })

  return descriptionsSchema
}
