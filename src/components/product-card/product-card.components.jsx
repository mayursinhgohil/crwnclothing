import { useDispatch, useSelector } from 'react-redux'

import './product-card.styles.scss'
import { addItemToCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'
import Button from '../button/button.component'

const ProductCard = ({ product }) => {

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, price, imageUrl } = product;

    const addProductCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button onClick={addProductCart} buttonType='inverted'>Add to Cart</Button>
        </div>
    )
}

export default ProductCard;