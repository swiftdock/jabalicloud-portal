import { useState } from 'react';
import { supabase } from '../supabase';

export default function Settings({ session }) {
  const [newPassword, setNewPassword]   = useState('');
  const [saving, setSaving]             = useState(false);
  const [msg, setMsg]                   = useState('');

  async function changePassword(e) {
    e.preventDefault();
    setSaving(true); setMsg('');
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setMsg(error ? `Error: ${error.message}` : 'Password updated successfully!');
    if (!error) setNewPassword('');
    setSaving(false);
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20, maxWidth:640 }}>
      <div>
        <h2 style={{ fontSize:20, fontWeight:800, color:'#0f172a', marginBottom:4 }}>Account Settings</h2>
        <p style={{ fontSize:14, color:'#64748b' }}>Manage your account details and security.</p>
      </div>

      {/* Profile info */}
      <div className="card" style={{ padding:28 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:'#0f172a', marginBottom:20 }}>Profile</h3>
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24 }}>
          <div style={{ width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg,#2563eb,#00b894)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:22, fontWeight:800 }}>
            {session?.user?.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize:16, fontWeight:700, color:'#0f172a' }}>{session?.user?.email?.split('@')[0]}</div>
            <div style={{ fontSize:13, color:'#64748b' }}>{session?.user?.email}</div>
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div>
            <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#94a3b8', marginBottom:6, textTransform:'uppercase', letterSpacing:'.06em' }}>Email Address</label>
            <div style={{ fontSize:14, color:'#0f172a', padding:'10px 14px', background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:10 }}>
              {session?.user?.email}
            </div>
          </div>
          <div>
            <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#94a3b8', marginBottom:6, textTransform:'uppercase', letterSpacing:'.06em' }}>Account ID</label>
            <div style={{ fontSize:13, color:'#64748b', fontFamily:'monospace', padding:'10px 14px', background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:10 }}>
              {session?.user?.id}
            </div>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="card" style={{ padding:28 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:'#0f172a', marginBottom:20 }}>Change Password</h3>
        <form onSubmit={changePassword} style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>New Password</label>
            <input className="input" type="password" value={newPassword}
              onChange={e => setNewPassword(e.target.value)} placeholder="Min. 8 characters"
              minLength={8} required />
          </div>
          {msg && (
            <div style={{ padding:'10px 14px', borderRadius:10, fontSize:13, fontWeight:500,
              background: msg.startsWith('Error') ? '#fef2f2' : '#ecfdf5',
              border: `1px solid ${msg.startsWith('Error') ? '#fecaca' : '#a7f3d0'}`,
              color: msg.startsWith('Error') ? '#dc2626' : '#065f46' }}>
              {msg}
            </div>
          )}
          <button type="submit" className="btn btn-primary" disabled={saving} style={{ alignSelf:'flex-start' }}>
            {saving ? 'Saving…' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Danger zone */}
      <div className="card" style={{ padding:28, borderColor:'#fecaca', background:'#fff9f9' }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:'#dc2626', marginBottom:8 }}>Sign Out</h3>
        <p style={{ fontSize:13, color:'#64748b', marginBottom:16 }}>Sign out from your JabaliCloud account on this device.</p>
        <button className="btn btn-danger" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
