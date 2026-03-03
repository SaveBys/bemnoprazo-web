export interface ErrorResponse {
  response: {
    data: {
      status: number;
      error: string;
      timestamp: string;
      message: string;
      fieldErrors: object;
    };
  };
}
