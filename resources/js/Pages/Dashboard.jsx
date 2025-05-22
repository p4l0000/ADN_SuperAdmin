import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { FaUser, FaUsers, FaIdCard } from "react-icons/fa";

export default function Dashboard() {
    const [stats] = useState([
        { title: "Admin", count: 18, icon: "user", color: "bg-green-500" },
        { title: "Divisi", count: 9, icon: "users", color: "bg-green-500" },
        { title: "Member", count: 100, icon: "id-card", color: "bg-green-500" },
    ]);

    const [news] = useState([
        {
            id: 1,
            title: "Lahirnya Aliansi Dosen Nahada Kawal Kampus dari Gerakan Radikal",
            imageUrl: "/api/placeholder/400/320",
        },
        {
            id: 2,
            title: "Aliansi Dosen Nahada (ADN) Wilayah Jawa Timur Resmi Dilantik",
            imageUrl: "/api/placeholder/400/320",
        },
        {
            id: 3,
            title: "Pangdiof 2 Kostrad Hadiri Pelantikan dan Deklarasi Pengurus Aliansi Dosen Nahada Jakarta",
            imageUrl: "/api/placeholder/400/320",
        },
    ]);

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gray-100 p-4 md:p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
                        Selamat Datang di Beranda, Aliansi Dosen Nahada
                    </h1>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-24 gap-5 mb-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`${stat.color} rounded-lg p-4 text-white shadow-md items-center h-32`}
                            >
                                <div className="text-3xl">
                                    {stat.icon === "user" && <FaUser />}
                                    {stat.icon === "users" && <FaUsers />}
                                    {stat.icon === "id-card" && <FaIdCard />}
                                </div>
                                <div className="mt-3 text-sm font-medium">
                                    {stat.title}
                                </div>
                                <div className="text-2xl font-bold mt-1 ml-auto w-fit">
                                    {stat.count}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* News Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            Berita
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {news.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                                >
                                    <div className="relative">
                                        <div className="aspect-w-3 aspect-h-2 w-full">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-white text-4xl font-bold">
                                                    3:2
                                                </span>
                                            </div>
                                            <div className="absolute inset-0 bg-black bg-opacity-10">
                                                <div className="h-full w-full flex items-center justify-center">
                                                    <div className="border-2 border-white opacity-60 absolute inset-0 m-4">
                                                        <div className="absolute w-full h-0.5 bg-white top-1/2 transform -translate-y-1/2"></div>
                                                        <div className="absolute h-full w-0.5 bg-white left-1/2 transform -translate-x-1/2"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-medium text-gray-900 mb-2">
                                            {item.title}
                                        </h3>
                                        <div className="mt-2">
                                            <button className="w-full bg-green-700 hover:bg-green-800 text-white py-1 px-3 rounded text-sm">
                                                Baca Selengkapnya
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
