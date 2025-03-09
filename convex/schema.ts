import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  
  // Temporary values for development
  values: defineTable({
    tempValue: v.number(),
  }),

  // User profiles with additional information
  users: defineTable({
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    createdAt: v.string(),
    shippingAddresses: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        street: v.string(),
        city: v.string(),
        state: v.string(),
        zipCode: v.string(),
        country: v.string(),
        isDefault: v.boolean(),
      })
    ),
    paymentMethods: v.array(
      v.object({
        id: v.string(),
        type: v.string(),
        last4: v.string(),
        isDefault: v.boolean(),
      })
    ),
  }).index("by_userId", ["userId"]),

  // Photos uploaded by users
  photos: defineTable({
    userId: v.string(),
    fileName: v.string(),
    storageId: v.string(),
    uploadedAt: v.string(),
    metadata: v.object({
      width: v.number(),
      height: v.number(),
      format: v.string(),
      size: v.number(),
    }),
    thumbnailUrl: v.optional(v.string()),
  }).index("by_userId", ["userId"]),

  // Product catalog
  products: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.string(),
    active: v.boolean(),
  }),

  // Product variants (sizes, paper types, etc.)
  productVariants: defineTable({
    productId: v.id("products"),
    name: v.string(),
    description: v.string(),
    dimensions: v.object({
      width: v.number(),
      height: v.number(),
      unit: v.string(),
    }),
    paperType: v.string(),
    price: v.number(),
    active: v.boolean(),
  }).index("by_productId", ["productId"]),

  // Orders placed by users
  orders: defineTable({
    userId: v.string(),
    createdAt: v.string(),
    status: v.string(), // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
    items: v.array(
      v.object({
        photoId: v.id("photos"),
        productVariantId: v.id("productVariants"),
        quantity: v.number(),
        price: v.number(),
        customizations: v.optional(v.any()),
      })
    ),
    shippingAddress: v.object({
      name: v.string(),
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    shippingMethod: v.object({
      id: v.string(),
      name: v.string(),
      price: v.number(),
      estimatedDelivery: v.string(),
    }),
    subtotal: v.number(),
    tax: v.number(),
    shippingCost: v.number(),
    total: v.number(),
    paymentId: v.optional(v.string()),
    trackingNumber: v.optional(v.string()),
    trackingUrl: v.optional(v.string()),
  }).index("by_userId", ["userId"]),

  // Payments for orders
  payments: defineTable({
    orderId: v.id("orders"),
    userId: v.string(),
    amount: v.number(),
    currency: v.string(),
    status: v.string(), // 'pending', 'succeeded', 'failed'
    paymentMethod: v.string(),
    stripePaymentIntentId: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_orderId", ["orderId"]).index("by_userId", ["userId"]),
});
