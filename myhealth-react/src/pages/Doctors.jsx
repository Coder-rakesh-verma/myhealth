import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { doctorAPI } from "../services/api";

const SPECIALTIES = ["All","General Physician","Dermatology","Cardiology","Orthopaedics","Neurology","Paediatrics","ENT","Psychiatry","Diabetology","Dentist"];

const STAR = (n) => "★".repeat(n) + "☆".repeat(5-n);

export default function Doctors() {
  const [doctors,      setDoctors]      = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [specialty,    setSpecialty]    = useState("All");
  const [sortBy,       setSortBy]       = useState("rating");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    fetchDoctors();
  }, [specialty, searchQuery]);

  const fetchDoctors = async () => {
    setLoading(true);
    setError("");
    try {
      let params = "";
      if (specialty !== "All") params += `specialization=${encodeURIComponent(specialty)}&`;
      if (searchQuery)         params += `search=${encodeURIComponent(searchQuery)}&`;
      const data = await doctorAPI.getAll(params);
      setDoctors(Array.isArray(data) ? data : data.doctors || []);
    } catch (err) {
      setError(err.message);
      // Show demo data when backend not connected yet
      setDoctors(DEMO_DOCTORS);
    } finally {
      setLoading(false);
    }
  };

  const sorted = [...doctors].sort((a,b)=>{
    if (sortBy === "rating")     return (b.rating||0)   - (a.rating||0);
    if (sortBy === "experience") return (b.experience||0)- (a.experience||0);
    if (sortBy === "fee")        return (a.fee||0)       - (b.fee||0);
    return 0;
  });

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#f8f7ff",minHeight:"100vh" }}>
      <style>{`*{box-sizing:border-box;}body{margin:0;}`}</style>
      <Navbar />

      <main style={{ maxWidth:1400,margin:"0 auto",padding:"110px 40px 40px" }}>

        {/* Header */}
        <div style={{ marginBottom:28 }}>
          <h1 style={{ margin:"0 0 6px",fontSize:28,fontFamily:"'Georgia',serif",color:"#1e1b4b" }}>
            {searchQuery ? `Results for "${searchQuery}"` : "Find a Doctor"}
          </h1>
          <p style={{ margin:0,color:"#9ca3af",fontSize:15 }}>{sorted.length} doctors available</p>
        </div>

        <div style={{ display:"flex",gap:24 }}>

          {/* Sidebar filters */}
          <aside style={{ width:240,flexShrink:0 }}>
            <div style={{ background:"white",borderRadius:16,padding:"20px 18px",boxShadow:"0 2px 12px rgba(0,0,0,0.05)",marginBottom:16 }}>
              <h3 style={{ margin:"0 0 14px",fontSize:15,fontWeight:700,color:"#1e1b4b" }}>Speciality</h3>
              {SPECIALTIES.map(s=>(
                <button key={s} onClick={()=>setSpecialty(s)} style={{
                  display:"block",width:"100%",textAlign:"left",
                  padding:"8px 12px",borderRadius:10,border:"none",
                  background: specialty===s ? "#f5f3ff" : "transparent",
                  color: specialty===s ? "#7c3aed" : "#4b5563",
                  fontWeight: specialty===s ? 600 : 400,
                  fontSize:13.5,cursor:"pointer",marginBottom:2,
                  transition:"all 0.2s",
                }}>{s}</button>
              ))}
            </div>

            <div style={{ background:"white",borderRadius:16,padding:"20px 18px",boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
              <h3 style={{ margin:"0 0 14px",fontSize:15,fontWeight:700,color:"#1e1b4b" }}>Sort By</h3>
              {[["rating","⭐ Rating"],["experience","🏆 Experience"],["fee","💰 Lowest Fee"]].map(([val,label])=>(
                <button key={val} onClick={()=>setSortBy(val)} style={{
                  display:"block",width:"100%",textAlign:"left",
                  padding:"8px 12px",borderRadius:10,border:"none",
                  background: sortBy===val ? "#f5f3ff" : "transparent",
                  color: sortBy===val ? "#7c3aed" : "#4b5563",
                  fontWeight: sortBy===val ? 600 : 400,
                  fontSize:13.5,cursor:"pointer",marginBottom:2,
                }}>{label}</button>
              ))}
            </div>
          </aside>

          {/* Doctor cards */}
          <div style={{ flex:1 }}>
            {error && (
              <div style={{ background:"#fef3c7",border:"1px solid #f59e0b",borderRadius:12,padding:"12px 16px",marginBottom:20,fontSize:13,color:"#92400e" }}>
                ⚠️ Could not reach backend — showing demo data. Connect your backend to see real doctors.
              </div>
            )}

            {loading ? (
              <div style={{ display:"grid",gap:16 }}>
                {[1,2,3].map(i=>(
                  <div key={i} style={{ background:"white",borderRadius:16,padding:24,height:140,boxShadow:"0 2px 12px rgba(0,0,0,0.05)",animation:"pulse 1.5s infinite" }}/>
                ))}
              </div>
            ) : (
              <div style={{ display:"grid",gap:16 }}>
                {sorted.map(doc=>(
                  <DoctorCard key={doc._id||doc.id} doc={doc} onBook={()=>navigate(`/book/${doc._id||doc.id}`)} onView={()=>navigate(`/doctors/${doc._id||doc.id}`)}/>
                ))}
                {sorted.length === 0 && (
                  <div style={{ textAlign:"center",padding:"60px 0",color:"#9ca3af" }}>
                    <div style={{ fontSize:48,marginBottom:12 }}>🔍</div>
                    <p style={{ fontSize:16 }}>No doctors found. Try a different search.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function DoctorCard({ doc, onBook, onView }) {
  return (
    <div style={{ background:"white",borderRadius:16,padding:"20px 24px",boxShadow:"0 2px 12px rgba(0,0,0,0.05)",border:"1.5px solid #f5f3ff",display:"flex",alignItems:"center",gap:20,transition:"all 0.2s" }}
      onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 8px 24px rgba(124,58,237,0.10)"; e.currentTarget.style.borderColor="#ddd6fe"; }}
      onMouseLeave={e=>{ e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.05)"; e.currentTarget.style.borderColor="#f5f3ff"; }}
    >
      {/* Avatar */}
      <div style={{ width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:26,fontWeight:700,flexShrink:0 }}>
        {doc.name?.[0]||"D"}
      </div>

      {/* Info */}
      <div style={{ flex:1 }}>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:3 }}>
          <h3 style={{ margin:0,fontSize:16,fontWeight:700,color:"#1e1b4b" }}>{doc.name}</h3>
          {doc.isAvailable!==false && <span style={{ background:"#dcfce7",color:"#16a34a",fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:50 }}>Available</span>}
        </div>
        <p style={{ margin:"0 0 6px",color:"#7c3aed",fontSize:13.5,fontWeight:500 }}>{doc.specialization}</p>
        <div style={{ display:"flex",gap:16,color:"#6b7280",fontSize:13 }}>
          <span>🏆 {doc.experience||0} yrs exp</span>
          <span>⭐ {doc.rating||4.5}</span>
          {doc.fee && <span>💰 ₹{doc.fee} fee</span>}
          {doc.location && <span>📍 {doc.location}</span>}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display:"flex",flexDirection:"column",gap:8,flexShrink:0 }}>
        <button onClick={onBook} style={{ padding:"9px 20px",borderRadius:50,border:"none",background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"white",fontWeight:600,fontSize:13.5,cursor:"pointer",boxShadow:"0 4px 12px rgba(124,58,237,0.25)" }}>Book Now</button>
        <button onClick={onView} style={{ padding:"8px 20px",borderRadius:50,border:"1.5px solid #7c3aed",background:"white",color:"#7c3aed",fontWeight:600,fontSize:13,cursor:"pointer" }}>View Profile</button>
      </div>
    </div>
  );
}

// Demo data shown when backend not connected
const DEMO_DOCTORS = [
  { id:"1", name:"Dr. Priya Sharma",  specialization:"General Physician", experience:8,  rating:4.8, fee:500,  location:"Hisar",  isAvailable:true },
  { id:"2", name:"Dr. Rajesh Kumar",  specialization:"Cardiology",        experience:15, rating:4.9, fee:1000, location:"Delhi",  isAvailable:true },
  { id:"3", name:"Dr. Anita Singh",   specialization:"Dermatology",       experience:6,  rating:4.7, fee:600,  location:"Hisar",  isAvailable:false },
  { id:"4", name:"Dr. Suresh Mehta",  specialization:"Orthopaedics",      experience:12, rating:4.6, fee:800,  location:"Rohtak", isAvailable:true },
  { id:"5", name:"Dr. Meena Gupta",   specialization:"Paediatrics",       experience:9,  rating:4.8, fee:550,  location:"Hisar",  isAvailable:true },
];
