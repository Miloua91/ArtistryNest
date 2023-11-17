import AllProducts from '@/pages/components/AllProducts'

export default function Ceramics(){
    const ceramics = '/api/popular';
    return(
        <>
            <AllProducts apiEndpoint={ceramics} />
        </>
    )
}