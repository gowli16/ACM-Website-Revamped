import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Header from "../../components/Header"; // Adjust path if needed

// 1. Updated Data Array with Background Images
const sigs = [
  {
    id: "ai",
    code: "AI / 01",
    title: "Artificial Intelligence",
    text: "Machine learning, applied research, intelligent products, and experiments that turn ambitious ideas into working systems.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "cyber",
    code: "CYBER / 02",
    title: "Cybersecurity",
    text: "Offensive and defensive security learned through CTFs, security labs, workshops, and shared investigation.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "web",
    code: "DEV / 03",
    title: "Web & App",
    text: "Product-minded design and development for useful experiences on the web, mobile devices, and campus.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "glitch",
    code: "GAME / 04",
    title: "Glitch",
    text: "Game design, creative coding, visual systems, and interactive worlds explored through collaborative jams.",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Sigs() {
  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-[#020204] text-white pt-32 pb-24 flex flex-col">
        
        {/* Header Section */}
        <section className="px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto w-full mb-12">
          <div>
            <p className="text-cyan-400 font-retro text-xs tracking-[0.3em] uppercase mb-4">
              [ Student interest groups ]
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-tight text-white mb-6">
              Pick a signal.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Go deeper.
              </span>
            </h1>
            <div className="max-w-md">
              <b className="block text-sm tracking-widest text-neutral-300 mb-2">FOUR ACTIVE LABS</b>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Small focused communities where beginners and experienced builders learn side by side by making things.
              </p>
            </div>
          </div>
        </section>
        
        {/* New Vertical Accordion Layout */}
        <section className="px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto w-full h-[65vh] min-h-[500px]">
          <div className="flex flex-col md:flex-row gap-4 h-full w-full">
            {sigs.map((sig) => (
              <Link 
                href={`/sigs/${sig.id}`} 
                key={sig.id}
                className="group relative flex-1 overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:flex-[1.5] cursor-pointer"
              >
                {/* Background Image */}
                <img 
                  src={sig.image} 
                  alt={sig.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-40 transition-all duration-700 group-hover:scale-110 group-hover:opacity-80 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity group-hover:opacity-70" />
                
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                  
                  {/* Top: SIG Code */}
                  <div className="flex justify-between items-center z-10">
                    <span className="text-xs font-bold text-cyan-400 tracking-widest font-retro">
                      {sig.code}
                    </span>
                    <FiArrowUpRight className="text-white opacity-0 -translate-x-4 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-2xl" />
                  </div>

                  {/* Middle: Large Vertical Text (matches reference) */}
                  <h2 
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white opacity-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105 origin-left"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg) translateY(50%)' }}
                  >
                    {sig.title.split(' ')[0]} {/* Takes first word to keep it huge */}
                  </h2>

                  {/* Bottom: Description revealing on hover */}
                  <div className="z-10 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 pl-16 md:pl-20">
                    <h3 className="text-2xl font-bold text-white mb-2">{sig.title}</h3>
                    <p className="text-sm text-neutral-300 line-clamp-3">
                      {sig.text}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}