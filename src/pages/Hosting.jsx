import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function Hosting() {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('deployments').select('*').then(({ data }) => {
      setDeployments(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <h2 style={{ fontSize:20, fontWeight:800, color:'#0f172a', marginBottom:4 }}>Hosting Accounts</h2>
          <p style={{ fontSize:14, color:'#64748b' }}>Your active hosting plans and deployed websites.</p>
        </div>
        <a href="https://jabalicloud.com/shared-hosting" target="_blank" rel="noreferrer"
          className="btn btn-primary" style={{ fontSize:13 }}>+ Add Hosting</a>
      </div>

      {loading ? (
        <div style={{ textAlign:'center', padding:48, color:'#94a3b8' }}>Loading...</div>
      ) : deployments.length === 0 ? (
        <div className="card" style={{ padding:64, textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>⬡</div>
          <h3 style={{ fontSize:18, fontWeight:700, color:'#0f172a', marginBottom:8 }}>No hosting accounts yet</h3>
          <p style={{ fontSize:14, color:'#64748b', marginBottom:24 }}>Get started with a hosting plan from JabaliCloud.</p>
          <a href="https://jabalicloud.com/shared-hosting" target="_blank" rel="noreferrer"
            className="btn btn-primary">View Hosting Plans →</a>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {deployments.map(d => (
            <div key={d.id} className="card" style={{ padding:'20px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                <div style={{ width:44, height:44, borderRadius:12, background:'linear-gradient(135deg,#eff6ff,#ecfdf5)', border:'1.5px solid #bfdbfe', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>🌐</div>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, color:'#0f172a' }}>{d.domain}</div>
                  <div style={{ fontSize:12, color:'#94a3b8', marginTop:2 }}>
                    {d.repo_full_name ? `⎇ ${d.repo_full_name}` : 'No repo linked'}
                    {d.branch && ` · ${d.branch}`}
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
                <span className="badge badge-green">Active</span>
                {d.repo_html_url && (
                  <span className="badge badge-purple">⎇ Linked</span>
                )}
                <span style={{ fontSize:12, color:'#94a3b8' }}>Last deploy: {d.last_deploy || 'Never'}</span>
                <a href={`https://${d.domain}`} target="_blank" rel="noreferrer"
                  className="btn btn-secondary" style={{ fontSize:12, padding:'6px 14px' }}>Visit ↗</a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* cPanel quick access */}
      <div className="card" style={{ padding:24 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:'#0f172a', marginBottom:16 }}>Quick Access</h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:10 }}>
          {[
            { icon:'🔧', label:'cPanel', href:'https://serv1.jabalicloud.com:2083' },
            { icon:'📧', label:'Webmail', href:'https://serv1.jabalicloud.com:2096' },
            { icon:'📊', label:'AWStats', href:'https://serv1.jabalicloud.com:2083' },
            { icon:'🔒', label:'SSL Manager', href:'https://serv1.jabalicloud.com:2083' },
            { icon:'💾', label:'File Manager', href:'https://serv1.jabalicloud.com:2083' },
            { icon:'🗄️', label:'phpMyAdmin', href:'https://serv1.jabalicloud.com:2083' },
          ].map(item => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer"
              style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 16px', borderRadius:12, background:'#f8fafc', border:'1px solid #e2e8f0', textDecoration:'none', transition:'all .15s' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor='#2563eb'; e.currentTarget.style.background='#eff6ff'; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.background='#f8fafc'; }}>
              <span style={{ fontSize:20 }}>{item.icon}</span>
              <span style={{ fontSize:13, fontWeight:600, color:'#0f172a' }}>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
