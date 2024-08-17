import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from '../../hooks/useAxiosCommon';
import Loader from './../shared/Loader';
import { Helmet } from 'react-helmet-async';
import ProductsCard from "../shared/ProductsCard";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcNext, FcPrevious, FcSearch } from "react-icons/fc";
import moment from "moment";

const DisplayProducts = () => {

    const axiosCommon = useAxiosCommon();

    // Pagination count variables
    const [itemsPerPage, setItemsPerPage] = useState(3); // default showing items per page
    const [currentPage, setCurrentPage] = useState(1); // default showing page is 1
    const [dataCount, setDataCount] = useState();

    // search by date
    const [searchTerm, setSearchTerm] = useState('')

    // filtering
    const [filterDate, setFilterDate] = useState('');

    // category
    const [filterCategory, setFilterCategory] = useState('');

    // brand
    const [filterBrand, setFilterBrand] = useState('');

    // range of price
    const [filterPrice, setFilterPrice] = useState(100);

    // sort date by
    const [sortDate, setSortDate] = useState('asc');

    // sort price by
    const [sortPrice, setSortPrice] = useState('asc');

    // for query product showing
    const { data: productData = [], isLoading: productsLoading, refetch, isFetching } = useQuery({
        queryKey: ['productData'],
        queryFn: async () => {
            // const { data } = await axiosCommon(`/products?page=${currentPage}&size=${itemsPerPage}&date=${filterDate}&category=${filterCategory}&search=${searchTerm}`)
            const { data } = await axiosCommon(`/queryProducts?date=${filterDate}&category=${filterCategory}&search=${searchTerm}&brand=${filterBrand}&price=${filterPrice}&sortDate=${sortDate}&sortPrice=${sortPrice}`)
            return data
        }
    })

    // for category, brand list
    const { data: productDataCategory = [], isFetching: queryFetch } = useQuery({
        queryKey: ['productDataCategory'],
        queryFn: async () => {
            const { data } = await axiosCommon(`/products`)
            return data
        }
    })

    // pagination number
    const numberOfPages = Math.ceil(dataCount / itemsPerPage) || 1

    // pagination count
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1)

    // handle pagination button
    const handlePaginationButton = value => {
        setCurrentPage(value);
        // console.log(value);
        // { value === 24 && setItemsPerPage(Math.ceil(value / (Math.ceil(value / 6)))) }
    }
    // console.log(typeof(currentPage) , currentPage)

    const {
        register,
        handleSubmit,
        // formState: { errors },
        reset,
    } = useForm()

    const onSubmit = async (data) => {

        const { name, date, category, brand, range, sortD, sortP } = data;

        const formattedDate = moment(date).format('YYYY-MM-DDTHH:mm:ss[Z]');
        // console.log(formattedDate); // Output: 2024-08-15T20:24:22Z

        const intRange = parseFloat(range);

        setFilterDate(formattedDate)
        setSearchTerm(name)
        setFilterCategory(category)
        setFilterBrand(brand)
        setFilterPrice(intRange)
        setSortDate(sortD)
        setSortPrice(sortP)
        // console.log(category, name, date,brand, typeof(intRange),intRange);
        console.log(sortD, sortP)
        refetch();
    }

    // reset
    const handleReset = () => {
        setFilterDate('');
        setSearchTerm('');
        setFilterCategory('');
        setFilterBrand("");
        setFilterPrice(100);
        setSortPrice('asc');
        setSortDate('asc');
        setCurrentPage(1);
        refetch();
        reset(); // Reset the form fields

        // Reload the page to clear the filters
        window.location.reload();
    }

    refetch();

    // loader
    if (productsLoading || isFetching || queryFetch) {
        <Loader />
    }

    return (
        <div className="space-y-6 my-6">

            <Helmet>
                <title> কেনাকাটা | Home </title>
            </Helmet>

            <h3 className="font-bold font-sans text-2xl text-center underline underline-offset-4">
                Item Found : {productData.length}
            </h3>

            {/* filter */}
            <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>

                <form
                    className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >

                    {/* filtered by date */}
                    <div >
                        <input
                            type="datetime-local"
                            name='date'
                            id='date'
                            className='block p-4 w-auto px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            {...register("date")}
                        />
                    </div>

                    {/* search */}
                    <div className=' '>
                        <label className="input input-bordered rounded-lg flex items-center gap-2 ">
                            <input
                                name="name"
                                type="text" className="grow " placeholder="Product Name"
                                {...register("name")}
                            />
                        </label>
                    </div>

                    {/* sort by date */}
                    <div>
                        <select {...register("sortD")}
                            className='block p-4 w-auto px-4 py-2  border rounded-lg h-12 focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                        >
                            <option value="asc" >Ascending Date</option>
                            <option value="dsc" >Descending Date</option>
                        </select>
                    </div>
                    {/* sort by price */}
                    <div>
                        <select {...register("sortP")}
                            className='block p-4 w-auto px-4 py-2  border rounded-lg h-12 focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                        >
                            <option value="asc" >Ascending Price</option>
                            <option value="dsc" >Descending Price</option>
                        </select>
                    </div>

                    {/* category */}
                    <div>
                        <select {...register("category")}
                            className='block p-4 w-auto px-4 py-2  border rounded-lg h-12 focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                        >
                            <option value="" >Category</option>
                            {
                                [...new Set(productDataCategory?.map(product => product.Category))].map((category, index) => {
                                    return <option key={index} value={category}>{category}</option>
                                })
                            }
                        </select>
                    </div>

                    {/* brand */}
                    <div>
                        <select {...register("brand")}
                            className='block p-4 w-auto px-4 py-2  border rounded-lg h-12 focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                        >
                            <option value="" >Select Brand</option>
                            {
                                [...new Set(productDataCategory?.map(catg => catg.BrandName))].map((brand, index) => {
                                    return <option key={index} value={brand}>{brand}</option>
                                })
                            }
                        </select>
                    </div>

                    {/* range of price */}
                    <div>
                        <input
                            name="range"
                            type="range"
                            min={0}
                            max={100} // Set a fixed max value
                            {...register('range')}
                            className="range range-error"
                            step="5"
                        />
                        <div className="flex w-full justify-between px-2 text-xs">
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="btn btn-outline btn-circle animate-pulse">
                        <FcSearch size={20} />
                    </button>
                </form>

                {/* reset */}
                <button
                    onClick={handleReset}
                    className='btn btn-outline hover:btn-accent'>Reset</button>
            </div>

            {/* cards */}
            <div className="flex justify-center items-center">
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
                    {
                        productData?.map(product => {
                            return <ProductsCard key={product._id} product={product} />
                        })
                    }
                </div>
            </div>

            {/* pagination */}
            <div className=" mx-auto">
                <div className="flex justify-center space-x-1">

                    {/* previous */}
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePaginationButton(currentPage - 1)}
                        title="previous" type="button"
                        className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-secondary  hover:text-white'>

                        <div className='flex items-center -mx-1'>
                            <FcPrevious />
                            <span className='mx-1'>previous</span>
                        </div>

                    </button>

                    {/* number of pages */}
                    {
                        pages.map(page => {
                            return <>
                                <button
                                    onClick={() => handlePaginationButton(page)}
                                    key={page}
                                    type="button"
                                    title="Pagination Button"
                                    className={`hidden ${currentPage == page ? 'bg-blue-500 text-white' : ''} px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
                                >{page}</button>
                            </>
                        })
                    }

                    {/* next */}
                    <button
                        disabled={currentPage === numberOfPages}
                        onClick={() => handlePaginationButton(currentPage + 1)}
                        title="next" type="button"
                        className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-secondary disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>

                        <div className='flex items-center -mx-1'>
                            <span className='mx-1'>Next</span>
                            <FcNext />
                        </div>

                    </button>
                </div>
            </div>


        </div>
    );
};

export default DisplayProducts;