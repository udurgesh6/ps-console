import { ObjectType } from "./operations"

export type FiltersParams = {
  objectType: ObjectType,
}

export interface FilterOption {
  id: string
  name: string
  description?: string
}

export interface FilterObject {
  id: string
  name: string
  options: FilterOption[] | FilterObject[]
  subcategories?: FilterObject[]
}

export interface FiltersResponse {
  categories?: FilterObject[]
  attackTypes?: FilterObject[]
}

export interface RiskLevels {
  low: number
  medium: number
  high: number
}