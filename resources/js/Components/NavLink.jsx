import { Link } from "@inertiajs/react";

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`${
                active
                    ? "border-l-4 border-green-600 text-green-600 bg-green-50"
                    : "text-gray-700"
            } flex items-center hover:bg-gray-100 transition duration-150 ease-in-out w-full`}
        >
            {children}
        </Link>
    );
}
