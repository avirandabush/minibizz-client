# Small Business Payment Management System

## Overview

This project is a **digital payment management system** designed for small businesses (sole proprietors / freelancers) who issue receipts to clients. It replaces the traditional manual process of tracking payments on paper and entering them into government receipt platforms. The system allows you to:

- Add and manage **clients**, **treatments/services**, and **payments**
- Automatically track payment amounts and status
- Filter and sort records
- Edit or delete existing entries
- Work with a **mock backend**, easily replaceable with a real API
- Navigate seamlessly using a **bottom tab bar**

The goal is to streamline the daily workflow for small businesses, ensuring all payment data is stored digitally and ready for receipt generation.

---

## Features

### Payments
- Record new payments by selecting a client and treatment
- Amount automatically populated based on selected treatment, editable if needed
- Track status (pending, receipt created)
- Edit or delete payments
- Filter and sort by client, treatment, or amount

### Clients
- Add new clients with a simple form
- Edit or delete existing clients
- Filter and sort clients alphabetically

### Treatments
- Add new treatments/services
- Set price and active status
- Edit or delete treatments
- Filter and sort treatments

### Navigation
- Bottom navigation bar with icons for:
  - Payments
  - Clients
  - Treatments
  - Settings
- Tabs show both icons and labels; on small screens, only icons are displayed

### Forms & Modals
- Modal-based forms for adding/editing payments, clients, and treatments
- Forms are reactive:
  - Payment form auto-updates amount based on selected treatment
- Filter and sort menus close automatically when clicking outside

### Backend & Data
- Services structured per entity (Payments, Clients, Treatments)
- Centralized API request abstraction
- Mock data fallback for development
- Ready to integrate with real backend later

---

## Technologies

- **React 18** – Component-based UI
- **TypeScript** – Type safety across the app
- **CSS / modular styles** – Custom styling for components
- **React Router v6** – Navigation and routing between pages
- **Functional Components & Hooks** – `useState`, `useEffect` for state management
- **UUID / crypto** – Generate unique IDs for mock records
- **Modals, Menus, Forms** – Reusable components
- **Mock Data** – Temporary storage for offline development

---

## Usage

- Payments Tab – Add, edit, delete, filter, and sort payments
- Clients Tab – Manage client records
- Treatments Tab – Manage treatments/services
- Settings Tab – Placeholder for future configurations

---

## License

Aviran Dabush © 2026
https://avirandabush.co.il
