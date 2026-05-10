export default function Billing({ session }) {
  const plans = [
    { name:'Shared Hosting — Business', status:'Active', price:'$3.99/mo', next:'Jun 1, 2026', badge:'badge-green' },
  ];
  const invoices = [
    { id:'INV-001', date:'May 1, 2026', desc:'Shared Hosting — Business Plan', amount:'$3.99', status:'Paid', badge:'badge-green' },
    { id:'INV-000', date:'Apr 1, 2026', desc:'Shared Hosting — Business Plan', amount:'$3.99', status:'Paid', badge:'badge-green' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <div>
        <h2 style={{ fontSize:20, fontWeight:800, color:'#0f172a', marginBottom:4 }}>Billing & Invoices</h2>
        <p style={{ fontSize:14, color:'#64748b' }}>Manage your subscriptions and payment history.</p>
      </div>

      {/* Active plans */}
      <div className="card" style={{ padding:24 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:'#0f172a', marginBottom:16 }}>Active Plans</h3>
        {plans.map(p => (
          <div key={p.name} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 0', borderBottom:'1px solid #f1f5f9', flexWrap:'wrap', gap:10 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:'#0f172a' }}>{p.name}</div>
              <div style={{ fontSize:12, color:'#94a3b8', marginTop:2 }}>Renews {p.next} · {p.price}</div>
            </div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <span className={`badge ${p.badge}`}>{p.status}</span>
              <a href="https://jabalicloud.com/contact" className="btn btn-secondary" style={{ fontSize:12, padding:'6px 14px' }}>Upgrade</a>
            </div>
          </div>
        ))}
      </div>

      {/* Invoices */}
      <div className="card" style={{ padding:24 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:'#0f172a' }}>Invoice History</h3>
          <a href="https://billing.jabalicloud.com" target="_blank" rel="noreferrer"
            style={{ fontSize:12, color:'#2563eb', fontWeight:600, textDecoration:'none' }}>View in billing portal →</a>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
            <thead>
              <tr style={{ borderBottom:'2px solid #f1f5f9' }}>
                {['Invoice','Date','Description','Amount','Status',''].map(h => (
                  <th key={h} style={{ padding:'8px 12px', textAlign:'left', fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} style={{ borderBottom:'1px solid #f8fafc' }}>
                  <td style={{ padding:'12px', color:'#2563eb', fontWeight:600 }}>{inv.id}</td>
                  <td style={{ padding:'12px', color:'#64748b' }}>{inv.date}</td>
                  <td style={{ padding:'12px', color:'#0f172a' }}>{inv.desc}</td>
                  <td style={{ padding:'12px', fontWeight:700, color:'#0f172a' }}>{inv.amount}</td>
                  <td style={{ padding:'12px' }}><span className={`badge ${inv.badge}`}>{inv.status}</span></td>
                  <td style={{ padding:'12px' }}><button className="btn btn-ghost" style={{ fontSize:12, padding:'4px 10px' }}>Download</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment method */}
      <div className="card" style={{ padding:24, background:'linear-gradient(135deg,#eff6ff,#fff)', borderColor:'#bfdbfe' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:48, height:32, background:'linear-gradient(135deg,#2563eb,#00b894)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:11, fontWeight:700 }}>VISA</div>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:'#0f172a' }}>Payment on file</div>
              <div style={{ fontSize:12, color:'#64748b' }}>Manage via billing portal</div>
            </div>
          </div>
          <a href="https://billing.jabalicloud.com" target="_blank" rel="noreferrer"
            className="btn btn-secondary" style={{ fontSize:13 }}>Manage Payment</a>
        </div>
      </div>
    </div>
  );
}
