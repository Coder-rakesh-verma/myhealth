import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { appointmentAPI, authAPI, isLoggedIn, removeToken } from "../services/api";

const STATUS_COLORS = {
  booked:    { bg:"#dbeafe", color:"#1d4ed8" },
  completed: { bg:"#dcfce7", color:"#16a34a" },
  cancelled: { bg:"#fee2e2", color:"#dc2626" },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user,         setUser]         = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [activeTab,    setActiveTab]    = useState("upcoming");

  useEffect(() => {
    if (!isLoggedIn()) { navigate("/login"); return; }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const profile = await authAPI.profile();
      setUser(profile);
      const appts = await appointmentAPI.getMyAppointments(profile.email);
      setAppointments(Array.isArray(appts) ? appts : []);
    } catch {
      setAppointments(DEMO_APPOINTMENTS);
      setUser({ name:"Rakesh Verma", email:"rakesh@gmail.com" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    try {
      await appointmentAPI.cancel(id);
      setAppointments(prev => prev.map(a => a._id===id ? {...a,status:"cancelled"} : a));
    } catch {
      alert("Could not cancel. Please try again.");
    }
  };

  const now   = new Date();
  const upcoming  = appointments.filter(a => a.status==="booked" && new Date(a.date) >= now);
  const past      = appointments.filter(a => a.status==="completed" || new Date(a.date) < now);
  const cancelled = appointments.filter(a => a.status==="cancelled");
  const shown     = activeTab==="upcoming" ? upcoming : activeTab==="past" ? past : cancelled;

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#f8f7ff",minHeight:"100vh" }}>
      <style>{`*{box-sizing:border-box;}body{margin:0;}`}</style>
      <Navbar />

      <main style={{ maxWidth:1000,margin:"0 auto",padding:"110px 24px 40px" }}>

        {/* Welcome banner */}
        <div style={{ background:"linear-gradient(135deg,#1e1b4b,#4c1d95)",borderRadius:20,padding:"28px 32px",marginBottom:28,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div>
            <p style={{ margin:"0 0 4px",color:"#a5b4fc",fontSize:13 }}>Welcome back 👋</p>
            <h1 style={{ margin:0,fontSize:22,color:"white",fontFamily:"'Georgia',serif" }}>{user?.name || "Loading..."}</h1>
            <p style={{ margin:"4px 0 0",color:"#a5b4fc",fontSize:13 }}>{user?.email}</p>
          </div>
          <div style={{ display:"flex",gap:12 }}>
            <button onClick={()=>navigate("/doctors")} style={{ padding:"9px 20px",borderRadius:50,border:"none",background:"linear-gradient(135deg,#a855f7,#7c3aed)",color:"white",fontWeight:600,fontSize:13.5,cursor:"pointer",boxShadow:"0 4px 14px rgba(124,58,237,0.4)" }}>
              + Book Appointment
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:28 }}>
          {[
            { label:"Total",     value:appointments.length, icon:"📋", color:"#7c3aed" },
            { label:"Upcoming",  value:upcoming.length,     icon:"📅", color:"#0891b2" },
            { label:"Completed", value:past.length,         icon:"✅", color:"#059669" },
          ].map(s=>(
            <div key={s.label} style={{ background:"white",borderRadius:14,padding:"18px 20px",boxShadow:"0 2px 12px rgba(0,0,0,0.05)",display:"flex",alignItems:"center",gap:14 }}>
              <div style={{ width:44,height:44,borderRadius:12,background:s.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>{s.icon}</div>
              <div>
                <p style={{ margin:0,fontSize:22,fontWeight:700,color:"#1e1b4b" }}>{s.value}</p>
                <p style={{ margin:0,fontSize:13,color:"#9ca3af" }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ background:"white",borderRadius:20,padding:"24px",boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
          <div style={{ display:"flex",gap:8,marginBottom:22 }}>
            {[["upcoming","Upcoming"],["past","Past"],["cancelled","Cancelled"]].map(([tab,label])=>(
              <button key={tab} onClick={()=>setActiveTab(tab)} style={{
                padding:"7px 18px",borderRadius:50,border:"none",fontSize:13.5,fontWeight:600,cursor:"pointer",
                background: activeTab===tab ? "#7c3aed" : "#f5f3ff",
                color: activeTab===tab ? "white" : "#7c3aed",
              }}>{label}</button>
            ))}
          </div>

          {loading ? (
            <p style={{ color:"#9ca3af",textAlign:"center",padding:"30px 0" }}>Loading appointments...</p>
          ) : shown.length === 0 ? (
            <div style={{ textAlign:"center",padding:"40px 0",color:"#9ca3af" }}>
              <div style={{ fontSize:44,marginBottom:10 }}>📭</div>
              <p style={{ fontSize:15 }}>No {activeTab} appointments</p>
              {activeTab==="upcoming" && <button onClick={()=>navigate("/doctors")} style={{ padding:"9px 20px",borderRadius:50,border:"none",background:"#7c3aed",color:"white",fontWeight:600,cursor:"pointer",marginTop:8 }}>Book Now</button>}
            </div>
          ) : (
            <div style={{ display:"grid",gap:14 }}>
              {shown.map(a=>{
                const sc = STATUS_COLORS[a.status] || STATUS_COLORS.booked;
                return (
                  <div key={a._id||a.id} style={{ borderRadius:14,border:"1.5px solid #f0f0f0",padding:"16px 20px",display:"flex",alignItems:"center",gap:16,background:"#fafafa" }}>
                    <div style={{ width:46,height:46,borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:18,flexShrink:0 }}>
                      {(a.doctor?.name||a.doctorName||"D")?.[0]}
                    </div>
                    <div style={{ flex:1 }}>
                      <h4 style={{ margin:"0 0 3px",fontSize:15,color:"#1e1b4b" }}>{a.doctor?.name||a.doctorName||"Doctor"}</h4>
                      <p style={{ margin:0,color:"#6b7280",fontSize:13 }}>📅 {a.date} &nbsp;⏰ {a.time} &nbsp;{a.type==="online"?"📱 Online":"🏥 In-clinic"}</p>
                    </div>
                    <span style={{ background:sc.bg,color:sc.color,fontSize:12,fontWeight:600,padding:"3px 10px",borderRadius:50 }}>{a.status}</span>
                    {a.status==="booked" && (
                      <button onClick={()=>handleCancel(a._id||a.id)} style={{ padding:"6px 14px",borderRadius:50,border:"1.5px solid #fca5a5",background:"white",color:"#dc2626",fontSize:12.5,fontWeight:600,cursor:"pointer" }}>Cancel</button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const DEMO_APPOINTMENTS = [
  { id:"1", doctorName:"Dr. Priya Sharma", date:"2026-04-05", time:"10:00 AM", status:"booked",    type:"offline" },
  { id:"2", doctorName:"Dr. Rajesh Kumar", date:"2026-03-20", time:"02:00 PM", status:"completed", type:"online" },
  { id:"3", doctorName:"Dr. Anita Singh",  date:"2026-03-15", time:"11:30 AM", status:"cancelled", type:"offline" },
];
