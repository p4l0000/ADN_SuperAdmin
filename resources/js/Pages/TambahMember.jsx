import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

export default function DivisiMember({
    onSubmit = () => {},
    onCancel = () => {},
    divisiOptions = [],
}) {
    const [formData, setFormData] = useState({
        namaMember: "",
        divisi: "",
        status: "",
    });

    // Default divisi options if none provided
    const defaultDivisiOptions = ["Sumatera", "Jawa Tengah", "Jawa Timur"];

    const statusOptions = ["Aktif", "Non Aktif"];

    const divisiList =
        divisiOptions.length > 0 ? divisiOptions : defaultDivisiOptions;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDivisiChange = (selectedDivisi) => {
        setFormData((prev) => ({
            ...prev,
            divisi: selectedDivisi,
        }));
    };

    const handleStatusChange = (selectedStatus) => {
        setFormData((prev) => ({
            ...prev,
            status: selectedStatus,
        }));
    };

    const handleSubmit = () => {
        // Basic validation
        if (!formData.namaMember.trim()) {
            alert("Nama Member harus diisi");
            return;
        }

        if (!formData.divisi) {
            alert("Pilih salah satu divisi");
            return;
        }

        if (!formData.status) {
            alert("Pilih status member");
            return;
        }

        onSubmit(formData);
    };

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-green-100 rounded-2xl p-8 w-full max-w-md shadow-lg">
                    <h1 className="text-2xl font-bold text-green-900 text-center mb-8">
                        Divisi Member
                    </h1>

                    <div className="space-y-6">
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
                                value={formData.namaMember}
                                onChange={handleInputChange}
                                placeholder="Rizky Budhiderma"
                                className="w-full px-0 py-2 text-gray-800 bg-transparent border-0 border-b-2 border-gray-700 focus:outline-none focus:border-green-600 placeholder-gray-500"
                            />
                        </div>

                        {/* Divisi Field */}
                        <div>
                            <label className="block text-lg font-semibold text-green-900 mb-4">
                                Divisi
                            </label>
                            <div className="space-y-3">
                                {divisiList.map((divisi, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            handleDivisiChange(divisi)
                                        }
                                    >
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 border-gray-700 flex items-center justify-center mr-3 ${
                                                formData.divisi === divisi
                                                    ? "bg-gray-700"
                                                    : "bg-transparent"
                                            }`}
                                        >
                                            {formData.divisi === divisi && (
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            )}
                                        </div>
                                        <span className="text-gray-800 text-lg">
                                            {divisi}
                                        </span>
                                    </label>
                                ))}
                            </div>
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
                                                formData.status === status
                                                    ? "bg-gray-700"
                                                    : "bg-transparent"
                                            }`}
                                        >
                                            {formData.status === status && (
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            )}
                                        </div>
                                        <span className="text-gray-800 text-lg">
                                            {status}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
