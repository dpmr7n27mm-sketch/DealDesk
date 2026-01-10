import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/AppShell'
import DealsListDashboard from './components/DealsListDashboard'
import DealCaseFile from './components/DealCaseFile'
import ActivityFeed from './components/ActivityFeed'
import ConnectionsManager from './components/ConnectionsManager'
import LinksTab from './components/LinksTab'
import StemsCodeManager from './components/StemsCodeManager'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import InviteSystem from './components/InviteSystem'
import CreatorSettings from './components/CreatorSettings'
import DeliveryControls from './components/DeliveryControls'
import EmailPreview from './components/EmailPreview'
import InstantAccess from './components/InstantAccess'
import RequestForms from './components/RequestForms'
import OneClickPages from './components/OneClickPages'
import BuyerDashboard from './components/BuyerDashboard'

export default function App() {
  return (
    <Routes>
      {/* Creator-facing routes wrapped in AppShell */}
      <Route path="/" element={<AppShell />}>
        <Route index element={<DealsListDashboard />} />
        <Route path="deals" element={<DealsListDashboard />} />
        <Route path="deals/:dealId" element={<DealCaseFile />} />
        <Route path="activity" element={<ActivityFeed />} />
        <Route path="connections" element={<ConnectionsManager />} />
        <Route path="links" element={<LinksTab />} />
        <Route path="stems" element={<StemsCodeManager />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="invites" element={<InviteSystem />} />
        <Route path="settings" element={<CreatorSettings />} />
        <Route path="delivery" element={<DeliveryControls />} />
        <Route path="email-preview" element={<EmailPreview />} />
      </Route>
      
      {/* Buyer-facing routes (standalone, no AppShell) */}
      <Route path="/store/:creatorId" element={<InstantAccess />} />
      <Route path="/request/:creatorId" element={<RequestForms />} />
      <Route path="/deal/:dealId/action" element={<OneClickPages />} />
      <Route path="/buyer" element={<BuyerDashboard />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
