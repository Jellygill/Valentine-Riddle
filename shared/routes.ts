import { z } from 'zod';
import { insertReasonSchema, reasons } from './schema';

export const api = {
  reasons: {
    list: {
      method: 'GET' as const,
      path: '/api/reasons',
      responses: {
        200: z.array(z.custom<typeof reasons.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
