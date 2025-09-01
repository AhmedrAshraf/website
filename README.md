# Desist Web Application 🌐

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

A modern, full-stack web application built with Next.js, React, and TypeScript, designed to provide a comprehensive platform for community support and resources. This application serves as a central hub for community engagement, legal assistance, and resource sharing that launches in parallel with the DESIST mobile app.

## 🎯 Project Vision

This website serves as a community-first hub for support, engagement, education, and privacy advocacy, designed to mirror the look, feel, and functionality of the DESIST mobile app to provide a cohesive user experience across platforms.

## 🚀 Phase 1: Foundation & Alignment ✅

### ✅ Repository and Development Setup
- Next.js 15.3.2 with TypeScript and React 19
- ESLint, Prettier, and Husky for code quality and pre-commit hooks
- GitHub Actions CI/CD pipeline with accessibility testing
- Comprehensive README with setup instructions

### ✅ Design System Alignment
- Shared design tokens in `/theme` directory (colors, typography, spacing)
- Reusable UI components: `Button`, `Badge`, `Card`, `Alert`
- Global theming with Tailwind CSS integration
- Mobile app design pattern compatibility

### ✅ Accessibility Infrastructure
- WCAG 2.1 AA compliance standards
- `axe-core` integration for accessibility testing
- Semantic HTML with proper ARIA roles and labels
- Color contrast validation and accessible color pairs
- Focus management and screen reader support
- Lighthouse accessibility testing in CI/CD

### ✅ Core Navigation
- Accessible navigation with proper semantic markup
- All core pages: Home, About, Community, Support, Privacy, Legal Help
- Shared `Header` and `Footer` components with ARIA attributes
- Mobile-responsive navigation with focus management

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

---

# 🚀 DESIST Website & Mobile App – Developer Handover

This handover document summarizes the current state of the project and identifies **launch-critical issues and enhancements** to be addressed for a successful Day 1 launch. All listed issues should be tracked in GitHub and resolved prior to public release.

## 🚩 Launch-Critical GitHub Issues

### 1. SSO/Unified Authentication Integration
**Priority: Critical**
- Implement and test true single sign-on (SSO) between website and mobile app (Supabase Auth)
- Ensure user profile and session data sync across platforms
- Validate NextAuth.js integration with mobile app authentication flow
- Test session persistence and token refresh mechanisms

**Current Status:** NextAuth.js implemented with Google OAuth and credentials providers. Prisma adapter configured.

### 2. Community & Incident/Event System Testing
**Priority: Critical**
- Perform live scenario and load tests for:
  - Forums and community post creation/moderation
  - Incident reporting and status tracking
  - Event/RSVP systems and calendar integration
  - Notification and moderation protocols
- Validate reliability, privacy, and abuse prevention
- Test emergency escalation workflows

**Current Status:** Basic community framework implemented. Needs comprehensive testing and moderation tools.

### 3. Accessibility & Usability Final Audit
**Priority: High**
- Conduct end-to-end accessibility and usability review with real users
- Include screen reader and low-vision testers in review process
- Address any WCAG 2.1 AA compliance gaps discovered
- Test keyboard navigation and focus management across all pages
- Validate color contrast and text sizing options

**Current Status:** Accessibility infrastructure in place with axe-core integration. Needs user testing validation.

### 4. Privacy Policy, Terms of Service, Security Disclosures
**Priority: Critical**
- Finalize, review, and prominently link user-facing privacy policy and terms of service
- Create security disclosure policy and vulnerability reporting process
- Ensure GDPR and CCPA compliance documentation
- Obtain legal sign-off on all documents
- Implement consent management for analytics and data collection

**Current Status:** Privacy-compliant analytics implemented. Legal documents need creation and review.

### 5. Newsletter Signup & Early Access Pipeline
**Priority: High**
- Integrate newsletter signup with real email service provider (Mailchimp, ConvertKit, etc.)
- Implement GDPR-compliant opt-in/opt-out mechanisms
- Set up tested notification pipeline for launch announcements
- Create email templates for onboarding and engagement
- Test unsubscribe and preference management flows

**Current Status:** Newsletter signup component implemented. Needs real email service integration.

### 6. Incident/Event Reporting Reliability
**Priority: Critical**
- Validate incident/event reporting under load conditions
- Test status updates and notification systems
- Confirm security measures for sensitive incident data
- Implement rate limiting and abuse prevention
- Test emergency escalation and crisis response workflows

**Current Status:** Basic incident reporting framework exists. Needs security hardening and load testing.

### 7. Support/Helpdesk & Onboarding Materials
**Priority: High**
- Finalize and test support ticket system workflow
- Create comprehensive onboarding guides for new users
- Develop troubleshooting documentation and FAQ
- Implement help system integration with mobile app
- Test support escalation and response time SLAs

**Current Status:** Feedback system implemented. Needs help documentation and workflow optimization.

### 8. Performance & SEO Final Pass
**Priority: High**
- Run comprehensive Lighthouse audits on all major pages
- Optimize Core Web Vitals (LCP, FID, CLS) for all routes
- Confirm search engine indexing and sitemap generation
- Implement structured data for better search visibility
- Test performance under load conditions
- Optimize bundle size and implement proper caching strategies

**Current Status:** Basic performance optimization in place. Needs comprehensive audit and optimization.

### 9. Database Migration & Production Readiness
**Priority: Critical**
- Migrate from SQLite to production database (PostgreSQL recommended)
- Set up database backup and recovery procedures
- Implement database monitoring and alerting
- Test data migration scripts and rollback procedures
- Configure production environment variables and secrets management

**Current Status:** Prisma schema defined with SQLite. Needs production database setup.

### 10. Security Hardening & Penetration Testing
**Priority: Critical**
- Conduct security audit of authentication and authorization systems
- Implement proper input validation and SQL injection prevention
- Set up rate limiting and DDoS protection
- Configure CSP headers and security middleware
- Perform penetration testing on all user-facing endpoints

**Current Status:** Basic security measures in place. Needs comprehensive security audit.

## 🛠️ How to Use This Document

- **Track each item as a separate GitHub issue** using the template below
- Assign responsible team members and set deadlines prior to launch
- Link this document in your project README and main issue tracker
- Update and check off items as they are resolved
- Regular status meetings to review progress on launch-critical items

## 📋 GitHub Issue Template

When creating issues for the items above, use this template:

```yaml
title: "[LAUNCH] {Short Issue Name}"
labels: ["launch-critical", "website", "mobile-app", "priority-high"]
description: |
  ## Description
  {Detailed description of the issue and why it is critical for launch}
  
  ## Acceptance Criteria
  - [ ] {Specific, testable criteria}
  - [ ] {Additional criteria}
  
  ## Testing Requirements
  - [ ] {Testing requirements}
  
  ## Definition of Done
  - [ ] Code reviewed and approved
  - [ ] Tests passing
  - [ ] Documentation updated
  - [ ] Security review completed (if applicable)
  
assignees: [team-member]
milestone: "Launch Readiness"
due-date: {YYYY-MM-DD}
```

## 🎯 Launch Timeline & Dependencies

**Target Launch Date:** September 15, 2025

**Critical Path Items (must be completed first):**
1. Database Migration & Production Setup
2. SSO/Authentication Integration
3. Security Hardening & Audit
4. Privacy Policy & Legal Documents

**Parallel Track Items:**
- Performance & SEO Optimization
- Accessibility Final Audit
- Support Documentation
- Newsletter Integration

## 📊 Current Technical Debt & Known Issues

- **NextAuth.js SessionProvider Integration:** Minor issues with provider wrapping identified
- **Mobile Responsiveness:** Some components need mobile optimization
- **Error Handling:** Need comprehensive error boundaries and fallbacks
- **Loading States:** Implement proper loading indicators across all async operations
- **Form Validation:** Enhance client-side validation and error messaging

## 🔗 Related Resources

- [Phase 4 Implementation Status](./docs/phase-4-status.md)
- [Security Requirements](./docs/security-requirements.md)
- [Performance Benchmarks](./docs/performance-benchmarks.md)
- [Accessibility Guidelines](./docs/accessibility-guidelines.md)

---

**⚠️ IMPORTANT: All launch-critical items must be completed and verified prior to Day 1 public launch.**

---

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
