import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

function StatCard({ label, value, icon, color, href }) {
  const inner = (
    <div className="card" style={{ padding:'22px 24px', display:'flex', alignItems:'center', gap:16, transition:'box-shadow .2s, transform .2s' }}
      onMouseEnter={e => { if(href){e.currentTarget.style.boxShadow='0 6px 24px rgba(15,23,42,.1)'; e.currentTarget.style.transform='translateY(-2px)'; }}}
      onMouseLeave={e => { e.currentTarget.style.boxShadow=''; e.currentTarget.style.transform=''; }}>
      <div style={{ width:48, height:48, borderRadius:14, background:`${color}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize:24, fontWeight:800, color:'#0f172a', letterSpacing:'-.02em' }}>{value}</div>
        <div style={{ fontSize:13, color:'#64748b', marginTop:2 }}>{label}</div>
      </div>
    </div>
  );
  return href ? <Link to={href} style={{ textDecoration:'none', display:'block' }}>{inner}</Link> : inner;
}

export default function Dashboard({ session }) {
  const [deployments, setDeployments] = useState([]);
  const name = session?.user?.email?.split('@')[0] || 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  useEffect(() => {
    supabase.from('deployments').select('*').then(({ data }) => setDeployments(data || []));
  }, []);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      {/* Welcome */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <h2 style={{ fontSize:24, fontWeight:800, color:'#0f172a', letterSpacing:'-.02em', marginBottom:4 }}>
            {greeting}, {name} 👋
          </h2>
          <p style={{ fontSize:14, color:'#64748b' }}>Here's what's happening with your hosting today.</p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <Link to="/tickets" className="btn btn-secondary" style={{ fontSize:13 }}>Open Ticket</Link>
          <Link to="/hosting" className="btn btn-primary" style={{ fontSize:13 }}>View Hosting</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:14 }}>
        <StatCard label="Active Deployments" value={deployments.length} icon="⚡" color="#2563eb" href="/hosting" />
        <StatCard label="Server Uptime" value="99.9%" icon="🟢" color="#10b981" />
        <StatCard label="Open Tickets" value="0" icon="🎫" color="#7c3aed" href="/tickets" />
        <StatCard label="Next Invoice" value="—" icon="💳" color="#f59e0b" href="/billing" />
      </div>

      {/* Two columns */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        {/* Recent deployments */}
        <div className="card" style={{ padding:24 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
            <h3 style={{ fontSize:15, fontWeight:700, color:'#0f172a' }}>Active Deployments</h3>
            <Link to="/hosting" style={{ fontSize:12, color:'#2563eb', fontWeight:600, textDecoration:'none' }}>View all →</Link>
          </div>
          {deployments.length === 0 ? (
            <div style={{ textAlign:'center', padding:'32px 0', color:'#94a3b8', fontSize:13 }}>
              <div style={{ fontSize:32, marginBottom:8 }}>⚡</div>
              No deployments yet.<br />
              <Link to="/hosting" style={{ color:'#2563eb', fontWeight:600, textDecoration:'none' }}>Set one up →</Link>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {deployments.slice(0,5).map(d => (
                <div key={d.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #f1f5f9' }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:'#0f172a' }}>{d.domain}</div>
                    <div style={{ fontSize:11, color:'#94a3b8', marginTop:2 }}>⎇ {d.repo_full_name}</div>
                  </div>
                  <span className="badge badge-green">Active</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="card" style={{ padding:24 }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:'#0f172a', marginBottom:18 }}>Quick Actions</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[
              { icon:'⚡', label:'Manage Deployments',  href:'/deploy',   desc:'GitHub auto-deploy manager' },
              { icon:'📧', label:'Email Accounts',       href:'/hosting',  desc:'Manage email addresses' },
              { icon:'🔒', label:'SSL Certificates',     href:'/hosting',  desc:'View & renew SSL' },
              { icon:'💾', label:'Backups',              href:'/hosting',  desc:'Restore from backup' },
              { icon:'🎫', label:'Open Support Ticket',  href:'/tickets',  desc:'Get help from our team' },
            ].map(item => (
              <Link key={item.href+item.label} to={item.href} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderRadius:10, textDecoration:'none', transition:'background .15s' }}
                onMouseEnter={e=>e.currentTarget.style.background='#f8fafc'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <span style={{ fontSize:18, width:32, textAlign:'center', flexShrink:0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:'#0f172a' }}>{item.label}</div>
                  <div style={{ fontSize:11, color:'#94a3b8' }}>{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Server status banner */}
      <div className="card" style={{ padding:'18px 24px', background:'linear-gradient(135deg,#f0fdf4,#fff)', borderColor:'#a7f3d0', display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:'#10b981', display:'inline-block', animation:'pulse 2s infinite' }} />
          <span style={{ fontSize:13, fontWeight:700, color:'#065f46' }}>serv1.jabalicloud.com</span>
        </div>
        <div style={{ width:1, height:20, background:'#a7f3d0' }} />
        {[['Load','Normal'],['Uptime','99.9%'],['SSL','Valid'],['Support','Online']].map(([k,v]) => (
          <div key={k} style={{ fontSize:13, color:'#059669' }}>
            <span style={{ color:'#94a3b8', marginRight:4 }}>{k}:</span>{v}
          </div>
        ))}
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
      </div>
    </div>
  );
}
