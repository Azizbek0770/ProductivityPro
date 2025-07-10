# Productivity Platform

## Overview

This is a comprehensive productivity platform built with a modern full-stack architecture. The application features a React frontend with TypeScript, an Express.js backend, and uses PostgreSQL with Drizzle ORM for data management. The platform includes various productivity tools like Pomodoro timers, task management, note-taking, calendars, and team collaboration features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Context API for user state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Icons**: React Icons library for comprehensive icon support

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Development**: Hot reload with Vite middleware integration
- **API Structure**: RESTful API with `/api` prefix for all endpoints

### Build and Development
- **Development**: Vite dev server with HMR and Express middleware
- **Production**: Vite build with esbuild for server bundling
- **Type Safety**: Shared TypeScript schemas between frontend and backend
- **Database Migrations**: Drizzle Kit for schema management

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with type-safe queries
- **Schema**: Shared schema definitions in `/shared/schema.ts`
- **Storage Interface**: Abstracted storage interface with in-memory implementation for development
- **Migrations**: Automated with Drizzle Kit, outputs to `/migrations` directory

### User Management
- **Authentication**: Basic user system with username/password
- **User Tiers**: Free, Pro, and Premium tiers with feature gating
- **Context**: React Context for user state management across components

### UI Components
- **Design System**: shadcn/ui components with Radix UI primitives
- **Theming**: CSS variables for light/dark mode support
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Accessibility**: ARIA compliant components from Radix UI

### Productivity Features
- **Pomodoro Timer**: Focus sessions with break management
- **Task Management**: Create, organize, and track tasks with priorities
- **Smart Notes**: AI-powered note-taking with search capabilities
- **Calendar Integration**: Event scheduling and management
- **Analytics Dashboard**: Productivity metrics and insights
- **Team Collaboration**: Shared workspaces and real-time communication
- **Habit Tracking**: Personal habit formation and streak tracking

## Data Flow

1. **Client Requests**: React components use TanStack Query for server state
2. **API Layer**: Express routes handle business logic and database operations
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Flow**: JSON responses with proper error handling
5. **State Management**: Client-side state via React Context and TanStack Query cache

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database toolkit
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Unstyled, accessible UI components
- **react-hook-form**: Form management with validation
- **zod**: Schema validation and type safety

### Development Dependencies
- **tsx**: TypeScript execution for development
- **vite**: Build tool and dev server
- **tailwindcss**: Utility-first CSS framework
- **@replit/vite-plugin-***: Replit-specific development tools

### UI and Styling
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional class name utility
- **lucide-react**: Icon library for UI elements

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express middleware
- **Hot Reload**: Full-stack hot reload with Vite HMR
- **Database**: Neon Database for consistent development/production parity
- **Environment Variables**: DATABASE_URL for database connection

### Production Build
- **Frontend**: Vite build outputs to `/dist/public`
- **Backend**: esbuild bundles server code to `/dist/index.js`
- **Static Assets**: Served by Express in production mode
- **Database**: PostgreSQL via Neon Database connection

### Deployment Considerations
- **Environment**: NODE_ENV controls development vs production behavior
- **Database Migrations**: Manual migration with `npm run db:push`
- **Static Files**: Express serves built frontend in production
- **Error Handling**: Comprehensive error handling for API routes

The architecture emphasizes type safety, developer experience, and scalability while maintaining a clean separation of concerns between frontend and backend components.