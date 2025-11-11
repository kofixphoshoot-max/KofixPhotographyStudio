
import { SiteData } from './types';

export const INITIAL_SITE_DATA: SiteData = {
  seo: {
    title: 'Kofix Photography Studio',
    description: 'Kofix Photography Studio - Where We Bring Every Memory to Life. Professional photography and media services in Accra, Ghana.',
    keywords: 'photography, accra, ghana, weddings, portraits, events, fashion, video',
  },
  theme: {
    primaryColor: '#c0a080',
    secondaryColor: '#333333',
    backgroundColor: '#ffffff',
    textColor: '#4a4a4a',
    headingFont: 'Playfair Display',
    bodyFont: 'Montserrat',
  },
  general: {
    siteName: 'Kofix Photography',
    slogan: 'Where We Bring Every Memory to Life.',
    logoUrl: '',
    email: 'Kofixphoshoot@gmail.com',
    phone1: '0534349054',
    phone2: '0501184458',
    address: 'Accra, Ghana',
    socialLinks: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      tiktok: 'https://tiktok.com',
      youtube: 'https://youtube.com',
    },
  },
  home: {
    heroSlides: [
      { id: 'slide1', imageUrl: 'https://picsum.photos/1920/1080?image=1043', altText: 'Wedding photography' },
      { id: 'slide2', imageUrl: 'https://picsum.photos/1920/1080?image=1044', altText: 'Portrait photography' },
      { id: 'slide3', imageUrl: 'https://picsum.photos/1920/1080?image=1045', altText: 'Event photography' },
    ],
    heroTitle: 'Capturing Moments, Creating Memories',
    heroSubtitle: 'Professional photography services tailored for you.',
    ctaButtonText: 'Book a Photoshoot',
    testimonialSectionTitle: 'What Our Clients Say',
    testimonials: [
      { id: 't1', quote: 'The photos are absolutely stunning! Kofix captured our wedding day perfectly.', author: 'Ama & Kofi' },
      { id: 't2', quote: 'Incredibly professional and creative. The results exceeded our expectations.', author: 'Yaw B.' },
    ],
  },
  about: {
    title: 'About Kofix Studio',
    imageUrl: 'https://picsum.photos/800/600?image=1050',
    missionStatement: 'Our mission is to beautifully preserve life\'s most precious moments with creativity, passion, and professionalism.',
    studioDescription: 'Founded in Accra, Kofix Photography Studio is a collective of passionate photographers and videographers dedicated to the art of storytelling. We believe that every photo has a story to tell, and we strive to capture the authentic emotion and beauty in every frame. From intimate portraits to grand events, we bring a unique artistic vision and technical excellence to every project.',
    teamSectionTitle: 'Meet the Team',
    teamMembers: [
      { id: 'tm1', name: 'Kofi', role: 'Lead Photographer', imageUrl: 'https://picsum.photos/400/400?image=1005', bio: 'With over 10 years of experience, Kofi specializes in wedding and portrait photography.' },
      { id: 'tm2', name: 'Felix', role: 'Videographer & Drone Pilot', imageUrl: 'https://picsum.photos/400/400?image=1011', bio: 'Felix brings stories to life through cinematic video and breathtaking aerial shots.' },
    ],
  },
  portfolio: {
    title: 'Our Work',
    categories: ['Portraits', 'Weddings', 'Events', 'Fashion', 'Videos', 'Drone Shots'],
    images: [
      { id: 'p1', url: 'https://picsum.photos/600/800?image=201', title: 'Serene Portrait', category: 'Portraits', alt: 'Woman in a field' },
      { id: 'p2', url: 'https://picsum.photos/800/600?image=302', title: 'Joyful Union', category: 'Weddings', alt: 'Bride and groom smiling' },
      { id: 'p3', url: 'https://picsum.photos/800/600?image=403', title: 'Corporate Gala', category: 'Events', alt: 'People at an event' },
      { id: 'p4', url: 'https://picsum.photos/600/800?image=504', title: 'Urban Style', category: 'Fashion', alt: 'Fashion model in a city' },
      { id: 'p5', url: 'https://picsum.photos/600/800?image=202', title: 'Golden Hour', category: 'Portraits', alt: 'Man posing at sunset' },
      { id: 'p6', url: 'https://picsum.photos/800/600?image=305', title: 'The Vows', category: 'Weddings', alt: 'Wedding ceremony' },
    ],
  },
  services: {
    title: 'Our Services',
    introText: 'We offer a range of packages to suit your needs. Contact us for a custom quote.',
    packages: [
      { id: 's1', name: 'Portrait Session', price: 'Starting at GHS 500', description: 'Ideal for individuals, couples, and families.', features: ['1-hour session', '20 high-res edited photos', 'Online gallery'] },
      { id: 's2', name: 'Wedding Photography', price: 'Starting at GHS 3000', description: 'Full-day coverage of your special day.', features: ['8 hours coverage', '300+ edited photos', 'Pre-wedding consultation', 'Custom album'] },
      { id: 's3', name: 'Event Coverage', price: 'Contact for Quote', description: 'Corporate events, parties, and concerts.', features: ['Custom hours', 'Fast turnaround', 'Video highlights available'] },
    ],
  },
  blog: {
    title: 'From the Studio',
    posts: [
      { id: 'b1', title: '5 Tips for a Perfect Wedding Photoshoot', date: '2023-10-26', author: 'Kofi', content: 'Planning your wedding? Here are five essential tips to ensure your photos are as magical as the day itself. From choosing the right time of day to coordinating with your photographer, we cover it all...', imageUrl: 'https://picsum.photos/800/500?image=601' },
      { id: 'b2', title: 'Behind the Scenes: A Fashion Shoot in Osu', date: '2023-10-15', author: 'Felix', content: 'We recently had the pleasure of working with a local designer for a street style fashion shoot in the vibrant heart of Osu, Accra. Check out some of the behind-the-scenes moments and final shots.', imageUrl: 'https://picsum.photos/800/500?image=602' },
    ],
  },
  contact: {
    title: 'Get in Touch',
    introText: 'We would love to hear from you! Please fill out the form below or contact us directly.',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254133.3770334812!2d-0.3952788909848573!3d5.62332861611685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b1a853%3A0xb4764993809618a3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1698345423871!5m2!1sen!2sus',
  },
};
