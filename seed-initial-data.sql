-- Initial Data Seeding Script
-- Run this after creating tables to populate with initial content

-- Insert Home Content
INSERT INTO public.home_content (content_type, item_index, title, subtitle, value, label, description, text, heading) VALUES
-- Hero Section
('hero', 0, 'Empowering Your', 'Professional Financial Services Since 2009', 'Financial Growth', 'Get Started', 'Learn More', 'Expert accounting, audit, tax, and business advisory services for individuals and businesses. We help you navigate financial complexities with confidence and clarity.', 'Get Free Consultation', 'Your Trusted Financial Partner'),

-- Stats
('stats', 0, '15+', null, 'Years of Experience', null, null, null, null),
('stats', 1, '500+', null, 'Clients Served', null, null, null, null),
('stats', 2, '98%', null, 'Client Satisfaction', null, null, null, null),
('stats', 3, '50+', null, 'Industry Experts', null, null, null, null),

-- Services Highlights
('services', 0, 'Accounting & Bookkeeping', null, null, null, 'Accurate financial records and bookkeeping tailored to your business needs.', null, null),
('services', 1, 'Audit & Financial Reporting', null, null, null, 'Independent audits and comprehensive financial statements you can trust.', null, null),
('services', 2, 'Tax Filing & Compliance', null, null, null, 'Stress-free tax preparation and full regulatory compliance support.', null, null),
('services', 3, 'Business Advisory', null, null, null, 'Strategic insights to drive growth and maximize business performance.', null, null),
('services', 4, 'Financial Planning', null, null, null, 'Long-term financial strategies aligned with your personal or business goals.', null, null),
('services', 5, 'Payroll Management', null, null, null, 'Seamless payroll processing, ensuring accuracy and compliance every cycle.', null, null),

-- Why Us Section
('why_us_points', 0, 'Certified & Regulated', 'All advisors are CPA/ACCA certified and fully regulated.', null, null, null, 'We combine deep expertise, cutting-edge tools, and a client-first approach to deliver financial solutions that truly make a difference.', null, null),
('why_us_points', 1, 'Timely Delivery', 'We meet deadlines — always. Your compliance is our priority.', null, null, null, null, null, null),
('why_us_points', 2, 'Personalized Service', 'Dedicated account managers who understand your unique needs.', null, null, null, null, null, null),
('why_us_points', 3, 'Proven Track Record', '500+ satisfied clients across diverse industries.', null, null, null, null, null, null),

-- Testimonials
('testimonials', 0, 'Sarah Mitchell', 'CEO, Mitchell Retail Group', '5', null, 'K & T Financial transformed our financial operations. Their audit team is meticulous and professional. We've seen a 30% reduction in compliance costs since partnering with them.', null, null),
('testimonials', 1, 'David Okonkwo', 'Founder, TechBridge Solutions', '5', null, 'The business advisory services helped us scale efficiently. Their tax planning saved us significantly. I highly recommend K & T to any serious business owner.', null, null),
('testimonials', 2, 'Jennifer Lau', 'Individual Investor', '5', null, 'My financial planning journey has been seamless with K & T. They truly understand both personal and investment goals. The team is always responsive and incredibly knowledgeable.', null, null),
('testimonials', 3, 'Marcus Thompson', 'Director, Thompson & Associates', '5', null, 'Outstanding payroll management and bookkeeping. Our books have never been more accurate. K & T is a trusted partner for our growing firm.', null, null),

-- FAQs
('faqs', 0, 'What industries do you serve?', null, null, null, 'We serve a broad range of industries including retail, technology, healthcare, real estate, manufacturing, and professional services. Our team tailors financial strategies to your specific sector.', null, null),
('faqs', 1, 'How do I get started with K & T Financial?', null, null, null, 'Simply book a free consultation via our website or call our office. We'll assess your needs and recommend the right services for your personal or business goals.', null, null),
('faqs', 2, 'Do you offer services for startups and small businesses?', null, null, null, 'Absolutely. We specialize in helping startups establish strong financial foundations, from business registration support to bookkeeping, tax compliance, and financial planning.', null, null),
('faqs', 3, 'How often will I receive financial reports?', null, null, null, 'Report frequency is tailored to your needs — monthly, quarterly, or annually. We also provide real-time updates via our client portal for premium clients.', null, null),
('faqs', 4, 'Are your consultants certified professionals?', null, null, null, 'Yes. All our consultants are certified accountants (CPA/ACCA), registered auditors, and licensed tax professionals with years of relevant industry experience.', null, null),

-- CTA Banners
('cta_banners', 0, 'Ready to Take Control of Your Finances?', null, null, null, 'Book a free, no-obligation consultation with our expert team today and take the first step toward financial clarity.', null, null);

-- Insert About Content
INSERT INTO public.about_content (content_type, item_index, heading, subtitle, text, paragraphs, mission, vision) VALUES
-- Hero
('hero', 0, null, 'A team of certified financial professionals dedicated to empowering clients with clarity, strategy, and results-driven advice.', null, null, null, null),

-- Story
('story', 0, 'Building Financial Confidence Since 2009', null, null, '["K & T Financial Consultancy was founded with a singular purpose: to make world-class financial expertise accessible to individuals and businesses of all sizes. What started as a boutique accounting firm has grown into a full-service financial consultancy trusted by over 500 clients.", "Our team of certified accountants, auditors, and business advisors brings decades of collective experience across industries ranging from retail and technology to healthcare and real estate. We pride ourselves on understanding each client's unique context and crafting solutions that deliver measurable outcomes.", "Today, K & T Financial stands as a beacon of trust, professionalism, and innovation in the financial services industry. We are more than consultants — we are strategic partners in your financial journey."]', null, null),

-- Mission & Vision
('mission_vision', 0, null, null, null, null, 'To provide exceptional financial services that empower clients to make informed decisions, achieve their goals, and build long-term wealth and business resilience.', 'To be the most trusted financial consultancy in the region — recognized for our integrity, innovation, and the transformational impact we create for every client we serve.'),

-- Team Members
('team_member', 0, null, 'Managing Director & CPA', null, '15+ years in financial consulting, specializing in corporate audit and tax strategy.', null, null, null, 'Katherine Johnson'),
('team_member', 1, null, 'Head of Tax & Compliance', null, 'Expert in international tax law and regulatory compliance for SMEs and corporations.', null, null, null, 'Thomas Osei'),
('team_member', 2, null, 'Senior Financial Advisor', null, 'Specializes in investment advisory, financial planning, and business development strategy.', null, null, null, 'Amara Nwosu'),
('team_member', 3, null, 'Audit & Assurance Manager', null, 'Brings rigorous audit methodology and deep industry insight to every engagement.', null, null, null, 'James Whitfield'),

-- Milestones
('milestone', 0, null, null, 'K & T Financial Consultancy founded with a vision to democratize quality financial advice.', null, null, null, '2009'),
('milestone', 1, null, null, 'Expanded services to include full audit and financial reporting division.', null, null, null, '2012'),
('milestone', 2, null, null, 'Reached milestone of 200 active clients across 10 industries.', null, null, null, '2015'),
('milestone', 3, null, null, 'Launched payroll management and business registration support services.', null, null, null, '2018'),
('milestone', 4, null, null, 'Awarded "Best Financial Consultancy" by the Regional Business Excellence Awards.', null, null, null, '2021'),
('milestone', 5, null, null, 'Surpassed 500 clients and expanded team to 50+ certified professionals.', null, null, null, '2024');

-- Insert Services Content
INSERT INTO public.services_content (service_id, title, tagline, description, features, image) VALUES
('accounting', 'Accounting & Bookkeeping', 'Accurate Books. Clear Insights.', 'Reliable accounting and bookkeeping services to keep your finances organized, compliant, and decision-ready. We manage everything from daily transactions to monthly reconciliations and financial summaries.', '["Monthly bank reconciliations", "Accounts payable & receivable management", "General ledger maintenance", "Financial statements preparation", "Cloud accounting software setup (QuickBooks, Xero)", "Cash flow management"]', 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&auto=format&fit=crop&q=80'),
('audit', 'Audit & Financial Reporting', 'Independent. Accurate. Trustworthy.', 'Our audit services provide independent assurance on your financial statements, giving stakeholders confidence in your financial position. We conduct statutory audits, internal audits, and special-purpose audits.', '["Statutory & external audits", "Internal audit & control reviews", "Financial statement preparation (IFRS/GAAP)", "Risk-based audit methodology", "Due diligence audits", "Audit committee support"]', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80'),
('tax', 'Tax Filing & Compliance', 'Minimize Liability. Maximize Compliance.', 'Expert tax preparation and strategic planning to ensure you pay only what's required, file on time, and stay on the right side of tax authorities. We handle all tax types for individuals and businesses.', '["Individual & corporate tax returns", "VAT/GST registration & filing", "Tax planning & optimization", "Tax dispute resolution", "Payroll tax management", "International tax advisory"]', 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=600&auto=format&fit=crop&q=80'),
('advisory', 'Business Advisory & Consultancy', 'Strategic Guidance for Sustainable Growth.', 'We partner with business owners and executives to navigate challenges, identify opportunities, and build strategies that drive sustainable growth. Our advisors bring fresh perspectives backed by data.', '["Business strategy development", "Financial restructuring & turnaround", "Mergers, acquisitions & due diligence", "Market entry & feasibility analysis", "KPI & performance management", "Investor presentations & pitch decks"]', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80'),
('planning', 'Financial Planning & Budgeting', 'Plan Today. Secure Tomorrow.', 'Comprehensive financial planning for individuals and organizations. We help you set financial goals, build realistic budgets, and create actionable roadmaps for long-term financial security and growth.', '["Personal financial planning", "Business budgeting & forecasting", "Investment & portfolio planning", "Retirement & succession planning", "Debt management strategies", "Cash flow projections"]', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80'),
('payroll', 'Payroll Management', 'On Time. Every Time.', 'End-to-end payroll management services that ensure your employees are paid accurately and on time, every cycle. We handle all payroll complexities including statutory deductions and compliance reporting.', '["Monthly payroll processing", "Statutory deductions (tax, NI/SS)", "Payslip generation & distribution", "Payroll compliance & reporting", "Year-end reconciliations", "Integration with accounting software"]', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80'),
('registration', 'Business Registration Support', 'Launch Your Business the Right Way.', 'Starting a business is exciting — but the paperwork doesn't have to be stressful. We guide entrepreneurs through every step of the business registration process, ensuring full legal and regulatory compliance from day one.', '["Company incorporation & registration", "Business name & trademark registration", "Tax identification & VAT registration", "Regulatory licensing assistance", "Corporate governance setup", "Bank account opening support"]', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&auto=format&fit=crop&q=80');

-- Insert Blog Categories
INSERT INTO public.blog_categories (name, slug, description) VALUES
('Tax', 'tax', 'Tax-related articles and updates'),
('Accounting', 'accounting', 'Accounting best practices and guides'),
('Business', 'business', 'Business strategy and management tips');

-- Insert Blog Posts
INSERT INTO public.blog_posts (slug, title, excerpt, image, featured, published, published_at, category_id) VALUES
('top-tax-tips-small-business', 'Top 10 Tax Tips Every Small Business Owner Should Know in 2024', 'Maximize your deductions, minimize your liability, and stay fully compliant with these essential tax strategies designed specifically for small business owners.', 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=600&auto=format&fit=crop&q=80', true, true, now(), (SELECT id FROM public.blog_categories WHERE slug = 'tax')),
('understanding-financial-statements', 'Understanding Financial Statements: A Beginner''s Guide for Business Owners', 'Financial statements can be intimidating. This guide breaks down the balance sheet, income statement, and cash flow statement into simple, actionable insights.', 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&auto=format&fit=crop&q=80', false, true, now(), (SELECT id FROM public.blog_categories WHERE slug = 'accounting')),
('scaling-your-startup-financially', 'How to Scale Your Startup Without Running Out of Cash', 'Cash flow is the lifeblood of any startup. Learn the financial strategies that sustainable startups use to scale responsibly while maintaining liquidity.', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80', false, true, now(), (SELECT id FROM public.blog_categories WHERE slug = 'business'));

-- Insert Business Contact Information
INSERT INTO public.business_contact (content_type, item_index, title, phone, email, address, google_maps_url, additional_info) VALUES
('contact_info', 0, 'Contact Information', '+975 17836510', 'ktfinancialconsultancy26@gmail.com', '123 Financial District, Business Avenue, Suite 500, City, State 10001', 'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d283.849568359296!2d89.6386228280219!3d27.51130468617822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1staba%20kd%20shops!5e0!3m2!1sen!2sbt!4v1774332802855!5m2!1sen!2sbt', null),
('office_hours', 0, 'Office Hours', null, null, null, null, '{"monday": "9:00 AM - 5:00 PM", "tuesday": "9:00 AM - 5:00 PM", "wednesday": "9:00 AM - 5:00 PM", "thursday": "9:00 AM - 5:00 PM", "friday": "9:00 AM - 5:00 PM", "saturday": "9:00 AM - 1:00 PM", "sunday": "Closed"}');

SELECT 'Initial data seeded successfully!' as status;
