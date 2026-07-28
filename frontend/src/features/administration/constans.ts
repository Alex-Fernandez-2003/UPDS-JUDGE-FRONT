import type { AdminRolesFiltersValue } from './types'

export const PAGE_SIZE = 10

export const initialFilters: AdminRolesFiltersValue = {
  busqueda: '',
  rol: 'todos',
}

export const ADMIN_ROLES_FILTERS = [
  {
    value: 'todos',
    label: 'Todos los roles',
  },
]
//comentando