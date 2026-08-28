# 🚗 Car Rental Platform — System Design & Workflow Documentation

---

## 📌 1. Executive Overview

The **Car Rental Platform** is a modern, responsive web application designed to deliver an end-to-end car leasing and rental experience. It offers a dual-portal ecosystem:
1. **User / Customer Portal**: Enables customers to browse vehicle fleets, apply advanced search filters, view comprehensive vehicle specifications, execute a multi-step booking workflow, and monitor their rental history from a personal dashboard.
2. **Admin Management Portal**: Provides platform operators with real-time fleet management, booking state tracking, user administration, financial telemetry, and platform settings.

---

## 🏗️ 2. High-Level System Architecture

The current architecture is a **Client-Side Single-Page Application (SPA)** built with React 19 and Vite 7, powered by React Context for state management and an abstracted LocalStorage persistence layer ready for future REST/GraphQL backend transition.

```mermaid
flowchart TB
    subgraph Client ["Client Browser (React 19 + Vite 7 SPA)"]
        subgraph UI ["Presentation Layer (Tailwind CSS v4 + Radix UI)"]
            PublicPages["Public Pages (Home, Cars, About, FAQs, etc.)"]
            UserPortal["User Portal (Booking, Dashboard, Profile)"]
            AdminPortal["Admin Portal (Dashboard, Cars, Bookings, Users, Settings)"]
        end

        subgraph Routing ["Routing & Guards (React Router v7)"]
            Router["BrowserRouter"]
            AuthGuard["ProtectedRoute Component"]
            AdminGuard["AdminRoute Component"]
        end

        subgraph StateLayer ["State Management Layer (React Context API)"]
            AuthCtx["AuthContext\n- User State\n- Login/Register\n- User Bookings"]
            AdminCtx["AdminContext\n- Admin Auth\n- Fleet Inventory\n- Global Bookings\n- User Directory"]
            SearchCtx["SearchContext\n- Filters & Sort\n- Search Queries"]
        end

        subgraph StorageLayer ["Client Persistence Layer"]
            LS["Browser LocalStorage\n- registeredUsers\n- user / token\n- bookings_{userId}\n- carRentalAdmins\n- allBookings\n- carsData"]
            StaticData["Static Data Store\n- carsData (Seed Catalog)"]
        end
    end

    PublicPages --> Router
    UserPortal --> AuthGuard --> Router
    AdminPortal --> AdminGuard --> Router

    Router --> StateLayer
    AuthCtx <--> LS
    AdminCtx <--> LS
    AdminCtx <--> StaticData
    SearchCtx <--> StateLayer
```

---

## 🧩 3. Application Layers & Component Breakdown

| Layer | Technologies / Modules | Responsibilities |
| :--- | :--- | :--- |
| **Presentation Layer** | React 19, Tailwind CSS v4, Lucide React, Radix UI Primitives | Responsive UI rendering, interactive modals, date pickers, form validation, step navigation. |
| **Layout Layer** | `MainLayout.jsx`, `AdminLayout.jsx` | Encapsulates navigational sidebars, global headers/footers, responsive breadcrumbs, and user session menus. |
| **Routing & Protection** | React Router v7, `ProtectedRoute.jsx`, `AdminRoute.jsx` | Enforces URL routing, public vs private page transitions, and authentication/role guards. |
| **State Management** | `AuthContext`, `AdminContext`, `SearchContext` | Centralizes user auth session, admin privileges, booking creations, dynamic fleet state, and filter queries. |
| **Persistence / Data** | Browser `localStorage`, `src/data/cars.js` | Emulates database transactions, stores customer profiles, booking registries, and car catalogs. |

---

## 🗂️ 4. Project Directory Structure

```
Car-Rent-Frontend/
├── public/                 # Static assets, logos, favicon
├── src/
│   ├── assets/             # Brand graphics and images
│   ├── components/
│   │   ├── admin/          # Admin-specific components (AdminRoute, etc.)
│   │   ├── auth/           # Login/Register form cards & route guards
│   │   ├── booking/        # Multi-step booking form, DatePicker, Summary
│   │   ├── car/            # CarCard, CarFilters, CarGrid, CarDetailsSection
│   │   ├── common/         # Navbar, Footer, ScrollToTop, ErrorBoundary
│   │   └── ui/             # Radix & custom UI atoms (Button, Input, Card, Select, Slider)
│   ├── context/
│   │   ├── AdminContext.jsx# Admin auth, global bookings, fleet operations
│   │   ├── AuthContext.jsx # Customer auth, session state, user booking creation
│   │   └── SearchContext.jsx# Global car search and filter parameters
│   ├── data/
│   │   └── cars.js         # Master car dataset (seed catalog with specs & features)
│   ├── hooks/              # Custom reusable React hooks
│   ├── layouts/
│   │   ├── AdminLayout.jsx # Admin dashboard sidebar and top bar layout
│   │   └── MainLayout.jsx  # Customer-facing header, container, footer layout
│   ├── pages/
│   │   ├── admin/          # Admin pages (Dashboard, Cars, Bookings, Users, Settings)
│   │   ├── About.jsx       # Company info & mission
│   │   ├── Booking.jsx     # Dynamic booking page for a selected car ID
│   │   ├── CarDetails.jsx  # In-depth vehicle overview, specifications, pricing
│   │   ├── Cars.jsx        # Car search, grid, filtration and sorting
│   │   ├── Contact.jsx     # Customer inquiry page
│   │   ├── Dashboard.jsx   # Customer personal booking manager & status tracking
│   │   ├── FAQ.jsx         # Frequently asked questions
│   │   ├── Home.jsx        # Hero section, featured cars, testimonials
│   │   ├── HowItWorks.jsx  # Rental guide & platform instructions
│   │   ├── Login.jsx       # Customer authentication portal
│   │   ├── Profile.jsx     # Customer profile settings & personal data
│   │   ├── Register.jsx    # Customer account creation
│   │   └── Support.jsx     # Help center and customer care
│   ├── styles/             # Global CSS and Tailwind directives
│   ├── App.jsx             # Master route definitions and context provider nesting
│   └── main.jsx            # React root mount and entry point
├── package.json            # Node.js dependencies and script configs
└── vite.config.js          # Vite build and plugin configurations
```

---

## 📊 5. Data Models & Entity Relationships

```mermaid
erDiagram
    USER {
        int id PK
        string name
        string email UK
        string phone
        string password
        datetime createdAt
    }

    ADMIN {
        int id PK
        string name
        string email UK
        string phone
        string password
        string role
        datetime joinDate
        boolean isActive
    }

    CAR {
        int id PK
        string name
        string brand
        string type
        string category
        float price
        object specs
        array features
        float rating
        int reviews
        string location
        string image
    }

    BOOKING {
        int id PK
        int userId FK
        int carId FK
        object carSnapshot
        object dates
        object location
        object userInfo
        object payment
        int totalDays
        float totalAmount
        string status
        datetime bookingDate
    }

    USER ||--o{ BOOKING : "places"
    CAR ||--o{ BOOKING : "reserved in"
    ADMIN ||--o{ CAR : "manages"
    ADMIN ||--o{ BOOKING : "moderates"
```

### Key Entity Schemas

#### 1. Car Entity
```json
{
  "id": 1,
  "name": "Tesla Model 3",
  "type": "Electric",
  "category": "Sedan",
  "price": 4500,
  "specs": {
    "seats": 5,
    "transmission": "Automatic",
    "fuel": "Electric",
    "range": "491 km",
    "topSpeed": "225 km/h",
    "acceleration": "3.1s (0-100)"
  },
  "features": ["Autopilot", "Touchscreen", "Wireless Charging", "Glass Roof"],
  "rating": 4.9,
  "reviews": 128,
  "location": "Mumbai",
  "image": "https://images.unsplash.com/photo-..."
}
```

#### 2. Booking Entity
```json
{
  "id": 1724860000000,
  "userId": 1724850000000,
  "car": { "id": 1, "name": "Tesla Model 3", "price": 4500, "...": "..." },
  "dates": {
    "pickup": "2026-09-01T00:00:00.000Z",
    "return": "2026-09-05T00:00:00.000Z",
    "pickupFormatted": "September 1st, 2026",
    "returnFormatted": "September 5th, 2026"
  },
  "location": {
    "pickup": "Mumbai Airport Terminal 2",
    "return": "Mumbai Airport Terminal 2"
  },
  "userInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210"
  },
  "payment": {
    "dailyRate": 4500,
    "subtotal": 18000,
    "tax": 1800,
    "total": 19800,
    "cardLastFour": "4242"
  },
  "totalDays": 4,
  "totalAmount": 19800,
  "status": "confirmed",
  "bookingDate": "2026-08-28T22:50:00.000Z"
}
```

---

## 🔄 6. Detailed System Workflows

### 6.1. User Registration & Authentication Workflow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant UI as Registration/Login Page
    participant AuthContext as AuthContext.jsx
    participant Storage as LocalStorage

    User->>UI: Enter credentials (Name, Email, Password, Phone)
    UI->>AuthContext: register(userData) / login(email, password)
    AuthContext->>Storage: Check existing entries in `registeredUsers`
    alt User Already Exists (Register) or Not Found (Login)
        AuthContext-->>UI: Return failure with error message
        UI-->>User: Display error notification
    else Credentials Validated
        AuthContext->>Storage: Persist user session (`token`, `user`)
        AuthContext->>AuthContext: Update state: user = userData
        AuthContext->>Storage: Fetch user's previous bookings (`bookings_{userId}`)
        AuthContext-->>UI: Return success response
        UI-->>User: Redirect to requested page or /dashboard
    end
```

---

### 6.2. Car Discovery, Filtration & Search Workflow

```mermaid
flowchart TD
    Start([User visits /cars]) --> FetchData[Load Master Car Catalog]
    FetchData --> FilterUI[User interacts with Filter & Search controls]
    
    subgraph Filters [Applied Filters]
        F1[Search by Name / Model]
        F2[Filter by Body Type: SUV, Sedan, Luxury, EV]
        F3[Filter by Fuel / Transmission]
        F4[Filter by Price Range Slider]
        F5[Filter by Location City]
    end

    FilterUI --> Filters
    Filters --> DynamicFilter[Apply Filter Predicates in Memory]
    DynamicFilter --> Sort[Sort by Price: Low-to-High / High-to-Low / Rating]
    Sort --> Render[Render CarGrid with Dynamic CarCards]
    Render --> SelectCar[User clicks 'View Details' or 'Book Now']
    SelectCar --> Route[Navigate to /cars/:id or /booking/:id]
```

---

### 6.3. Multi-Step Car Reservation & Checkout Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant Page as /booking/:id
    participant Guard as Auth Verification
    participant Form as BookingForm (4 Steps)
    participant AuthContext as AuthContext
    participant AdminContext as AdminContext
    participant Storage as LocalStorage

    Customer->>Page: Navigates to Book Car
    Page->>Guard: Check isAuthenticated
    alt Not Authenticated
        Guard-->>Customer: Display 'Login Required' Prompt with Car Preview
    else Authenticated
        Guard-->>Form: Initialize Booking Steps

        Customer->>Form: Step 1: Select Pickup/Return Dates & Locations
        Form->>Form: Compute Total Days & Real-Time Price Calculation
        
        Customer->>Form: Step 2: Confirm Personal Details (Name, Phone, License)
        
        Customer->>Form: Step 3: Enter Payment Information (Card details)
        
        Customer->>Form: Step 4: Review Summary & Click "Confirm & Pay"
        Form->>AuthContext: createBooking(completeBookingData)
        AuthContext->>Storage: Append to `bookings_{userId}`
        AuthContext->>AdminContext: Sync with global `allBookings`
        AuthContext-->>Form: Return Confirmation Object
        Form-->>Customer: Show Success Alert & Redirect to /dashboard
    end
```

---

### 6.4. Admin Portal & Management Operations Workflow

```mermaid
flowchart TD
    Admin([Admin User]) --> AdminAuth{Logged into Admin?}
    AdminAuth -- No --> AdminLogin[/admin/login & /admin/register]
    AdminLogin --> VerifyAdmin[Validate against carRentalAdmins]
    VerifyAdmin -- Success --> AdminLayout[/admin/* Dashboard]
    AdminAuth -- Yes --> AdminLayout

    subgraph AdminModules [Admin Control Modules]
        M1[Admin Dashboard\n- Revenue Metrics\n- Total Bookings\n- Fleet Count\n- Recent Activity]
        M2[Admin Cars\n- Add New Vehicle\n- Edit Specs & Pricing\n- Toggle Availability\n- Delete Vehicle]
        M3[Admin Bookings\n- View All Reservations\n- Filter by Status\n- Approve / Complete / Cancel]
        M4[Admin Users\n- View Customer List\n- View Total Bookings per User\n- Account Status]
        M5[Admin Settings\n- Platform Currency\n- Tax Rate Config\n- Company Profile]
    end

    AdminLayout --> M1
    AdminLayout --> M2
    AdminLayout --> M3
    AdminLayout --> M4
    AdminLayout --> M5
```

---

## 🛡️ 7. Route Security & Access Control Matrix

| Path | Layout | Access Level | Route Guard | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `MainLayout` | Public | None | Landing page & hero showcase |
| `/cars` | `MainLayout` | Public | None | Fleet search & filtration |
| `/cars/:id` | `MainLayout` | Public | None | Car technical specifications |
| `/about`, `/contact`, `/faq` | `MainLayout` | Public | None | Informational & support |
| `/login`, `/register` | Plain | Public (Guest) | Redirect if logged in | User authentication |
| `/booking/:id` | `MainLayout` | Protected | `useAuth().isAuthenticated` | 4-step car booking process |
| `/dashboard` | `MainLayout` | Protected | `useAuth().isAuthenticated` | User bookings & status |
| `/profile` | `MainLayout` | Protected | `useAuth().isAuthenticated` | Customer account details |
| `/admin/login`, `/admin/register` | Plain | Public | None | Admin authentication |
| `/admin/` | `AdminLayout` | Admin Only | `AdminRoute` | High-level analytics |
| `/admin/cars` | `AdminLayout` | Admin Only | `AdminRoute` | Inventory CRUD operations |
| `/admin/bookings` | `AdminLayout` | Admin Only | `AdminRoute` | Order lifecycle management |
| `/admin/users` | `AdminLayout` | Admin Only | `AdminRoute` | Customer management |
| `/admin/settings` | `AdminLayout` | Admin Only | `AdminRoute` | Platform config |

---

## ⚡ 8. State Management Architecture

```mermaid
graph LR
    subgraph GlobalProviders ["Context Hierarchy (App.jsx)"]
        AP[AuthProvider] --> AdP[AdminProvider]
        AdP --> RT[Router]
    end

    subgraph StateSinks ["State Consuming Pages"]
        RT --> Nav[Navbar / Header]
        RT --> BookingPage[Booking & Dashboard Pages]
        RT --> AdminPages[Admin Portal Pages]
    end

    AP -- "user, login(), register(), logout(), createBooking(), userBookings" --> StateSinks
    AdP -- "admin, isAdmin, allBookings, allUsers, carsData, adminLogin()" --> AdminPages
```

---

## 🚀 9. Future Roadmap & Backend Integration Strategy

When transitioning from the current Client-Side/LocalStorage model to a production enterprise-grade full-stack architecture:

1. **Backend API**: Implement a Node.js (Express / NestJS) or Python (FastAPI / Django) REST/GraphQL service.
2. **Database Integration**:
   - **PostgreSQL / MySQL**: For relational integrity (Users, Bookings, Payments, Cars, Invoices).
   - **Redis**: For caching vehicle availability, rate-limiting, and session management.
3. **Authentication & Security**:
   - JWT tokens with HTTP-only secure cookie refresh cycle.
   - Role-Based Access Control (RBAC) middleware for `ROLE_USER` and `ROLE_ADMIN`.
   - Password hashing with `bcrypt` / `argon2`.
4. **Payment Processing**:
   - Integration with Stripe / Razorpay Webhooks to confirm booking states securely upon payment capture.
5. **Media Storage**:
   - Cloudinary or AWS S3 for uploading high-resolution car images and user driver licenses.
6. **Real-time Notifications**:
   - WebSockets / Socket.io for instant booking status updates between customer and admin panels.

---
*Documentation generated for Car Rental System Architecture.*
