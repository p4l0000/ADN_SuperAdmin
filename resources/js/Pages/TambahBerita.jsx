import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

export default function TambahBerita({ onSubmit = null, onCancel = null }) {
    const [formData, setFormData] = useState({
        judulBerita: "",
        sampulBerita: null,
        deskripsiJudul: "",
    });

    const [errors, setErrors] = useState({});
    const [fileName, setFileName] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                sampulBerita: file,
            }));
            setFileName(file.name);

            // Clear error when file is selected
            if (errors.sampulBerita) {
                setErrors((prev) => ({
                    ...prev,
                    sampulBerita: "",
                }));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.judulBerita.trim()) {
            newErrors.judulBerita = "Judul Berita harus diisi";
        }

        if (!formData.sampulBerita) {
            newErrors.sampulBerita = "Sampul Berita harus dipilih";
        }

        if (!formData.deskripsiJudul.trim()) {
            newErrors.deskripsiJudul = "Deskripsi Judul harus diisi";
        }

        return newErrors;
    };

    const handleSubmit = () => {
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (onSubmit) {
            onSubmit(formData);
        } else {
            // Default behavior
            console.log("Form submitted:", formData);
            alert(
                `Berita berhasil ditambahkan!\nJudul: ${formData.judulBerita}\nFile: ${fileName}`
            );
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            window.history.back();
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-green-100 rounded-2xl p-8 w-full max-w-md shadow-lg">
                    <h1 className="text-2xl font-bold text-green-900 text-center mb-8">
                        Tambah Berita
                    </h1>

                    <div className="space-y-6">
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
                                value={formData.judulBerita}
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
                                value={formData.deskripsiJudul}
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
                                onClick={handleSubmit}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>

                    {/* Cancel Button (Optional) */}
                    <div className="mt-4">
                        <button
                            onClick={handleCancel}
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
