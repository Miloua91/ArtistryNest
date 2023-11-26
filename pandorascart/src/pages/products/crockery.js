import AllProducts from '@/pages/components/AllProducts'

export default function Crockery(){
    const crockery = '/api/category?category=crockery'
    return (
        <>
            <AllProducts apiEndpoint = { crockery } />
        </>
    )
}