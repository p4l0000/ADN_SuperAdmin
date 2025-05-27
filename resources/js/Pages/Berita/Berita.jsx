import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

export default function Berita({ berita = [], flash }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [flashMessage, setFlashMessage] = useState(flash);

    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => {
                setFlashMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    // Filter data based on search query
    const filteredData = berita.filter((item) => {
        if (!searchQuery) return true;

        return (
            item.judul_berita
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            item.deskripsi_judul
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            (item.created_at &&
                new Date(item.created_at)
                    .toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()))
        );
    });

    const handleAdd = () => {
        router.visit(route("berita.create"));
    };

    const handleEdit = (item) => {
        router.visit(route("berita.edit", item.id));
    };

    const handleDelete = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            router.delete(route("berita.destroy", itemToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setItemToDelete(null);
                    console.log("berhasil delete");
                },
                onError: () => {
                    alert("Terjadi kesalahan saat menghapus berita");
                },
            });
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    // Function to render image or placeholder
    const renderImage = (item) => {
        if (item.sampul_berita) {
            return (
                <img
                    src={`/storage/${item.sampul_berita}`}
                    alt={item.judul_berita}
                    className="w-24 h-16 object-cover rounded"
                    onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                    }}
                />
            );
        }
        return (
            <div className="bg-gray-200 w-24 h-16 flex items-center justify-center rounded">
                <span className="text-gray-500 text-xs">No Image</span>
            </div>
        );
    };

    // Function to format date
    const formatDate = (dateString) => {
        if (!dateString) return "-";

        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Function to truncate text
    const truncateText = (text, maxLength = 100) => {
        if (!text) return "-";
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + "...";
    };

    return (
        <AuthenticatedLayout>
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
                                x
                            </button>
                        </div>
                    </div>
                )}

                {/* Header with title and actions */}
                <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <h1 className="text-2xl font-bold text-green-900 mb-4 md:mb-0">
                        Daftar Berita
                    </h1>

                    <div className="flex flex-col md:flex-row w-full md:w-auto gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="border border-gray-300 rounded-md pl-3 pr-10 py-2 w-full focus:outline-none focus:ring-1 focus:ring-green-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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
                            Tambah Berita
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
                                    Sampul
                                </th>
                                <th className="py-3 px-6 text-left font-medium text-gray-700">
                                    Judul Berita
                                </th>
                                <th className="py-3 px-6 text-left font-medium text-gray-700">
                                    Tanggal
                                </th>
                                <th className="py-3 px-6 text-left font-medium text-gray-700">
                                    Deskripsi
                                </th>
                                <th className="py-3 px-6 text-center font-medium text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="py-3 px-6">
                                            {renderImage(item)}
                                            <div
                                                className="bg-gray-200 w-24 h-16 items-center justify-center rounded"
                                                style={{ display: "none" }}
                                            >
                                                <span className="text-gray-500 text-xs">
                                                    No Image
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-gray-900">
                                            <div className="font-medium">
                                                {item.judul_berita}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-gray-900">
                                            {formatDate(item.created_at)}
                                        </td>
                                        <td className="py-3 px-6 text-gray-900">
                                            <div title={item.deskripsi_judul}>
                                                {truncateText(
                                                    item.deskripsi_judul,
                                                    100
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="flex justify-center space-x-3">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                    className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                                                    title="Edit Berita"
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
                                                        handleDelete(item)
                                                    }
                                                    className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                                                    title="Delete Berita"
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
                                            ? "Tidak ada berita yang sesuai dengan pencarian"
                                            : "Belum ada data berita"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Konfirmasi Hapus
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Apakah Anda yakin ingin menghapus berita "
                            {itemToDelete?.judul_berita}"? Tindakan ini tidak
                            dapat dibatalkan.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
