import { z } from "zod";

export async function typedFetch<T>(
  url: string,
  schema: z.ZodType<T>
): Promise<T>;

export async function typedFetch<T>(url: string): Promise<T>;

export async function typedFetch<T>(
  url: string,
  schema?: z.ZodType<T>
): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Error when performing network response: ${response.statusText}`
    );
  }

  const data = await response.json();

  if (schema) {
    const validatedData = schema.parse(data);
    return validatedData as T;
  }
  return data as T;
}
