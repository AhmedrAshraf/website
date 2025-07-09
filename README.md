# Desist Web Application 🌐

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

A modern, full-stack web application built with Next.js, React, and TypeScript, designed to provide a comprehensive platform for community support and resources. This application serves as a central hub for community engagement, legal assistance, and resource sharing.

## 🎯 Our Approach

### Architecture & Design
- **Component-First Development**: Building reusable, modular components for consistent UI/UX
- **Type Safety**: Comprehensive TypeScript implementation for robust type checking
- **State Management**: Efficient state handling with React hooks and context
- **API Integration**: RESTful API endpoints with Supabase backend
- **Real-time Updates**: WebSocket integration for live data synchronization

### Security & Performance
- **Authentication**: Secure user authentication with Supabase Auth
- **Data Protection**: End-to-end encryption for sensitive information
- **Content Moderation**: AI-powered content filtering and moderation
- **Performance Optimization**: 
  - Code splitting and lazy loading
  - Image optimization
  - Caching strategies
  - Server-side rendering where appropriate

### User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG 2.1 compliance
- **Dark Mode**: System preference detection and manual toggle
- **Loading States**: Skeleton loaders and smooth transitions
- **Error Handling**: Graceful error states and user feedback

## ✨ Key Features

### 🗺️ Interactive Maps & Location Services
- Real-time location tracking and geolocation
- Custom map markers with status indicators
- Location-based incident reporting
- Map view for events and incidents
- Location search and address lookup
- Cluster markers for multiple locations

### 👥 Community Features
- User authentication and profiles
- Community forum with categories
- Post creation and management
- Comments and likes system
- Real-time updates for new posts
- User notifications
- Content moderation

### 📰 News & Blog System
- RSS feed integration
- News article aggregation
- Newsletter subscription
- Featured news section
- Category-based news filtering
- SEO optimization for articles

### ⚖️ Incident Management
- Incident reporting system
- Status tracking (Active, Resolved, Investigating)
- Location-based incident mapping
- Filtering and search capabilities
- Incident details and updates
- Real-time incident tracking

### 📅 Events System
- Event creation and management
- Location-based event mapping
- Event categories and filtering
- RSVP functionality
- Event details and updates
- Calendar integration

### 📱 Modern UI/UX
- Responsive design for all devices
- Dark/Light mode support
- Smooth animations with Framer Motion
- Loading states and transitions
- Accessible interface
- Interactive components

## 📱 Page Structure & Features

### Home Page
- Hero section with key features
- Latest incidents overview
- Upcoming events preview
- Community statistics
- Quick action buttons

### Community Pages
- Forum with categorized discussions
- User profiles and activity
- Content moderation system
- Real-time notifications
- Search and filtering

### Incident Pages
- Interactive map view
- List/grid view options
- Status filtering
- Detailed incident reports
- Location-based clustering

### Event Pages
- Calendar view
- Map integration
- RSVP system
- Event categories
- Search and filtering

### Blog & News
- RSS feed integration
- Category-based navigation
- Newsletter subscription
- Social sharing
- SEO optimization

### Support & Resources
- Contact forms
- FAQ section
- Resource library
- Help documentation
- Support ticket system

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Maps**: Google Maps API, Leaflet

### Backend
- **Database**: Supabase
- **Email**: Nodemailer
- **AI**: Google Generative AI
- **Authentication**: Supabase Auth

## 📦 Installation

1. **Prerequisites**
   - Node.js 18.x or later
   - Yarn or npm
   - Git

2. **Clone the repository**
```bash
git clone [repository-url]
cd desist_web
```

3. **Install dependencies**
```bash
yarn install
# or
npm install
```

4. **Environment Setup**
Create a `.env.local` file in the root directory with the following variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Email
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Google AI
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

5. **Run the development server**
```bash
yarn dev
# or
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🏗️ Project Structure

```
desist_web/
├── app/                    # Main application directory
│   ├── api/               # API routes and endpoints
│   ├── components/        # Reusable React components
│   ├── about/            # About page and company info
│   ├── blog/             # Blog system and articles
│   ├── community/        # Community features and forums
│   ├── contact/          # Contact forms and info
│   ├── events/           # Event management system
│   ├── incidents/        # Incident reporting system
│   ├── legal-help/       # Legal resources and support
│   ├── resources/        # General resources library
│   ├── services/         # Service offerings
│   └── support/          # Support and help center
├── public/               # Static assets and media
├── types/               # TypeScript type definitions
└── utils/              # Utility functions and helpers
```

## 🚀 Available Scripts

- `yarn dev` or `npm run dev`: Start development server
- `yarn build` or `npm run build`: Build for production
- `yarn start` or `npm run start`: Start production server
- `yarn lint` or `npm run lint`: Run ESLint
- `yarn type-check` or `npm run type-check`: Run TypeScript type checking

## 🔧 Configuration

The application uses several configuration files:
- `next.config.ts`: Next.js configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `postcss.config.js`: PostCSS configuration
- `eslint.config.mjs`: ESLint configuration

## 🚢 Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy

### Self-hosted
1. Build the application: `yarn build`
2. Start the server: `yarn start`
3. Configure your reverse proxy (nginx recommended)
4. Set up SSL certificates

## 👥 Support

For internal support and assistance:
- Contact the development team
- Visit the internal documentation
- Submit issues through the internal ticketing system

## 📝 License

Proprietary software. All rights reserved.
