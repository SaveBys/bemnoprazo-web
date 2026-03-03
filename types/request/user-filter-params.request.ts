import { PaginationRequest } from "./pagination.request";

export interface UserFilterRequest extends PaginationRequest {
  search?: string;
}
