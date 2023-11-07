import Image from 'next/image'
import Delivery from '@/pages/icons/Delivery.svg'
import Checkmark from '@/pages/icons/Checkmark--outline.svg'
import Purchase from '@/pages/icons/Purchase.svg'
import Sprout from '@/pages/icons/Sprout.svg'
import { useState, useEffect } from 'react';

export default function Brand() {
    const [products, setProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
        .then((res) => res.json())
        .then((data) => {
            setProducts(data.data);
        })
    }, []);

    useEffect(() => {
        fetch('/api/popular')
        .then((res) => res.json())
        .then((data) => {
            setPopularProducts(data.data);
        })
    }, []);

    return(
        <>
         <div className="brand-info">
            <h2>What makes our brand diffrent</h2>
        </div>
        <div className="brand-info-grid">
            <div className="grid-1">
                <Image src={Delivery} />
                <h2>Next day as standard</h2>
                <h3>Order before 3pm and get your order the next day as standard</h3>
            </div>
            <div className="grid-2">
                <Image src={Checkmark} />
                <h2>Made by true artisans</h2>
                <h3>Handmade crafted goods made with real passion and craftmanship</h3>
            </div>
            <div className="grid-3">
                <Image src={Purchase} />
                <h2>Unbeatable prices</h2>
                <h3>For our materials and quality you won't find better prices anywhere</h3>
            </div>
            <div className="grid-4">
                <Image src={Sprout} />
                <h2>Recycles packaging</h2>
                <h3>We use 100% recycled packaging to ensure our footprint is more manageable</h3>
            </div>
        </div>
        <div className="new-ceramics">
            <a>New ceramics</a>
             <div className="new-products">
                  {products.slice(0, 4).map((product) => (
                  <div key={product.id} className="product">
                  <Image src={product.image} alt={product.name} width={305} height={375}/>
                  <a>{product.product_name}</a>
                  <br />
                  <a>£{product.price}</a>
             </div>
          ))}
        </div>
        </div>
        <div className='view-col'>
                <button id="viewCol">View collection</button>
        </div>
        <div className="popular">
            <a>Our popular products</a>
             <div className="popular-products">
                  {popularProducts.map((product) => (
                  <div key={product.id} className="our-product">
                  <Image src={product.image} alt={product.name}  width={500} height={500} sizes="100vw"/>
                  <br/>
                  <a>{product.product_name}</a>
                  <br />
                  <a>£{product.price}</a>
             </div>
          ))}
        </div>
        </div>
        <div className='view-col'>
                <button id="viewCol">View collection</button>
        </div>
        </>
    )
}