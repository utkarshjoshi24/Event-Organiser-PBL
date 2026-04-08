import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomeClubOverview from './pages/HomeClubOverview'
import AddClubOrEvent from './pages/AddClubOrEvent'
import ClubDashboard from './pages/ClubDashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Events from './pages/Events'
import Reports from './pages/Reports'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeClubOverview />} />
        <Route path="/add" element={<AddClubOrEvent />} />
        <Route path="/dashboard" element={<ClubDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<Events />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
