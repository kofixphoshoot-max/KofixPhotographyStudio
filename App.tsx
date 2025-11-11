
import React, { useState, useEffect, useCallback } from 'react';
import { SiteProvider, useSite } from './context/SiteContext';
import { FacebookIcon, InstagramIcon, TiktokIcon, YoutubeIcon, EditIcon } from './components/icons';
import { Lightbox } from './components/Lightbox';
import { AdminPanel } from './components/AdminPanel';
import { GalleryImage } from './types';

type Page = 'home' | 'about' | 'portfolio' | 'services' | 'blog' | 'contact';

// --- Reusable Components ---

const EditableField: React.FC<{
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    path: string;
    className?: string;
    children: React.ReactNode;
}> = ({ as: Component = 'span', path, className, children }) => {
    const { isAdminMode, setSiteData } = useSite();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const keys = path.split('.');
        setSiteData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = e.target.value;
            return newData;
        });
    };

    if (isAdminMode) {
        return (
            <div className="relative group">
                <Component className={className}>{children}</Component>
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <textarea onChange={handleChange} defaultValue={children as string} className="w-full p-1 border rounded bg-white text-black text-sm" />
                </div>
            </div>
        );
    }

    return <Component className={className}>{children}</Component>;
};


// --- Page Components ---

const HomePage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const { siteData } = useSite();
    const { heroSlides, heroTitle, heroSubtitle, ctaButtonText, testimonials, testimonialSectionTitle } = siteData.home;
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentSlide, heroSlides.length]);

    return (
        <div className="animate-fade-in">
            {/* Hero Slideshow */}
            <div className="relative h-screen bg-black">
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-50' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${slide.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    />
                ))}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg">
                        <EditableField path="home.heroTitle">{heroTitle}</EditableField>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
                        <EditableField path="home.heroSubtitle">{heroSubtitle}</EditableField>
                    </p>
                    <button onClick={() => onNavigate('contact')} className="bg-[#c0a080] text-white py-3 px-8 text-lg font-bold rounded hover:bg-[#a88a69] transition-colors">
                       <EditableField path="home.ctaButtonText">{ctaButtonText}</EditableField>
                    </button>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-serif mb-12">
                         <EditableField path="home.testimonialSectionTitle">{testimonialSectionTitle}</EditableField>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="p-8 border-l-4 border-[#c0a080]">
                                <p className="text-lg italic mb-4">"<EditableField path={`home.testimonials[${testimonials.indexOf(testimonial)}].quote`}>{testimonial.quote}</EditableField>"</p>
                                <p className="font-bold">- <EditableField path={`home.testimonials[${testimonials.indexOf(testimonial)}].author`}>{testimonial.author}</EditableField></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AboutPage: React.FC = () => {
    const { siteData } = useSite();
    const { title, imageUrl, missionStatement, studioDescription, teamSectionTitle, teamMembers } = siteData.about;
    return (
        <div className="container mx-auto px-6 py-20 animate-fade-in">
            <h1 className="text-5xl font-serif text-center mb-12"><EditableField path="about.title">{title}</EditableField></h1>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <img src={imageUrl} alt="Kofix Studio" className="rounded-lg shadow-xl" />
                <div className="space-y-6">
                    <h2 className="text-3xl font-serif text-[#c0a080]"><EditableField path="about.missionStatement">{missionStatement}</EditableField></h2>
                    <p className="text-lg leading-relaxed"><EditableField as="p" path="about.studioDescription">{studioDescription}</EditableField></p>
                </div>
            </div>
            <div className="mt-20">
                <h2 className="text-4xl font-serif text-center mb-12"><EditableField path="about.teamSectionTitle">{teamSectionTitle}</EditableField></h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-12">
                    {teamMembers.map((member, index) => (
                        <div key={member.id} className="text-center">
                            <img src={member.imageUrl} alt={member.name} className="w-48 h-48 mx-auto rounded-full shadow-lg mb-4" />
                            <h3 className="text-2xl font-bold"><EditableField path={`about.teamMembers[${index}].name`}>{member.name}</EditableField></h3>
                            <p className="text-[#c0a080] mb-2"><EditableField path={`about.teamMembers[${index}].role`}>{member.role}</EditableField></p>
                            <p><EditableField path={`about.teamMembers[${index}].bio`}>{member.bio}</EditableField></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const PortfolioPage: React.FC = () => {
    const { siteData } = useSite();
    const { title, categories, images } = siteData.portfolio;
    const [filter, setFilter] = useState('All');
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeLightbox = () => {
        setSelectedImageIndex(null);
    };
    
    const nextImage = useCallback(() => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
        }
    }, [selectedImageIndex, filteredImages.length]);

    const prevImage = useCallback(() => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + filteredImages.length) % filteredImages.length);
        }
    }, [selectedImageIndex, filteredImages.length]);

    return (
        <div className="container mx-auto px-6 py-20 animate-fade-in">
            <h1 className="text-5xl font-serif text-center mb-12">{title}</h1>
            <div className="flex justify-center flex-wrap gap-4 mb-12">
                <button onClick={() => setFilter('All')} className={`px-4 py-2 rounded ${filter === 'All' ? 'bg-[#c0a080] text-white' : 'bg-gray-200'}`}>All</button>
                {categories.map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded ${filter === cat ? 'bg-[#c0a080] text-white' : 'bg-gray-200'}`}>{cat}</button>
                ))}
            </div>
            <div className="columns-2 md:columns-3 gap-4">
                {filteredImages.map((image, index) => (
                    <div key={image.id} className="mb-4 break-inside-avoid cursor-pointer group" onClick={() => openLightbox(index)}>
                        <img src={image.url} alt={image.alt} className="w-full rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:scale-105" />
                    </div>
                ))}
            </div>
            {selectedImageIndex !== null && (
                <Lightbox 
                    image={filteredImages[selectedImageIndex]} 
                    onClose={closeLightbox}
                    onNext={nextImage}
                    onPrev={prevImage}
                />
            )}
        </div>
    );
};

const ServicesPage: React.FC = () => {
    const { siteData } = useSite();
    const { title, introText, packages } = siteData.services;
    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-6 py-20 animate-fade-in">
                <h1 className="text-5xl font-serif text-center mb-4">{title}</h1>
                <p className="text-center text-lg mb-12 max-w-2xl mx-auto">{introText}</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map(pkg => (
                        <div key={pkg.id} className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
                            <h2 className="text-3xl font-serif mb-2">{pkg.name}</h2>
                            <p className="text-2xl font-bold text-[#c0a080] mb-4">{pkg.price}</p>
                            <p className="mb-6 flex-grow">{pkg.description}</p>
                            <ul className="space-y-2 mb-8">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <a href={`mailto:${siteData.general.email}`} className="mt-auto text-center w-full bg-[#333333] text-white py-3 px-6 text-lg font-bold rounded hover:bg-[#555555] transition-colors">
                                Enquire Now
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const BlogPage: React.FC = () => {
    const { siteData } = useSite();
    const { title, posts } = siteData.blog;
    return (
        <div className="container mx-auto px-6 py-20 animate-fade-in">
            <h1 className="text-5xl font-serif text-center mb-12">{title}</h1>
            <div className="grid md:grid-cols-2 gap-12">
                {posts.map(post => (
                    <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <p className="text-sm text-gray-500 mb-2">{post.date} by {post.author}</p>
                            <h2 className="text-3xl font-serif mb-4">{post.title}</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
                            <a href="#" className="font-bold text-[#c0a080] hover:underline">Read More</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ContactPage: React.FC = () => {
    const { siteData } = useSite();
    const { title, introText, mapEmbedUrl } = siteData.contact;
    const { email, phone1, phone2, address } = siteData.general;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you shortly.');
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="container mx-auto px-6 py-20 animate-fade-in">
            <h1 className="text-5xl font-serif text-center mb-4">{title}</h1>
            <p className="text-center text-lg mb-12 max-w-2xl mx-auto">{introText}</p>
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-serif mb-6">Contact Details</h2>
                    <div className="space-y-4 text-lg">
                        <p><strong>Address:</strong> {address}</p>
                        <p><strong>Email:</strong> <a href={`mailto:${email}`} className="text-[#c0a080] hover:underline">{email}</a></p>
                        <p><strong>Phone:</strong> <a href={`tel:${phone1}`} className="text-[#c0a080] hover:underline">{phone1}</a> / <a href={`tel:${phone2}`} className="text-[#c0a080] hover:underline">{phone2}</a></p>
                    </div>
                    <div className="mt-8 rounded-lg overflow-hidden shadow-xl">
                        <iframe
                            src={mapEmbedUrl}
                            width="100%"
                            height="350"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-serif mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" required />
                        <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" required />
                        <input type="text" placeholder="Subject" className="w-full p-3 border rounded-lg" />
                        <textarea placeholder="Your Message" rows={6} className="w-full p-3 border rounded-lg" required></textarea>
                        <button type="submit" className="w-full bg-[#c0a080] text-white py-3 px-8 text-lg font-bold rounded hover:bg-[#a88a69] transition-colors">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};


// --- Main App Structure ---

const Header: React.FC<{ currentPage: Page, onNavigate: (page: Page) => void }> = ({ currentPage, onNavigate }) => {
    const { siteData } = useSite();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks: { page: Page; label: string }[] = [
        { page: 'home', label: 'Home' },
        { page: 'about', label: 'About' },
        { page: 'portfolio', label: 'Portfolio' },
        { page: 'services', label: 'Services' },
        { page: 'blog', label: 'Blog' },
        { page: 'contact', label: 'Contact' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white bg-opacity-90 backdrop-blur-sm shadow-md transition-all">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold font-serif cursor-pointer" onClick={() => onNavigate('home')}>
                    {siteData.general.siteName}
                </div>
                <nav className="hidden md:flex space-x-6">
                    {navLinks.map(link => (
                        <button key={link.page} onClick={() => onNavigate(link.page)} className={`font-semibold pb-1 border-b-2 ${currentPage === link.page ? 'border-[#c0a080]' : 'border-transparent'} hover:border-[#c0a080] transition-colors`}>
                            {link.label}
                        </button>
                    ))}
                </nav>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                 <nav className="md:hidden bg-white py-4">
                    {navLinks.map(link => (
                        <button key={link.page} onClick={() => { onNavigate(link.page); setIsMenuOpen(false); }} className={`block w-full text-left px-6 py-2 ${currentPage === link.page ? 'text-[#c0a080] font-bold' : ''}`}>
                            {link.label}
                        </button>
                    ))}
                </nav>
            )}
        </header>
    );
};

const Footer: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const { siteData, setIsAdminMode } = useSite();
    const { socialLinks, siteName, email, phone1 } = siteData.general;
    return (
        <footer className="bg-[#333333] text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-xl font-bold font-serif mb-4">{siteName}</h3>
                        <p>{siteData.general.slogan}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                           <li><button onClick={() => onNavigate('about')} className="hover:text-[#c0a080]">About Us</button></li>
                           <li><button onClick={() => onNavigate('portfolio')} className="hover:text-[#c0a080]">Portfolio</button></li>
                           <li><button onClick={() => onNavigate('contact')} className="hover:text-[#c0a080]">Contact</button></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                        <div className="flex justify-center md:justify-start space-x-4 mb-4">
                            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#c0a080]"><InstagramIcon className="w-6 h-6" /></a>
                            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#c0a080]"><FacebookIcon className="w-6 h-6" /></a>
                            <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-[#c0a080]"><TiktokIcon className="w-6 h-6" /></a>
                            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[#c0a080]"><YoutubeIcon className="w-6 h-6" /></a>
                        </div>
                        <p><a href={`mailto:${email}`} className="hover:text-[#c0a080]">{email}</a></p>
                        <p><a href={`tel:${phone1}`} className="hover:text-[#c0a080]">{phone1}</a></p>
                    </div>
                </div>
                 <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} {siteName}. All Rights Reserved.</p>
                     <button onClick={() => setIsAdminMode(true)} className="mt-4 text-xs hover:underline">
                        Admin Login
                    </button>
                </div>
            </div>
        </footer>
    );
};

const MainContent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const { isAdminMode } = useSite();

    const renderPage = () => {
        switch (currentPage) {
            case 'home': return <HomePage onNavigate={setCurrentPage} />;
            case 'about': return <AboutPage />;
            case 'portfolio': return <PortfolioPage />;
            case 'services': return <ServicesPage />;
            case 'blog': return <BlogPage />;
            case 'contact': return <ContactPage />;
            default: return <HomePage onNavigate={setCurrentPage} />;
        }
    };

    return (
        <>
            <Header currentPage={currentPage} onNavigate={setCurrentPage} />
            <main className="pt-16">
              {renderPage()}
            </main>
            <Footer onNavigate={setCurrentPage} />
            {isAdminMode && <AdminPanel />}
        </>
    );
}


const App: React.FC = () => {
    return (
        <SiteProvider>
            <MainContent/>
        </SiteProvider>
    );
};

export default App;
