import { useState } from 'react';
import { supabase } from '../supabase';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError(err.message);
    setLoading(false);
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', display:'flex' }}>
      {/* Left brand panel */}
      <div style={{ width:440, background:'#0f172a', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'48px', flexShrink:0 }} className="hidden md:flex">
        <div>
          <img src="https://jabalicloud.com/logo.png" alt="JabaliCloud" style={{ height:56, width:'auto', marginBottom:48 }} />
          <h1 style={{ fontSize:32, fontWeight:900, color:'#fff', lineHeight:1.1, letterSpacing:'-.03em', marginBottom:16 }}>
            Manage your<br />
            <span style={{ background:'linear-gradient(135deg,#60a5fa,#34d399)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              hosting with ease.
            </span>
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.45)', lineHeight:1.7 }}>
            Access your hosting accounts, manage domains, view invoices, and get support — all in one place.
          </p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {[['⚡','LiteSpeed powered servers'],['🔒','SSL secured & DDoS protected'],['💬','24/7 expert support'],['🌍','African infrastructure']].map(([icon,text]) => (
            <div key={text} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'rgba(255,255,255,.4)' }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right login form */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'32px 24px' }}>
        <div style={{ width:'100%', maxWidth:400 }}>
          <div style={{ marginBottom:32 }}>
            <img src="https://jabalicloud.com/logo.png" alt="JabaliCloud" style={{ height:48, width:'auto', marginBottom:24, display:'block' }} className="md:hidden" />
            <h2 style={{ fontSize:26, fontWeight:800, color:'#0f172a', letterSpacing:'-.02em', marginBottom:6 }}>Welcome back</h2>
            <p style={{ fontSize:14, color:'#64748b' }}>Sign in to your JabaliCloud account</p>
          </div>

          <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Email address</label>
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="you@example.com" required />
            </div>
            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Password</label>
              <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)}
                placeholder="••••••••" required />
            </div>

            {error && (
              <div style={{ padding:'10px 14px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:10, fontSize:13, color:'#dc2626' }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ width:'100%', padding:'12px', fontSize:14, marginTop:4 }}>
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          <p style={{ textAlign:'center', fontSize:13, color:'#94a3b8', marginTop:24 }}>
            Need hosting?{' '}
            <a href="https://jabalicloud.com" style={{ color:'#2563eb', fontWeight:600, textDecoration:'none' }}>
              jabalicloud.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
