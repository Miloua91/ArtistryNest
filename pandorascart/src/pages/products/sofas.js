import AllProducts from '@/pages/components/AllProducts'

export default function Sofas(){
    const sofas = '/api/category?category=sofas'
    return (
        <>
            <AllProducts apiEndpoint = { sofas } />
        </>
    )
}