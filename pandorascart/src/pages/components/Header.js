import Image from 'next/image'
import Link from 'next/link'
import searchIcon from '@/pages/icons/Search.svg'
import cartIcon from '@/pages/icons/Shopping--cart.svg'
import userIcon from '@/pages/icons/User--avatar.svg'

export default function Header(){
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
                <Image src={cartIcon} alt="Cart"/>
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