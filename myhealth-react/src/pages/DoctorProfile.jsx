import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { doctorAPI } from "../services/api";

const DEMO = { _id:"1", name:"Dr. Priya Sharma", specialization:"General Physician", experience:8, rating:4.8, fee:500, location:"Hisar, Haryana", about:"Dr. Priya Sharma is a highly experienced General Physician with over 8 years of practice. She specializes in preventive care, chronic disease management, and routine health checkups.", education:["MBBS - AIIMS Delhi","MD - Internal Medicine, PGI Chandigarh"], languages:["Hindi","English"], isAvailable:true };

export default function DoctorProfile() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const [doc, setDoc] = useState(null);

  useEffect(()=>{
    doctorAPI.getOne(id).then(setDoc).catch(()=>setDoc(DEMO));
  },[id]);

  if (!doc) return <div style={{ display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",color:"#9ca3af" }}>Loading...</div>;

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#f8f7ff",minHeight:"100vh" }}>
      <style>{`*{box-sizing:border-box;}body{margin:0;}`}</style>
      <Navbar />
      <main style={{ maxWidth:900,margin:"0 auto",padding:"110px 24px 40px" }}>

        {/* Profile card */}
        <div style={{ background:"white",borderRadius:20,padding:"32px",boxShadow:"0 4px 20px rgba(0,0,0,0.07)",marginBottom:20,display:"flex",gap:24 }}>
          <div style={{ width:100,height:100,borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:36,fontWeight:700,flexShrink:0 }}>{doc.name?.[0]}</div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}>
              <h1 style={{ margin:0,fontSize:22,color:"#1e1b4b",fontFamily:"'Georgia',serif" }}>{doc.name}</h1>
              {doc.isAvailable && <span style={{ background:"#dcfce7",color:"#16a34a",fontSize:12,fontWeight:600,padding:"3px 10px",borderRadius:50 }}>Available</span>}
            </div>
            <p style={{ margin:"0 0 12px",color:"#7c3aed",fontSize:15,fontWeight:500 }}>{doc.specialization}</p>
            <div style={{ display:"flex",gap:20,color:"#6b7280",fontSize:14,flexWrap:"wrap" }}>
              <span>🏆 {doc.experience} yrs experience</span>
              <span>⭐ {doc.rating} rating</span>
              <span>💰 ₹{doc.fee} per consultation</span>
              {doc.location && <span>📍 {doc.location}</span>}
            </div>
            {doc.about && <p style={{ margin:"14px 0 0",color:"#4b5563",fontSize:14,lineHeight:1.6 }}>{doc.about}</p>}
          </div>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
          {/* Education */}
          {doc.education && (
            <div style={{ background:"white",borderRadius:16,padding:"22px",boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
              <h3 style={{ margin:"0 0 14px",fontSize:15,fontWeight:700,color:"#1e1b4b" }}>🎓 Education</h3>
              {doc.education.map((e,i)=>(<p key={i} style={{ margin:"0 0 8px",fontSize:14,color:"#4b5563",display:"flex",gap:8 }}><span style={{ color:"#7c3aed" }}>•</span>{e}</p>))}
            </div>
          )}
          {/* Languages */}
          {doc.languages && (
            <div style={{ background:"white",borderRadius:16,padding:"22px",boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
              <h3 style={{ margin:"0 0 14px",fontSize:15,fontWeight:700,color:"#1e1b4b" }}>🗣 Languages</h3>
              <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                {doc.languages.map(l=>(<span key={l} style={{ background:"#f5f3ff",color:"#7c3aed",padding:"4px 14px",borderRadius:50,fontSize:13,fontWeight:500 }}>{l}</span>))}
              </div>
            </div>
          )}
        </div>

        {/* Book button */}
        <button onClick={()=>navigate(`/book/${doc._id}`)} style={{
          marginTop:24,width:"100%",padding:"14px",borderRadius:50,border:"none",
          background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"white",
          fontWeight:700,fontSize:16,cursor:"pointer",
          boxShadow:"0 6px 20px rgba(124,58,237,0.3)",
        }}>Book Appointment with {doc.name}</button>
      </main>
    </div>
  );
}