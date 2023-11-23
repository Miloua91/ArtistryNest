import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function Cart() {
  const { cart, calculateSubtotal } = useCart();
  const { items } = cart;

  return (
    <div className='cart-container'>
      <div className='cart'>
        <div className='cart-headers'>
          <a>Product</a>
          <div>
            <a>Quantity</a>
            <a>Total</a>
          </div>
        </div>
        <div>
          {items.length === 0 ? (
            <p className='empty-cart'>Your shopping cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.productId} className='cart-product'>
                <div>
                  <div className='cart-product-container'>
                    <Image src={item.image} alt={item.product_name} width={100} height={150} />
                  </div>
                  <div className='cart-product-description'>
                    <h1>{item.product_name}</h1>
                    <p>Beautiful and simple, this one is for the classic collections</p>
                    <a>£{item.price}</a>
                  </div>
                </div>
                <div className='price-quantity'>
                  <a>{item.count}</a>
                  <a>£{item.price * item.count}</a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <div className='checkout-Btn'>
          {items.length > 0 && (
            <>
              <h2 className='checkout-sub'>Subtotal <a>£{calculateSubtotal()}</a></h2>
              <button className='checkoutBtn'>Go to checkout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
