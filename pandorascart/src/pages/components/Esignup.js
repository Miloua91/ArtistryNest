import { useState, useEffect } from 'react'
import Image from 'next/image'
import Signup from '@/pages/img/signup.webp'
import { toast } from 'sonner'

export default function Esign(){
    const [email, setEmail] = useState('');
    const [sub, setSub] = useState({ subType: ['offers', 'events', 'discounts'] });
        
    const handleSub = (e) => {
        const { value, checked } = e.target;
        setSub((prevSub) => ({
            subType: checked ? [...prevSub.subType, value] : prevSub.subType.filter((e) => e !== value),
        }));
    };
    
    
    const handleSignUp = () => {
        if (validateEmail(email)) {
          console.log(email, sub);
          toast.success('Thank you for subscribing!');
        } else {
            toast.error('Please enter a valide email.');
        }
      };
    
      const validateEmail = (email) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
      };

    return (
        <>
        <div className='email-signup'>
            <Image id='signup-image' src={Signup} alt='signup-image'/>
            <div className='join-the-club'>Join the club and get the benefits</div>
            <div className='newsletter'>Sign up for our newsletter and receive exclusive offers on new ranges,
             sales, pop up stores and more</div>
            <div className='email-checkbox' >
                <label><input type='checkbox' onChange={handleSub} name="subscribe"  value='offers' className='checkbox' defaultChecked/> Exclusive offers</label>
                <label><input type='checkbox' onChange={handleSub} name="subscribe"  value='events' className='checkbox' defaultChecked/> Free events</label>
                <label><input type='checkbox' onChange={handleSub} name="subscribe"  value='discounts' className='checkbox' defaultChecked/> Large discounts</label>
            </div>
            <div className='email-input'>
                <input id='email' type='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='your@email.com'/>
                <button onClick={handleSignUp} id='signupBtn'>Sign up</button>
            </div>
        </div>
        </>
    )
}