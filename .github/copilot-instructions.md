# Konnektr Docs - GitHub Copilot Instructions

## 🎯 Project Overview

Konnektr Docs is the **central portal for all user-facing documentation, guides, and API references** for the Konnektr Platform. It is not a marketing site, but a technical resource for users and developers. All documentation is organized by product and kept consistent with the Konnektr Design System.

**Technology Stack & Folder Structure:**

- Frontend: React + TypeScript + React Router + Fumadocs-UI + shadcn/ui + Tailwind CSS (located in `/app`)
- Content: MDX files for product docs, guides, and API references (located in `/content`)
- Build System: React Router with SSR enabled for static site generation
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
  - ✅ **In Scope:** Interactive, searchable docs for all products, API references, guides, live demos, consistent branding/design, technical landing page with product overview
  - ❌ **Out of Scope:** Marketing, sales, lead generation, product business logic, backend integration, user authentication
- Landing page should be technical and navigation-focused, not marketing-focused (marketing is handled by Konnektr Home)
- All links to platform functionality must redirect to appropriate Konnektr applications
- No direct knowledge of other product's databases or internal business logic

### 3. Architecture Principles

#### Frontend (React + TypeScript + Fumadocs)

- All frontend code is located in `/app` (React Router convention)
- Use strict TypeScript, no `any` types
- Component-based architecture with clear separation of concerns
- React Router with SSR enabled for static site generation
- Fumadocs-UI components for docs layout and navigation
- Sidebar tabs for product navigation (similar to ktrlplane project switcher)
- Responsive design, mobile-first
- Use shadcn/ui components for design system alignment
- Align UI with ktrlplane design patterns (sidebar, theme switcher, branding)

#### ⚠️ Critical Implementation Warnings

**MDX Import & Curly Braces:**
- **Do NOT import React components directly in MDX files.**
  - Instead, register components globally via `mdx-components.tsx` and use them by name in MDX.
  - Direct imports (e.g. `import { Tabs, Tab } from 'fumadocs-ui/components/tabs';`) will break SSR/static export and cause runtime errors.
- **Curly braces (`{}`) in MDX are interpreted as JSX.**
  - Avoid using curly braces for non-JSX content (e.g. endpoint paths, code samples) to prevent parsing errors.
  - For literal curly braces, escape them or use code blocks.
  - Example: Use <code>GET /models/&#123;id&#125;</code> or fenced code blocks for API paths.

**Fumadocs Integration Requirements:**
- Always wrap custom layouts with TreeContextProvider for Fumadocs component compatibility
- PageTree nodes use 'name' property (not 'title') and types: 'page', 'folder', 'separator'
- Use SidebarProvider from shadcn/ui for sidebar state management
- Import Fumadocs components (Search, Breadcrumb, TOC) individually, not from layout packages
- Theme management must use useTheme from next-themes (not Fumadocs theme utilities)

#### Content (MDX + React)

- All docs content is in `/content` as MDX files
- Organize content by product: Graph, Flow, Assembler, Compass
- Landing page provides technical overview and navigation to all products
- Use sidebar tabs for product-specific navigation
- Embed live React components for interactive demos
- Automated PRs from product repos merge docs into the site

#### UI/UX Guidelines

**Custom Layout Implementation Requirements:**
- Use custom DocsLayout and HomeLayout (don't use Fumadocs default layouts)
- Integrate Fumadocs components (search, breadcrumbs, TOC) into custom layouts
- Maintain TreeContextProvider for Fumadocs component compatibility
- Align with ktrlplane design patterns while preserving Fumadocs functionality

**Header Requirements:**
- Consistent header height across all layouts (match ktrlplane header at 64px)
- Include Konnektr logo with link to marketing site (konnektr.io)
- Integrate Fumadocs search component with proper theming
- Add breadcrumbs component for navigation context
- Mobile navigation trigger for sidebar toggle
- Theme toggle button using useTheme from next-themes with ktrlplane styling

**Sidebar Implementation Patterns:**
- Use Fumadocs SidebarTabs component for product navigation at top of sidebar
- Organize products: Graph, Flow, Assembler, Compass
- Use shadcn-ui SidebarGroup and SidebarGroupLabel for proper tree structure
- Implement proper indentation for nested navigation items
- Follow TOP_LEVEL_SECTIONS pattern from shadcn-ui docs for organization
- Ensure mobile sidebar collapse/expand functionality

**Table of Contents (TOC) Requirements:**
- Implement clickable TOC component for "On this page" section
- Use Fumadocs TOC utilities for automatic heading extraction
- Follow shadcn-ui docs pattern for active item tracking
- Position TOC in right sidebar or floating element on larger screens
- Hide TOC on mobile to save space

**Navigation & Breadcrumbs:**
- Use Fumadocs breadcrumb utilities for automatic path generation
- Style breadcrumbs to match ktrlplane design patterns
- Ensure breadcrumbs update correctly with route changes
- Add proper aria-labels for accessibility

**Mobile Navigation:**
- Ensure sidebar is responsive and collapsible
- Implement proper mobile navigation triggers
- Test sidebar overlay behavior on mobile devices
- Verify all interactive elements work on touch interfaces

**General UI Consistency:**
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
5. Use `/app` for all site code and `/content` for docs
6. Customize Fumadocs theme to match Konnektr Design System

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
- Customize Fumadocs theme to match Konnektr Design System
- Align sidebar, theme switcher, and branding with ktrlplane patterns
- Use Konnektr brand colors and typography consistently

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
