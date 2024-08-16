import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ProductsCard = ({ product }) => {

    const { _id, ProductName, BrandName, ProductImage, Description, Price, Category, Ratings, AddedDateTime } = product;

    const formattedDate = moment(AddedDateTime).format('MMMM D, YYYY h:mm A'); // Example format: August 15, 2024 8:24 PM

    return (
        <>
            <div
                className="card card-compact w-80 bg-base-100 shadow-xl max-h-96 hover:scale-105 hover:border hover:border-primary">
                <figure className=" ">
                    <img src={ProductImage} alt="products image" className="rounded-xl w-full " />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{ProductName}</h2>
                    <p className="text-justify">{Description.substring(0, 30)}......</p>
                    <div className="text-start w-full">
                        <p className="flex justify-between">
                            <span>Price per package :</span>
                            <span className="font-semibold font-serif">
                                {Price} $ only
                            </span>
                        </p>
                        <p className="flex justify-between">
                            <span>Supplyer :</span>
                            <span className="font-semibold font-serif"> {BrandName}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Category :</span>
                            <span className="font-semibold font-serif"> {Category}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Ratings :</span>
                            <span className="font-semibold font-serif"> {Ratings} / 5</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Adding Date :</span>
                            <span className="font-semibold font-serif"> {formattedDate}</span>
                            {/* <span className="font-semibold font-serif"> {moment(AddedDateTime).format("Do MMM YYYY")}</span> */}
                        </p>
                    </div>
                    <div className="card-actions justify-end">
                        <Link
                            to={`/testDetails/${_id}`}
                            className="btn btn-primary animate-pulse hover:animate-none"
                        >
                            Details
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

ProductsCard.propTypes = {
    product: PropTypes.array,
}


export default ProductsCard;