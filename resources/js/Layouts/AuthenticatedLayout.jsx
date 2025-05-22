import { useState } from "react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import {
    FaTachometerAlt,
    FaUser,
    FaUsers,
    FaNewspaper,
    FaBook,
    FaFileAlt,
    FaSignOutAlt,
} from "react-icons/fa";
import { usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [showingSidebar, setShowingSidebar] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navbar */}
            <nav className="bg-white border-b border-gray-100 shadow-sm">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            {/* Mobile hamburger menu */}
                            <div className="flex items-center md:hidden">
                                <button
                                    onClick={() =>
                                        setShowingSidebar(!showingSidebar)
                                    }
                                    className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingSidebar
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingSidebar
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center">
                            <div className="ml-3 relative">
                                <div className="flex items-center">
                                    <div className="font-medium text-base text-gray-800">
                                        {auth.user.name}
                                    </div>
                                    <div className="ml-4">
                                        <img
                                            className="h-8 w-8 rounded-full object-cover"
                                            src={
                                                auth.user.profile_photo_url ||
                                                "https://ui-avatars.com/api/?name=" +
                                                    encodeURIComponent(
                                                        auth.user.name
                                                    )
                                            }
                                            alt={auth.user.name}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <div
                    className={`${
                        showingSidebar ? "block" : "hidden"
                    } md:block md:w-64 bg-white shadow-lg`}
                >
                    <div className="flex flex-col h-screen">
                        <div className="flex-grow">
                            {/* Logo */}
                            <div className="flex items-center w-fit mx-auto ">
                                <Link href="/">
                                    <img
                                        className="block h-32 w-32 fill-current "
                                        src="/image/logo.png"
                                        alt="ADN Logo"
                                    />
                                </Link>
                            </div>
                            {/* User Profile Section */}
                            <div className="p-4 border-b border-gray-200">
                                <div className="flex items-center justify-center mb-2">
                                    <div className="h-20 w-20 rounded-full bg-gray-200 overflow-hidden">
                                        <img
                                            className="h-full w-full object-cover"
                                            src={
                                                auth.user.profile_photo_url ||
                                                "https://ui-avatars.com/api/?name=" +
                                                    encodeURIComponent(
                                                        auth.user.name
                                                    )
                                            }
                                            alt={auth.user.name}
                                        />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h2 className="font-semibold text-lg">
                                        {auth.user.name}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        {auth.user.role || "Super Admin"}
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <nav className="mt-2">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    <div className="flex items-center px-4 py-3 hover:bg-gray-100">
                                        <FaTachometerAlt className="mr-3 text-gray-600" />
                                        <span>Dashboard</span>
                                    </div>
                                </NavLink>

                                <NavLink
                                    href={route("admin.index")}
                                    active={
                                        route().current("admin.index") ||
                                        route().current("admin.create")
                                    }
                                >
                                    <div className="flex items-center px-4 py-3 hover:bg-gray-100">
                                        <FaUser className="mr-3 text-gray-600" />
                                        <span>Admin</span>
                                    </div>
                                </NavLink>

                                <NavLink
                                    href={route("divisi.index")}
                                    active={
                                        route().current("divisi.index") ||
                                        route().current("divisi.create")
                                    }
                                >
                                    <div className="flex items-center px-4 py-3 hover:bg-gray-100">
                                        <FaUsers className="mr-3 text-gray-600" />
                                        <span>Divisi</span>
                                    </div>
                                </NavLink>

                                <NavLink
                                    href={route("member")}
                                    active={
                                        route().current("member") ||
                                        route().current("member.add")
                                    }
                                >
                                    <div className="flex items-center px-4 py-3 hover:bg-gray-100">
                                        <FaUsers className="mr-3 text-gray-600" />
                                        <span>Member</span>
                                    </div>
                                </NavLink>

                                <NavLink
                                    href={route("berita")}
                                    active={
                                        route().current("berita") ||
                                        route().current("berita.add")
                                    }
                                >
                                    <div className="flex items-center px-4 py-3 hover:bg-gray-100">
                                        <FaNewspaper className="mr-3 text-gray-600" />
                                        <span>Berita</span>
                                    </div>
                                </NavLink>

                                <NavLink
                                // href={route("jurnal")}
                                // active={route().current("jurnal")}
                                >
                                    <div className="flex items-center px-4 py-3 hover:bg-gray-100">
                                        <FaBook className="mr-3 text-gray-600" />
                                        <span>Jurnal</span>
                                    </div>
                                </NavLink>

                                <NavLink
                                // href={route("situs-halaman")}
                                // active={route().current("situs-halaman")}
                                >
                                    <div className="flex items-center px-4 py-3 hover:bg-gray-100">
                                        <FaFileAlt className="mr-3 text-gray-600" />
                                        <span>Situs Halaman</span>
                                    </div>
                                </NavLink>

                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="w-full text-left"
                                >
                                    <div className="flex items-center px-4 py-3 hover:bg-gray-100">
                                        <FaSignOutAlt className="mr-3 text-gray-600" />
                                        <span>Keluar</span>
                                    </div>
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Page Header */}
                    {header && (
                        <header className="bg-white shadow">
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}

                    {/* Main Content */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            {children}
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="bg-white shadow-inner p-4 mt-auto">
                        <div className="text-center text-sm text-gray-600">
                            Copyright © {new Date().getFullYear()} ADN 2024. All
                            Rights Reserved
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
