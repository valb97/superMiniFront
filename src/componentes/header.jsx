import './header.css'
import ShoppingCartContainer from './shoppingCart/shoppingCart'
import User from './userComponent/User'

export default function Header(){
    return (
        <div className='header-container'>
            <User />
            <h2>Mini super</h2>
            <ShoppingCartContainer/>
        </div>
    )
}