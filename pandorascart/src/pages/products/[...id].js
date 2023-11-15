import Brand from '@/pages/components/Brand'
import OurProducts from '@/pages/components/OurProducts'
import Esign from '@/pages/components/Esignup'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';


export default function ProductDetail() {
    const [product, setProduct] = useState([]);
    const router = useRouter();
    const { id } = router.query;
    
    
    useEffect(() => {
            fetch(`/api/productid?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                const productDetails = data.data[0];
                setProduct(productDetails);
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
            });
        }, [id]);
        
        return(
            <>
            <div className='pdp'>
                <div className='pd-image'>
                    {product.image && (
                        <Image src={product.image} alt={product.product_name} width={305} height={375} />
                    )}
                </div>
            <div className='product-details'>
                <h1 className='title'>{product.product_name}</h1>
                <h2>£{product.price}</h2>
                <a className='title'>Product description</a>
                <p className='details'>{product.description}</p>
                <a className='title'>Dimensions</a><br/><br/>
                <div className='dimensions'>
                    <div>
                        <a className='title'>Height</a><br/>
                        <a className='details'>{product.height}cm</a>
                    </div>
                    <div>
                        <a className='title'>Width</a><br/>
                        <a className='details'>{product.width}cm</a>
                    </div>
                </div>
                <div>

                    <button>Add to cart</button>
                </div>
            </div>
        </div>
    <Brand />
    <OurProducts />
    <Esign />
    </>
    )
}