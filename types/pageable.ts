import { Page } from "./page"

export interface Pageable<T> {
  content: T[]
  page: Page
}