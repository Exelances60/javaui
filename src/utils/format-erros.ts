// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatErrors(data: {
  status: number;
  errors?: Record<string, string[]>;
  message: string;
  data?: unknown;
}) {
  if (data.errors) {
    console.log(data.errors);
    return Object.values(data.errors).join(", ");
  }
  return data.message;
}
