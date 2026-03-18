import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'

import CustomersPage from '../pages/Customers/CustomersPage'
import NewCustomer from '../pages/Customers/NewCustomer'
import CustomerDetails from '../pages/Customers/CustomerDetails'

import PaymentsPage from '../pages/Payments/PaymentsPage'
import NewPayment from '../pages/Payments/NewPayment'
import PaymentDetails from '../pages/Payments/PaymentDetails'

import TreatmentsPage from '../pages/Treatments/TreatmentsPage'
import NewTreatment from '../pages/Treatments/NewTreatment'
import TreatmentDetails from '../pages/Treatments/TreatmentDetails'

import SettingsPage from '../pages/Settings/SettingPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>

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
        </Route>

        {/* Settings */}
        <Route path="/settings" element={<SettingsPage />} />

      </Route>
    </Routes>
  )
}

export default AppRoutes