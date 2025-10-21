import React, { useState, useEffect } from 'react';

const navLinks = [
    { name: 'Who', href: '#who' },
    { name: 'Journey', href: '#journey' },
    { name: 'Why', href: '#why' },
    { name: 'What', href: '#what' },
    { name: 'Financials', href: '#financials' },
    { name: 'Vision', href: '#vision' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, anchor) => {
    e.preventDefault();
    const targetElement = document.querySelector(anchor);
    if (targetElement) {
      const topOffset = targetElement.getBoundingClientRect().top + window.pageYOffset - 80; // 80px offset for nav height
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 w-full bg-white z-[1000] transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <div className="text-3xl font-light text-black">
          Deloitte<span className="inline-block w-2 h-2 bg-[#86BC25] rounded-full ml-1"></span>
        </div>
        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map(link => (
            <li key={link.name}>
              <a 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-600 hover:text-[#86BC25] text-sm transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}