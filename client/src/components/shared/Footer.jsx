import { Link } from 'react-router-dom';
import logo from '/kenakata.gif';
import 'animate.css';
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
            <footer className="footer bg-neutral text-neutral-content p-4 footer-center">

                <div className="flex justify-center items-center w-full">
                    <nav className='w-1/2'>
                        <div className='flex lg:flex-row flex-col justify-center items-center gap-4'>
                            {/* logo */}
                            <Link to="/" className='flex gap-2 items-center text-xl'>
                                <img className='w-36 h-36 rounded-full'
                                    referrerPolicy='no-referrer' src={logo} alt='কেনাকাটা' />
                                {/* <span className='font-bold'>কেনাকাটা</span> */}
                            </Link>

                            <div className='flex flex-col lg:text-left font-serif'>
                                <p className='font-bold'>কেনাকাটা</p>
                                <p>Grocery Shopping</p>
                                <p>Shop your Grocery! We are Your trusted online shopping partner!</p>
                            </div>
                        </div>
                    </nav>

                    <nav className='w-1/2'>
                        <h6 className="uppercase font-bold mb-2">Social</h6>
                        <div className="grid grid-flow-col gap-4 items-center justify-center">
                            <a>
                                <FaXTwitter size={24} />
                            </a>
                            <a>
                                <FaYoutube size={24} />
                            </a>
                            <a>
                                <FaFacebookF size={24} />
                            </a>
                        </div>

                    </nav>
                </div>


                <p>Copyright © {new Date().getFullYear()} - All right reserved by <Link to="/" className='font-bold animate__animated animate__rubberBand animate__infinite hover:text-blue-600 hover:animate-none'>কেনাকাটা</Link></p>
            </footer>
        </>
    );
};

export default Footer;