import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Loader from '../components/shared/Loader';
import moment from 'moment';
import useAxiosCommon from '../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const ProductDetails = () => {

    const { id } = useParams();

    const axiosCommon = useAxiosCommon();

    // for category, brand list
    const { data: productDetails = [], isFetching, isLoading } = useQuery({
        queryKey: ['productDetails',id],
        queryFn: async () => {
            const { data } = await axiosCommon(`/productDetails/${id}`)
            return data
        }
    })


    const { _id, ProductName, BrandName, ProductImage, Description, Price, Category, Ratings, AddedDateTime } = productDetails;

    const formattedDate = moment(AddedDateTime).format('MMMM D, YYYY h:mm A'); 

    // loader
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading || isLoading || isFetching) {
        return <Loader />
    }

    return (
        <>
            <div className="card card-side bg-base-100 shadow-2xl lg:card-side  border-2">

                <Helmet>
                    <title> কেনাকাটা | Product Details </title>
                </Helmet>

                <figure className="object-contain w-1/2 ">
                    <img
                        className="h-full "
                        src={ProductImage} alt="" />
                </figure>
                <div className="card-body  w-1/2 relative">
                    <h2 className="card-title text-xl font-semibold text-start font-serif">
                        {ProductName}
                    </h2>
                    <h3 className="card-title text-lg font-semibold text-start font-serif">
                        {BrandName}
                    </h3>
                    <p className="text-base">Category :{' '}
                        <span className='font-semibold badge badge-primary'>
                            #{Category}
                        </span>
                    </p>

                    <div className="divider my-0 "></div>

                    <p>{Description}</p>

                    <div className="divider my-0 "></div>

                    <p>Added Date: {formattedDate}</p>

                    <div className="divider my-0 "></div>

                    <p>Rating: {Ratings} / 5</p>

                    <div className="divider my-0 "></div>

                    <p className="text-base text-right">Price : <span className='font-semibold'>
                        {Price}
                    </span></p>
                    
                </div>
            </div>

        </>
    );
};

export default ProductDetails;