import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function TambahAdmin({
    auth,
    divisiOptions = [],
    errors = {},
    onSubmit,
    onCancel,
}) {
    const [formData, setFormData] = useState({
        namaAdmin: "",
        divisi: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localErrors, setLocalErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear local error for this field when user starts typing
        if (localErrors[name]) {
            setLocalErrors((prev) => ({
                ...prev,
                [name]: null,
            }));
        }
    };

    const handleDivisiChange = (selectedDivisiId) => {
        setFormData((prev) => ({
            ...prev,
            divisi: selectedDivisiId,
        }));

        // Clear divisi error when user selects an option
        if (localErrors.divisi) {
            setLocalErrors((prev) => ({
                ...prev,
                divisi: null,
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.namaAdmin.trim()) {
            newErrors.namaAdmin = "Nama Admin harus diisi";
        }

        if (!formData.divisi) {
            newErrors.divisi = "Pilih salah satu divisi";
        }

        setLocalErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // If custom onSubmit is provided (for standalone use), use it
        if (onSubmit && typeof onSubmit === "function") {
            onSubmit(formData);
            setIsSubmitting(false);
            return;
        }

        // Otherwise, use Inertia router (for Laravel integration)
        router.post(route("admin.store"), formData, {
            onSuccess: (response) => {
                // Reset form on success
                setFormData({
                    namaAdmin: "",
                    divisi: "",
                });
                setLocalErrors({});

                // Show success message if needed
                console.log("Admin berhasil ditambahkan");
            },
            onError: (serverErrors) => {
                console.error("Validation errors:", serverErrors);
                setLocalErrors(serverErrors);
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleCancel = () => {
        // If custom onCancel is provided, use it
        if (onCancel && typeof onCancel === "function") {
            onCancel();
            return;
        }

        // Otherwise, navigate using Inertia router
        router.visit(route("admin.index"));
    };

    // Combine server errors and local errors
    const allErrors = { ...errors, ...localErrors };

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah Admin Divisi
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                            <div className="bg-green-100 rounded-2xl p-8 w-full max-w-md shadow-lg">
                                <h1 className="text-2xl font-bold text-green-900 text-center mb-8">
                                    Tambah Admin
                                    <br />
                                    Divisi
                                </h1>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* Nama Admin Field */}
                                    <div>
                                        <label
                                            htmlFor="namaAdmin"
                                            className="block text-lg font-semibold text-green-900 mb-3"
                                        >
                                            Nama Admin
                                        </label>
                                        <input
                                            type="text"
                                            id="namaAdmin"
                                            name="namaAdmin"
                                            value={formData.namaAdmin}
                                            onChange={handleInputChange}
                                            placeholder="Nama Lengkap"
                                            className={`w-full px-0 py-2 text-gray-800 bg-transparent border-0 border-b-2 focus:outline-none placeholder-gray-600 transition-colors duration-200 ${
                                                allErrors.namaAdmin
                                                    ? "border-red-500 focus:border-red-600"
                                                    : "border-gray-700 focus:border-green-600"
                                            }`}
                                            disabled={isSubmitting}
                                        />
                                        {allErrors.namaAdmin && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {allErrors.namaAdmin}
                                            </p>
                                        )}
                                    </div>

                                    {/* Divisi Field */}
                                    <div>
                                        <label className="block text-lg font-semibold text-green-900 mb-4">
                                            Divisi
                                        </label>
                                        <div className="space-y-3">
                                            {divisiOptions
                                                .slice(0, 9)
                                                .map((divisi, index) => (
                                                    <label
                                                        key={divisi.id}
                                                        className="flex items-center cursor-pointer hover:bg-green-50 p-2 rounded transition-colors duration-150"
                                                        onClick={() =>
                                                            !isSubmitting &&
                                                            handleDivisiChange(
                                                                divisi.id
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            className={`w-5 h-5 rounded-full border-2 border-gray-700 flex items-center justify-center mr-3 transition-all duration-200 ${
                                                                formData.divisi ===
                                                                divisi.id
                                                                    ? "bg-gray-700 shadow-md"
                                                                    : "bg-transparent hover:border-green-600"
                                                            } ${
                                                                isSubmitting
                                                                    ? "opacity-50"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {formData.divisi ===
                                                                divisi.id && (
                                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                                            )}
                                                        </div>
                                                        <span
                                                            className={`text-gray-800 text-lg ${
                                                                isSubmitting
                                                                    ? "opacity-50"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {divisi.nama_divisi}
                                                        </span>
                                                    </label>
                                                ))}
                                        </div>
                                        {allErrors.divisi && (
                                            <p className="text-red-500 text-sm mt-2">
                                                {allErrors.divisi}
                                            </p>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-8">
                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full font-semibold py-3 px-6 rounded-md transition duration-200 transform ${
                                                isSubmitting
                                                    ? "bg-gray-400 cursor-not-allowed opacity-70"
                                                    : "bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95"
                                            } text-white shadow-lg`}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center">
                                                    <svg
                                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Menyimpan...
                                                </span>
                                            ) : (
                                                "Simpan"
                                            )}
                                        </button>
                                    </div>

                                    {/* Cancel Button */}
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            disabled={isSubmitting}
                                            className={`w-full font-semibold py-2 px-6 rounded-md transition duration-200 text-white transform ${
                                                isSubmitting
                                                    ? "bg-gray-300 cursor-not-allowed opacity-70"
                                                    : "bg-gray-400 hover:bg-gray-500 hover:scale-105 active:scale-95"
                                            } shadow-md`}
                                        >
                                            Batal
                                        </button>
                                    </div>
                                </form>

                                {/* Display general server errors */}
                                {allErrors.error && (
                                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                        {allErrors.error}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
