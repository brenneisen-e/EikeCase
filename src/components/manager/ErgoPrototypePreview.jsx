import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function ErgoPrototypePreview() {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrototype();
  }, []);

  const loadPrototype = async () => {
    try {
      const prototypes = await base44.entities.HtmlPrototype.list();
      const ergoPrototype = prototypes.find(p => p.name === "ERGO Provisionssimulation Dashboard");
      
      if (ergoPrototype) {
        setHtmlContent(ergoPrototype.html_content);
      }
    } catch (error) {
      console.error('Error loading ERGO prototype:', error);
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
      title="ERGO Prototype"
      style={{ minHeight: '100%' }}
    />
  );
}