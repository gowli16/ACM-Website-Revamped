import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

export default function SearchIntro() {
  const [text, setText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const fullText = "ACM Amritapuri";

  useEffect(() => {
    // 👇 MEMORY FEATURE: Commented out for testing. 
    // Uncomment these lines when you launch so users only see the animation once!
    // if (sessionStorage.getItem("acmIntroSeen")) {
    //   router.replace("/home");
    //   return;
    // }

    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        
        setTimeout(() => setIsSearching(true), 500);
        
        // Redirect directly to the HOME page after searching
        setTimeout(() => {
          // sessionStorage.setItem("acmIntroSeen", "true"); // Uncomment for launch
          router.push("/home");
        }, 1500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [router]);

  // Prevents flashing if the user is being instantly redirected
  // if (typeof window !== "undefined" && sessionStorage.getItem("acmIntroSeen")) {
  //   return <div style={{ backgroundColor: "#202124", minHeight: "100vh" }} />;
  // }

  return (
    <>
      <Head>
        <title>Searching... | ACM Amritapuri</title>
      </Head>

      {/* Force pure dark mode and hide the Navbar during the animation */}
      <style jsx global>{`
        html, body { background-color: #202124 !important; overflow: hidden !important; margin: 0; padding: 0; }
        header, nav, footer, .navbar { display: none !important; }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          width: "100vw", height: "100vh", backgroundColor: "#202124",
          zIndex: 2147483647, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "0 20px" }}
        >
          <h2 style={{ color: "#fff", fontSize: "2.5rem", marginBottom: "30px", fontWeight: "600", letterSpacing: "-1px" }}>
            Search
          </h2>

          <div style={{
            display: "flex", alignItems: "center", width: "100%", maxWidth: "500px",
            backgroundColor: "#303134", border: "1px solid #5f6368",
            borderRadius: "30px", padding: "14px 24px",
            boxShadow: isSearching ? "0 1px 6px rgba(32,33,36,.28)" : "none",
            transition: "box-shadow 0.3s ease"
          }}>
            <FiSearch size={20} color="#9aa0a6" style={{ marginRight: "14px" }} />
            <span style={{ color: "#e8eaed", fontSize: "1.1rem", display: "flex", alignItems: "center", fontWeight: "400" }}>
              {text}
              {!isSearching && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  style={{ display: "inline-block", width: "2px", height: "20px", backgroundColor: "#8ab4f8", marginLeft: "4px" }}
                />
              )}
            </span>
          </div>

          <div style={{ height: "40px", marginTop: "20px" }}>
            {isSearching && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", gap: "8px" }}>
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                    style={{ width: "8px", height: "8px", backgroundColor: "#9aa0a6", borderRadius: "50%" }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}