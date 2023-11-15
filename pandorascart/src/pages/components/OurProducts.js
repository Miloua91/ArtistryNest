import Image from 'next/image'
import Delivery from '@/pages/icons/Delivery.svg'
import Checkmark from '@/pages/icons/Checkmark--outline.svg'
import Purchase from '@/pages/icons/Purchase.svg'
import Sprout from '@/pages/icons/Sprout.svg'
import { useState, useEffect } from 'react';
import Link from 'next/link'

export default function OurProducts() {
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
        <div className="new-ceramics">
            <a>New ceramics</a>
             <div className="new-products">
                  {products.slice(0, 4).map((product) => (
                  <div key={product.id} className="product">
                  <Link href={`/products/${product.id}`}>
                      <Image src={product.image} alt="ArtistryNest Product" width={305} height={375}/>
                    </Link>
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
                <Link href={`/products/${product.id}`}>
                  <Image src={product.image} alt="ArtistryNest Product" width={305} height={375} sizes="100vw"/>

                </Link>
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