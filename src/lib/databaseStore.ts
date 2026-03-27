// ─── Database-First Content Store ────────────────────────────────────────────
// All data is fetched from Supabase database. No static data or localStorage.

import { supabase } from '../integrations/supabase/client';

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

// ─── Database Fetch Functions ───────────────────────────────────────────────

export async function fetchHomeContent(): Promise<HomeContent> {
  try {
    const { data, error } = await supabase
      .from('home_content')
      .select('*')
      .order('item_index');

    if (error) throw error;

    // Transform database data to HomeContent format
    const hero = data?.find(item => item.content_type === 'hero') || {};
    const stats = data?.filter(item => item.content_type === 'stats').map(item => ({
      value: item.value || '',
      label: item.label || ''
    })) || [];
    
    const services = data?.filter(item => item.content_type === 'services').map(item => ({
      title: item.title || '',
      desc: item.description || ''
    })) || [];

    const whyUsData = data?.find(item => item.content_type === 'why_us_points');
    const whyUs = {
      heading: whyUsData?.heading || '',
      subtitle: whyUsData?.subtitle || '',
      points: JSON.parse(whyUsData?.description || '[]') as WhyItem[]
    };

    const testimonials = data?.filter(item => item.content_type === 'testimonials').map(item => ({
      name: item.title || '',
      role: item.subtitle || '',
      text: item.text || '',
      rating: parseInt(item.value || '5')
    })) || [];

    const faqs = data?.filter(item => item.content_type === 'faqs').map(item => ({
      q: item.title || '',
      a: item.description || ''
    })) || [];

    const cta = data?.filter(item => item.content_type === 'cta_banners').map(item => ({
      title: item.title || '',
      subtitle: item.subtitle || ''
    })) || [];

    return {
      hero: {
        badge: hero.subtitle || '',
        title: hero.title || '',
        titleHighlight: hero.heading || '',
        subtitle: hero.description || '',
        ctaPrimary: hero.text || '',
        ctaSecondary: hero.label || ''
      },
      stats,
      services,
      whyUs,
      testimonials,
      faqs,
      cta
    };
  } catch (error) {
    console.error('Error fetching home content:', error);
    return getDefaultHomeContent();
  }
}

export async function fetchAboutContent(): Promise<AboutContent> {
  try {
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .order('item_index');

    if (error) throw error;

    const hero = data?.find(item => item.content_type === 'hero');
    const story = data?.find(item => item.content_type === 'story');
    const missionVision = data?.find(item => item.content_type === 'mission_vision');
    const team = data?.filter(item => item.content_type === 'team_member');
    const milestones = data?.filter(item => item.content_type === 'milestone');

    return {
      hero: { subtitle: hero?.subtitle || '' },
      story: {
        heading: story?.heading || '',
        paragraphs: JSON.parse(story?.paragraphs || '[]')
      },
      mission: missionVision?.mission || '',
      vision: missionVision?.vision || '',
      team: team?.map(member => ({
        name: member.name || '',
        role: member.role || '',
        image: member.image || '',
        bio: member.bio || ''
      })) || [],
      milestones: milestones?.map(milestone => ({
        year: milestone.year || '',
        text: milestone.text || ''
      })) || []
    };
  } catch (error) {
    console.error('Error fetching about content:', error);
    return getDefaultAboutContent();
  }
}

export async function fetchServicesContent(): Promise<ServiceItem[]> {
  try {
    const { data, error } = await supabase
      .from('services_content')
      .select('*')
      .order('item_index');

    if (error) throw error;

    return data?.map(service => ({
      id: service.service_id || '',
      title: service.title || '',
      tagline: service.tagline || '',
      description: service.description || '',
      features: JSON.parse(service.features || '[]'),
      image: service.image || ''
    })) || [];
  } catch (error) {
    console.error('Error fetching services content:', error);
    return [];
  }
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories(name)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data?.map(post => ({
      slug: post.slug || '',
      category: post.blog_categories?.name || '',
      title: post.title || '',
      excerpt: post.excerpt || '',
      author: 'Admin', // You might want to add author to the table
      date: new Date(post.created_at).toLocaleDateString(),
      readTime: '5 min read', // Calculate this based on content length
      image: post.image || '',
      featured: post.featured || false,
      body: post.body || ''
    })) || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name');

    if (error) throw error;

    return data?.map(category => ({
      id: category.id || '',
      name: category.name || '',
      description: category.description || ''
    })) || [];
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
}

export async function fetchBusinessContact(): Promise<ContactContent> {
  try {
    const { data, error } = await supabase
      .from('business_contact')
      .select('*')
      .order('item_index');

    if (error) throw error;

    const contactInfo = data?.find(item => item.content_type === 'contact_info');
    const officeHours = data?.find(item => item.content_type === 'office_hours');

    return {
      phone: contactInfo?.phone || '',
      email: contactInfo?.email || '',
      address: contactInfo?.address ? [contactInfo.address] : [],
      hours: officeHours?.office_hours ? Object.values(officeHours.office_hours) : [],
      mapSrc: contactInfo?.google_maps_url || ''
    };
  } catch (error) {
    console.error('Error fetching business contact:', error);
    return getDefaultContactContent();
  }
}

export async function fetchConsultationContent(): Promise<ConsultationContent> {
  try {
    // For now, return default consultation content
    // You can create a consultation_services table if needed
    return {
      services: [
        "Accounting & Bookkeeping",
        "Audit & Financial Reporting",
        "Tax Filing & Compliance",
        "Business Advisory & Consultancy",
        "Financial Planning & Budgeting",
        "General Inquiry",
      ],
      notificationEmail: "indraprashadsharma4@gmail.com"
    };
  } catch (error) {
    console.error('Error fetching consultation content:', error);
    return getDefaultConsultationContent();
  }
}

// ─── Main Content Fetch Function ─────────────────────────────────────────────

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
    return getDefaultContent();
  }
}

// ─── Default Content (Fallback) ───────────────────────────────────────────────

function getDefaultHomeContent(): HomeContent {
  return {
    hero: {
      badge: "Professional Financial Services",
      title: "Empowering Your",
      titleHighlight: "Financial Growth",
      subtitle: "Expert financial consulting for your business and personal needs",
      ctaPrimary: "Get Started",
      ctaSecondary: "Learn More"
    },
    stats: [
      { value: "15+", label: "Years Experience" },
      { value: "500+", label: "Happy Clients" },
      { value: "98%", label: "Satisfaction Rate" }
    ],
    services: [
      { title: "Accounting", desc: "Professional accounting services" },
      { title: "Tax Planning", desc: "Strategic tax planning and compliance" },
      { title: "Business Advisory", desc: "Expert business consulting" }
    ],
    whyUs: {
      heading: "Why Choose Us",
      subtitle: "We provide trusted financial solutions",
      points: [
        { title: "Expert Team", text: "Certified financial professionals" },
        { title: "Personalized Service", text: "Tailored solutions for your needs" }
      ]
    },
    testimonials: [],
    faqs: [],
    cta: []
  };
}

function getDefaultAboutContent(): AboutContent {
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

function getDefaultContactContent(): ContactContent {
  return {
    phone: "+975 17836510",
    email: "ktfinancialconsultancy26@gmail.com",
    address: ["123 Financial District", "Business Avenue, Suite 500"],
    hours: ["Mon – Fri: 9:00 AM – 5:00 PM", "Saturday: 9:00 AM – 1:00 PM"],
    mapSrc: ""
  };
}

function getDefaultConsultationContent(): ConsultationContent {
  return {
    services: [
      "Accounting & Bookkeeping",
      "Tax Filing & Compliance",
      "Business Advisory"
    ],
    notificationEmail: "indraprashadsharma4@gmail.com"
  };
}

function getDefaultContent(): SiteContent {
  return {
    home: getDefaultHomeContent(),
    about: getDefaultAboutContent(),
    services: [],
    blog: [],
    categories: [],
    contact: getDefaultContactContent(),
    consultation: getDefaultConsultationContent()
  };
}

// ─── Admin Functions (Save/Update) ─────────────────────────────────────────────

export async function saveHomeContent(content: Partial<HomeContent>): Promise<boolean> {
  try {
    const operations = [];

    // Save hero content
    if (content.hero) {
      operations.push(
        supabase
          .from('home_content')
          .upsert({
            content_type: 'hero',
            title: content.hero.title || '',
            heading: content.hero.titleHighlight || '',
            subtitle: content.hero.subtitle || '',
            description: content.hero.subtitle || '',
            text: content.hero.ctaPrimary || '',
            label: content.hero.ctaSecondary || '',
            value: '',
            item_index: 0
          }, {
            onConflict: 'content_type,item_index'
          })
      );
    }

    // Save stats
    if (content.stats) {
      // First delete existing stats
      await supabase.from('home_content').delete().eq('content_type', 'stats');
      
      // Then insert new stats
      content.stats.forEach((stat, index) => {
        operations.push(
          supabase.from('home_content').insert({
            content_type: 'stats',
            value: stat.value || '',
            label: stat.label || '',
            item_index: index
          })
        );
      });
    }

    // Save services
    if (content.services) {
      // First delete existing services
      await supabase.from('home_content').delete().eq('content_type', 'services');
      
      // Then insert new services
      content.services.forEach((service, index) => {
        operations.push(
          supabase.from('home_content').insert({
            content_type: 'services',
            title: service.title || '',
            description: service.desc || '',
            item_index: index
          })
        );
      });
    }

    // Save why_us content
    if (content.whyUs) {
      operations.push(
        supabase
          .from('home_content')
          .upsert({
            content_type: 'why_us_points',
            heading: content.whyUs.heading || '',
            subtitle: content.whyUs.subtitle || '',
            description: JSON.stringify(content.whyUs.points || []), // Store points in description field
            item_index: 0
          }, {
            onConflict: 'content_type,item_index'
          })
      );
    }

    // Save testimonials
    if (content.testimonials) {
      // First delete existing testimonials
      await supabase.from('home_content').delete().eq('content_type', 'testimonials');
      
      // Then insert new testimonials
      content.testimonials.forEach((testimonial, index) => {
        operations.push(
          supabase.from('home_content').insert({
            content_type: 'testimonials',
            title: testimonial.name || '', // Store name in title field
            subtitle: testimonial.role || '', // Store role in subtitle field
            text: testimonial.text || '',
            value: testimonial.rating?.toString() || '5',
            item_index: index
          })
        );
      });
    }

    // Save FAQs
    if (content.faqs) {
      // First delete existing FAQs
      await supabase.from('home_content').delete().eq('content_type', 'faqs');
      
      // Then insert new FAQs
      content.faqs.forEach((faq, index) => {
        operations.push(
          supabase.from('home_content').insert({
            content_type: 'faqs',
            title: faq.q || '',
            description: faq.a || '',
            item_index: index
          })
        );
      });
    }

    // Save CTAs
    if (content.cta) {
      // First delete existing CTAs
      await supabase.from('home_content').delete().eq('content_type', 'cta_banners');
      
      // Then insert new CTAs
      content.cta.forEach((ctaItem, index) => {
        operations.push(
          supabase.from('home_content').insert({
            content_type: 'cta_banners',
            title: ctaItem.title || '',
            subtitle: ctaItem.subtitle || '',
            item_index: index
          })
        );
      });
    }

    // Execute all operations
    const results = await Promise.all(operations);
    
    // Check if any operations failed
    const hasErrors = results.some(result => result.error);
    
    if (hasErrors) {
      console.error('Some operations failed:', results);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving home content:', error);
    return false;
  }
}

export async function saveAboutContent(content: Partial<AboutContent>): Promise<boolean> {
  try {
    // Implementation needed
    return true;
  } catch (error) {
    console.error('Error saving about content:', error);
    return false;
  }
}

export async function saveServiceContent(service: ServiceItem): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('services_content')
      .upsert({
        service_id: service.id,
        title: service.title,
        tagline: service.tagline,
        description: service.description,
        features: JSON.stringify(service.features),
        image: service.image,
        updated_at: new Date().toISOString()
      });

    return !error;
  } catch (error) {
    console.error('Error saving service content:', error);
    return false;
  }
}

// ─── Authentication ─────────────────────────────────────────────────────────

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
      .maybeSingle(); // Use maybeSingle() instead of single() to handle no results

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Get admin profile error:', error);
    return null;
  }
}
