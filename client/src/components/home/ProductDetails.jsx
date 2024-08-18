import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Tooltip } from "react-tooltip";
import { Helmet } from 'react-helmet-async';
import Loader from '../shared/Loader';

const ProductDetails = () => {

    const { id } = useParams();
    const { user } = useAuth();
    const [getComments, setGetComments] = useState([]);
    const [productDetail, setProductDetail] = useState({});

    // get all blogs data by id
    useEffect(() => {
        axios(`${import.meta.env.VITE_SERVER}/productDetails/${id}`,{ withCredentials: true })
            .then(data => {
                setProductDetail(data.data);
                // console.log(data);
            })
    }, [id]);

    const { _id, ProductName, BrandName, ProductImage, Description, Price, Category, Ratings, AddedDateTime } = productDetail;

    // loader
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
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
                    <p className="text-base">Category :{' '}
                        <span className='font-semibold badge badge-primary'>
                            #{Category}
                        </span>
                    </p>

                    <div className="divider my-0 "></div>

                    <p>{Description}</p>

                    <div className="divider my-0 "></div>

                    <p>{long_description}</p>

                    <div className="divider my-0 "></div>

                    <p className="text-base text-right">Price : <span className='font-semibold'>
                        {Price}
                        {/* long_description display {long_description.length} */}
                    </span></p>
                    {
                        postEmail === loadUserData[0]?.email ? <span className="text-right absolute right-8 top-14">
                            <Link
                                to={`/myBlogs/edit/${id}`}
                                data-tooltip-id="update-tooltip"
                                data-tooltip-content="Edit"
                                className='btn btn-neutral hover:btn-info btn-xl animate__animated  animate__jello animate__infinite'>📝</Link>
                            <Tooltip id="update-tooltip" />
                        </span>
                            : ''
                    }



                </div>
            </div>

        </>
    );
};

export default ProductDetails;