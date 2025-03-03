# Cursor AI Prompt: Photo Printing Web Application

## Project Overview
Create a complete web application for a photo printing company that allows users to:
1. Create and manage their accounts
2. Upload photos
3. Select print dimensions and customize options
4. Make payments
5. Track orders

## Tech Stack
- **Frontend**: Next.js 15 with App Router and shadcn/ui component library
- **Backend**: Convex.dev for database and backend functions
- **Authentication**: convex/auth
- **File Storage**: Convex file storage
- **Payment Processing**: Stripe integration
- **Deployment**: Vercel

## Application Structure

### Core Features

#### User Authentication
- Email/password and social login options
- User profile management
- Order history

#### Photo Management
- Drag-and-drop photo uploads
- Gallery view of uploaded photos
- Basic editing capabilities (crop, rotate, filters)
- Folder/collection organization

#### Print Customization
- Selection of print dimensions (4x6, 5x7, 8x10, etc.)
- Paper type options (glossy, matte, etc.)
- Quantity selection
- Preview generation

#### Shopping Cart & Checkout
- Add/remove items
- Adjust quantities
- Apply discount codes
- Shipping address management
- Shipping method selection

#### Payment Processing
- Secure Stripe integration
- Payment status tracking
- Order confirmation emails

#### Order Management
- Order status tracking
- Delivery status updates
- Reorder functionality
- Order cancellation (if applicable)

### Detailed Technical Requirements

#### Frontend (Next.js 15 + shadcn/ui)
- Implement responsive design with mobile-first approach
- Use Server Components where appropriate for better performance
- Create reusable UI components using shadcn/ui
- Implement client-side form validation
- Use React Query for data fetching and caching
- Implement optimistic UI updates
- Add image compression before upload
- Create smooth transitions between order steps

#### Backend (Convex)
- Design database schema for users, photos, orders, etc.
- Create API endpoints for all necessary operations
- Implement file upload and storage for photos
- Set up webhook handling for payment processing
- Create background jobs for order processing
- Implement email notifications
- Add robust error handling and logging

## Page Structure
1. **Landing Page**: Showcase services, testimonials, and pricing
2. **Authentication Pages**: Sign up, login, password reset
3. **User Dashboard**: Order history, saved photos, account settings
4. **Photo Upload**: Drag-and-drop interface with progress indicators
5. **Photo Gallery**: Grid view of uploaded photos with filtering options
6. **Photo Editor**: Basic editing tools
7. **Product Selection**: Choose print types and dimensions
8. **Customization**: Options specific to selected product
9. **Shopping Cart**: Review and modify selections
10. **Checkout**: Address, shipping, and payment information
11. **Order Confirmation**: Summary and next steps
12. **Order Tracking**: Status updates and delivery information

## Implementation Guidance

### Authentication Flow
Implement a secure authentication system using Clerk or NextAuth.js that integrates with Convex backend.

### Photo Upload Process
1. Client-side compression and validation
2. Secure upload to Convex storage
3. Progress indicators
4. Error handling for failed uploads
5. Support for batch uploads

### Print Customization Interface
1. Interactive size selection with visual representation
2. Paper type selection with descriptions
3. Quantity adjustments with price updates


### Checkout Process
1. Multi-step form with progress indicator
2. Address validation
3. Shipping method selection with price calculation
4. Secure payment processing
5. Order confirmation

### Database Schema Suggestions
Design Convex database tables for:
- Users (linked to auth provider)
- Photos (metadata, storage links)
- Products (print types, sizes, prices)
- Orders (status, items, customer info)
- Payments (status, amount, method)

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  shippingAddresses: Address[];
  paymentMethods: PaymentMethod[];
}
```

### Photo
```typescript
interface Photo {
  id: string;
  userId: string;
  fileName: string;
  storageId: string;
  uploadedAt: string;
  metadata: {
    width: number;
    height: number;
    format: string;
    size: number;
  };
  thumbnailUrl: string;
}
```

### Order
```typescript
interface Order {
  id: string;
  userId: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  shippingAddress: Address;
  shippingMethod: ShippingMethod;
  paymentId: string;
  total: number;
  trackingNumber?: string;
}
```

### OrderItem
```typescript
interface OrderItem {
  id: string;
  photoId: string;
  productId: string;
  quantity: number;
  price: number;
  printSize: string;
  paperType: string;
  customizations: any;
}
```

## UI/UX Considerations
- Clean, modern design focused on showcasing photos
- Intuitive navigation and clear calls to action
- Responsive design for all device sizes
- Accessibility compliance (WCAG 2.1)
- Loading states and progress indicators
- Helpful error messages
- Tutorial tooltips for first-time users

## Deliverables
1. Complete source code for frontend and backend
2. Documentation for API endpoints
3. Deployment configuration
4. User documentation
5. Admin dashboard for order management

Please generate a comprehensive web application following these specifications, with clean, well-organized code and thorough documentation.