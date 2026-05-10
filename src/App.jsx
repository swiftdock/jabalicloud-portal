import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabase';
import Login from './pages/Login.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Hosting from './pages/Hosting.jsx';
import Billing from './pages/Billing.jsx';
import Tickets from './pages/Tickets.jsx';
import Deploy from './pages/Deploy.jsx';
import Settings from './pages/Settings.jsx';

function PrivateRoute({ session, children }) {
  if (session === undefined) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f8fafc' }}>
      <div style={{ width:36, height:36, border:'3px solid #2563eb', borderTopColor:'transparent', borderRadius:'50%', animation:'spin .7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
  return session ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s ?? null));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"          element={session ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/*" element={
          <PrivateRoute session={session}>
            <Layout session={session}>
              <Routes>
                <Route index         element={<Dashboard session={session} />} />
                <Route path="hosting"  element={<Hosting />} />
                <Route path="billing"  element={<Billing session={session} />} />
                <Route path="tickets"  element={<Tickets session={session} />} />
                <Route path="deploy"   element={<Deploy />} />
                <Route path="settings" element={<Settings session={session} />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
