import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { label: "About", href: "/about" },
  { label: "SIGs", href: "/sigs" },
  { label: "Events", href: "/events" },
  { label: "Achievements", href: "/achievements" },
  { label: "Core", href: "/core" },
  { label: "Alumni", href: "/alumni" },
  { label: "Faculty", href: "/faculty" },
  { label: "Contact", href: "/contact" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  return (
    <header className="site-header">
      
      {/* 
        VIBRANT STRIPE THEME HEADER STYLES
      */}
      <style dangerouslySetInnerHTML={{__html: `
        .site-header {
          background: rgba(255, 255, 255, 0.05) !important; /* Extremely faint white glass */
          backdrop-filter: blur(16px) !important; /* Premium blur effect */
          -webkit-backdrop-filter: blur(16px) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          padding-top: 15px !important;
          padding-bottom: 15px !important;
        }

        /* Automatically forces your logo to be pure white to match the theme */
        .brand img {
          filter: brightness(0) invert(1) !important;
        }

        .site-header nav {
          display: flex !important;
          align-items: center !important;
          gap: 1.2rem !important;
        }

        .site-header nav a {
          font-size: 1rem !important;
          font-weight: 600 !important;
          padding: 8px 16px !important;
          border-radius: 20px !important; /* Stripe uses rounded pill-like hovers */
          transition: all 0.2s ease-in-out !important;
          color: rgba(255, 255, 255, 0.9) !important; /* Soft white */
          text-decoration: none !important;
        }

        /* Hover Effect - Crisp White Pill */
        .site-header nav a:hover {
          color: #ffffff !important; 
          background-color: rgba(255, 255, 255, 0.2) !important; /* White glass highlight */
        }

        /* Active State */
        .site-header nav a.active {
          color: #ffffff !important;
          background-color: rgba(255, 255, 255, 0.25) !important;
        }
        
        .site-header nav a.active::after {
          display: none !important; 
        }

        /* Mobile menu button lines to white */
        .menu-button span {
          background-color: #ffffff !important;
        }
      `}} />

      <div className="section-shell header-inner">
        <Link href="/" className="brand" aria-label="ACM Amritapuri home">
          <Image src="/Logo.png" alt="ACM Logo" width={174} height={38} priority/>
        </Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
          <span/>
          <span/>
        </button>
        <nav className={open ? "open" : ""} aria-label="Main navigation">
          {links.map(link =>
            <Link 
              className={router.pathname === link.href ? "active" : ""} 
              href={link.href} 
              key={link.label} 
              onClick={event => {
                if(router.pathname === link.href) event.preventDefault();
                setOpen(false)
              }}
            >
              {link.label}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}