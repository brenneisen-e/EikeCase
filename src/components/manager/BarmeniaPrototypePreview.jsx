import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function BarmeniaPrototypePreview() {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrototype();
  }, []);

  const loadPrototype = async () => {
    try {
      const prototypes = await base44.entities.HtmlPrototype.list();
      const barmeniaPrototype = prototypes.find(p => p.name === "Barmenia Gothaer Persönliche Produktion");
      
      if (barmeniaPrototype) {
        setHtmlContent(barmeniaPrototype.html_content);
      }
    } catch (error) {
      console.error('Error loading Barmenia prototype:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
        <div className="text-sm text-gray-500">Loading prototype...</div>
      </div>
    );
  }

  return (
    <iframe
      srcDoc={htmlContent}
      className="w-full h-full border-0"
      title="Barmenia Gothaer Prototype"
      style={{ minHeight: '100%' }}
    />
  );
}