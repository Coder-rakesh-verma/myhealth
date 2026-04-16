import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, removeToken } from "../services/api";

const NAV_LINKS = [
  { label: "Home",              path: "/" },
  { label: "Book Appointment",  path: "/doctors" },
  { label: "Lab Tests",         path: "/lab-tests" },
  { label: "Talk to Doctor",    path: "/doctors?mode=video" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [search,   setSearch]     = useState("");
  const [loggedIn, setLoggedIn]   = useState(isLoggedIn());
  const navigate  = useNavigate();
  const location  = useLocation();
  

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // re-check login state on route change
  useEffect(() => { setLoggedIn(isLoggedIn()); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/doctors?search=${encodeURIComponent(search.trim())}`);
  };

  const handleLogout = () => {
    removeToken();
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "white",
      boxShadow: scrolled ? "0 2px 20px rgba(124,58,237,0.10)" : "0 1px 0 #ede9fe",
      transition:"all 0.3s",
    }}>
      <div style={{ maxWidth:1400,margin:"0 auto",padding:"0 40px" }}>

        {/* Top row */}
        <div style={{ display:"flex",alignItems:"center",gap:16,padding:"11px 0",borderBottom:"1px solid #f5f3ff" }}>

          {/* Logo */}
          <div onClick={()=>navigate("/")} style={{ display:"flex",alignItems:"center",gap:8,minWidth:150,cursor:"pointer" }}>
            <div style={{ width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#7c3aed,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:900,fontSize:17,boxShadow:"0 4px 12px rgba(124,58,237,0.28)" }}>✚</div>
            <span style={{ fontFamily:"'Georgia',serif",fontWeight:700,fontSize:19,color:"#1e1b4b",letterSpacing:"-0.5px" }}>My<span style={{ color:"#7c3aed" }}>Health</span></span>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} style={{ flex:1,position:"relative",maxWidth:520 }}>
            <span style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:14 }}>🔍</span>
            <input
              value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder="Search doctors, specialties..."
              style={{ width:"100%",padding:"8px 14px 8px 38px",border:"1.5px solid #ede9fe",borderRadius:50,fontSize:13.5,background:"#faf9ff",outline:"none",color:"#374151",transition:"border 0.2s",boxSizing:"border-box" }}
              onFocus={e=>e.target.style.borderColor="#7c3aed"}
              onBlur={e=>e.target.style.borderColor="#ede9fe"}
            />
          </form>

          {/* Auth buttons */}
          <div style={{ display:"flex",gap:9,marginLeft:"auto" }}>
            {loggedIn ? (
              <>
                <button onClick={()=>navigate("/dashboard")} style={{ padding:"7px 18px",borderRadius:50,border:"1.5px solid #7c3aed",background:"white",color:"#7c3aed",fontWeight:600,fontSize:13.5,cursor:"pointer" }}>Dashboard</button>
                <button onClick={handleLogout} style={{ padding:"7px 18px",borderRadius:50,border:"none",background:"#fee2e2",color:"#dc2626",fontWeight:600,fontSize:13.5,cursor:"pointer" }}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={()=>navigate("/login")} style={{ padding:"7px 18px",borderRadius:50,border:"1.5px solid #7c3aed",background:"white",color:"#7c3aed",fontWeight:600,fontSize:13.5,cursor:"pointer" }}>Login</button>
                <button onClick={()=>navigate("/register")} style={{ padding:"7px 18px",borderRadius:50,border:"none",background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"white",fontWeight:600,fontSize:13.5,cursor:"pointer",boxShadow:"0 4px 12px rgba(124,58,237,0.28)" }}>Sign Up</button>
              </>
            )}
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display:"flex",gap:4,padding:"6px 0",overflowX:"auto" }}>
          {NAV_LINKS.map(link=>{
            const active = location.pathname === link.path;
            return (
              <a key={link.label} onClick={()=>navigate(link.path)} style={{
                padding:"5px 14px",borderRadius:50,fontSize:13,fontWeight:500,
                color:active?"#7c3aed":"#4b5563",
                background:active?"#f5f3ff":"transparent",
                textDecoration:"none",whiteSpace:"nowrap",cursor:"pointer",
                border:active?"1px solid #ddd6fe":"1px solid transparent",
                transition:"all 0.2s",
              }}
                onMouseEnter={e=>{ if(!active){e.target.style.color="#7c3aed";e.target.style.background="#faf9ff";}}}
                onMouseLeave={e=>{ if(!active){e.target.style.color="#4b5563";e.target.style.background="transparent";}}}
              >{link.label}</a>
            );
          })}
        </div>

      </div>
    </nav>
  );
}
