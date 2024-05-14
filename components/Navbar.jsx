"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

import { globalStore } from "@/store/globalStore";

const Navbar = () => {
    const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn } = globalStore();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const { displayName, email, photoURL } = user;
                console.log("User signed in:", {
                    displayName,
                    email,
                    photoURL,
                });

                setUserInfo({
                    name: displayName,
                    email: email,
                    photoURL: photoURL,
                });
                // setIsLoggedIn(true);
            } else {
                // User is signed out
                console.log("User signed out");
                // You can reset your application state here
            }
        });

        // Clean up the subscription
        return unsubscribe;
    }, []);

    const handleToggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleSignOut = async () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log("sign out successful");
                setUserInfo({
                    name: null,
                    email: null,
                    photoURL: null,
                });
                setIsLoggedIn(false);
            })
            .catch((error) => {
                // An error happened.
                console.log("sign out error: ", error);
            });
    };
    return (
        <nav className="bg-white border-gray-200 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                    href=" /"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img src="/ " className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                        Flowbite
                    </span>
                </a>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {!userInfo?.name ? (
                        <div>
                            <Link
                                href="/sign-in?redirect=/"
                                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0  "
                                aria-current="page"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/sign-in?redirect=/onboarding"
                                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0  "
                                aria-current="page"
                            >
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div onClick={handleToggleUserMenu}>
                            <Image
                                src={userInfo?.photoURL}
                                alt="image"
                                width={50}
                                height={50}
                            ></Image>
                        </div>
                    )}
                    {/* dropdown */}
                    <div>
                        {isUserMenuOpen && (
                            <div
                                className="z-50 absolute right-5 top-20  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow  "
                                id="user-dropdown"
                            >
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900  :">
                                        Bonnie Green
                                    </span>
                                    <span className="block text-sm  text-gray-500 truncate  ">
                                        name@flowbite.com
                                    </span>
                                </div>
                                <ul
                                    className="py-2"
                                    aria-labelledby="user-menu-button"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  hover:text-white"
                                        >
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  hover:text-white"
                                        >
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  hover:text-white"
                                        >
                                            Earnings
                                        </a>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleSignOut}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  hover:text-white"
                                        >
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <button
                        data-collapse-toggle="navbar-user"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  "
                        aria-controls="navbar-user"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-user"
                >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  ">
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0  "
                                aria-current="page"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:p-0  hover:text-white  border-gray-700"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:p-0  hover:text-white border-gray-700"
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:p-0  hover:text-white border-gray-700"
                            >
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:p-0  hover:text-white border-gray-700"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
