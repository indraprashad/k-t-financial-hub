// ─── Central content store backed by database ────────────────────────────────
// All page content comes from database. Admin dashboard reads/writes via these helpers.

import { 
  fetchAllContent, 
  fetchHomeContent, 
  fetchAboutContent, 
  fetchServicesContent, 
  fetchBlogPosts, 
  fetchBlogCategories, 
  fetchBusinessContact, 
  fetchConsultationContent, 
  saveHomeContent, 
  saveAboutContent, 
  saveServiceContent,
  HomeContent, 
  AboutContent, 
  ServiceItem, 
  BlogPost, 
  BlogCategory, 
  ContactContent, 
  ConsultationContent, 
  SiteContent 
} from './databaseStore';

// Re-export types for components that import from contentStore
export type { 
  HomeContent, 
  AboutContent, 
  ServiceItem, 
  BlogPost, 
  BlogCategory, 
  ContactContent, 
  ConsultationContent, 
  SiteContent 
};

// ─── Content Getters ───────────────────────────────────────────────────────────

let cachedContent: SiteContent | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getContent(): Promise<SiteContent> {
  const now = Date.now();
  
  // Return cached content if still valid
  if (cachedContent && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedContent;
  }

  try {
    // Fetch fresh content from database
    cachedContent = await fetchAllContent();
    lastFetchTime = now;
    return cachedContent;
  } catch (error) {
    console.error('Error fetching content:', error);
    
    // Return cached content even if expired, or throw if no cache
    if (cachedContent) {
      return cachedContent;
    }
    
    throw new Error('Failed to fetch content and no cache available');
  }
}

export async function getHomeContent(): Promise<HomeContent> {
  const content = await getContent();
  return content.home;
}

export async function getAboutContent(): Promise<AboutContent> {
  const content = await getContent();
  return content.about;
}

export async function getServicesContent(): Promise<ServiceItem[]> {
  const content = await getContent();
  return content.services;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const content = await getContent();
  return content.blog;
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const content = await getContent();
  return content.categories;
}

export async function getContactContent(): Promise<ContactContent> {
  const content = await getContent();
  return content.contact;
}

export async function getConsultationContent(): Promise<ConsultationContent> {
  const content = await getContent();
  return content.consultation;
}

// ─── Content Setters (Admin Functions) ───────────────────────────────────────

export async function saveContent(newContent: Partial<SiteContent>): Promise<boolean> {
  try {
    const success = await Promise.all([
      newContent.home && saveHomeContent(newContent.home),
      newContent.about && saveAboutContent(newContent.about),
      // Services, blog, etc. would need their own save functions
    ]);

    // Invalidate cache after saving
    cachedContent = null;
    
    return success.every(Boolean);
  } catch (error) {
    console.error('Error saving content:', error);
    return false;
  }
}

export async function saveHomeContentData(content: Partial<HomeContent>): Promise<boolean> {
  try {
    const success = await saveHomeContent(content);
    
    // Invalidate cache after saving
    cachedContent = null;
    
    return success;
  } catch (error) {
    console.error('Error saving home content:', error);
    return false;
  }
}

export async function saveAboutContentData(content: Partial<AboutContent>): Promise<boolean> {
  try {
    const success = await saveAboutContent(content);
    
    // Invalidate cache after saving
    cachedContent = null;
    
    return success;
  } catch (error) {
    console.error('Error saving about content:', error);
    return false;
  }
}

export async function saveServiceItem(service: ServiceItem): Promise<boolean> {
  try {
    const success = await saveServiceContent(service);
    
    // Invalidate cache after saving
    cachedContent = null;
    
    return success;
  } catch (error) {
    console.error('Error saving service:', error);
    return false;
  }
}

// ─── Cache Management ─────────────────────────────────────────────────────────

export function invalidateCache(): void {
  cachedContent = null;
  lastFetchTime = 0;
}

export function refreshContent(): Promise<SiteContent> {
  invalidateCache();
  return getContent();
}

// ─── Admin Authentication Helpers ─────────────────────────────────────────--

import { signIn, signOut, getCurrentUser, getAdminProfile } from './databaseStore';

export { signIn, signOut, getCurrentUser, getAdminProfile };

export async function adminLogout(): Promise<void> {
  try {
    await signOut();
    invalidateCache();
  } catch (error) {
    console.error('Error during admin logout:', error);
    throw error;
  }
}

export async function getAdminName(): Promise<string | null> {
  try {
    const profile = await getAdminProfile();
    return profile?.name || null;
  } catch (error) {
    console.error('Error getting admin name:', error);
    return null;
  }
}

export async function getAdminProfileData(): Promise<any | null> {
  try {
    const profile = await getAdminProfile();
    return profile || null;
  } catch (error) {
    console.error('Error getting admin profile data:', error);
    return null;
  }
}
