
# K & T Financial Consultancy Website

## Design System
- **Colors**: Deep navy blue (#1B3A6B), white, light grey (#F8F9FA), gold accent (#C9A84C) for trust and professionalism
- **Typography**: Clean sans-serif (Inter/system fonts)
- **Style**: Minimalist corporate with subtle animations, card-based layout, professional finance imagery via Unsplash

## Pages & Structure

### 1. Home Page (`/`)
- **Sticky header** with logo, nav links, and "Book Consultation" CTA button
- **Hero section**: Full-width with tagline "Empowering Your Financial Growth", subtext, two CTAs (Get Consultation, Our Services)
- **Services highlights**: 6 icon cards with brief descriptions
- **Why Choose Us**: Stats (years of experience, clients served, etc.)
- **Testimonials carousel**: 3–4 client testimonials with rating stars
- **CTA Banner**: "Ready to grow? Book a free consultation"
- **Footer**: Logo, contact info, quick links, social icons, newsletter signup

### 2. About Us (`/about`)
- Company overview with professional image
- Mission, Vision & Values cards
- Team section with placeholder cards (3–4 team members)
- Achievements/milestones timeline

### 3. Services (`/services`)
Detailed sections for all 7 services:
- Accounting & Bookkeeping
- Audit & Financial Reporting
- Tax Filing & Compliance
- Business Advisory & Consultancy
- Financial Planning & Budgeting
- Payroll Management
- Business Registration Support

Each card has icon, title, description, and "Learn More" detail view

### 4. Contact (`/contact`)
- Contact form (Name, Email, Phone, Message) with Zod validation
- Office info cards (address, phone, email, hours)
- Embedded Google Maps iframe
- Social media links

### 5. Blog/Insights (`/blog`)
- Grid of article cards with category tags (Tax, Accounting, Business)
- Individual article detail page
- Static sample articles (3–4 posts)

### 6. FAQ Page (integrated on Home or standalone)
- Accordion-style FAQ section covering common questions

## Key Features
- **Sticky responsive navbar** with mobile hamburger menu
- **Book a Consultation modal** with form (date, service type, contact details)
- **Lead capture forms** with full validation (zod + react-hook-form)
- **Smooth scroll animations** using CSS transitions
- **Service cards** with hover effects
- **Testimonials carousel** using auto-rotate
- **Downloadable tax checklist** (PDF link placeholder)
- **Newsletter subscription** form in footer
- **SEO meta tags** and semantic HTML structure
- No backend needed for MVP — forms will show success toast (Supabase can be added later for form submission storage)

## Component Architecture
- `Navbar` – sticky, responsive with mobile menu
- `Hero` – animated hero with CTA
- `ServiceCard` – reusable card component
- `TestimonialCarousel` – auto-rotating testimonials
- `ContactForm` – validated form with toast feedback
- `BookConsultationModal` – dialog-based booking form
- `Footer` – full-width footer with all links
- `BlogCard` – article preview card
- `FAQAccordion` – collapsible FAQ items

All pages share Navbar and Footer via App.tsx routing.
