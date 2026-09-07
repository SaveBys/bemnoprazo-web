import { PaginationRequest } from "./pagination.request";

export interface OperationFilterRequest extends PaginationRequest {
  type?: string;
  status?: string;
}
