
export interface Seo {
  title: string;
  description: string;
  keywords: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
}

export interface GeneralSettings {
  siteName: string;
  slogan: string;
  logoUrl: string;
  email: string;
  phone1: string;
  phone2: string;
  address: string;
  socialLinks: SocialLinks;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
}

export interface HomePageContent {
  heroSlides: { id: string; imageUrl: string; altText: string }[];
  heroTitle: string;
  heroSubtitle: string;
  ctaButtonText: string;
  testimonialSectionTitle: string;
  testimonials: { id: string; quote: string; author: string }[];
}

export interface AboutPageContent {
  title: string;
  imageUrl: string;
  missionStatement: string;
  studioDescription: string;
  teamSectionTitle: string;
  teamMembers: { id: string; name: string; role: string; imageUrl: string; bio: string }[];
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  alt: string;
}

export interface PortfolioPageContent {
  title: string;
  categories: string[];
  images: GalleryImage[];
}

export interface ServicePackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface ServicesPageContent {
  title: string;
  introText: string;
  packages: ServicePackage[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  content: string;
  imageUrl: string;
}

export interface BlogPageContent {
  title: string;
  posts: BlogPost[];
}

export interface ContactPageContent {
  title: string;
  introText: string;
  mapEmbedUrl: string;
}

export interface SiteData {
  seo: Seo;
  theme: Theme;
  general: GeneralSettings;
  home: HomePageContent;
  about: AboutPageContent;
  portfolio: PortfolioPageContent;
  services: ServicesPageContent;
  blog: BlogPageContent;
  contact: ContactPageContent;
}
