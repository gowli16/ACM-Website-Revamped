import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const links=[{label:"About",href:"/about"},{label:"SIGs",href:"/sigs"},{label:"Events",href:"/events"},{label:"Achievements",href:"/achievements"},{label:"Core",href:"/core"},{label:"Alumni",href:"/alumni"},{label:"Faculty",href:"/faculty"},{label:"Contact",href:"/contact"}];

export default function Header(){
  const [open,setOpen]=useState(false);
  const router=useRouter();
  
  return (
    <header className="site-header">
      
      {/* 
        This style block forces the Cyber Aurora theme onto your navigation links
        and upgrades the JOIN button to a glowing gradient.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        .site-header nav a:hover {
          color: #D6C507 !important;
        }
        .site-header nav a.active {
          color: #D6C507 !important;
        }
        .site-header nav a.active::after {
          background-color: #D6C507 !important;
        }
        .site-header .nav-cta {
          background: #D6C507 !important;
          color: #ffffff !important;
          border: none !important;
          box-shadow: 0 0 15px rgba(214, 197, 7, 0.2) !important;
          transition: all 0.3s ease !important;
        }
        .site-header .nav-cta:hover {
          background: #FFFFFF !important;
          box-shadow: 0 0 20px rgba(214, 197, 7, 0.24) !important;
        }
      `}} />

      <div className="section-shell header-inner">
        <Link href="/" className="brand" aria-label="ACM Amritapuri home">
          <Image src="/Logo.png" alt="" width={174} height={38} priority/>
        </Link>
        <button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
          <span/>
          <span/>
        </button>
        <nav className={open?"open":""} aria-label="Main navigation">
          {links.map(link=>
            <Link 
              className={router.pathname===link.href?"active":""} 
              href={link.href} 
              key={link.label} 
              onClick={event=>{
                if(router.pathname===link.href)event.preventDefault();
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