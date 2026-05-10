import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function ResetPassword() {
  const [password,  setPassword]  = useState('');
  const [confirm,   setConfirm]   = useState('');
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [done,      setDone]      = useState(false);
  const [validLink, setValidLink] = useState(true);

  useEffect(() => {
    // Check if we have a valid session from the reset link
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) setValidLink(false);
    });
  }, []);

  async function handleReset(e) {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 8)  { setError('Password must be at least 8 characters'); return; }
    setError(''); setLoading(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    if (err) { setError(err.message); }
    else { setDone(true); }
    setLoading(false);
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ width:'100%', maxWidth:400 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <img src="https://jabalicloud.com/logo.png" alt="JabaliCloud" style={{ height:48, width:'auto', display:'block', margin:'0 auto 20px' }} />
          <h2 style={{ fontSize:24, fontWeight:800, color:'#0f172a', marginBottom:6 }}>Set New Password</h2>
          <p style={{ fontSize:14, color:'#64748b' }}>Enter your new password below.</p>
        </div>

        {!validLink ? (
          <div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:14, padding:28, textAlign:'center' }}>
            <div style={{ fontSize:36, marginBottom:12 }}>⚠️</div>
            <div style={{ fontSize:15, fontWeight:600, color:'#991b1b', marginBottom:8 }}>Invalid or expired link</div>
            <div style={{ fontSize:13, color:'#64748b', marginBottom:20 }}>This password reset link has expired or already been used.</div>
            <a href="/login" style={{ display:'inline-block', background:'#fff', border:'1.5px solid #e2e8f0', borderRadius:10, padding:'10px 24px', fontSize:13, fontWeight:600, color:'#0f172a', textDecoration:'none' }}>
              Back to Sign In
            </a>
          </div>
        ) : done ? (
          <div style={{ background:'#ecfdf5', border:'1px solid #a7f3d0', borderRadius:14, padding:28, textAlign:'center' }}>
            <div style={{ fontSize:36, marginBottom:12 }}>✅</div>
            <div style={{ fontSize:15, fontWeight:600, color:'#065f46', marginBottom:8 }}>Password updated!</div>
            <div style={{ fontSize:13, color:'#64748b', marginBottom:20 }}>Your new password has been saved successfully.</div>
            <a href="/" style={{ display:'inline-block', background:'linear-gradient(135deg,#2563eb,#00b894)', color:'#fff', borderRadius:10, padding:'10px 28px', fontSize:13, fontWeight:600, textDecoration:'none' }}>
              Go to Dashboard →
            </a>
          </div>
        ) : (
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:32, boxShadow:'0 2px 12px rgba(15,23,42,.06)' }}>
            <form onSubmit={handleReset} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>New Password</label>
                <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)}
                  placeholder="Min. 8 characters" minLength={8} required />
              </div>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Confirm Password</label>
                <input className="input" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)}
                  placeholder="Repeat new password" required />
              </div>
              {error && (
                <div style={{ padding:'10px 14px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:10, fontSize:13, color:'#dc2626' }}>
                  {error}
                </div>
              )}
              <button type="submit" className="btn btn-primary" disabled={loading}
                style={{ width:'100%', padding:'13px', fontSize:14 }}>
                {loading ? 'Updating…' : 'Set New Password →'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
