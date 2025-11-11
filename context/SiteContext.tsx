
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { SiteData } from '../types';
import { INITIAL_SITE_DATA } from '../constants';

interface SiteContextType {
  siteData: SiteData;
  setSiteData: React.Dispatch<React.SetStateAction<SiteData>>;
  isAdminMode: boolean;
  setIsAdminMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const savedData = localStorage.getItem('kofixSiteData');
      return savedData ? JSON.parse(savedData) : INITIAL_SITE_DATA;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return INITIAL_SITE_DATA;
    }
  });

  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('kofixSiteData', JSON.stringify(siteData));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [siteData]);
  
  useEffect(() => {
    document.title = siteData.seo.title;
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
        descriptionMeta = document.createElement('meta');
        descriptionMeta.setAttribute('name', 'description');
        document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', siteData.seo.description);

    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', siteData.seo.keywords);
  }, [siteData.seo]);

  return (
    <SiteContext.Provider value={{ siteData, setSiteData, isAdminMode, setIsAdminMode }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = (): SiteContextType => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
