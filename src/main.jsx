import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './componentes/home.jsx'
import Layout from './layout.jsx'
import Admind from './componentes/admin/admin.jsx'
import DashBoard from './componentes/admin/dashboard.jsx'
import { UserProvider } from './useContext.jsx'
import { AlertDialogProvider } from './alertDialogContext.jsx'
import Login from './componentes/Login.jsx'
import Profile from './componentes/userCard/profile.jsx'
import AboutItem from './componentes/aboutItem/aboutItem.jsx'
import { CartProvider } from './cartContext.jsx'

createRoot(document.getElementById('root')).render(
  <AlertDialogProvider>
    <UserProvider>
    <CartProvider>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userProfile" element={<Profile />} />
            <Route path='/store' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path=':id' element={<AboutItem />} />
            </Route>
          <Route path='/admin' element={<Admind />} />
          <Route path='/admin/dashboard' element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </UserProvider>
  </AlertDialogProvider>
  ,
)
