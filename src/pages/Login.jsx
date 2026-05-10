import { useState } from 'react';
import { supabase } from '../supabase';

export default function Login() {
  const [mode,     setMode]     = useState('login'); // 'login' | 'signup' | 'verify'
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [name,     setName]     = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError(err.message);
    setLoading(false);
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    const { data, error: err } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name } },
    });
    if (err) {
      setError(err.message);
    } else {
      // Create profile row
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email,
          full_name: name,
        });
      }
      setMode('verify');
    }
    setLoading(false);
  }

  const isLogin  = mode === 'login';
  const isSignup = mode === 'signup';
  const isVerify = mode === 'verify';

  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', display:'flex' }}>
      {/* Left brand panel */}
      <div style={{ width:440, background:'#0f172a', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'48px', flexShrink:0, position:'relative', overflow:'hidden' }}
        className="hidden md:flex">
        {/* Gradient glow */}
        <div style={{ position:'absolute', top:-80, right:-80, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(37,99,235,.2) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div>
          <img src="https://jabalicloud.com/logo.png" alt="JabaliCloud"
            style={{ height:52, width:'auto', marginBottom:48, filter:'brightness(0) invert(1)', opacity:.9 }} />
          <h1 style={{ fontSize:30, fontWeight:900, color:'#fff', lineHeight:1.1, letterSpacing:'-.03em', marginBottom:14 }}>
            {isSignup ? 'Join JabaliCloud' : 'Welcome back.'}
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.4)', lineHeight:1.7 }}>
            {isSignup
              ? 'Create your account to manage your hosting, domains, and deployments.'
              : 'Access your hosting accounts, invoices, and support — all in one place.'}
          </p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {[['⚡','LiteSpeed powered servers'],['🔒','SSL secured & DDoS protected'],['💬','24/7 expert support'],['🌍','African infrastructure']].map(([icon,text]) => (
            <div key={text} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'rgba(255,255,255,.35)' }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'32px 24px' }}>
        <div style={{ width:'100%', maxWidth:420 }}>

          {/* Verify email state */}
          {isVerify ? (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:56, marginBottom:16 }}>📧</div>
              <h2 style={{ fontSize:24, fontWeight:800, color:'#0f172a', marginBottom:8 }}>Check your email</h2>
              <p style={{ fontSize:14, color:'#64748b', lineHeight:1.7, marginBottom:24 }}>
                We sent a confirmation link to <strong>{email}</strong>.<br />
                Click the link to activate your account.
              </p>
              <button className="btn btn-secondary" style={{ width:'100%', fontSize:14, padding:'12px' }}
                onClick={() => setMode('login')}>
                Back to Sign In
              </button>
            </div>
          ) : (
            <>
              {/* Mobile logo */}
              <img src="https://jabalicloud.com/logo.png" alt="JabaliCloud"
                style={{ height:44, width:'auto', marginBottom:24, display:'block' }} className="md:hidden" />

              {/* Tab switcher */}
              <div style={{ display:'flex', background:'#f1f5f9', borderRadius:12, padding:4, marginBottom:28 }}>
                {[['login','Sign In'],['signup','Create Account']].map(([m,label]) => (
                  <button key={m} onClick={() => { setMode(m); setError(''); }}
                    style={{ flex:1, padding:'9px', borderRadius:9, border:'none', cursor:'pointer', fontSize:13, fontWeight:600, transition:'all .2s',
                      background: mode===m ? '#fff' : 'transparent',
                      color: mode===m ? '#0f172a' : '#64748b',
                      boxShadow: mode===m ? '0 1px 4px rgba(15,23,42,.08)' : 'none' }}>
                    {label}
                  </button>
                ))}
              </div>

              <div style={{ marginBottom:24 }}>
                <h2 style={{ fontSize:22, fontWeight:800, color:'#0f172a', letterSpacing:'-.02em', marginBottom:4 }}>
                  {isLogin ? 'Sign in to your account' : 'Create your account'}
                </h2>
                <p style={{ fontSize:14, color:'#64748b' }}>
                  {isLogin ? 'Manage your JabaliCloud hosting.' : 'Start managing your hosting today.'}
                </p>
              </div>

              <form onSubmit={isLogin ? handleLogin : handleSignup}
                style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {isSignup && (
                  <div>
                    <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Full Name</label>
                    <input className="input" value={name} onChange={e=>setName(e.target.value)}
                      placeholder="John Smith" required />
                  </div>
                )}
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Email Address</label>
                  <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="you@example.com" required />
                </div>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>
                    Password {isSignup && <span style={{ fontWeight:400, color:'#94a3b8' }}>(min. 8 characters)</span>}
                  </label>
                  <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)}
                    placeholder="••••••••" minLength={isSignup ? 8 : undefined} required />
                </div>

                {error && (
                  <div style={{ padding:'10px 14px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:10, fontSize:13, color:'#dc2626' }}>
                    {error}
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={loading}
                  style={{ width:'100%', padding:'13px', fontSize:14 }}>
                  {loading ? (isLogin ? 'Signing in…' : 'Creating account…') : (isLogin ? 'Sign In →' : 'Create Account →')}
                </button>
              </form>

              {isSignup && (
                <p style={{ fontSize:12, color:'#94a3b8', textAlign:'center', marginTop:16, lineHeight:1.6 }}>
                  By creating an account you agree to our{' '}
                  <a href="https://jabalicloud.com" style={{ color:'#2563eb', textDecoration:'none' }}>Terms of Service</a>
                </p>
              )}

              <p style={{ textAlign:'center', fontSize:13, color:'#94a3b8', marginTop:20 }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => { setMode(isLogin?'signup':'login'); setError(''); }}
                  style={{ background:'none', border:'none', color:'#2563eb', fontWeight:600, cursor:'pointer', fontSize:13 }}>
                  {isLogin ? 'Sign up free' : 'Sign in'}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
