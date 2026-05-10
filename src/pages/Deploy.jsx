export default function Deploy() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <div>
        <h2 style={{ fontSize:20, fontWeight:800, color:'#0f172a', marginBottom:4 }}>Deploy Manager</h2>
        <p style={{ fontSize:14, color:'#64748b' }}>Manage GitHub auto-deployments for your websites.</p>
      </div>

      <div className="card" style={{ padding:32, textAlign:'center' }}>
        <div style={{ width:80, height:80, borderRadius:20, background:'linear-gradient(135deg,#eff6ff,#ecfdf5)', border:'1.5px solid #bfdbfe', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, margin:'0 auto 20px' }}>⚡</div>
        <h3 style={{ fontSize:20, fontWeight:800, color:'#0f172a', marginBottom:8, letterSpacing:'-.01em' }}>Deploy Manager</h3>
        <p style={{ fontSize:14, color:'#64748b', maxWidth:420, margin:'0 auto 28px', lineHeight:1.65 }}>
          Link your GitHub repositories to your hosting accounts for automatic deployments on every push. Manage everything from one place.
        </p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <a href="https://deploy.jabalicloud.com" target="_blank" rel="noreferrer"
            className="btn btn-primary" style={{ fontSize:14, padding:'12px 28px' }}>
            Open Deploy Manager ↗
          </a>
          <a href="https://jabalicloud.com/contact" target="_blank" rel="noreferrer"
            className="btn btn-secondary" style={{ fontSize:14, padding:'12px 28px' }}>
            Get Help
          </a>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:14 }}>
        {[
          { icon:'⎇', title:'GitHub Integration', desc:'Connect your repos and deploy on every git push automatically.' },
          { icon:'🔗', title:'Webhook Support', desc:'Automatic webhooks created — no manual configuration needed.' },
          { icon:'📦', title:'npm Build Support', desc:'React, Vue, Next.js — we build and deploy your project automatically.' },
          { icon:'📋', title:'Deploy Logs', desc:'View build logs and deployment history in the deploy manager.' },
        ].map(f => (
          <div key={f.title} className="card" style={{ padding:22 }}>
            <div style={{ fontSize:28, marginBottom:12 }}>{f.icon}</div>
            <div style={{ fontSize:14, fontWeight:700, color:'#0f172a', marginBottom:6 }}>{f.title}</div>
            <div style={{ fontSize:13, color:'#64748b', lineHeight:1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
