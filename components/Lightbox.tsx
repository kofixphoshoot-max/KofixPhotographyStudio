
import React from 'react';
import { GalleryImage } from '../types';

interface LightboxProps {
  image: GalleryImage;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ image, onClose, onNext, onPrev }) => {
  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          className="absolute -top-10 right-0 text-white text-4xl font-bold hover:text-gray-300 z-50"
        >
          &times;
        </button>
        <img 
          src={image.url} 
          alt={image.alt} 
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
            <h3 className="text-xl font-bold">{image.title}</h3>
            <p className="text-sm">{image.category}</p>
        </div>
      </div>
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }} 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl font-bold hover:text-gray-300"
      >
        &#8249;
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }} 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl font-bold hover:text-gray-300"
      >
        &#8250;
      </button>
    </div>
  );
};
