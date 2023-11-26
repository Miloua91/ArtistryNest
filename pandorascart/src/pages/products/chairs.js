import AllProducts from '@/pages/components/AllProducts'

export default function Chairs(){
    const chairs = '/api/category?category=chairs'
    return(
        <>
            <AllProducts apiEndpoint = { chairs } />
        </>
    )
}