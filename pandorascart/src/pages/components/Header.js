import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/pages/context/CartContext'
import { useRouter } from 'next/router'
import searchIcon from '@/pages/icons/Search.svg'
import cartIcon from '@/pages/icons/Shopping--cart.svg'
import userIcon from '@/pages/icons/User--avatar.svg'

export default function Header(){
    const { cart } = useCart();
    const router = useRouter();

    const handleCartIconClick = () => {
        router.push({
            pathname: '/cart',
            query: {
                count: cart.count,
                items: cart.items.map(item => `${item.productId}-${item.count}`).join(','),
            },
        });
    };
    
    return(
        <>
        <div className="name">
            <h1><Link href={'/'}>ArtistryNest</Link></h1>
        </div>
        <div className="top-right">
            <h2 className="about"><Link href={'/about'}>About us</Link></h2>
            <h2 className="contact"><Link href={''}>Contact</Link></h2>
            <div className="searchIcon">
                <Image src={searchIcon} alt="Search"/>
                <Image src={cartIcon} onClick={handleCartIconClick} alt="Cart"/>
                {cart.count > 0 && <span onClick={handleCartIconClick} className="cart-count">{cart.count}</span>}
                <Image src={userIcon} alt="User"/>
            </div>
        </div>
        <div className="bottom-nav">
                <h2> <Link href={'/products/all'}>All products</Link></h2>
                <h2><Link href={'/products/chairs'}>Chairs</Link></h2>
                <h2><Link href={'/products/tables'}>Tables</Link></h2>
                <h2><Link href={'/products/lamps'}>Lamps</Link></h2>
                <h2><Link href={'/products/crockery'}>Crockery</Link></h2>
                <h2><Link href={'/products/cutlery'}>Cutlery</Link></h2>
                <h2><Link href={'/products/ceramics'}>Ceramics</Link></h2>
                <h2><Link href={'/products/pots'}>Plant pots</Link></h2>
            </div>
        </>
    )
}