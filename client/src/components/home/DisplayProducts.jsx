import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from '../../hooks/useAxiosCommon';
import Loader from './../shared/Loader';
import { Helmet } from 'react-helmet-async';
import ProductsCard from "../shared/ProductsCard";

const DisplayProducts = () => {

    const axiosCommon = useAxiosCommon();

    const { data: productData = [], isLoading: productsLoading } = useQuery({
        queryKey: ['productData'],
        queryFn: async () => {
            const { data } = await axiosCommon('/products')
            return data
        }
    })

    // loader
    if (productsLoading) {
        <Loader />
    }



    return (
        <div className="space-y-4">

            <Helmet>
                <title> কেনাকাটা | Home </title>
            </Helmet>

            <h3 className="font-bold font-sans text-2xl text-center underline underline-offset-4">
                Total Item : {productData.length}
            </h3>

            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
                {
                    productData?.map( product => {
                        return <ProductsCard key={product._id} product={product}/>
                    })
                }                
            </div>


        </div>
    );
};

export default DisplayProducts;