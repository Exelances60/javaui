export type IBaseResponse<T> = {
  data: T;
  message: string;
  status: number;
  errors?: string[];
  success: boolean;
};
