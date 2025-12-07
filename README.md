# Vehicle Rental System – Express.js Backend

### **Live Deployment:**

[https://vehicle-rental-system-backend-inky.vercel.app](https://vehicle-rental-system-backend-inky.vercel.app)

### **GitHub Repository:**

[https://github.com/abdullaalfahad/vehicle-rental-system-express](https://github.com/abdullaalfahad/vehicle-rental-system-express)

---

## 📌 Overview

The **Vehicle Rental System** is a backend API built using **Express.js** and **PostgreSQL** to manage users, vehicles, and rental bookings. It supports role-based access for **customers** and **admins**, providing features such as user management, vehicle management, and booking management.

---

## 🚀 Features

- User registration and authentication (Customer & Admin)
- Vehicle management (add, update, view)
- Booking management (create, cancel, mark returned)
- Role-based access control
- Vehicle availability tracking
- Secure password handling

---

## 🛠 Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Database Driver:** pg (node-postgres)
- **Authentication:** JWT
- **Deployment:** Vercel

---

## ⚙️ Setup & Usage

1. **Clone the repository**

```bash
git clone https://github.com/abdullaalfahad/vehicle-rental-system-express.git
cd vehicle-rental-system-express
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Setup environment variables**  
   Create a `.env` file:

```env
PORT=5000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
```

4. **Build code**

```bash
pnpm run build
```

5. **Start the server**

```bash
npm run dev
```

Server runs at `http://localhost:5000`.
