
import { Link } from 'react-router-dom';
import useAuth from './../../hooks/useAuth';
import { GoPerson } from "react-icons/go";
import { useState } from 'react';
import { Tooltip } from "react-tooltip";


const NavRight = () => {

    const { loggedOut, user } = useAuth();

    // State to track whether the dropdown is open or closed
    const [dropdown, setDropdown] = useState(false);

    // Function to toggle the dropdown state
    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

    const lists = <>
        <li>
            <a className="justify-between">
                Profile
                <span className="badge">New</span>
            </a>
        </li>
        <li><a>Settings</a></li>
        <li
            className="rounded-xl p-2 m-2 text-right"
            onClick={loggedOut}
        >
            <button className='bg-base-300 hover:bg-neutral hover:text-white block text-center'>Logout</button>
        </li>
    </>

    return (
        <>
            <div className="flex gap-2">

                {/* cart */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </div>

                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* login */}
                <div className='z-50'>
                    {
                        user ?

                            <div className="dropdown dropdown-end" onClick={toggleDropdown}>
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle btn-outline avatar animate-pulse hover:animate-none">
                                    <div className="w-10 rounded-full">

                                        <img
                                            data-tooltip-id="name-tooltip"
                                            data-tooltip-content={`${user?.displayName || user?.email}`}
                                            referrerPolicy="no-referrer"
                                            alt="Tailwind CSS Navbar component"
                                            src=
                                            {
                                                user?.photoURL ? user?.photoURL
                                                    : "https://i.ibb.co/8dJbHdP/No-Photo-Available.webp"
                                            }
                                        />
                                        <Tooltip id="name-tooltip" />
                                    </div>
                                </div>

                                {dropdown && (
                                    <ul
                                        tabIndex={0}
                                        className="mt-3 z-[2] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-64">
                                        <li >
                                            <p className="flex justify-center items-center">
                                                Hi,
                                                <span className=" text-blue-500 font-serif">
                                                    {
                                                        user?.displayName || user?.email
                                                    }
                                                </span>
                                            </p>
                                        </li>
                                        <div className="divider divider-secondary my-0" ></div>
                                        {lists}
                                    </ul>
                                )}


                            </div>

                            : <Link to="/login"
                                className="btn btn-outline text-center rounded-3xl hover:bg-neutral animate-pulse hover:text-white hover:border-0 hover:animate-ping"
                            >
                                <GoPerson />
                            </Link>
                    }

                </div>

            </div>
        </>
    );
};

export default NavRight;