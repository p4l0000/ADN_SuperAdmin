import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function TambahBerita() {
    const { data, setData, post, processing, errors, reset } = useForm({
        judulBerita: "",
        sampulBerita: null,
        deskripsiJudul: "",
    });

    const [fileName, setFileName] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("sampulBerita", file);
            setFileName(file.name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("berita.store"), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setFileName("");
            },
        });
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah Berita
                </h2>
            }
        >
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-green-100 rounded-2xl p-8 w-full max-w-md shadow-lg">
                    <h1 className="text-2xl font-bold text-green-900 text-center mb-8">
                        Tambah Berita
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Judul Berita Field */}
                        <div>
                            <label
                                htmlFor="judulBerita"
                                className="block text-base font-semibold text-green-900 mb-2"
                            >
                                Judul Berita
                            </label>
                            <input
                                type="text"
                                id="judulBerita"
                                name="judulBerita"
                                value={data.judulBerita}
                                onChange={handleInputChange}
                                placeholder="Lahirnya Aliansi Dosen Nahada Kawal Kampus dari Gerakan Radikal"
                                className={`w-full px-0 py-2 text-gray-800 bg-transparent border-0 border-b-2 focus:outline-none placeholder-gray-600 text-sm ${
                                    errors.judulBerita
                                        ? "border-red-500 focus:border-red-600"
                                        : "border-gray-700 focus:border-green-600"
                                }`}
                            />
                            {errors.judulBerita && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.judulBerita}
                                </p>
                            )}
                        </div>

                        {/* Sampul Berita Field */}
                        <div>
                            <label
                                htmlFor="sampulBerita"
                                className="block text-base font-semibold text-green-900 mb-2"
                            >
                                Sampul Berita
                            </label>
                            <div className="flex items-center space-x-3">
                                <label
                                    htmlFor="sampulBerita"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer text-sm transition duration-200"
                                >
                                    Choose File
                                </label>
                                <input
                                    type="file"
                                    id="sampulBerita"
                                    name="sampulBerita"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                {fileName && (
                                    <span className="text-gray-700 text-sm truncate max-w-48">
                                        {fileName}
                                    </span>
                                )}
                            </div>
                            {errors.sampulBerita && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.sampulBerita}
                                </p>
                            )}
                        </div>

                        {/* Deskripsi Judul Field */}
                        <div>
                            <label
                                htmlFor="deskripsiJudul"
                                className="block text-base font-semibold text-green-900 mb-2"
                            >
                                Deskripsi Judul
                            </label>
                            <textarea
                                id="deskripsiJudul"
                                name="deskripsiJudul"
                                value={data.deskripsiJudul}
                                onChange={handleInputChange}
                                placeholder="Masukkan deskripsi berita..."
                                rows={5}
                                className={`w-full px-3 py-2 text-gray-800 bg-white border-2 rounded-md focus:outline-none placeholder-gray-500 resize-none text-sm ${
                                    errors.deskripsiJudul
                                        ? "border-red-500 focus:border-red-600"
                                        : "border-gray-300 focus:border-green-600"
                                }`}
                            />
                            {errors.deskripsiJudul && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.deskripsiJudul}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full font-semibold py-3 px-6 rounded-md transition duration-200 ${
                                    processing
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-700"
                                } text-white`}
                            >
                                {processing ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>
                    </form>

                    {/* Cancel Button */}
                    <div className="mt-4">
                        <button
                            onClick={handleCancel}
                            type="button"
                            className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
