import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI, saveToken } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [form,    setForm]    = useState({ email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await authAPI.login(form);
      saveToken(data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif",background:"linear-gradient(135deg,#f0eaff,#e8f5f0)",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
      <style>{`*{box-sizing:border-box;}body{margin:0;}`}</style>

      <div style={{ width:"100%",maxWidth:420 }}>

        {/* Logo */}
        <div style={{ textAlign:"center",marginBottom:28 }}>
          <div style={{ width:48,height:48,borderRadius:14,background:"linear-gradient(135deg,#7c3aed,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:900,fontSize:22,margin:"0 auto 12px",boxShadow:"0 6px 20px rgba(124,58,237,0.3)" }}>✚</div>
          <h1 style={{ margin:0,fontSize:22,fontFamily:"'Georgia',serif",color:"#1e1b4b" }}>Welcome back to <span style={{ color:"#7c3aed" }}>MyHealth</span></h1>
          <p style={{ margin:"6px 0 0",color:"#9ca3af",fontSize:14 }}>Sign in to manage your appointments</p>
        </div>

        {/* Card */}
        <div style={{ background:"white",borderRadius:20,padding:"32px 28px",boxShadow:"0 8px 32px rgba(124,58,237,0.10)" }}>
          <form onSubmit={handleSubmit}>
            {[
              { label:"Email Address", key:"email",    type:"email",    placeholder:"your@email.com" },
              { label:"Password",      key:"password", type:"password", placeholder:"Enter your password" },
            ].map(f=>(
              <div key={f.key} style={{ marginBottom:18 }}>
                <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#374151",marginBottom:7 }}>{f.label}</label>
                <input
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e=>setForm({...form,[f.key]:e.target.value})}
                  style={{ width:"100%",padding:"10px 14px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:14,outline:"none",transition:"border 0.2s" }}
                  onFocus={e=>e.target.style.borderColor="#7c3aed"}
                  onBlur={e=>e.target.style.borderColor="#e5e7eb"}
                />
              </div>
            ))}

            {error && (
              <div style={{ background:"#fef2f2",border:"1px solid #fecaca",borderRadius:10,padding:"10px 14px",fontSize:13,color:"#dc2626",marginBottom:16 }}>
                ❌ {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width:"100%",padding:"11px",borderRadius:50,border:"none",
              background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"white",
              fontWeight:700,fontSize:15,cursor:loading?"not-allowed":"pointer",
              boxShadow:"0 4px 16px rgba(124,58,237,0.28)",opacity:loading?0.7:1,
            }}>{loading?"Signing in...":"Sign In"}</button>
          </form>

          <p style={{ textAlign:"center",marginTop:20,fontSize:14,color:"#6b7280" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color:"#7c3aed",fontWeight:600,textDecoration:"none" }}>Sign Up</Link>
          </p>
        </div>

        <p style={{ textAlign:"center",marginTop:16 }}>
          <Link to="/" style={{ color:"#9ca3af",fontSize:13,textDecoration:"none" }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
