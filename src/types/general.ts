import { ObjectType } from "./operations"

export type FiltersParams = {
  objectType: ObjectType,
}

export interface FilterOption {
  id: string
  name: string
}

export interface FilterObject {
  id: string
  name: string
  options: FilterOption[] | FilterObject[]
}

export interface FiltersResponse {
  filters: FilterObject[]
}