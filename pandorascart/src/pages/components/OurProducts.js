import Image from 'next/image'
import { useState, useEffect } from 'react';
import Link from 'next/link'

export default function OurProducts({ resetCount }) {
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
            <a>New products</a>
             <div className="new-products" >
                  {products.slice(0, 4).map((product) => (
                  <div key={product.id} className="product">
                  <Link onClick={resetCount} href={`/products/pdp/${product.id}`} style={{ textDecoration: 'none'}}>
                      <Image src={product.image} alt="ArtistryNest Product" width={405} height={475}/>
                      <br/>
                    {product.product_name}
                    </Link>
                    <br />
                    £{product.price}
             </div>
          ))}
        </div>
        </div>
        <div className='view-col'>
              <Link href={'/products/all'}><button id="viewCol" >View collection</button></Link>
        </div>
        <div className="popular">
            <a>Our popular products</a>
             <div className="popular-products">
                  {popularProducts.map((product) => (
                  <div key={product.id} className="our-product">
                <Link onClick={resetCount} href={`/products/pdp/${product.id}`} style={{ textDecoration: 'none'}}>
                  <Image src={product.image} alt="ArtistryNest Product" width={405} height={475} sizes="100vw"/>
                  {product.product_name}
                </Link>
                  <br/>
                  £{product.price}
             </div>
          ))}
        </div>
        </div>
        <div className='view-pop-col'>
          <Link href={'/products/all'}><button id="viewPopCol" >View collection</button></Link>
        </div>
        </>
    )
}