import Link from "next/link";
import { FiArrowUpRight, FiCode, FiCpu, FiLayers, FiLock } from "react-icons/fi";

// Adjust this path if your Header component is located elsewhere (e.g., "../../components/Header")
import Header from "../../components/Header";

// We put the array directly in the file so you don't get import errors!
const sigs = [
  {
    id: "ai",
    code: "AI / 01",
    title: "Artificial Intelligence",
    Icon: FiCpu,
    text: "Machine learning, applied research, intelligent products, and experiments that turn ambitious ideas into working systems.",
    focus: ["ML foundations", "Applied AI", "Research"]
  },
  {
    id: "cyber",
    code: "CYBER / 02",
    title: "Cybersecurity",
    Icon: FiLock,
    text: "Offensive and defensive security learned through CTFs, security labs, workshops, and shared investigation.",
    focus: ["CTFs", "Web security", "Forensics"]
  },
  {
    id: "web",
    code: "DEV / 03",
    title: "Web & App",
    Icon: FiCode,
    text: "Product-minded design and development for useful experiences on the web, mobile devices, and campus.",
    focus: ["Frontend", "Backend", "Mobile"]
  },
  {
    id: "glitch",
    code: "GAME / 04",
    title: "Glitch",
    Icon: FiLayers,
    text: "Game design, creative coding, visual systems, and interactive worlds explored through collaborative jams.",
    focus: ["Unity", "Design", "Creative code"]
  }
];

export default function Sigs() {
  return (
    <>
      {/* The missing Header is injected right at the top of the page */}
      <Header />
      
      <div className="subpage sigs-page">
        <section className="subpage-hero compact section-shell">
          <div>
            <p className="section-kicker">[ Student interest groups ]</p>
            <h1>
              Pick a signal.<br />
              <span>Go deeper.</span>
            </h1>
          </div>
          <div className="subpage-intro">
            <b>FOUR ACTIVE LABS</b>
            <p>Small focused communities where beginners and experienced builders learn side by side by making things.</p>
          </div>
        </section>
        
        <section className="sig-page-grid section-shell">
          {sigs.map(({ Icon, ...sig }) => (
            <article key={sig.title}>
              <div>
                <small>{sig.code}</small>
                {Icon && <Icon />}
              </div>
              <h2>{sig.title}</h2>
              <p>{sig.text}</p>
              <ul>
                {sig.focus?.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              
              {/* The magic link connecting to your [sig].jsx file */}
              <Link href={`/sigs/${sig.id}`}>
                Explore Now <FiArrowUpRight />
              </Link>
              
            </article>
          ))}
        </section>
      </div>
    </>
  );
}