import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectCartItems } from '../../store/cart/cart.selector'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import './cart-dropdown.styles.scss'
import { BUTTON_TYPE_CLASSES } from "../button/button.component";

const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length ?
                    cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    ))
                    : <span className='empty-message'>Your cart is empty</span>
                }
            </div>
            <Button onClick={goToCheckoutHandler} buttonType={BUTTON_TYPE_CLASSES.base}>Go to checkout</Button>
        </div>
    )
}

export default CartDropdown;