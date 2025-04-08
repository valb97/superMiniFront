# Supermarket Frontend 🛒

This is a React + Vite-based frontend application that simulates a modern online supermarket. Users can browse products, view detailed information, and add items to their cart.

> ⚠️ This project is connected to a separate backend repository called [`marketApi`](https://github.com/valb97/marketApi). Make sure to clone and run the backend first for full functionality.

---

## 🚀 Features

- 🛍️ Product listing with images, descriptions, and prices  
- 🔍 Product detail view  
- 🧺 Shopping cart with item quantities and total count  
- 🧑 User login and profile  
- 🧑‍💻 Admin dashboard (in development)  

---

## 📦 Tech Stack

- [Vite](https://vitejs.dev/)  
- [React](https://react.dev/)  
- [React Router](https://reactrouter.com/)  
- [Axios](https://axios-http.com/)  
- [Lucide Icons](https://lucide.dev/)  
- Context API for state management  

---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/supermarket-frontend
cd supermarket-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will run at `http://localhost:5173`.

---

## 🔗 Backend Setup

This app depends on a backend API called [`marketApi`](https://github.com/your-username/marketApi).

Make sure you:

- Clone and run the backend from that repository  
- Ensure it's running on `http://localhost:3000` or adjust the frontend API endpoints accordingly  

---

## 📂 Folder Structure

```
src/
│
├── components/         # UI components
├── useContext/         # Context providers (auth, cart, etc.)
├── alertDialogContext/ # Global dialog system
├── routes/             # Route-related components
├── layout/             # Page layout wrappers
├── assets/             # Static assets
└── App.jsx             # App entry point
```

---

## 📄 License

This project is open source and free to use.