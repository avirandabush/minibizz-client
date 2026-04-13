import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Layout from '../layout/Layout'

import CustomersPage from '@/features/customers/pages/CustomersPage'
import NewCustomer from '@/features/customers/pages/NewCustomer'
import CustomerDetails from '@/features/customers/pages/CustomerDetails'

import PaymentsPage from '@/features/payments/pages/PaymentsPage'
import NewPayment from '@/features/payments/pages/NewPayment'
import PaymentDetails from '@/features/payments/pages/PaymentDetails'

import TreatmentsPage from '@/features/treatments/pages/TreatmentsPage'
import NewTreatment from '@/features/treatments/pages/NewTreatment'
import TreatmentDetails from '@/features/treatments/pages/TreatmentDetails'
import NewQuote from '@/features/treatments/pages/NewQuote'

import SettingsPage from '@/features/user/pages/SettingPage'
import AuthPage from '@/features/auth/pages/AuthPage'
import SetupPage from '@/features/user/pages/SetupPage'
import Splash from '@/shared/components/Splash/Splash'

function AppRoutes() {
  return (
    <Routes>

      {/* Auth */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/setup" element={<SetupPage />} />
      <Route path="/splash" element={<Splash />} />

      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>

        {/* Redirect root → payments */}
        <Route path="/" element={<Navigate to="/payments" replace />} />
        <Route path="*" element={<Navigate to="/payments" replace />} />

        {/* Payments */}
        <Route path="/payments">
          <Route index element={<PaymentsPage />} />
          <Route path="new" element={<NewPayment />} />
          <Route path=":id" element={<PaymentDetails />} />
        </Route>

        {/* Customer */}
        <Route path="/customers">
          <Route index element={<CustomersPage />} />
          <Route path="new" element={<NewCustomer />} />
          <Route path=":id" element={<CustomerDetails />} />
        </Route>

        {/* Treatments */}
        <Route path="/treatments">
          <Route index element={<TreatmentsPage />} />
          <Route path="new" element={<NewTreatment />} />
          <Route path=":id" element={<TreatmentDetails />} />
          <Route path="create" element={<NewQuote />} />
        </Route>

        {/* Settings */}
        <Route path="/settings" element={<SettingsPage />} />

      </Route>
    </Routes>
  )
}

export default AppRoutes
