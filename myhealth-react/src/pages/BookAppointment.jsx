import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { doctorAPI, appointmentAPI, isLoggedIn } from "../services/api";

const DEMO_DOCTOR = { _id:"1", name:"Dr. Priya Sharma", specialization:"General Physician", experience:8, rating:4.8, fee:500 };

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate     = useNavigate();

  const [doctor,      setDoctor]      = useState(null);
  const [date,        setDate]        = useState("");
  const [slots,       setSlots]       = useState([]);
  const [selectedSlot,setSelectedSlot]= useState("");
  const [form,        setForm]        = useState({ patientName:"", patientEmail:"", patientPhone:"", notes:"", type:"offline" });
  const [loading,     setLoading]     = useState(false);
  const [slotsLoading,setSlotsLoading]= useState(false);
  const [success,     setSuccess]     = useState(false);
  const [error,       setError]       = useState("");

  // Min date = today
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    window.scrollTo(0, 0); // <-- Add this here
    fetchDoctor();
    if (!isLoggedIn()) navigate("/login");
  }, []);

  useEffect(() => {
    if (date && doctorId) fetchSlots();
  }, [date]);

  const fetchDoctor = async () => {
    try {
      const data = await doctorAPI.getOne(doctorId);
      setDoctor(data);
    } catch {
      setDoctor(DEMO_DOCTOR);
    }
  };

  const fetchSlots = async () => {
    setSlotsLoading(true);
    try {
      const data = await appointmentAPI.getAvailableSlots(doctorId, date);
      setSlots(data.availableSlots || []);
    } catch {
      // fallback demo slots
      setSlots(["09:00 AM","09:30 AM","10:00 AM","11:00 AM","11:30 AM","02:00 PM","03:00 PM","04:00 PM"]);
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) { setError("Please select a time slot"); return; }
    
    // NEW CHECK: Add this here
    if (form.patientPhone.length < 10) { 
        setError("Please enter a valid 10-digit phone number"); 
        return; 
    }
    setLoading(true);
    setError("");
    try {
      await appointmentAPI.create({
        doctor: doctorId,
        date, time: selectedSlot,
        patientName:  form.patientName,
        patientEmail: form.patientEmail,
        patientPhone: form.patientPhone,
        notes:        form.notes,
        type:         form.type,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#f8f7ff",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center" }}>
      <div style={{ textAlign:"center",background:"white",borderRadius:20,padding:"48px 40px",boxShadow:"0 8px 32px rgba(0,0,0,0.08)",maxWidth:440 }}>
        <div style={{ fontSize:64,marginBottom:16 }}>✅</div>
        <h2 style={{ margin:"0 0 10px",color:"#1e1b4b",fontFamily:"'Georgia',serif" }}>Appointment Booked!</h2>
        <p style={{ color:"#6b7280",marginBottom:8 }}>Your appointment with <strong>{doctor?.name}</strong></p>
        <p style={{ color:"#7c3aed",fontWeight:600,marginBottom:24 }}>{date} at {selectedSlot}</p>
        <div style={{ display:"flex",gap:12,justifyContent:"center" }}>
          <button onClick={()=>navigate("/dashboard")} style={{ padding:"10px 22px",borderRadius:50,border:"none",background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"white",fontWeight:600,cursor:"pointer" }}>My Appointments</button>
          <button onClick={()=>navigate("/")} style={{ padding:"10px 22px",borderRadius:50,border:"1.5px solid #7c3aed",background:"white",color:"#7c3aed",fontWeight:600,cursor:"pointer" }}>Go Home</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#f8f7ff",minHeight:"100vh" }}>
      <style>{`*{box-sizing:border-box;}body{margin:0;}`}</style>
      <Navbar />

      <main style={{ maxWidth:900,margin:"0 auto",padding:"110px 24px 40px" }}>
        <h1 style={{ margin:"0 0 24px",fontSize:26,fontFamily:"'Georgia',serif",color:"#1e1b4b" }}>Book Appointment</h1>

        {/* Doctor mini card */}
        {doctor && (
          <div style={{ background:"white",borderRadius:16,padding:"18px 22px",boxShadow:"0 2px 12px rgba(0,0,0,0.05)",border:"1.5px solid #ede9fe",marginBottom:24,display:"flex",alignItems:"center",gap:16 }}>
            <div style={{ width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:22,fontWeight:700 }}>{doctor.name?.[0]}</div>
            <div>
              <h3 style={{ margin:"0 0 3px",fontSize:16,color:"#1e1b4b" }}>{doctor.name}</h3>
              <p style={{ margin:0,color:"#7c3aed",fontSize:13.5 }}>{doctor.specialization} · {doctor.experience} yrs · ₹{doctor.fee} fee</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>

            {/* Left: Patient details */}
            <div style={{ background:"white",borderRadius:16,padding:"24px",boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
              <h3 style={{ margin:"0 0 18px",fontSize:16,fontWeight:700,color:"#1e1b4b" }}>Patient Details</h3>

              {[
                { label:"Full Name *",    key:"patientName",  type:"text",  placeholder:"Enter your name" },
                { label:"Email *",        key:"patientEmail", type:"email", placeholder:"your@email.com" },
                { label:"Phone Number *", key:"patientPhone", type:"tel",   placeholder:"10-digit number" },
              ].map(f=>(
                <div key={f.key} style={{ marginBottom:16 }}>
                  <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6 }}>{f.label}</label>
                  <input
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e=>setForm({...form,[f.key]:e.target.value})}
                    style={{ width:"100%",padding:"9px 13px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:14,outline:"none",transition:"border 0.2s" }}
                    onFocus={e=>e.target.style.borderColor="#7c3aed"}
                    onBlur={e=>e.target.style.borderColor="#e5e7eb"}
                  />
                </div>
              ))}

              {/* Appointment type */}
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6 }}>Appointment Type</label>
                <div style={{ display:"flex",gap:10 }}>
                  {["offline","online"].map(t=>(
                    <button key={t} type="button" onClick={()=>setForm({...form,type:t})} style={{
                      flex:1,padding:"9px",borderRadius:10,border:"1.5px solid",
                      borderColor: form.type===t ? "#7c3aed" : "#e5e7eb",
                      background: form.type===t ? "#f5f3ff" : "white",
                      color: form.type===t ? "#7c3aed" : "#6b7280",
                      fontWeight:600,fontSize:13.5,cursor:"pointer",
                    }}>{t==="offline"?"🏥 In-clinic":"📱 Online"}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6 }}>Notes (optional)</label>
                <textarea
                  placeholder="Describe your symptoms..."
                  value={form.notes}
                  onChange={e=>setForm({...form,notes:e.target.value})}
                  rows={3}
                  style={{ width:"100%",padding:"9px 13px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:14,outline:"none",resize:"vertical",fontFamily:"inherit" }}
                  onFocus={e=>e.target.style.borderColor="#7c3aed"}
                  onBlur={e=>e.target.style.borderColor="#e5e7eb"}
                />
              </div>
            </div>

            {/* Right: Date & Slot picker */}
            <div style={{ background:"white",borderRadius:16,padding:"24px",boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
              <h3 style={{ margin:"0 0 18px",fontSize:16,fontWeight:700,color:"#1e1b4b" }}>Pick Date & Time</h3>

              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:6 }}>Select Date *</label>
                <input
                  type="date"
                  required
                  min={today}
                  value={date}
                  onChange={e=>{ setDate(e.target.value); setSelectedSlot(""); }}
                  style={{ width:"100%",padding:"9px 13px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:14,outline:"none" }}
                />
              </div>

              {date && (
                <div>
                  <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:10 }}>Available Slots</label>
                  {slotsLoading ? (
                    <p style={{ color:"#9ca3af",fontSize:13 }}>Loading slots...</p>
                  ) : slots.length === 0 ? (
                    <p style={{ color:"#ef4444",fontSize:13 }}>No slots available for this date.</p>
                  ) : (
                    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                      {slots.map(slot=>(
                        <button key={slot} type="button" onClick={()=>setSelectedSlot(slot)} style={{
                          padding:"9px 10px",borderRadius:10,border:"1.5px solid",
                          borderColor: selectedSlot===slot ? "#7c3aed" : "#e5e7eb",
                          background:  selectedSlot===slot ? "#7c3aed" : "white",
                          color:       selectedSlot===slot ? "white" : "#374151",
                          fontSize:13,fontWeight:selectedSlot===slot?600:400,cursor:"pointer",
                          transition:"all 0.15s",
                        }}>{slot}</button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Summary */}
              {selectedSlot && (
                <div style={{ marginTop:20,background:"#f5f3ff",borderRadius:12,padding:"14px 16px",border:"1px solid #ddd6fe" }}>
                  <p style={{ margin:0,fontSize:13,color:"#1e1b4b" }}>📅 <strong>{date}</strong> at <strong>{selectedSlot}</strong></p>
                  <p style={{ margin:"4px 0 0",fontSize:13,color:"#7c3aed" }}>💰 Consultation fee: <strong>₹{doctor?.fee||500}</strong></p>
                </div>
              )}
            </div>
          </div>

          {error && <p style={{ color:"#ef4444",fontSize:13,marginTop:16 }}>❌ {error}</p>}

          <button type="submit" disabled={loading} style={{
            marginTop:20,width:"100%",padding:"13px",borderRadius:50,border:"none",
            background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"white",
            fontWeight:700,fontSize:15,cursor:loading?"not-allowed":"pointer",
            boxShadow:"0 6px 20px rgba(124,58,237,0.3)",opacity:loading?0.7:1,
          }}>{loading?"Booking...":"Confirm Appointment"}</button>
        </form>
      </main>
    </div>
  );
}
