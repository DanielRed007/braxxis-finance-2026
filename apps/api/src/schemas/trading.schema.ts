import { z } from 'zod';

export const executeSpotOrderSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required'),
  side: z.enum(['buy', 'sell']),
  quantity: z.number().positive('Quantity must be positive'),
  price: z.number().positive('Price must be positive'),
});

export type ExecuteSpotOrderBody = z.infer<typeof executeSpotOrderSchema>;

export const orderHistoryQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
});

export type OrderHistoryQuery = z.infer<typeof orderHistoryQuerySchema>;
