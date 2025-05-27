import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function EditAdmin({
    auth,
    admin,
    divisiOptions = [],
    onSubmit,
    onCancel,
    flash = null,
}) {
    const { data, setData, put, processing, errors, reset } = useForm({
        namaAdmin: admin?.nama_admin || "",
        divisi: admin?.divisi_id || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleDivisiChange = (selectedDivisiId) => {
        setData("divisi", selectedDivisiId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("admin.update", admin.id), {
            onSuccess: () => {
                console.log("berhasil");
            },
            onError: (errors) => {
                console.log("Validation errors:", errors);
            },
        });
    };

    const handleCancel = () => {
        // If custom onCancel is provided, use it
        if (onCancel && typeof onCancel === "function") {
            onCancel();
            return;
        }

        router.visit(route("admin.index"));
    };

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Admin Divisi
                </h2>
            }
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                        <div className="bg-blue-100 rounded-2xl p-8 w-full max-w-md shadow-lg">
                            <div className="flex items-center justify-between mb-8">
                                <h1 className="text-2xl font-bold text-blue-900 text-center">
                                    Edit Admin Divisi
                                </h1>
                                {processing && (
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-900"></div>
                                )}
                            </div>

                            {/* Flash Message */}
                            {flash && (
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
                                {/* Nama Admin Field */}
                                <div>
                                    <label
                                        htmlFor="namaAdmin"
                                        className="block text-lg font-semibold text-blue-900 mb-3"
                                    >
                                        Nama Admin{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="namaAdmin"
                                        name="namaAdmin"
                                        value={data.namaAdmin}
                                        onChange={handleInputChange}
                                        placeholder="Nama Lengkap"
                                        disabled={processing}
                                        className={`w-full px-0 py-2 text-gray-800 bg-transparent border-0 border-b-2 focus:outline-none placeholder-gray-600 transition-colors duration-200 ${
                                            errors.namaAdmin
                                                ? "border-red-500 focus:border-red-600"
                                                : "border-gray-700 focus:border-blue-600"
                                        } ${
                                            processing
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                    />
                                    {errors.namaAdmin && (
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
                                            {errors.namaAdmin}
                                        </p>
                                    )}
                                </div>

                                {/* Divisi Field */}
                                <div>
                                    <label className="block text-lg font-semibold text-blue-900 mb-4">
                                        Divisi{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="space-y-3">
                                        {divisiOptions
                                            .slice(0, 9)
                                            .map((divisi, index) => (
                                                <label
                                                    key={divisi.id}
                                                    className="flex items-center cursor-pointer hover:bg-blue-50 p-2 rounded transition-colors duration-150"
                                                    onClick={() =>
                                                        !processing &&
                                                        handleDivisiChange(
                                                            divisi.id
                                                        )
                                                    }
                                                >
                                                    <div
                                                        className={`w-5 h-5 rounded-full border-2 border-gray-700 flex items-center justify-center mr-3 transition-all duration-200 ${
                                                            data.divisi ===
                                                            divisi.id
                                                                ? "bg-gray-700 shadow-md"
                                                                : "bg-transparent hover:border-blue-600"
                                                        } ${
                                                            processing
                                                                ? "opacity-50"
                                                                : ""
                                                        }`}
                                                    >
                                                        {data.divisi ===
                                                            divisi.id && (
                                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                                        )}
                                                    </div>
                                                    <span
                                                        className={`text-gray-800 text-lg ${
                                                            processing
                                                                ? "opacity-50"
                                                                : ""
                                                        }`}
                                                    >
                                                        {divisi.nama_divisi}
                                                    </span>
                                                </label>
                                            ))}
                                    </div>
                                    {errors.divisi && (
                                        <p className="text-red-500 text-sm mt-2 flex items-center">
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
                                            {errors.divisi}
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-8">
                                    {/* Update Button */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`w-full font-semibold py-3 px-6 rounded-md transition duration-200 transform flex items-center justify-center ${
                                            processing
                                                ? "bg-gray-400 cursor-not-allowed opacity-70"
                                                : "bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95"
                                        } text-white shadow-lg`}
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

                                {/* Cancel Button */}
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={processing}
                                        className={`w-full font-semibold py-2 px-6 rounded-md transition duration-200 text-white transform ${
                                            processing
                                                ? "bg-gray-300 cursor-not-allowed opacity-70 text-gray-500"
                                                : "bg-gray-400 hover:bg-gray-500 hover:scale-105 active:scale-95"
                                        } shadow-md`}
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>

                            {/* Display general server errors */}
                            {errors.error && (
                                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {errors.error}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
