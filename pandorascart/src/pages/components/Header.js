import Image from 'next/image'
import Link from 'next/link'
import searchIcon from '@/pages/icons/Search.svg'
import cartIcon from '@/pages/icons/Shopping--cart.svg'
import userIcon from '@/pages/icons/User--avatar.svg'

export default function Header(){
    return(
        <>
        <div className="name">
            <Link href={'/'}>
            <h1 >ArtistryNest</h1>
            </Link>
        </div>
        <div className="top-right">
            <Link href={'/about'}>
            <h2 className="about">About us</h2>
            </Link>
            <h2 className="contact">Contact</h2>
            <div className="searchIcon">
                <Image src={searchIcon} alt="Search"/>
                <Image src={cartIcon} alt="Cart"/>
                <Image src={userIcon} alt="User"/>
            </div>
        </div>
        <div className="bottom-nav">
                <h2> <Link href={'/products/all'}>All products</Link></h2>
                <h2><Link href={'/products/pots'}>Plant pots</Link></h2>
                <h2><Link href={'/products/ceramics'}>Ceramics</Link></h2>
                <h2><Link href={'/products/tables'}>Tables</Link></h2>
                <h2><Link href={'/products/chairs'}>Chairs</Link></h2>
                <h2><Link href={'/products/crockery'}>Crockery</Link></h2>
                <h2><Link href={'/products/tableware'}>Tablware</Link></h2>
                <h2><Link href={'/products/cutlery'}>Cutlery</Link></h2>
            </div>
        </>
    )
}