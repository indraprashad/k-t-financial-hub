// ─── Temporary Store - Will be replaced with databaseStore.ts after database setup ────────────────────────────────────────────
// This is a temporary bridge to remove static data while we set up the database

import { supabase } from '@/integrations/supabase/client';

export interface HeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface StatItem { value: string; label: string }
export interface ServiceHighlight { title: string; desc: string }
export interface WhyItem { title: string; text: string }
export interface Testimonial { name: string; role: string; text: string; rating: number }
export interface FaqItem { q: string; a: string }
export interface CTABanner { title: string; subtitle: string }
export interface CTAItem { title: string; subtitle: string }

export interface HomeContent {
  hero: HeroContent;
  stats: StatItem[];
  services: ServiceHighlight[];
  whyUs: { heading: string; subtitle: string; points: WhyItem[] };
  testimonials: Testimonial[];
  faqs: FaqItem[];
  cta: CTAItem[];
}

export interface AboutContent {
  hero: { subtitle: string };
  story: { heading: string; paragraphs: string[] };
  mission: string;
  vision: string;
  team: { name: string; role: string; image: string; bio: string }[];
  milestones: { year: string; text: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  body?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  description?: string;
}

export interface ContactContent {
  phone: string;
  email: string;
  address: string[];
  hours: string[];
  mapSrc: string;
}

export interface ConsultationContent {
  services: string[];
  notificationEmail: string;
}

export interface SiteContent {
  home: HomeContent;
  about: AboutContent;
  services: ServiceItem[];
  blog: BlogPost[];
  categories: BlogCategory[];
  contact: ContactContent;
  consultation: ConsultationContent;
}

// ─── Database Fetch Functions (Simplified for now) ───────────────────────────────────────

export async function fetchHomeContent(): Promise<HomeContent> {
  try {
    const { data, error } = await supabase
      .from('home_content')
      .select('*')
      .order('item_index');

    if (error) {
      console.log('Database not ready, using fallback');
      return getFallbackHomeContent();
    }

    // Transform data - this will be implemented properly after database setup
    return getFallbackHomeContent();
  } catch (error) {
    console.log('Error fetching home content, using fallback');
    return getFallbackHomeContent();
  }
}

export async function fetchAboutContent(): Promise<AboutContent> {
  try {
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .order('item_index');

    if (error) {
      console.log('Database not ready, using fallback');
      return getFallbackAboutContent();
    }

    return getFallbackAboutContent();
  } catch (error) {
    console.log('Error fetching about content, using fallback');
    return getFallbackAboutContent();
  }
}

export async function fetchServicesContent(): Promise<ServiceItem[]> {
  try {
    const { data, error } = await supabase
      .from('services_content')
      .select('*')
      .order('item_index');

    if (error) {
      console.log('Database not ready, using fallback');
      return getFallbackServices();
    }

    return getFallbackServices();
  } catch (error) {
    console.log('Error fetching services content, using fallback');
    return getFallbackServices();
  }
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Database not ready, using fallback');
      return getFallbackBlogPosts();
    }

    return getFallbackBlogPosts();
  } catch (error) {
    console.log('Error fetching blog posts, using fallback');
    return getFallbackBlogPosts();
  }
}

export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name');

    if (error) {
      console.log('Database not ready, using fallback');
      return getFallbackCategories();
    }

    return getFallbackCategories();
  } catch (error) {
    console.log('Error fetching blog categories, using fallback');
    return getFallbackCategories();
  }
}

export async function fetchBusinessContact(): Promise<ContactContent> {
  try {
    const { data, error } = await supabase
      .from('business_contact')
      .select('*')
      .order('item_index');

    if (error) {
      console.log('Database not ready, using fallback');
      return getFallbackContactContent();
    }

    return getFallbackContactContent();
  } catch (error) {
    console.log('Error fetching business contact, using fallback');
    return getFallbackContactContent();
  }
}

export async function fetchConsultationContent(): Promise<ConsultationContent> {
  return getFallbackConsultationContent();
}

export async function fetchAllContent(): Promise<SiteContent> {
  try {
    const [
      homeContent,
      aboutContent,
      servicesContent,
      blogPosts,
      blogCategories,
      businessContact,
      consultationContent
    ] = await Promise.all([
      fetchHomeContent(),
      fetchAboutContent(),
      fetchServicesContent(),
      fetchBlogPosts(),
      fetchBlogCategories(),
      fetchBusinessContact(),
      fetchConsultationContent()
    ]);

    return {
      home: homeContent,
      about: aboutContent,
      services: servicesContent,
      blog: blogPosts,
      categories: blogCategories,
      contact: businessContact,
      consultation: consultationContent
    };
  } catch (error) {
    console.error('Error fetching all content:', error);
    return getFallbackContent();
  }
}

// ─── Fallback Content (Minimal - will be replaced by database data) ─────────────────────────

function getFallbackHomeContent(): HomeContent {
  return {
    hero: {
      badge: "Professional Financial Services",
      title: "Empowering Your",
      titleHighlight: "Financial Growth",
      subtitle: "Expert financial consulting for your business and personal needs",
      ctaPrimary: "Get Started",
      ctaSecondary: "Learn More"
    },
    stats: [],
    services: [],
    whyUs: {
      heading: "Why Choose Us",
      subtitle: "We provide trusted financial solutions",
      points: []
    },
    testimonials: [],
    faqs: [],
    cta: []
  };
}

function getFallbackAboutContent(): AboutContent {
  return {
    hero: { subtitle: "Your trusted financial partner" },
    story: {
      heading: "Our Story",
      paragraphs: ["We are dedicated to providing exceptional financial services."]
    },
    mission: "To empower clients with expert financial guidance",
    vision: "To be the most trusted financial consultancy",
    team: [],
    milestones: []
  };
}

function getFallbackServices(): ServiceItem[] {
  return [];
}

function getFallbackBlogPosts(): BlogPost[] {
  return [];
}

function getFallbackCategories(): BlogCategory[] {
  return [];
}

function getFallbackContactContent(): ContactContent {
  return {
    phone: "+975 17836510",
    email: "ktfinancialconsultancy26@gmail.com",
    address: ["123 Financial District", "Business Avenue, Suite 500"],
    hours: ["Mon – Fri: 9:00 AM – 5:00 PM"],
    mapSrc: ""
  };
}

function getFallbackConsultationContent(): ConsultationContent {
  return {
    services: [
      "Accounting & Bookkeeping",
      "Tax Filing & Compliance",
      "Business Advisory"
    ],
    notificationEmail: "indraprashadsharma4@gmail.com"
  };
}

function getFallbackContent(): SiteContent {
  return {
    home: getFallbackHomeContent(),
    about: getFallbackAboutContent(),
    services: getFallbackServices(),
    blog: getFallbackBlogPosts(),
    categories: getFallbackCategories(),
    contact: getFallbackContactContent(),
    consultation: getFallbackConsultationContent()
  };
}

// ─── Authentication Functions ─────────────────────────────────────────────────────

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function getAdminProfile() {
  try {
    const user = await getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.log('Admin profile not found, returning user info');
      return {
        id: user.id,
        user_id: user.id,
        name: 'Indra Adhikari',
        email: user.email || 'td@dcpl.bt',
        role: 'admin',
        preferences: {}
      };
    }
    
    return data;
  } catch (error) {
    console.error('Get admin profile error:', error);
    return null;
  }
}

export function getAdminName(): string {
  return 'Indra Adhikari';
}

// ─── Legacy Functions (for compatibility) ───────────────────────────────────────────

export function getContent(): SiteContent {
  // This will be replaced with database fetch
  return getFallbackContent();
}

export function saveContent(content: SiteContent): boolean {
  // This will be replaced with database save
  console.log('Save content called - will be implemented with database');
  return true;
}

export function resetContent(): void {
  // This will be replaced with database reset
  console.log('Reset content called - will be implemented with database');
}
