
import React from 'react';
import { useSite } from '../context/SiteContext';
import { SiteData } from '../types';

export const AdminPanel: React.FC = () => {
    const { siteData, setSiteData, setIsAdminMode } = useSite();

    const handleInputChange = <K extends keyof SiteData, T extends keyof SiteData[K]>(
        section: K, 
        field: T, 
        value: SiteData[K][T]
    ) => {
        setSiteData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };
    
    // A more specific handler for nested objects like social links
    const handleNestedInputChange = (section: keyof SiteData, subSection: string, field: string, value: string) => {
        setSiteData(prev => {
            const newSiteData = JSON.parse(JSON.stringify(prev));
            newSiteData[section][subSection][field] = value;
            return newSiteData;
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold font-serif">Admin Panel</h2>
                    <button onClick={() => setIsAdminMode(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">&times; Close</button>
                </div>

                <div className="p-6 space-y-6">
                    {/* SEO Settings */}
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg border-b pb-2">SEO Settings</h3>
                        <label className="block">Site Title</label>
                        <input type="text" value={siteData.seo.title} onChange={(e) => handleInputChange('seo', 'title', e.target.value)} className="w-full p-2 border rounded" />
                        <label className="block">Meta Description</label>
                        <textarea value={siteData.seo.description} onChange={(e) => handleInputChange('seo', 'description', e.target.value)} className="w-full p-2 border rounded" />
                        <label className="block">Meta Keywords</label>
                        <input type="text" value={siteData.seo.keywords} onChange={(e) => handleInputChange('seo', 'keywords', e.target.value)} className="w-full p-2 border rounded" />
                    </div>

                    {/* General Settings */}
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg border-b pb-2">General Settings</h3>
                        <label className="block">Site Name</label>
                        <input type="text" value={siteData.general.siteName} onChange={(e) => handleInputChange('general', 'siteName', e.target.value)} className="w-full p-2 border rounded" />
                        <label className="block">Slogan</label>
                        <input type="text" value={siteData.general.slogan} onChange={(e) => handleInputChange('general', 'slogan', e.target.value)} className="w-full p-2 border rounded" />
                        <label className="block">Email</label>
                        <input type="email" value={siteData.general.email} onChange={(e) => handleInputChange('general', 'email', e.target.value)} className="w-full p-2 border rounded" />
                        <label className="block">Phone 1</label>
                        <input type="text" value={siteData.general.phone1} onChange={(e) => handleInputChange('general', 'phone1', e.target.value)} className="w-full p-2 border rounded" />
                        <label className="block">Phone 2</label>
                        <input type="text" value={siteData.general.phone2} onChange={(e) => handleInputChange('general', 'phone2', e.target.value)} className="w-full p-2 border rounded" />
                        <h4 className="font-semibold pt-2">Social Links</h4>
                        <label className="block">Instagram URL</label>
                        <input type="text" value={siteData.general.socialLinks.instagram} onChange={(e) => handleNestedInputChange('general', 'socialLinks', 'instagram', e.target.value)} className="w-full p-2 border rounded" />
                        <label className="block">Facebook URL</label>
                        <input type="text" value={siteData.general.socialLinks.facebook} onChange={(e) => handleNestedInputChange('general', 'socialLinks', 'facebook', e.target.value)} className="w-full p-2 border rounded" />
                         <label className="block">TikTok URL</label>
                        <input type="text" value={siteData.general.socialLinks.tiktok} onChange={(e) => handleNestedInputChange('general', 'socialLinks', 'tiktok', e.target.value)} className="w-full p-2 border rounded" />
                         <label className="block">YouTube URL</label>
                        <input type="text" value={siteData.general.socialLinks.youtube} onChange={(e) => handleNestedInputChange('general', 'socialLinks', 'youtube', e.target.value)} className="w-full p-2 border rounded" />
                    </div>

                    {/* Home Page Content */}
                     <div className="space-y-2">
                        <h3 className="font-bold text-lg border-b pb-2">Home Page</h3>
                         <label className="block">Hero Title</label>
                        <input type="text" value={siteData.home.heroTitle} onChange={(e) => handleInputChange('home', 'heroTitle', e.target.value)} className="w-full p-2 border rounded" />
                         <label className="block">Hero Subtitle</label>
                        <input type="text" value={siteData.home.heroSubtitle} onChange={(e) => handleInputChange('home', 'heroSubtitle', e.target.value)} className="w-full p-2 border rounded" />
                     </div>
                     
                     {/* ... Add more sections for About, Portfolio, Services, Blog etc. ... */}

                </div>
            </div>
        </div>
    );
};
