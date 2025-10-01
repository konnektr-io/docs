# Konnektr Docs Development Plan & Progress

## 🎯 Mission Statement

Konnektr Docs is the **central portal for all user-facing documentation, guides, and API references** for the Konnektr Platform. It provides technical resources, interactive demos, and accurate API documentation for users and developers. All content is organized by product and kept consistent with the Konnektr Design System.

## 📊 Current Status

### ✅ Completed Infrastructure

- [x] React + TypeScript + React Router foundation with SSR
- [x] Custom DocsLayout and HomeLayout (replacing Fumadocs defaults)
- [x] shadcn/ui component library integration with SidebarProvider
- [x] Tailwind CSS styling system with OKLCH color space
- [x] MDX content parsing and rendering
- [x] Folder-based navigation from /content structure with correct PageTree types
- [x] TreeContextProvider integration for Fumadocs component compatibility
- [x] ModeToggle component with useTheme from next-themes and ktrlplane styling
- [x] Basic DocsSidebarContent with functional PageTree rendering

### 🔄 Current State Analysis

- Custom layouts functional but need comprehensive UI/UX improvements
- PageTree rendering works with correct node types ('page', 'folder', 'separator') and 'name' property
- TreeContextProvider resolves Fumadocs component compatibility issues
- ModeToggle updated with proper theme logic and ktrlplane button styling
- All components compile without errors
- Ready for systematic UI alignment with ktrlplane design patterns

### 🚨 Identified Issues Requiring Immediate Attention

- **Missing Branding**: No Konnektr logo or link to marketing site in headers
- **Inconsistent Header Heights**: Headers don't match ktrlplane 64px standard
- **Missing Search Integration**: Fumadocs search component not integrated in headers
- **Missing Breadcrumbs**: No navigation context breadcrumbs in layouts
- **Poor Sidebar Structure**: No product tabs, improper tree indentation patterns
- **Broken TOC**: No "On this page" table of contents component implemented
- **Inadequate Mobile Navigation**: Missing mobile sidebar triggers and responsive behavior

## 📋 Immediate Priorities - UI/UX Alignment Phase

### Phase 1: Critical UI/UX Fixes (In Progress)
- [ ] **Fix HomeLayout**: Add Konnektr logo and link to marketing site (konnektr.io)
- [ ] **Enhance DocsLayout**: Consistent header height (64px), Fumadocs search integration, breadcrumbs component, mobile navigation trigger
- [ ] **Rebuild Sidebar**: Implement Fumadocs SidebarTabs for product switching, proper tree structure using SidebarGroup/SidebarGroupLabel
- [ ] **Create TOC Component**: Implement clickable "On this page" TOC using Fumadocs utilities and shadcn-ui active item tracking patterns
- [ ] **Mobile Navigation**: Test and validate responsive sidebar behavior, navigation triggers, and touch interfaces

### Phase 2: Content & Functionality
- [ ] Create technical landing page with product overview and navigation (not marketing-focused)
- [ ] Integrate existing Graph documentation (from product repo)
- [ ] Organize content by product: Graph, Flow, Assembler, Compass
- [ ] Develop robust API documentation (reference, guides, live examples, OpenAPI integration)
- [ ] Enable automated PR workflow for product doc updates

### Phase 3: Polish & Optimization
- [ ] Ensure SEO optimization and accessibility improvements
- [ ] Implement versioning for major product releases
- [ ] Performance optimization and bundle size management

## 🏗️ Technology Architecture

- **Frontend**: React 18+ with TypeScript (located in `/app`)
- **Build System**: React Router with SSR enabled for static site generation
- **Routing**: React Router with file-based routing
- **UI Framework**: Fumadocs-UI components + shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with OKLCH color space, customized to match Konnektr Design System
- **Content**: MDX/Markdown files for docs, guides, API references (located in `/content`), with frontmatter support
- **Docs Engine**: Fumadocs-UI for layouts, navigation, search, and rendering
- **Integration**: Automated PRs from product repos for doc updates
- **Deployment**: Static hosting/CDN via React Router prerendering

## 📝 Content Strategy & User Experience

### Landing Page & Product Navigation Strategy

- Create technical landing page that provides overview of all products with documentation
- Focus on navigation and product discovery, not marketing (marketing handled by Konnektr Home)
- Guide users to specific product documentation sections
- Implement sidebar tabs for switching between products (similar to ktrlplane project switcher)

### Product Documentation Integration & Navigation

- Integrate existing Graph documentation (MDX, guides, reference, API docs)
- Organize docs in `/content` by product: Graph, Flow, Assembler, Compass
- Use folder structure for navigation (auto-generated sidebar/menu)
- Support frontmatter in MDX/Markdown for metadata (title, description, order, etc.)
- Ensure technical accuracy and consistency
- Embed live React components for interactive demos using shadcn/ui

### Fumadocs UI Customization & ktrlplane Alignment

- Customize Fumadocs theme using CSS variables and component overrides
- Implement sidebar tabs for product navigation (similar to ktrlplane project switcher)
- Align sidebar design and behavior with ktrlplane patterns
- Integrate Konnektr branding (logo, typography, colors)
- Match theme switcher implementation from ktrlplane (ModeToggle component)
- Ensure consistent navigation and header patterns across platform
- Use OKLCH color space for all custom styling

### API Documentation

- Develop interactive, accurate API documentation for all products
- Use OpenAPI/Swagger integration for reference docs
- Include live code examples and guides
- Ensure API docs are versioned and searchable
- Automated PRs for API doc updates from product repos

### Contribution & Content Management

- All documentation changes via PRs (manual or automated)
- Structured approach to content organization
- Versioned docs for major product releases
- Review process for technical accuracy and consistency

### SEO & Accessibility

- Optimize all docs pages for SEO
- Implement accessibility best practices (WCAG 2.1 AA)
- Use semantic HTML and ARIA labels

### Design System Alignment

- Use shadcn/ui components for consistent branding
- OKLCH color space for all styling
- Responsive, mobile-first design

## 🚀 Roadmap

- [ ] Customize Fumadocs theme to match Konnektr Design System (Q4 2025)
- [ ] Align UI with ktrlplane patterns (sidebar, theme switcher, branding) (Q4 2025)
- [ ] Integrate Graph documentation (Q4 2025)
- [ ] Launch API documentation with live examples and OpenAPI integration (Q4 2025)
- [ ] Enable automated PR workflow for product doc updates (Q4 2025)
- [ ] Expand docs for Flow, Assembler, Compass (Q1 2026)
- [ ] Add versioning for major product releases (Q1 2026)
- [ ] Continuous SEO and accessibility improvements

---

**Always refer to `.github/PLATFORM_SCOPE.md` and `.github/copilot-instructions.md` for boundaries and workflow. Update this file as the platform evolves.**
