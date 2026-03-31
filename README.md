## 🍔 Delivery App

🔗 Link to the project
Live Demo (Frontend): []

Backend API: [https://food-delivery-app-qrbh.onrender.com]

Repository: [https://github.com/kotmari/food-delivery-app.git]

## Core Functionality
[x] Store Selection: The user can select different stores.
[x] Product List: Dynamic loading of products based on the selected store.
[x] Shopping Cart: Adding/removing products, changing quantities (State + Persist).
[x] Order Submission: Placing an order with customer data validation (Yup).
[x] Responsive Design: Fully responsive for mobile devices and desktops.

## Technical Requirements
[x] Frontend: Built with React + TypeScript + Tailwind CSS.
[x] Backend: Node.js (Express) + TypeScript.
[x] Database: A full-fledged PostgreSQL relational database implemented on the Neon platform, managed via Prisma ORM
[x] Deployment: Frontend and backend deployed on public hosting services (Vercel / Render).

## 🛠 Technology Stack

### Frontend 
React 18 — UI library.
TypeScript — for static typing.
Zustand — lightweight and fast state management (shopping cart).
React Hook Form + Yup — form and phone number validation.
Tailwind CSS — modern styling.
React Hot Toast — interactive user notifications.

### Backend
Node.js & Express — server-side logic.
Prisma ORM — database interaction.
PostgreSQL — data storage (not JSON files).

git clone https://github.com/kotmari/food-delivery-app.git
cd your-repo-name

cd backend
npm install
### Create .env added DATABASE_URL
npx prisma generate
npx prisma db push
npm run dev

cd frontend
npm install
### Create.env added VITE_API_BASE_URL
npm run dev