import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const LAB_TESTS = [
  { id:1, name:"Complete Blood Count (CBC)", desc:"Checks RBC, WBC, platelets. Detects anemia, infections.", price:299,  time:"6 hrs",  popular:true  },
  { id:2, name:"Blood Sugar (Fasting)",      desc:"Diagnoses diabetes and pre-diabetes conditions.",          price:99,   time:"4 hrs",  popular:true  },
  { id:3, name:"Lipid Profile",             desc:"Cholesterol & triglycerides — heart health checkup.",      price:449,  time:"12 hrs", popular:false },
  { id:4, name:"Thyroid Panel (T3 T4 TSH)", desc:"Full thyroid function test for hormonal balance.",         price:549,  time:"12 hrs", popular:true  },
  { id:5, name:"Liver Function Test (LFT)", desc:"Tests for liver damage, jaundice, hepatitis.",            price:399,  time:"8 hrs",  popular:false },
  { id:6, name:"Kidney Function Test",      desc:"Checks creatinine, urea — kidney health assessment.",     price:399,  time:"8 hrs",  popular:false },
  { id:7, name:"HbA1c (Diabetes 3-month)", desc:"Average blood sugar over past 3 months.",                  price:349,  time:"6 hrs",  popular:false },
  { id:8, name:"Vitamin D Test",            desc:"Checks Vitamin D deficiency — very common in India.",      price:699,  time:"24 hrs", popular:true  },
  { id:9, name:"Vitamin B12",               desc:"Essential for nerve function and energy levels.",          price:499,  time:"24 hrs", popular:false },
  { id:10,name:"Full Body Checkup",         desc:"60+ tests including CBC, sugar, thyroid, liver, kidney.", price:1499, time:"24 hrs", popular:true  },
];

export default function Labtests() {
  const [cart,     setCart]     = useState([]);
  const [filter,   setFilter]   = useState("all");
  const navigate   = useNavigate();

  const addToCart  = (test) => { if (!cart.find(t=>t.id===test.id)) setCart([...cart,test]); };
  const removeCart = (id)   => setCart(cart.filter(t=>t.id!==id));
  const total      = cart.reduce((s,t)=>s+t.price,0);

  const shown = filter==="popular" ? LAB_TESTS.filter(t=>t.popular) : LAB_TESTS;

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#f8f7ff",minHeight:"100vh" }}>
      <style>{`*{box-sizing:border-box;}body{margin:0;}`}</style>
      <Navbar />

      <main style={{ maxWidth:1400,margin:"0 auto",padding:"110px 40px 40px" }}>

        {/* Header */}
        <div style={{ background:"linear-gradient(135deg,#1e1b4b,#312e81)",borderRadius:20,padding:"32px 40px",marginBottom:28,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div>
            <span style={{ display:"inline-block",padding:"3px 12px",borderRadius:50,background:"rgba(167,139,250,0.25)",color:"#c4b5fd",fontSize:11,fontWeight:700,letterSpacing:1.4,marginBottom:10 }}>HOME COLLECTION AVAILABLE</span>
            <h1 style={{ margin:"0 0 6px",fontSize:24,color:"white",fontFamily:"'Georgia',serif" }}>Book Lab Tests Online</h1>
            <p style={{ margin:0,color:"#a5b4fc",fontSize:14 }}>600+ NABL certified labs · Reports in 4-24 hrs · Home sample collection</p>
          </div>
          <div style={{ display:"flex",gap:24,color:"white",textAlign:"center" }}>
            {[["🏆","NABL Certified"],["🏠","Home Collection"],["⚡","Fast Reports"]].map(([icon,label])=>(
              <div key={label}><div style={{ fontSize:24 }}>{icon}</div><div style={{ fontSize:12,color:"#a5b4fc",marginTop:4 }}>{label}</div></div>
            ))}
          </div>
        </div>

        <div style={{ display:"flex",gap:24 }}>

          {/* Tests list */}
          <div style={{ flex:1 }}>
            {/* Filter */}
            <div style={{ display:"flex",gap:8,marginBottom:20 }}>
              {[["all","All Tests"],["popular","Popular"]].map(([val,label])=>(
                <button key={val} onClick={()=>setFilter(val)} style={{
                  padding:"7px 18px",borderRadius:50,border:"none",
                  background: filter===val ? "#7c3aed" : "white",
                  color: filter===val ? "white" : "#4b5563",
                  fontWeight:600,fontSize:13.5,cursor:"pointer",
                  boxShadow:"0 2px 8px rgba(0,0,0,0.06)",
                }}>{label}</button>
              ))}
            </div>

            <div style={{ display:"grid",gap:14 }}>
              {shown.map(test=>{
                const inCart = cart.find(t=>t.id===test.id);
                return (
                  <div key={test.id} style={{ background:"white",borderRadius:16,padding:"18px 22px",boxShadow:"0 2px 10px rgba(0,0,0,0.05)",border:"1.5px solid #f5f3ff",display:"flex",alignItems:"center",gap:16,transition:"all 0.2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor="#ddd6fe"; e.currentTarget.style.boxShadow="0 6px 20px rgba(124,58,237,0.09)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor="#f5f3ff"; e.currentTarget.style.boxShadow="0 2px 10px rgba(0,0,0,0.05)"; }}
                  >
                    <div style={{ width:48,height:48,borderRadius:12,background:"#f5f3ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>🧪</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:3 }}>
                        <h3 style={{ margin:0,fontSize:15,fontWeight:700,color:"#1e1b4b" }}>{test.name}</h3>
                        {test.popular && <span style={{ background:"#fef3c7",color:"#d97706",fontSize:11,fontWeight:600,padding:"1px 8px",borderRadius:50 }}>Popular</span>}
                      </div>
                      <p style={{ margin:"0 0 4px",color:"#6b7280",fontSize:13 }}>{test.desc}</p>
                      <span style={{ color:"#9ca3af",fontSize:12 }}>⏱ Reports in {test.time}</span>
                    </div>
                    <div style={{ textAlign:"right",flexShrink:0 }}>
                      <p style={{ margin:"0 0 8px",fontSize:18,fontWeight:700,color:"#1e1b4b" }}>₹{test.price}</p>
                      <button onClick={()=>inCart?removeCart(test.id):addToCart(test)} style={{
                        padding:"7px 16px",borderRadius:50,border:"1.5px solid",fontSize:13,fontWeight:600,cursor:"pointer",transition:"all 0.2s",
                        borderColor: inCart?"#dc2626":"#7c3aed",
                        background:  inCart?"#fee2e2":"#f5f3ff",
                        color:       inCart?"#dc2626":"#7c3aed",
                      }}>{inCart?"✓ Added":"+ Add"}</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart */}
          <aside style={{ width:280,flexShrink:0 }}>
            <div style={{ background:"white",borderRadius:16,padding:"20px",boxShadow:"0 2px 12px rgba(0,0,0,0.05)",position:"sticky",top:110 }}>
              <h3 style={{ margin:"0 0 16px",fontSize:15,fontWeight:700,color:"#1e1b4b" }}>🛒 Selected Tests ({cart.length})</h3>

              {cart.length === 0 ? (
                <p style={{ color:"#9ca3af",fontSize:13,textAlign:"center",padding:"20px 0" }}>No tests selected yet</p>
              ) : (
                <>
                  {cart.map(t=>(
                    <div key={t.id} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #f5f5f5" }}>
                      <div>
                        <p style={{ margin:0,fontSize:13,fontWeight:500,color:"#1e1b4b" }}>{t.name}</p>
                        <p style={{ margin:0,fontSize:12,color:"#7c3aed" }}>₹{t.price}</p>
                      </div>
                      <button onClick={()=>removeCart(t.id)} style={{ background:"none",border:"none",color:"#dc2626",cursor:"pointer",fontSize:16 }}>✕</button>
                    </div>
                  ))}

                  <div style={{ borderTop:"2px solid #f5f3ff",marginTop:12,paddingTop:12 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",marginBottom:16 }}>
                      <span style={{ fontWeight:700,color:"#1e1b4b" }}>Total</span>
                      <span style={{ fontWeight:700,fontSize:18,color:"#7c3aed" }}>₹{total}</span>
                    </div>
                    <button onClick={()=>navigate("/login")} style={{
                      width:"100%",padding:"11px",borderRadius:50,border:"none",
                      background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"white",
                      fontWeight:700,fontSize:14,cursor:"pointer",
                      boxShadow:"0 4px 14px rgba(124,58,237,0.28)",
                    }}>Book Now →</button>
                    <p style={{ textAlign:"center",fontSize:12,color:"#9ca3af",marginTop:10 }}>🏠 Free home sample collection</p>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
