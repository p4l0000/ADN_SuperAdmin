import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";

export default function TambahMember({ divisiOptions = [], auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        namaMember: "",
        divisi: "",
        status: "",
    });

    const statusOptions = ["Aktif", "Non Aktif"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleDivisiChange = (selectedDivisiId) => {
        setData("divisi", selectedDivisiId);
    };

    const handleStatusChange = (selectedStatus) => {
        setData("status", selectedStatus);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("member.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Member" />

            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-green-100 rounded-2xl p-8 w-full max-w-md shadow-lg">
                    <h1 className="text-2xl font-bold text-green-900 text-center mb-8">
                        Divisi Member
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nama Member Field */}
                        <div>
                            <label
                                htmlFor="namaMember"
                                className="block text-lg font-semibold text-green-900 mb-3"
                            >
                                Nama Member
                            </label>
                            <input
                                type="text"
                                id="namaMember"
                                name="namaMember"
                                value={data.namaMember}
                                onChange={handleInputChange}
                                placeholder="Rizky Budhiderma"
                                className="w-full px-0 py-2 text-gray-800 bg-transparent border-0 border-b-2 border-gray-700 focus:outline-none focus:border-green-600 placeholder-gray-500"
                            />
                            {errors.namaMember && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.namaMember}
                                </div>
                            )}
                        </div>

                        {/* Divisi Field */}
                        <div>
                            <label className="block text-lg font-semibold text-green-900 mb-4">
                                Divisi
                            </label>
                            <div className="space-y-3">
                                {divisiOptions.map((divisi) => (
                                    <label
                                        key={divisi.id}
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            handleDivisiChange(divisi.id)
                                        }
                                    >
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 border-gray-700 flex items-center justify-center mr-3 ${
                                                data.divisi === divisi.id
                                                    ? "bg-gray-700"
                                                    : "bg-transparent"
                                            }`}
                                        >
                                            {data.divisi === divisi.id && (
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            )}
                                        </div>
                                        <span className="text-gray-800 text-lg">
                                            {divisi.nama_divisi}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.divisi && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.divisi}
                                </div>
                            )}
                        </div>

                        {/* Status Field */}
                        <div>
                            <label className="block text-lg font-semibold text-green-900 mb-4">
                                Status
                            </label>
                            <div className="space-y-3">
                                {statusOptions.map((status, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            handleStatusChange(status)
                                        }
                                    >
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 border-gray-700 flex items-center justify-center mr-3 ${
                                                data.status === status
                                                    ? "bg-gray-700"
                                                    : "bg-transparent"
                                            }`}
                                        >
                                            {data.status === status && (
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            )}
                                        </div>
                                        <span className="text-gray-800 text-lg">
                                            {status}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.status && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.status}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-md transition duration-200"
                            >
                                {processing ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>

                        {/* General Error */}
                        {errors.error && (
                            <div className="text-red-600 text-sm text-center">
                                {errors.error}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
