import Image from 'next/image'
import Delivery from '@/pages/icons/Delivery.svg'
import Checkmark from '@/pages/icons/Checkmark--outline.svg'
import Purchase from '@/pages/icons/Purchase.svg'
import Sprout from '@/pages/icons/Sprout.svg'
import product1 from '@/pages/img/dandy-chair.svg'
import product2 from '@/pages/img/vase.svg'
import product3 from '@/pages/img/sily-vase.svg'
import product4 from '@/pages/img/lamp.svg'

export default function Brand() {
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
                <div className='product'>
                    <Image src={product1}/>
                    <a>The Dandy Chair</a><br/>
                    <a>£250</a>
                </div>
                <div className='product'>
                    <Image src={product2}/>
                    <a>Rustic Vase Set</a><br/>
                    <a>£155</a>
                </div>
                <div className='product'>
                    <Image src={product3}/>
                    <a>The Silky Vase</a><br/>
                    <a>£155</a>
                </div>
                <div className='product'>
                    <Image src={product4}/>
                    <a>The lucy Lamp</a><br/>
                    <a>£399</a>
                </div>
        </div>
        </div>
        </>
    )
}