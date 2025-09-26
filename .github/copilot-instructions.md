# Konnektr Docs - GitHub Copilot Instructions

## 🎯 Project Overview

Konnektr Docs is the **central portal for all user-facing documentation, guides, and API references** for the Konnektr Platform. It is not a marketing site, but a technical resource for users and developers. All documentation is organized by product and kept consistent with the Konnektr Design System.

**Technology Stack & Folder Structure:**

- Frontend: React + TypeScript + Vite + shadcn/ui + Tailwind CSS (located in `/frontend`)
- Content: MDX files for product docs, guides, and API references (located in `/content`)
- Live Demos: React components embedded in MDX
- Deployment: Static hosting/CDN (docs.konnektr.com)
- Integration: Automated PRs from product repos merge docs into the site

## 📋 Core Instructions for GitHub Copilot

### 1. Maintain These Instructions

- Always keep this file and `.github/DEVELOPMENT_PLAN.md` up to date
- When user provides new instructions or boundaries, update this file immediately
- When significant features or architectural decisions are made, update both files
- When user mentions future features, add to DEVELOPMENT_PLAN.md roadmap but do not implement
- When user provides documentation links, summarize key points and add relevant instructions here

### 2. Scope Adherence

- This is a **documentation site only**. Refer to `.github/PLATFORM_SCOPE.md` for boundaries:
  - ✅ **In Scope:** Interactive, searchable docs for all products, API references, guides, live demos, consistent branding/design
  - ❌ **Out of Scope:** Marketing, sales, lead generation, product business logic, backend integration, user authentication
- All links to platform functionality must redirect to appropriate Konnektr applications
- No direct knowledge of other product's databases or internal business logic

### 3. Architecture Principles

#### Frontend (React + TypeScript)

- All frontend code is located in `/frontend`
- Use strict TypeScript, no `any` types
- Component-based architecture with clear separation of concerns
- Feature-based folder structure in `/frontend/src`
- Responsive design, mobile-first
- Use shadcn/ui components for design system alignment

#### Content (MDX + React)

- All docs content is in `/content` as MDX files
- Organize content by product, guides, reference, and API docs
- Embed live React components for interactive demos
- Automated PRs from product repos merge docs into the site

#### UI/UX Guidelines

- Consistent branding and design system (shadcn/ui, OKLCH color space)
- Accessibility best practices (WCAG 2.1 AA)
- SEO optimization for all docs pages
- Proper loading states and smooth transitions
- Visual consistency with Konnektr Design System

#### Contribution & Content Management

- All documentation changes via PRs (manual or automated from product repos)
- Structured approach to content organization
- Versioned docs for major product releases
- API documentation must be accurate, up-to-date, and include live examples where possible
- Use semantic HTML and ARIA labels for accessibility

### 4. Development Workflow

1. Check DEVELOPMENT_PLAN.md for current priorities
2. Understand the documentation scope and user journey
3. Plan before implementing (use manage_todo_list for complex tasks)
4. Consider SEO and accessibility implications
5. Use `/frontend` for all site code and `/content` for docs

#### Code Quality Standards

- TypeScript: Strict, modern React best practices
- Package Manager: **ALWAYS use PNPM**
- CSS & Styling: OKLCH color space, semantic CSS variables, avoid hardcoded colors
- Performance: Optimize bundle size, lazy loading
- SEO: Proper meta tags, structured data, semantic HTML
- Accessibility: ARIA labels, keyboard navigation, screen reader support
- Testing: Component and integration testing for critical user flows

#### API Documentation

- API docs must be interactive, accurate, and include live code examples
- Use OpenAPI/Swagger integration where possible
- Ensure API docs are versioned and searchable

### 5. CSS & Styling Guidelines

- Use OKLCH color space exclusively
- Define colors in CSS custom properties, never hardcode hex/rgb values

### 6. Integration with Product Repos

- Product teams must submit documentation updates via PRs
- Automated PRs are preferred for API and reference docs
- All docs must be reviewed for consistency and technical accuracy

### 7. Out-of-Scope

- No marketing, sales, or lead generation content
- No backend integration or user authentication
- No product business logic or resource management

---

**Always refer to `.github/PLATFORM_SCOPE.md` for boundaries and update this file as the platform evolves.**
