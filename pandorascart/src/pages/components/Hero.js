import Image from 'next/image'
import HeroImg from '@/pages/img/hero.jpg'


export default function Hero(){
    return(
        <>
        <div className='hero'>
            <Image className='hero-img' src={HeroImg} alt="Hero-image"/>
            <div className="block">
                <p id="hero-text">Luxury homeware for people<br/>who love timelesss design quality</p>
                <p id="hero-text-phone">Luxury homeware for people who love timelesss design quality</p>
                <p id="shop-text">Shop the new Spring 2022 collection today</p>
                <p id="shop-text-phone">With our new collection, view over 400 bespoke pieces from homeware through to furniture today</p>
                <button id="viewButt">View collection</button>
            </div>
        </div>
        </>
    )
}