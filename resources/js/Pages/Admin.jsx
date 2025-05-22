import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Admin({ auth, admins }) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter data based on search query
    const filteredData = admins.data.filter((item) => {
        if (!searchQuery) return true;

        return (
            item.id
                .toString()
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            item.namaAdmin.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.divisi.nama_divisi
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );
    });

    const handleAdd = () => {
        router.visit(route("admin.create"));
    };

    const handleEdit = (item) => {
        router.visit(route("admin.edit", item.id));
    };

    const handleDelete = (item) => {
        if (
            confirm(
                `Apakah Anda yakin ingin menghapus admin ${item.namaAdmin}?`
            )
        ) {
            router.delete(route("admin.destroy", item.id), {
                onSuccess: () => {
                    console.log("Admin berhasil dihapus");
                },
                onError: (errors) => {
                    console.error("Error deleting admin:", errors);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Admin
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-green-50 rounded-lg shadow-md max-w-6xl mx-auto">
                            {/* Header with title and actions */}
                            <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                                <h1 className="text-2xl font-bold text-green-900 mb-4 md:mb-0">
                                    Daftar Admin
                                </h1>

                                <div className="flex flex-col md:flex-row w-full md:w-auto gap-3">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="border border-gray-300 rounded-md pl-3 pr-10 py-2 w-full focus:outline-none focus:ring-1 focus:ring-green-500"
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                        />
                                        <svg
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>

                                    <button
                                        onClick={handleAdd}
                                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-200"
                                    >
                                        Tambah Admin
                                    </button>
                                </div>
                            </div>

                            {/* Table separator line */}
                            <div className="border-t border-gray-300"></div>

                            {/* Table section */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
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
                                        {filteredData.length > 0 ? (
                                            filteredData.map((item, index) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-gray-200 hover:bg-gray-50"
                                                >
                                                    <td className="py-3 px-6 text-gray-900">
                                                        {item.id}
                                                    </td>
                                                    <td className="py-3 px-6 text-gray-900">
                                                        {item.nama_admin}
                                                    </td>
                                                    <td className="py-3 px-6 text-gray-900">
                                                        {item.divisi
                                                            ?.nama_divisi ||
                                                            "N/A"}
                                                    </td>
                                                    <td className="py-3 px-6">
                                                        <div className="flex justify-center space-x-3">
                                                            <button
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        item
                                                                    )
                                                                }
                                                                className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                                                                title="Edit Admin"
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
                                                                className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                                                                title="Delete Admin"
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
                                                    colSpan="4"
                                                    className="py-8 px-6 text-center text-gray-500"
                                                >
                                                    {searchQuery
                                                        ? "Tidak ada data yang ditemukan"
                                                        : "Belum ada data admin"}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {admins.links && admins.links.length > 3 && (
                                <div className="px-4 py-3 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-700">
                                            Menampilkan {admins.from} sampai{" "}
                                            {admins.to} dari {admins.total} data
                                        </div>
                                        <div className="flex space-x-1">
                                            {admins.links.map((link, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() =>
                                                        link.url &&
                                                        router.visit(link.url)
                                                    }
                                                    disabled={!link.url}
                                                    className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
                                                        link.active
                                                            ? "bg-green-600 text-white"
                                                            : link.url
                                                            ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    }`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
