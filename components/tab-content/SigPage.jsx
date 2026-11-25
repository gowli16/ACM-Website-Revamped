import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ai } from "../../data/sigs/ai";
import { web } from "../../data/sigs/web";
import { cyber } from "../../data/sigs/cyber";
import { glitch } from "../../data/sigs/glitch";

const sigData = { ai, web, cyber, glitch };

const sigMeta = [
  { id: "ai", label: "AI", color: "#3bb4e0" },
  { id: "web", label: "Web", color: "#00b4d8" },
  { id: "cyber", label: "Cyber", color: "#38a1ce" },
  { id: "glitch", label: "Glitch", color: "#1684b2" },
];

function resolveBase(path) {
  if (!path) return "";
  return path.replace("${BASE}", "").replace(/^['"]|['"]$/g, "");
}

export default function SigPage({ navigate, openTab, params }) {
  const initialSig = params?.sig || "ai";
  const [activeSig, setActiveSig] = useState(initialSig);

  useEffect(() => {
    if (params?.sig && params.sig !== activeSig) {
      setActiveSig(params.sig);
    }
  }, [params?.sig]);

  const data = sigData[activeSig];

  if (!data) return null;

  return (
    <div className="sig-tab-page">
      {/* Atmospheric bg */}
      <div className="atmosphere">
        <div
          className="atmosphere-glow atmosphere-glow-1"
          style={{
            background: `radial-gradient(circle, ${sigMeta.find((s) => s.id === activeSig)?.color || "var(--acm-red)"}, transparent 70%)`,
            opacity: 0.08,
          }}
        />
        <div className="atmosphere-grain" />
      </div>

      {/* SIG selector */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "70px 24px 0" }}>
        <div className="sig-selector-tabs">
          {sigMeta.map((sig) => (
            <button
              key={sig.id}
              className={`sig-selector-tab ${activeSig === sig.id ? "active" : ""}`}
              onClick={() => setActiveSig(sig.id)}
              style={
                activeSig === sig.id
                  ? { background: `${sig.color}20`, color: sig.color }
                  : {}
              }
            >
              {sig.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSig}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Hero */}
          <section className="sig-tab-hero">
            <div className="sig-tab-eyebrow">
              {data.heroEyebrow || `ACM AMRITAPURI — ${data.fullName}`}
            </div>
            <h1 className="sig-tab-title">{data.fullName}</h1>
            <p className="sig-tab-tagline">{data.tagline}</p>
            {data.description && (
              <p className="sig-tab-description">{data.description}</p>
            )}

            {data.heroStory && (
              <div style={{ marginTop: 24, maxWidth: 620 }}>
                {data.heroStory.title && (
                  <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>
                    {data.heroStory.title}
                  </p>
                )}
                {data.heroStory.lines?.map((line, i) => (
                  <p key={i} style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 8 }}>
                    {line}
                  </p>
                ))}
                {data.heroStory.closing && (
                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--acm-red)", marginTop: 12 }}>
                    {data.heroStory.closing}
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Breach story / briefing (for cyber & glitch) */}
          {data.breachStory && (
            <section className="sig-tab-section">
              <div className="sig-tab-section-label">{data.breachStory.eyebrow || "FIELD BRIEFING"}</div>
              <h2 className="sig-tab-section-title">{data.breachStory.title}</h2>
              {data.breachStory.questions?.map((q, i) => (
                <p key={i} style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 10, lineHeight: 1.7 }}>
                  {q}
                </p>
              ))}
              {data.breachStory.paragraphs?.map((p, i) => (
                <p key={i} style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 12, lineHeight: 1.7 }}>
                  {p}
                </p>
              ))}
              {data.breachStory.stats?.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginTop: 20 }}>
                  {data.breachStory.stats.map((stat, i) => (
                    <div key={i} style={{ padding: 20, background: "var(--charcoal-800)", border: "1px solid var(--border)", borderRadius: 12 }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: "var(--acm-red)" }}>{stat[0]}</div>
                      <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4 }}>{stat[1]}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Domains */}
          {data.domains?.length > 0 && (
            <section className="sig-tab-section">
              <div className="sig-tab-section-label">
                {data.domainsHeadingPlain || "What we"} {data.domainsHeadingHighlight}
              </div>
              <h2 className="sig-tab-section-title">
                {data.domainsDescription ? data.domainsDescription.split(".")[0] : "Explore the domains"}
              </h2>
              <div className="sig-domain-grid">
                {data.domains.map((domain, i) => {
                  const values = Array.isArray(domain) ? domain : [domain.title, domain.description, domain.tags];
                  return (
                    <div className="sig-domain-card" key={i}>
                      <h4>{values[0]}</h4>
                      <p>{values[1]}</p>
                      {Array.isArray(values[2]) && (
                        <div className="sig-domain-tools">
                          <div className="sig-domain-tools-label">Tools & Concepts</div>
                          {values[2].filter((t) => typeof t === "string").map((tag) => (
                            <span className="sig-tag" key={tag}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects?.filter(Boolean).length > 0 && (
            <section className="sig-tab-section">
              <div className="sig-tab-section-label">
                {data.worksEyebrow || "BUILDS & RESEARCH"}
              </div>
              <h2 className="sig-tab-section-title">
                {data.worksHeadingPlain} {data.worksHeadingHighlight}
              </h2>
              {data.worksDescription && (
                <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, maxWidth: 560 }}>
                  {data.worksDescription}
                </p>
              )}
              <div className="sig-project-grid">
                {data.projects.filter(Boolean).map((project, i) => {
                  const values = Array.isArray(project) ? project : null;
                  if (!values) return null;
                  const title = values[0];
                  const desc = values[1];
                  const tags = Array.isArray(values[2]) ? values[2] : [];
                  const img = resolveBase(values[3]);
                  return (
                    <div className="sig-project-card" key={i}>
                      {img && (
                        <img
                          src={img}
                          alt={title}
                          className="sig-project-image"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      )}
                      <div className="sig-project-body">
                        <h4>{title}</h4>
                        {desc && <p>{desc}</p>}
                        {tags.length > 0 && (
                          <div className="sig-domain-tools">
                            {tags.filter((t) => typeof t === "string").map((tag) => (
                              <span className="sig-tag" key={tag}>{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Events */}
          {data.events?.length > 0 && (
            <section className="sig-tab-section">
              <div className="sig-tab-section-label">
                {data.eventsHeadingPlain || "Hands-on"} {data.eventsHeadingHighlight}
              </div>
              <h2 className="sig-tab-section-title">Workshops & Events</h2>
              {data.eventsDescription && (
                <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, maxWidth: 560, lineHeight: 1.7 }}>
                  {data.eventsDescription}
                </p>
              )}
              <div className="sig-record-grid">
                {data.events.map((event, i) => {
                  const values = Array.isArray(event) ? event : [event];
                  const title = values[0];
                  const type = values[1];
                  const date = values[2];
                  const img = resolveBase(values[3]);
                  const desc = values[4];
                  const gallery = Array.isArray(values[5]) ? values[5] : [];
                  const heroImg = img || (gallery.length > 0 ? resolveBase(gallery[0]) : null);
                  return (
                    <div className="sig-record-card" key={i} style={{ padding: 0, overflow: "hidden" }}>
                      {heroImg && (
                        <img
                          src={heroImg}
                          alt={title}
                          style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      )}
                      <div style={{ padding: 20 }}>
                        <h4>{title}</h4>
                        {type && <p style={{ fontSize: 12, color: "var(--acm-red)", fontWeight: 600, marginBottom: 4 }}>{type}</p>}
                        {date && <p style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{date}</p>}
                        {desc && <p style={{ fontSize: 13, marginTop: 10, lineHeight: 1.6 }}>{desc}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Achievements */}
          {data.achievements && (
            <section className="sig-tab-section">
              <div className="sig-tab-section-label">
                {data.achievements.eyebrow || "TRACK RECORD"}
              </div>
              <h2 className="sig-tab-section-title">
                {data.achievements.headingPlain} {data.achievements.headingHighlight}
              </h2>
              {data.achievements.description && (
                <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, maxWidth: 560 }}>
                  {data.achievements.description}
                </p>
              )}

              {/* People */}
              {data.achievements.people?.length > 0 && (
                <div className="sig-record-grid" style={{ marginBottom: 20 }}>
                  {data.achievements.people.map((person, i) => (
                    <div className="sig-record-card" key={i}>
                      <h4>{person[0]}</h4>
                      <p style={{ fontSize: 12, color: "var(--acm-red)", fontWeight: 600 }}>{person[1]}</p>
                      <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4 }}>{person[2]} · {person[3]}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Competition wins */}
              {data.achievements.competitionWins?.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div className="sig-tab-section-label" style={{ marginBottom: 12 }}>Competition Wins</div>
                  {data.achievements.competitionWins.map((win, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-tertiary)" }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{win}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Internships */}
              {data.achievements.internships?.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div className="sig-tab-section-label" style={{ marginBottom: 12 }}>Internships</div>
                  {data.achievements.internships.map((intern, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{intern[0]}</span>
                      <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{intern[1]}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Publications */}
              {data.achievements.publications?.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div className="sig-tab-section-label" style={{ marginBottom: 12 }}>Publications</div>
                  {data.achievements.publications.map((pub, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{pub[0]}</span>
                      <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{pub[1]}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Hackathons */}
              {data.achievements.hackathons?.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div className="sig-tab-section-label" style={{ marginBottom: 12 }}>Hackathons</div>
                  {data.achievements.hackathons.map((hack, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{hack[0]}</span>
                      <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{hack[1]}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Glitch hackathon win payload */}
              {data.achievements.hackathonWinPayload && (
                <div className="sig-record-card" style={{ marginBottom: 20 }}>
                  <h4>{data.achievements.hackathonWinPayload.title}</h4>
                  <p style={{ fontSize: 13, color: "var(--acm-red)", fontWeight: 600, marginTop: 6 }}>
                    {data.achievements.hackathonWinPayload.award}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8, lineHeight: 1.6 }}>
                    {data.achievements.hackathonWinPayload.summary}
                  </p>
                </div>
              )}

              {/* Partnership */}
              {data.achievements.partnership && (
                <div className="sig-record-card">
                  <div className="sig-tab-section-label" style={{ marginBottom: 8 }}>Partnership</div>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {data.achievements.partnership}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Internships & Papers */}
          {(data.internships?.length > 0 || data.papers?.length > 0) && (
            <section className="sig-tab-section">
              <div className="sig-tab-section-label">Career & Research</div>
              <h2 className="sig-tab-section-title">Internships & Papers</h2>

              {data.internships?.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <div className="sig-tab-section-label" style={{ marginBottom: 16 }}>Internships</div>
                  <div className="sig-record-grid">
                    {data.internships.map((intern, i) => {
                      const values = Array.isArray(intern) ? intern : [];
                      const company = values[0];
                      const role = values[1];
                      const person = values[2] || "";
                      const logo = resolveBase(values[3]);
                      return (
                        <div className="sig-record-card" key={i}>
                          <div className="sig-record-logo">
                            {logo && (
                              <img
                                src={logo}
                                alt={company}
                                onError={(e) => { e.target.style.display = "none"; }}
                              />
                            )}
                            <h4 style={{ margin: 0, fontSize: 14 }}>{company}</h4>
                          </div>
                          <p style={{ fontSize: 12, color: "var(--acm-red)", fontWeight: 600 }}>{role}</p>
                          {person && <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4 }}>{person}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {data.papers?.length > 0 && (
                <div>
                  <div className="sig-tab-section-label" style={{ marginBottom: 16 }}>Papers & Publications</div>
                  <div className="sig-record-grid">
                    {data.papers.map((paper, i) => {
                      const values = Array.isArray(paper) ? paper : [];
                      return (
                        <div className="sig-record-card" key={i}>
                          <h4 style={{ fontSize: 14, lineHeight: 1.4 }}>{values[0]}</h4>
                          <p style={{ fontSize: 12, color: "var(--acm-red)", fontWeight: 600, marginTop: 8 }}>{values[1]}</p>
                          {values[2] && <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>{values[2]}</p>}
                          {values[3] && <p style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{values[3]}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Why Join / Benefits */}
          {data.benefits?.length > 0 && (
            <section className="sig-tab-section">
              <div className="sig-tab-section-label">{data.whyJoinHeading || "WHY JOIN"}</div>
              <h2 className="sig-tab-section-title">{data.whyJoinTitle || "Build with us"}</h2>
              {data.whyJoinDescription && (
                <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, maxWidth: 560, lineHeight: 1.7 }}>
                  {data.whyJoinDescription}
                </p>
              )}
              <div className="sig-domain-grid">
                {data.benefits.map((benefit, i) => {
                  const values = Array.isArray(benefit) ? benefit : [benefit.title, benefit.desc];
                  return (
                    <div className="sig-domain-card" key={i}>
                      <h4>{values[0]}</h4>
                      <p>{values[1]}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Manifesto (Glitch) */}
          {data.manifesto && (
            <section className="sig-tab-section">
              <div className="sig-tab-section-label">{data.manifesto.eyebrow}</div>
              <h2 className="sig-tab-section-title">
                {data.manifesto.headingPlain} {data.manifesto.headingHighlight}
              </h2>
              {data.manifesto.philosophy?.map((p, i) => (
                <p key={i} style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 12, lineHeight: 1.7, maxWidth: 560 }}>
                  {p}
                </p>
              ))}
              {data.manifesto.arsenal?.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <div className="sig-tab-section-label" style={{ marginBottom: 12 }}>{data.manifesto.arsenalLabel}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {data.manifesto.arsenal.map((item) => (
                      <span className="sig-tag" key={item} style={{ fontSize: 12, padding: "6px 12px" }}>{item}</span>
                    ))}
                  </div>
                </div>
              )}
              {data.manifesto.endgame?.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <div className="sig-tab-section-label" style={{ marginBottom: 12 }}>{data.manifesto.endgameLabel}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {data.manifesto.endgame.map((item) => (
                      <span className="sig-tag" key={item} style={{ fontSize: 12, padding: "6px 12px" }}>{item}</span>
                    ))}
                  </div>
                </div>
              )}
              {data.manifesto.cta && (
                <div style={{ marginTop: 32, padding: 28, background: "var(--charcoal-800)", border: "1px solid var(--border)", borderRadius: 16 }}>
                  <div className="sig-tab-section-label" style={{ marginBottom: 8 }}>{data.manifesto.cta.eyebrow}</div>
                  <p style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.7 }}>{data.manifesto.cta.line}</p>
                  <a
                    href="https://aseam.acm.org/join"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 16,
                      padding: "10px 24px",
                      borderRadius: 10,
                      background: "var(--acm-red)",
                      color: "white",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {data.manifesto.cta.buttonLabel}
                  </a>
                </div>
              )}
            </section>
          )}

          {/* Members */}
          {data.members?.length > 0 && (
            <section className="sig-tab-section">
              <div className="sig-tab-section-label">The People</div>
              <h2 className="sig-tab-section-title">Meet the members</h2>
              {data.classes?.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {data.classes.map((cls) => (
                    <span className="sig-tag" key={cls} style={{ fontSize: 12, padding: "6px 12px" }}>{cls}</span>
                  ))}
                </div>
              )}
              <div className="sig-member-grid">
                {data.members.map((member, i) => {
                  const values = Array.isArray(member) ? member : [];
                  const name = values[0];
                  const img = resolveBase(values[1]);
                  const role = values[2] || "Member";
                  const title = values[3] || "";
                  return (
                    <div className="sig-member-card" key={i}>
                      {img && (
                        <img
                          src={img}
                          alt={name}
                          className="sig-member-image"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      )}
                      <div className="sig-member-body">
                        <small>{role}</small>
                        <h4>{name}</h4>
                        {title && <p>{title}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Contact */}
          {data.email && (
            <section className="sig-tab-section" style={{ paddingBottom: 80 }}>
              <div style={{ padding: 28, background: "var(--charcoal-800)", border: "1px solid var(--border)", borderRadius: 16, textAlign: "center" }}>
                <div className="sig-tab-section-label" style={{ marginBottom: 8 }}>Get in touch</div>
                <a
                  href={`mailto:${data.email}`}
                  style={{ fontSize: 16, fontWeight: 600, color: "var(--acm-red)" }}
                >
                  {data.email}
                </a>
              </div>
            </section>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
