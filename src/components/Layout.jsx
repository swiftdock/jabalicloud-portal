import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../supabase';

const NAV = [
  { href:'/',         icon:'◈', label:'Dashboard' },
  { href:'/hosting',  icon:'⬡', label:'Hosting' },
  { href:'/billing',  icon:'💳', label:'Billing' },
  { href:'/tickets',  icon:'🎫', label:'Support' },
  { href:'/deploy',   icon:'⚡', label:'Deploy Manager' },
  { href:'/settings', icon:'⚙', label:'Settings' },
];

export default function Layout({ session, children }) {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const name = session?.user?.email?.split('@')[0] || 'User';
  const initial = name[0].toUpperCase();

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f8fafc' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 68 : 240, flexShrink:0,
        background:'#0f172a', display:'flex', flexDirection:'column',
        transition:'width .2s', position:'sticky', top:0, height:'100vh', overflow:'hidden',
      }}>
        {/* Logo */}
        <div style={{ padding: collapsed ? '20px 16px' : '20px 20px', borderBottom:'1px solid rgba(255,255,255,.06)', display:'flex', alignItems:'center', justifyContent: collapsed ? 'center' : 'space-between', gap:12, minHeight:76 }}>
          {!collapsed && (
            <img src="https://jabalicloud.com/logo.png" alt="JabaliCloud"
              style={{ height:40, width:'auto', display:'block', filter:'brightness(0) invert(1)', opacity:.9 }} />
          )}
          {collapsed && <span style={{ fontSize:20 }}>☁</span>}
          <button onClick={() => setCollapsed(!collapsed)}
            style={{ background:'none', border:'none', color:'rgba(255,255,255,.3)', cursor:'pointer', padding:4, flexShrink:0, fontSize:16 }}>
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'12px 10px', display:'flex', flexDirection:'column', gap:2, overflowY:'auto' }}>
          {NAV.map(item => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} to={item.href}
                title={collapsed ? item.label : ''}
                style={{
                  display:'flex', alignItems:'center', gap:10,
                  padding: collapsed ? '10px' : '10px 12px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius:10, textDecoration:'none', transition:'all .15s',
                  background: active ? 'rgba(37,99,235,.2)' : 'transparent',
                  color: active ? '#60a5fa' : 'rgba(255,255,255,.45)',
                  fontWeight: active ? 600 : 400, fontSize:13,
                }}>
                <span style={{ fontSize:16, flexShrink:0 }}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && active && <span style={{ marginLeft:'auto', width:5, height:5, borderRadius:'50%', background:'#60a5fa', flexShrink:0 }} />}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding:'12px 10px', borderTop:'1px solid rgba(255,255,255,.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:10,
            background:'rgba(255,255,255,.04)', justifyContent: collapsed ? 'center' : 'flex-start' }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#2563eb,#00b894)',
              display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:13, fontWeight:700, flexShrink:0 }}>
              {initial}
            </div>
            {!collapsed && (
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,.8)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{name}</div>
                <button onClick={() => supabase.auth.signOut()}
                  style={{ fontSize:11, color:'rgba(255,255,255,.3)', background:'none', border:'none', cursor:'pointer', padding:0, marginTop:1 }}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>
        {/* Topbar */}
        <header style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'0 28px', height:60,
          display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:10 }}>
          <div>
            <h1 style={{ fontSize:17, fontWeight:700, color:'#0f172a', letterSpacing:'-.01em' }}>
              {NAV.find(n => pathname === n.href || (n.href !== '/' && pathname.startsWith(n.href)))?.label || 'Dashboard'}
            </h1>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ fontSize:12, color:'#64748b', display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#10b981', display:'inline-block' }} />
              All systems operational
            </div>
            <a href="https://jabalicloud.com" target="_blank" rel="noreferrer"
              style={{ fontSize:12, color:'#2563eb', fontWeight:600, textDecoration:'none' }}>
              jabalicloud.com ↗
            </a>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex:1, padding:28, maxWidth:1200, width:'100%' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
