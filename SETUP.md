# INVAANI - Local Development Setup

INVAANI is a premium fashion e-commerce platform built with React, TypeScript, and Lovable Cloud (Supabase).

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## Installation Steps

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd invaani
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy the environment variables from your Lovable Cloud project:
```bash
# The .env file is automatically managed by Lovable Cloud
# No manual configuration needed for basic setup
```

### 4. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── integrations/        # External integrations
├── assets/              # Images and static files
└── lib/                 # Utility functions

supabase/
├── functions/           # Edge functions
└── config.toml        # Supabase configuration
```

## Key Features

- **Authentication**: User registration/login with email
- **Product Catalog**: Browse products by categories
- **Shopping Cart**: Add/remove items, quantity management
- **Wishlist**: Save favorite products
- **Admin Dashboard**: Product and order management
- **AI Virtual Try-On**: Camera-based try-on experience
- **WhatsApp Integration**: Direct customer support
- **Flash Deals**: Time-limited offers with countdown
- **Recently Viewed**: Track browsing history

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Lovable Cloud (Supabase)
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

## Development Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Deployment

1. **Frontend**: Click "Publish" in Lovable Cloud
2. **Backend**: Changes deploy automatically

## Support

For issues or questions:
- Check the [Lovable Documentation](https://docs.lovable.dev/)
- Join the [Discord Community](https://discord.gg/lovable)