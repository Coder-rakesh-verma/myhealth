import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "Book Appointment", "Talk to Doctor", "Medicine", "Video Consult", "Lab Test"];

const SLIDES = [
  { tag: "WORKPLACE WELLNESS", title: "Which workplace will be India's fittest?", sub: "MWL 3.0 will decide that.", cta: "Register Now", bg: "linear-gradient(135deg,#f0eaff 0%,#ddd6fe 100%)", accent: "#7c3aed", img: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png", target: "/register" },
  { tag: "INSTANT CARE", title: "See a doctor from the comfort of your home", sub: "Connect with top specialists in under 40 seconds.", cta: "Consult Now", bg: "linear-gradient(135deg,#e8f5f0 0%,#c7eedf 100%)", accent: "#059669", img: "https://cdn-icons-png.flaticon.com/512/3774/3774278.png", target: "/doctors" },
  { tag: "LAB TESTS", title: "Trusted lab tests delivered home", sub: "Reports in 12 hours. 600+ NABL certified labs.", cta: "Book Test", bg: "linear-gradient(135deg,#fff3e0 0%,#ffe0b2 100%)", accent: "#d97706", img: "https://cdn-icons-png.flaticon.com/512/3774/3774291.png", target: "/labtests" },
];

const SERVICES = [
  { icon: "🏥", title: "Hospital Booking", sub: "Offline appointment", color: "#7c3aed", target: "/doctors" },
  { icon: "📱", title: "Instant Video Consult", sub: "Connect in 40 sec", color: "#0891b2", target: "/doctors" },
  { icon: "🧪", title: "Lab Tests", sub: "Safe & trusted labs", color: "#059669", target: "/labtests" },
  { icon: "🔬", title: "Surgeries", sub: "Trusted surgery centres", color: "#dc2626", target: "/doctors" },
];

const SPECIALTIES = [
  { icon: "👨‍⚕️", name: "General Physician" }, { icon: "🌸", name: "Dermatology" },
  { icon: "🤰", name: "Obstetrics & Gynae" }, { icon: "🦴", name: "Orthopaedics" },
  { icon: "👂", name: "ENT" }, { icon: "🧠", name: "Neurology" },
  { icon: "❤️", name: "Cardiology" }, { icon: "🫘", name: "Urology" },
  { icon: "🫃", name: "Gastroenterology" }, { icon: "🧘", name: "Psychiatry" },
  { icon: "👶", name: "Paediatrics" }, { icon: "🫁", name: "Pulmonology" },
  { icon: "🦋", name: "Endocrinology" }, { icon: "🩺", name: "Nephrology" },
  { icon: "⚕️", name: "Neurosurgery" }, { icon: "🦱", name: "Rheumatology" },
  { icon: "👁️", name: "Ophthalmology" }, { icon: "🔪", name: "General Surgery" },
  { icon: "👩‍⚕️", name: "Psychology" }, { icon: "🎗️", name: "Oncology" },
  { icon: "💉", name: "Diabetology" }, { icon: "🦷", name: "Dentist" },
  { icon: "💊", name: "Ayurveda" }, { icon: "🧬", name: "Genetics" },
];

const SCAN_FEATURES = [
  { icon: "🏆", text: "600+ NABL & NABH Labs" },
  { icon: "👥", text: "5L+ Trusted Users" },
  { icon: "✅", text: "AERB Approved" },
  { icon: "⚡", text: "Reports in 12 hrs" },
];

const FOOTER_LINKS = {
  "My Health": ["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions"],
  "Services": ["Book Appointment", "Online Doctor Consultation", "Health Check & Test", "Surgeries"],
  "Scans": ["MRI Scan Near Me", "CT Scan Brain Near Me", "X-Ray Near Me", "Ultrasound Scan Near Me"],
};

// ── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ navigate }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "white",
      boxShadow: scrolled ? "0 2px 20px rgba(124,58,237,0.10)" : "0 1px 0 #ede9fe",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "11px 0", borderBottom: "1px solid #f5f3ff" }}>
          <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 150, cursor: "pointer" }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: 17, boxShadow: "0 4px 12px rgba(124,58,237,0.28)" }}>✚</div>
            <span style={{ fontFamily: "'Georgia',serif", fontWeight: 700, fontSize: 19, color: "#1e1b4b", letterSpacing: "-0.5px" }}>My<span style={{ color: "#7c3aed" }}>Health</span></span>
          </div>
          <div style={{ flex: 1, position: "relative", maxWidth: 520 }}>
            <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>🔍</span>
            <input placeholder="Search doctors, specialties, hospitals..."
              style={{ width: "100%", padding: "8px 14px 8px 38px", border: "1.5px solid #ede9fe", borderRadius: 50, fontSize: 13.5, background: "#faf9ff", outline: "none", color: "#374151", transition: "border 0.2s", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = "#7c3aed"}
              onBlur={e => e.target.style.borderColor = "#ede9fe"}
            />
          </div>
          <div style={{ display: "flex", gap: 9, marginLeft: "auto" }}>
            <button onClick={() => navigate("/login")} style={{ padding: "7px 18px", borderRadius: 50, border: "1.5px solid #7c3aed", background: "white", color: "#7c3aed", fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>Login</button>
            <button onClick={() => navigate("/register")} style={{ padding: "7px 18px", borderRadius: 50, border: "none", background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white", fontWeight: 600, fontSize: 13.5, cursor: "pointer", boxShadow: "0 4px 12px rgba(124,58,237,0.28)" }}>Sign Up</button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, padding: "6px 0", overflowX: "auto" }}>
          {NAV_LINKS.map((link, i) => (
            <a key={link} 
               href="javascript:void(0)" 
               onClick={() => {
                 if (link === "Home") navigate("/");
                 if (link === "Book Appointment") navigate("/doctors");
                 if (link === "Lab Test") navigate("/labtests");
               }}
               style={{
                padding: "5px 14px", borderRadius: 50, fontSize: 13, fontWeight: 500,
                color: i === 0 ? "#7c3aed" : "#4b5563",
                background: i === 0 ? "#f5f3ff" : "transparent",
                textDecoration: "none", whiteSpace: "nowrap",
                border: i === 0 ? "1px solid #ddd6fe" : "1px solid transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (i !== 0) { e.target.style.color = "#7c3aed"; e.target.style.background = "#faf9ff"; } }}
              onMouseLeave={e => { if (i !== 0) { e.target.style.color = "#4b5563"; e.target.style.background = "transparent"; } }}
            >{link}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ── SLIDER ───────────────────────────────────────────────────────────────────
function Slider({ navigate }) {
  const [cur, setCur] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => go((cur + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, [cur]);

  const go = idx => { setFade(false); setTimeout(() => { setCur(idx); setFade(true); }, 280); };
  const s = SLIDES[cur];

  return (
    <div style={{ background: s.bg, borderRadius: 20, overflow: "hidden", position: "relative", minHeight: 250, display: "flex", alignItems: "center", boxShadow: "0 8px 32px rgba(124,58,237,0.10)", transition: "background 0.6s" }}>
      <div style={{ flex: 1, padding: "32px 44px", opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(8px)", transition: "all 0.28s" }}>
        <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: 50, background: s.accent, color: "white", fontSize: 10.5, fontWeight: 700, letterSpacing: 1.4, marginBottom: 13 }}>{s.tag}</span>
        <h1 style={{ fontSize: "clamp(19px, 2.6vw, 32px)", fontFamily: "'Georgia',serif", color: "#1e1b4b", margin: "0 0 9px", lineHeight: 1.25, maxWidth: 440 }}>{s.title}</h1>
        <p style={{ color: "#6b7280", fontSize: 14.5, margin: "0 0 20px" }}>{s.sub}</p>
        <button onClick={() => navigate(s.target)} style={{ padding: "10px 24px", borderRadius: 50, border: "none", background: s.accent, color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: `0 5px 16px ${s.accent}55`, display: "flex", alignItems: "center", gap: 5 }}>
          {s.cta} <span style={{ fontSize: 15 }}>›</span>
        </button>
      </div>
      <div style={{ width: 200, flexShrink: 0, display: "flex", justifyContent: "center", paddingRight: 28, opacity: fade ? 1 : 0, transition: "opacity 0.28s" }}>
        <img src={s.img} alt="" style={{ width: 160, height: 160, objectFit: "contain", filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.11))" }} />
      </div>
      <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
        {SLIDES.map((_, i) => (<button key={i} onClick={() => go(i)} style={{ width: i === cur ? 20 : 7, height: 7, borderRadius: 50, border: "none", background: i === cur ? s.accent : "#d1d5db", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />))}
      </div>
    </div>
  );
}

// ── SERVICES ─────────────────────────────────────────────────────────────────
function ServiceCards({ navigate }) {
  return (
    <div className="services-grid">
      {SERVICES.map(s => (
        <div key={s.title} 
          onClick={() => navigate(s.target)}
          style={{ background: "white", borderRadius: 16, padding: "24px 16px 20px", textAlign: "center", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1.5px solid #f5f3ff", transition: "all 0.25s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 28px ${s.color}22`; e.currentTarget.style.borderColor = s.color + "44"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "#f5f3ff"; }}
        >
          <div style={{ width: 66, height: 66, borderRadius: "50%", margin: "0 auto 13px", background: s.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 29 }}>{s.icon}</div>
          <h3 style={{ margin: "0 0 5px", fontSize: 14.5, fontWeight: 700, color: "#1e1b4b" }}>{s.title}</h3>
          <p style={{ margin: 0, fontSize: 12.5, color: "#9ca3af" }}>{s.sub}</p>
        </div>
      ))}
    </div>
  );
}

// ── SPECIALTIES ──────────────────────────────────────────────────────────────
function Specialties({ navigate }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? SPECIALTIES : SPECIALTIES.slice(0, 12);

  return (
    <section style={{ background: "white", borderRadius: 20, padding: "28px 24px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyItems: "space-between", marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 21, fontFamily: "'Georgia',serif", color: "#1e1b4b" }}>Browse by Specialties</h2>
          <p style={{ margin: "3px 0 0", color: "#9ca3af", fontSize: 13.5 }}>Find the right doctor for your needs</p>
        </div>
        <button onClick={() => setShowAll(!showAll)} style={{ padding: "6px 16px", borderRadius: 50, border: "1.5px solid #7c3aed", background: "white", color: "#7c3aed", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{showAll ? "Show Less" : "View All"}</button>
      </div>
      <div className="specialties-grid">
        {visible.map(s => (
          <div key={s.name} onClick={() => navigate("/doctors")} style={{ background: "#faf9ff", borderRadius: 12, padding: "13px 7px", textAlign: "center", cursor: "pointer", border: "1.5px solid #ede9fe", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f5f3ff"; e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#faf9ff"; e.currentTarget.style.borderColor = "#ede9fe"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
            <p style={{ margin: 0, fontSize: 11.5, color: "#374151", fontWeight: 500, lineHeight: 1.3 }}>{s.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── SCAN SECTION ─────────────────────────────────────────────────────────────
function ScanSection({ navigate }) {
  return (
    <section style={{ background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#4c1d95 100%)", borderRadius: 20, padding: "38px 44px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -40, right: 220, width: 200, height: 200, borderRadius: "50%", background: "rgba(167,139,250,0.12)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -30, right: 80, width: 140, height: 140, borderRadius: "50%", background: "rgba(139,92,246,0.15)", pointerEvents: "none" }} />
      <div className="scan-inner">
        <div style={{ flex: 1 }}>
          <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: 50, background: "rgba(167,139,250,0.25)", color: "#c4b5fd", fontSize: 10.5, fontWeight: 700, letterSpacing: 1.4, marginBottom: 13 }}>DIAGNOSTICS</span>
          <h2 style={{ margin: "0 0 8px", fontSize: 24, fontFamily: "'Georgia',serif", color: "white", lineHeight: 1.25 }}>Book X-rays, MRI &<br />Scans Online</h2>
          <p style={{ margin: "0 0 22px", color: "#a5b4fc", fontSize: 13.5 }}>Certified labs near you. Instant booking, fast reports.</p>
          <div className="scan-features">
            {SCAN_FEATURES.map(f => (
              <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(167,139,250,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{f.icon}</span>
                <span style={{ color: "#e0e7ff", fontSize: 12.5, fontWeight: 500 }}>{f.text}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/labtests")} style={{ padding: "10px 24px", borderRadius: 50, border: "none", background: "linear-gradient(135deg,#a855f7,#7c3aed)", color: "white", fontWeight: 700, fontSize: 13.5, cursor: "pointer", boxShadow: "0 6px 20px rgba(124,58,237,0.5)" }}>Book a Scan →</button>
        </div>
        <div style={{ width: 190, flexShrink: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src="https://cdn-icons-png.flaticon.com/512/3774/3774282.png" alt="scan" style={{ width: 170, height: 170, objectFit: "contain", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))" }} />
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ navigate }) {
  return (
    <footer style={{ background: "#1e1b4b", color: "white", borderRadius: "20px 20px 0 0", padding: "40px 40px 22px" }}>
      <div className="footer-grid">
        <div>
          <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 13, cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: 17 }}>✚</div>
            <span style={{ fontFamily: "'Georgia',serif", fontWeight: 700, fontSize: 19, color: "white" }}>My<span style={{ color: "#a78bfa" }}>Health</span></span>
          </div>
          <p style={{ color: "#a5b4fc", fontSize: 13, lineHeight: 1.7, marginBottom: 16, maxWidth: 200 }}>India's trusted healthcare marketplace — connecting patients with the best doctors and labs.</p>
          <div style={{ display: "flex", gap: 7 }}>
            {["📘", "📷", "🐦", "▶️", "💼"].map((icon, i) => (
              <button key={i} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(167,139,250,0.3)", background: "rgba(167,139,250,0.1)", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</button>
            ))}
          </div>
        </div>
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h4 style={{ margin: "0 0 13px", color: "white", fontSize: 13.5, fontWeight: 700, letterSpacing: 0.3 }}>{heading}</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {links.map(l => (
                <li key={l} style={{ marginBottom: 8 }}>
                  <a href="javascript:void(0)" 
                     onClick={() => {
                       if (l === "Book Appointment") navigate("/doctors");
                       if (l === "About Us") navigate("/");
                     }}
                     style={{ color: "#a5b4fc", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#a78bfa"}
                    onMouseLeave={e => e.target.style.color = "#a5b4fc"}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(167,139,250,0.2)", paddingTop: 16, marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
        <p style={{ margin: 0, color: "#6b7280", fontSize: 12 }}>© 2026 My Health. All rights reserved.</p>
        <p style={{ margin: 0, color: "#6b7280", fontSize: 12 }}>Made with ❤️ in India</p>
      </div>
    </footer>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#f8f7ff", minHeight: "100vh" }}>
      <style>{`
        *{ box-sizing:border-box; }
        body{ margin:0; }
        ::-webkit-scrollbar{ width:6px; }
        ::-webkit-scrollbar-track{ background:#f1f0ff; }
        ::-webkit-scrollbar-thumb{ background:#a78bfa; border-radius:3px; }
        .main-wrap{ max-width:1400px; margin:0 auto; padding:126px 40px 0; }
        .services-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .specialties-grid{ display:grid; grid-template-columns:repeat(6,1fr); gap:11px; }
        .scan-inner{ display:flex; align-items:center; gap:36px; }
        .scan-features{ display:grid; grid-template-columns:1fr 1fr; gap:11px; margin-bottom:22px; }
        .footer-grid{ display:grid; grid-template-columns:1.5fr 1fr 1fr 1fr; gap:32px; margin-bottom:6px; }
        @media(max-width:1024px){
          .main-wrap{ padding:126px 24px 0; }
          .specialties-grid{ grid-template-columns:repeat(4,1fr)!important; }
          .footer-grid{ grid-template-columns:1fr 1fr!important; }
        }
        @media(max-width:768px){
          .main-wrap{ padding:114px 14px 0; }
          .services-grid{ grid-template-columns:repeat(2,1fr)!important; }
          .specialties-grid{ grid-template-columns:repeat(3,1fr)!important; }
          .scan-inner{ flex-direction:column!important; text-align:center; }
          .scan-features{ grid-template-columns:1fr!important; }
          .footer-grid{ grid-template-columns:1fr 1fr!important; gap:20px!important; }
        }
        @media(max-width:480px){
          .main-wrap{ padding:108px 12px 0; }
          .services-grid{ grid-template-columns:repeat(2,1fr)!important; gap:10px!important; }
          .specialties-grid{ grid-template-columns:repeat(2,1fr)!important; }
          .footer-grid{ grid-template-columns:1fr!important; }
        }
      `}</style>

      <Navbar navigate={navigate} />

      <main className="main-wrap">
        <div style={{ marginBottom: 22 }}><Slider navigate={navigate} /></div>
        <ServiceCards navigate={navigate} />
        <div style={{ height: 28 }} />
        <Specialties navigate={navigate} />
        <div style={{ height: 28 }} />
        <ScanSection navigate={navigate} />
        <div style={{ height: 40 }} />
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}