import AllProducts from '@/pages/components/AllProducts'

export default function Tables(){
    const tables = '/api/category?category=tables'
    return (
        <>
            <AllProducts apiEndpoint = { tables } />
        </>
    )
}