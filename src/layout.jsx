import Footer from "./componentes/footer";
import Header from "./componentes/header";
import { Outlet } from "react-router";
import './App.css'

export default function Layout() {
    return (
        <div>
            <Header />
                <main>
                    <Outlet/>
                </main>
            <Footer />
        </div>
    )
}