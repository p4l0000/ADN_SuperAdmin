import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

export default function Admin({ auth, admins, flash, search = "" }) {
    const [searchQuery, setSearchQuery] = useState(search);
    const [isLoading, setIsLoading] = useState(false);
    const [flashMessage, setFlashMessage] = useState(flash);

    // Auto hide flash message after 5 seconds
    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => {
                setFlashMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    // Handle search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery !== search) {
                handleSearch();
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleSearch = () => {
        setIsLoading(true);

        // Build the URL with search parameters
        const params = {};
        if (searchQuery.trim()) {
            params.q = searchQuery.trim();
        }

        router.get(route("admin.index"), params, {
            preserveState: false, // Changed to false to ensure fresh data
            preserveScroll: false, // Changed to false for better UX when searching
            onFinish: () => setIsLoading(false),
            onError: () => setIsLoading(false),
        });
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        // This will trigger the useEffect and perform a search with empty query
    };

    const handleAdd = () => {
        router.visit(route("admin.create"));
    };

    const handleEdit = (item) => {
        router.visit(route("admin.edit", item.id));
    };

    const handleDelete = (item) => {
        if (
            confirm(
                `Apakah Anda yakin ingin menghapus admin ${item.nama_admin}?`
            )
        ) {
            router.delete(route("admin.destroy", item.id), {
                onSuccess: () => {
                    // Flash message will be handled by the controller
                },
                onError: (errors) => {
                    console.error("Error deleting admin:", errors);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="bg-green-50 rounded-lg shadow-md max-w-6xl mx-auto">
                        {/* Flash Message */}
                        {flashMessage && (
                            <div
                                className={`mx-4 mt-4 p-4 rounded-md ${
                                    flashMessage.type === "success"
                                        ? "bg-green-100 border border-green-400 text-green-700"
                                        : "bg-red-100 border border-red-400 text-red-700"
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <span>{flashMessage.message}</span>
                                    <button
                                        onClick={() => setFlashMessage(null)}
                                        className="ml-4 text-lg font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Header with title and actions */}
                        <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                            <h1 className="text-2xl font-bold text-green-900 mb-4 md:mb-0">
                                Daftar Admin
                            </h1>

                            <div className="flex flex-col md:flex-row w-full md:w-auto gap-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari ID, nama admin, atau divisi..."
                                        className="border border-gray-300 rounded-md pl-3 pr-20 py-2 w-full md:w-72 focus:outline-none focus:ring-1 focus:ring-green-500"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSearch();
                                            }
                                        }}
                                    />

                                    {/* Search/Loading Icon */}
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                                        {searchQuery && (
                                            <button
                                                onClick={handleClearSearch}
                                                className="text-gray-400 hover:text-gray-600 p-1"
                                                title="Clear search"
                                            >
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        )}
                                        <svg
                                            className={`h-4 w-4 ${
                                                isLoading
                                                    ? "animate-spin text-green-500"
                                                    : "text-gray-400"
                                            }`}
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            {isLoading ? (
                                                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            ) : (
                                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            )}
                                        </svg>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAdd}
                                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-200 flex items-center gap-2"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    Tambah Admin
                                </button>
                            </div>
                        </div>

                        {/* Search info */}
                        {searchQuery && (
                            <div className="px-4 pb-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600">
                                        Menampilkan hasil pencarian untuk:{" "}
                                        <strong>"{searchQuery}"</strong>
                                        {admins?.data?.length === 0 &&
                                            " - Tidak ada hasil ditemukan"}
                                    </p>
                                    <button
                                        onClick={handleClearSearch}
                                        className="text-sm text-green-600 hover:text-green-800 underline"
                                    >
                                        Lihat semua data
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Results count */}
                        {admins?.total !== undefined && (
                            <div className="px-4 pb-2">
                                <p className="text-sm text-gray-500">
                                    Total: {admins.total} admin
                                    {searchQuery &&
                                        ` (dari pencarian "${searchQuery}")`}
                                </p>
                            </div>
                        )}

                        {/* Table separator line */}
                        <div className="border-t border-gray-300"></div>

                        {/* Table section */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="py-3 px-6 text-left font-medium text-gray-700">
                                            No
                                        </th>
                                        <th className="py-3 px-6 text-left font-medium text-gray-700">
                                            ID
                                        </th>
                                        <th className="py-3 px-6 text-left font-medium text-gray-700">
                                            Nama
                                        </th>
                                        <th className="py-3 px-6 text-left font-medium text-gray-700">
                                            Divisi
                                        </th>
                                        <th className="py-3 px-6 text-center font-medium text-gray-700">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins?.data && admins.data.length > 0 ? (
                                        admins.data.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                className="border-b border-gray-200 hover:bg-gray-50"
                                            >
                                                <td className="py-3 px-6 text-gray-900">
                                                    {(admins.current_page - 1) *
                                                        admins.per_page +
                                                        index +
                                                        1}
                                                </td>
                                                <td className="py-3 px-6 text-gray-900">
                                                    {item.id}
                                                </td>
                                                <td className="py-3 px-6 text-gray-900 font-medium">
                                                    {item.nama_admin ||
                                                        item.namaAdmin}
                                                </td>
                                                <td className="py-3 px-6 text-gray-900">
                                                    {item.divisi?.nama_divisi ||
                                                        "N/A"}
                                                </td>
                                                <td className="py-3 px-6">
                                                    <div className="flex justify-center space-x-3">
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(item)
                                                            }
                                                            title="Edit Admin"
                                                            className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                                                        >
                                                            <svg
                                                                className="h-5 w-5"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item
                                                                )
                                                            }
                                                            title="Delete Admin"
                                                            className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                                                        >
                                                            <svg
                                                                className="h-5 w-5"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="py-8 px-6 text-center text-gray-500"
                                            >
                                                {searchQuery
                                                    ? "Tidak ada data admin yang sesuai dengan pencarian."
                                                    : "Belum ada data admin."}
                                                {searchQuery && (
                                                    <div className="mt-2">
                                                        <button
                                                            onClick={
                                                                handleClearSearch
                                                            }
                                                            className="text-green-600 hover:text-green-800 underline text-sm"
                                                        >
                                                            Lihat semua data
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {admins?.data &&
                            admins.data.length > 0 &&
                            admins.last_page > 1 && (
                                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-700">
                                            Menampilkan {admins.from} -{" "}
                                            {admins.to} dari {admins.total} data
                                            {searchQuery &&
                                                ` (hasil pencarian)`}
                                        </div>
                                        <div className="flex space-x-2">
                                            {admins.prev_page_url && (
                                                <button
                                                    onClick={() => {
                                                        const url = new URL(
                                                            admins.prev_page_url
                                                        );
                                                        const params = {};

                                                        // Preserve search query in pagination
                                                        if (searchQuery) {
                                                            params.q =
                                                                searchQuery;
                                                        }
                                                        params.page =
                                                            url.searchParams.get(
                                                                "page"
                                                            );

                                                        router.get(
                                                            route(
                                                                "admin.index"
                                                            ),
                                                            params
                                                        );
                                                    }}
                                                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                                                >
                                                    Sebelumnya
                                                </button>
                                            )}

                                            <span className="px-3 py-1 text-sm bg-green-600 text-white rounded">
                                                {admins.current_page}
                                            </span>

                                            {admins.next_page_url && (
                                                <button
                                                    onClick={() => {
                                                        const url = new URL(
                                                            admins.next_page_url
                                                        );
                                                        const params = {};

                                                        // Preserve search query in pagination
                                                        if (searchQuery) {
                                                            params.q =
                                                                searchQuery;
                                                        }
                                                        params.page =
                                                            url.searchParams.get(
                                                                "page"
                                                            );

                                                        router.get(
                                                            route(
                                                                "admin.index"
                                                            ),
                                                            params
                                                        );
                                                    }}
                                                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                                                >
                                                    Selanjutnya
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
