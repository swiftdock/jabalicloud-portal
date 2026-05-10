import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function Tickets({ session }) {
  const [tickets, setTickets] = useState([]);
  const [form, setForm]       = useState({ subject:'', category:'general', message:'' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]   = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!session?.user) return;
    supabase.from('tickets').select('*').eq('user_id', session.user.id).order('created_at', { ascending:false })
      .then(({ data }) => setTickets(data || []));
  }, [session]);

  async function submitTicket(e) {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from('tickets').insert({
      user_id: session.user.id,
      email: session.user.email,
      subject: form.subject,
      category: form.category,
      message: form.message,
      status: 'open',
    });
    if (!error) {
      setSuccess(true);
      setForm({ subject:'', category:'general', message:'' });
      setShowForm(false);
      const { data } = await supabase.from('tickets').select('*').eq('user_id', session.user.id).order('created_at', { ascending:false });
      setTickets(data || []);
      setTimeout(() => setSuccess(false), 4000);
    }
    setSubmitting(false);
  }

  const statusBadge = { open:'badge-blue', 'in-progress':'badge-amber', closed:'badge-gray', resolved:'badge-green' };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <h2 style={{ fontSize:20, fontWeight:800, color:'#0f172a', marginBottom:4 }}>Support Tickets</h2>
          <p style={{ fontSize:14, color:'#64748b' }}>Get help from our 24/7 support team.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary" style={{ fontSize:13 }}>
          {showForm ? '✕ Cancel' : '+ New Ticket'}
        </button>
      </div>

      {success && (
        <div style={{ padding:'14px 20px', background:'#ecfdf5', border:'1px solid #a7f3d0', borderRadius:12, fontSize:14, color:'#065f46', fontWeight:500 }}>
          ✓ Ticket submitted! Our team will respond within 2 hours.
        </div>
      )}

      {showForm && (
        <div className="card" style={{ padding:28 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:'#0f172a', marginBottom:20 }}>Submit a Support Ticket</h3>
          <form onSubmit={submitTicket} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Subject</label>
                <input className="input" value={form.subject} onChange={e=>setForm(p=>({...p,subject:e.target.value}))}
                  placeholder="Briefly describe your issue" required />
              </div>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Category</label>
                <select className="input" value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))}>
                  <option value="general">General</option>
                  <option value="billing">Billing</option>
                  <option value="hosting">Hosting / cPanel</option>
                  <option value="domain">Domain</option>
                  <option value="email">Email</option>
                  <option value="technical">Technical</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Message</label>
              <textarea className="input" rows={5} value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                placeholder="Describe your issue in detail..." required style={{ resize:'vertical' }} />
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit Ticket'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Tickets list */}
      <div className="card" style={{ padding:24 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:'#0f172a', marginBottom:16 }}>Your Tickets</h3>
        {tickets.length === 0 ? (
          <div style={{ textAlign:'center', padding:'40px 0', color:'#94a3b8' }}>
            <div style={{ fontSize:36, marginBottom:10 }}>🎫</div>
            <div style={{ fontSize:14 }}>No tickets yet. Our team is ready to help!</div>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {tickets.map(t => (
              <div key={t.id} style={{ padding:'16px 20px', background:'#f8fafc', borderRadius:12, border:'1px solid #e2e8f0', display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:'#0f172a', marginBottom:4 }}>{t.subject}</div>
                  <div style={{ fontSize:12, color:'#94a3b8' }}>
                    {t.category} · {new Date(t.created_at).toLocaleDateString()}
                  </div>
                  {t.message && <div style={{ fontSize:13, color:'#475569', marginTop:8, lineHeight:1.5 }}>{t.message.slice(0,120)}{t.message.length>120?'…':''}</div>}
                </div>
                <span className={`badge ${statusBadge[t.status] || 'badge-gray'}`} style={{ flexShrink:0 }}>
                  {t.status || 'open'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact options */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:14 }}>
        {[
          { icon:'💬', title:'Live Chat', desc:'Available 24/7', action:'Start Chat', color:'#2563eb' },
          { icon:'📧', title:'Email Support', desc:'support@jabalicloud.com', action:'Send Email', color:'#7c3aed', href:'mailto:support@jabalicloud.com' },
          { icon:'📞', title:'Phone Support', desc:'Enterprise plans', action:'Call Us', color:'#059669' },
        ].map(c => (
          <div key={c.title} className="card" style={{ padding:20 }}>
            <div style={{ fontSize:28, marginBottom:10 }}>{c.icon}</div>
            <div style={{ fontSize:14, fontWeight:700, color:'#0f172a', marginBottom:4 }}>{c.title}</div>
            <div style={{ fontSize:12, color:'#94a3b8', marginBottom:14 }}>{c.desc}</div>
            <a href={c.href || '#'} className="btn btn-secondary" style={{ fontSize:12, width:'100%', justifyContent:'center' }}>
              {c.action}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
