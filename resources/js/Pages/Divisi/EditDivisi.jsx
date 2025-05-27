import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";

export default function EditDivisi({ divisi, flash = null }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        namaDivisi: divisi?.nama_divisi || "",
        deskripsiDivisi: divisi?.deskripsi || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("divisi.update", divisi.id), {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Divisi berhasil diperbarui");
            },
            onError: (errors) => {
                console.log("Validation errors:", errors);
            },
        });
    };

    const handleCancel = () => {
        router.visit(route("divisi.index"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Divisi
                </h2>
            }
        >
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-blue-100 rounded-2xl p-8 w-full max-w-md shadow-lg">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold text-blue-900">
                            Edit Divisi
                        </h1>
                        {processing && (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-900"></div>
                        )}
                    </div>

                    {/* Flash Message */}
                    {flash && flash.message && (
                        <div
                            className={`mb-6 p-4 rounded-md ${
                                flash.type === "success"
                                    ? "bg-green-200 text-green-800 border border-green-300"
                                    : "bg-red-200 text-red-800 border border-red-300"
                            }`}
                        >
                            {flash.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nama Divisi */}
                        <div>
                            <label
                                htmlFor="namaDivisi"
                                className="block text-base font-semibold text-blue-900 mb-2"
                            >
                                Nama Divisi{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="namaDivisi"
                                name="namaDivisi"
                                value={data.namaDivisi}
                                onChange={handleInputChange}
                                placeholder="Contoh: Divisi IT"
                                disabled={processing}
                                className={`w-full px-0 py-2 text-gray-800 bg-transparent border-0 border-b-2 focus:outline-none placeholder-gray-600 transition-colors ${
                                    errors.namaDivisi
                                        ? "border-red-500 focus:border-red-600"
                                        : "border-gray-700 focus:border-blue-600"
                                } ${
                                    processing
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            />
                            {errors.namaDivisi && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {errors.namaDivisi}
                                </p>
                            )}
                        </div>

                        {/* Deskripsi Divisi */}
                        <div>
                            <label
                                htmlFor="deskripsiDivisi"
                                className="block text-base font-semibold text-blue-900 mb-2"
                            >
                                Deskripsi Divisi{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="deskripsiDivisi"
                                name="deskripsiDivisi"
                                value={data.deskripsiDivisi}
                                onChange={handleInputChange}
                                placeholder="Masukkan deskripsi divisi..."
                                rows={5}
                                disabled={processing}
                                className={`w-full px-3 py-2 text-gray-800 bg-white border-2 rounded-md focus:outline-none placeholder-gray-500 resize-none transition-colors ${
                                    errors.deskripsiDivisi
                                        ? "border-red-500 focus:border-red-600"
                                        : "border-gray-300 focus:border-blue-600"
                                } ${
                                    processing
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            />
                            {errors.deskripsiDivisi && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {errors.deskripsiDivisi}
                                </p>
                            )}
                        </div>

                        {/* Tombol Perbarui */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full font-semibold py-3 px-6 rounded-md transition duration-200 flex items-center justify-center ${
                                    processing
                                        ? "bg-gray-400 cursor-not-allowed text-white"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                            >
                                {processing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Memperbarui...
                                    </>
                                ) : (
                                    "Perbarui"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Tombol Batal */}
                    <div className="mt-4">
                        <button
                            onClick={handleCancel}
                            disabled={processing}
                            className={`w-full font-semibold py-2 px-6 rounded-md transition duration-200 ${
                                processing
                                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                                    : "bg-gray-400 hover:bg-gray-500 text-white"
                            }`}
                        >
                            Batal
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
