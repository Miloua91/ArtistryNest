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
                <h2>All products</h2>
                <h2>Plant pots</h2>
                <h2>Ceramics</h2>
                <h2>Tables</h2>
                <h2>Chairs</h2>
                <h2>Crockery</h2>
                <h2>Tablware</h2>
                <h2>Cutlery</h2>
            </div>
        </>
    )
}