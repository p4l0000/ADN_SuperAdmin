import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Berita() {
    const [beritaData] = useState([
        {
            sampul: "/sample-image.jpg",
            judul: "lorem ipsum dolor sit amet",
            tanggal: "Selasa, 7 Juli 2020",
            deskripsi: "lorem ipsum dolor sit amet",
        },
        {
            sampul: "/sample-image.jpg",
            judul: "lorem ipsum dolor sit amet",
            tanggal: "Selasa, 7 Juli 2020",
            deskripsi: "lorem ipsum dolor sit amet",
        },
        {
            sampul: "/sample-image.jpg",
            judul: "lorem ipsum dolor sit amet",
            tanggal: "Selasa, 7 Juli 2020",
            deskripsi: "lorem ipsum dolor sit amet",
        },
        {
            sampul: "/sample-image.jpg",
            judul: "lorem ipsum dolor sit amet",
            tanggal: "Selasa, 7 Juli 2020",
            deskripsi: "lorem ipsum dolor sit amet",
        },
        {
            sampul: "/sample-image.jpg",
            judul: "lorem ipsum dolor sit amet",
            tanggal: "Selasa, 7 Juli 2020",
            deskripsi: "lorem ipsum dolor sit amet",
        },
        {
            sampul: "/sample-image.jpg",
            judul: "lorem ipsum dolor sit amet",
            tanggal: "Selasa, 7 Juli 2020",
            deskripsi: "lorem ipsum dolor sit amet",
        },
        {
            sampul: "/sample-image.jpg",
            judul: "lorem ipsum dolor sit amet",
            tanggal: "Selasa, 7 Juli 2020",
            deskripsi: "lorem ipsum dolor sit amet",
        },
        {
            sampul: "/sample-image.jpg",
            judul: "lorem ipsum dolor sit amet",
            tanggal: "Selasa, 7 Juli 2020",
            deskripsi: "lorem ipsum dolor sit amet",
        },
        {
            sampul: "/sample-image.jpg",
            judul: "lorem ipsum dolor sit amet",
            tanggal: "Selasa, 7 Juli 2020",
            deskripsi: "lorem ipsum dolor sit amet",
        },
    ]);

    const [searchQuery, setSearchQuery] = useState("");

    // Filter data based on search query
    const filteredData = beritaData.filter((item) => {
        if (!searchQuery) return true;

        return (
            item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tanggal.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleAdd = () => {
        router.visit(route("berita.add"));
    };

    const handleEdit = (item) => {
        alert(`Edit item: ${JSON.stringify(item)}`);
    };

    const handleDelete = (item) => {
        alert(`Delete item: ${JSON.stringify(item)}`);
    };

    // Function to render placeholder image with 3:2 ratio
    const ImagePlaceholder = () => (
        <div className="relative bg-gray-200 w-24 h-16 flex items-center justify-center overflow-hidden">
            <div className="absolute text-gray-500 font-bold">3:2</div>
        </div>
    );

    return (
        <AuthenticatedLayout>
            <div className="bg-green-50 rounded-lg shadow-md max-w-6xl mx-auto">
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
                            {filteredData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 hover:bg-gray-50"
                                >
                                    <td className="py-3 px-6">
                                        <ImagePlaceholder />
                                    </td>
                                    <td className="py-3 px-6 text-gray-900">
                                        {item.judul}
                                    </td>
                                    <td className="py-3 px-6 text-gray-900">
                                        {item.tanggal}
                                    </td>
                                    <td className="py-3 px-6 text-gray-900">
                                        {item.deskripsi}
                                    </td>
                                    <td className="py-3 px-6">
                                        <div className="flex justify-center space-x-3">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-gray-500 hover:text-blue-600"
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
                                                className="text-gray-500 hover:text-red-600"
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
