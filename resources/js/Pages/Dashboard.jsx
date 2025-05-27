import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaUser, FaUsers, FaIdCard } from "react-icons/fa";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { stats, news } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
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
                                        <img
                                            src={`/storage/${item.sampul_berita}`}
                                            alt={item.judul_berita}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-medium text-gray-900 mb-2">
                                            {item.judul_berita}
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
