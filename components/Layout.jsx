import { useRouter } from "next/router"; 
import { Inter, Space_Grotesk } from "next/font/google";
import Header from "./Header";
import Socials from "./Socials";
import TechBackdrop from "./TechBackdrop";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export default function Layout({ children }) {
  const router = useRouter(); 
  
  // BULLETPROOF FIX: Check if ANY part of the URL contains "/sigs"
  // This catches edge cases where Next.js hides the exact start of the path
  const isRecruitmentPage = router.pathname.includes('/sigs') || router.asPath.includes('/sigs');

  return (
    <div className={`${inter.variable} ${space.variable} site-root`}>
      
      {!isRecruitmentPage && <TechBackdrop />}
      
      {!isRecruitmentPage && <Header />}
      
      <main>{children}</main>
      
      {!isRecruitmentPage && (
        <footer className="site-footer">
          <div className="section-shell footer-inner">
            <div><strong>ACM</strong><span>Amritapuri Student Chapter</span></div>
            <p>Built by students, for students.</p>
            <Socials />
          </div>
        </footer>
      )}
    </div>
  );
}