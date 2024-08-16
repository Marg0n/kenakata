import { Link } from "react-router-dom";
import NavRight from "./NavRight";
import logo from '/kenakata.gif';
// import logo from '/kenakata_logo.png';


const Navbar = () => {

    const lists = <>
        <li>
            <Link>Item 1</Link>
        </li>
        <li>
            <Link>Item 3</Link>
        </li>
    </>

    return (
        <>
            <div className="navbar bg-primary text-primary-content">

                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {lists}
                        </ul>
                    </div>

                    {/* logo */}
                    <Link to="/" className='flex gap-2 items-center btn btn-ghost text-xl'>
                        <img className='w-10 h-10 rounded'
                            referrerPolicy='no-referrer' src={logo} alt='কেনাকাটা' />
                        <span className='font-bold'>কেনাকাটা</span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {lists}
                    </ul>
                </div>

                <div className="navbar-end">
                    <NavRight />
                </div>
            </div>
        </>
    );
};

export default Navbar;