import AllProducts from '@/pages/components/AllProducts'

export default function Tables(){
    const lamps = '/api/category?category=lamps'
    return (
        <>
            <AllProducts apiEndpoint = { lamps } />
        </>
    )
}