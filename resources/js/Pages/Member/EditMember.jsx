import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function EditMember({ member, divisiOptions = [], auth }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        namaMember: member?.nama_member || "",
        divisi: member?.divisi_id || "",
        status: member?.status || "",
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

        put(route("member.update", member.id), {
            onSuccess: () => {
                // Data will be redirected by controller
            },
        });
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Member
                </h2>
            }
        >
            <Head title="Edit Member" />

            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-blue-100 rounded-2xl p-8 w-full max-w-md shadow-lg">
                    <h1 className="text-2xl font-bold text-blue-900 text-center mb-8">
                        Edit Member
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nama Member Field */}
                        <div>
                            <label
                                htmlFor="namaMember"
                                className="block text-base font-semibold text-blue-900 mb-2"
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
                                className={`w-full px-0 py-2 text-gray-800 bg-transparent border-0 border-b-2 focus:outline-none placeholder-gray-600 text-sm ${
                                    errors.namaMember
                                        ? "border-red-500 focus:border-red-600"
                                        : "border-gray-700 focus:border-blue-600"
                                }`}
                            />
                            {errors.namaMember && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.namaMember}
                                </p>
                            )}
                        </div>

                        {/* Divisi Field */}
                        <div>
                            <label className="block text-base font-semibold text-blue-900 mb-3">
                                Divisi
                            </label>
                            <div className="space-y-2">
                                {divisiOptions.map((divisi) => (
                                    <label
                                        key={divisi.id}
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            handleDivisiChange(divisi.id)
                                        }
                                    >
                                        <div
                                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 ${
                                                data.divisi === divisi.id
                                                    ? "bg-blue-600 border-blue-600"
                                                    : "bg-transparent border-gray-700"
                                            }`}
                                        >
                                            {data.divisi === divisi.id && (
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            )}
                                        </div>
                                        <span className="text-gray-800 text-sm">
                                            {divisi.nama_divisi}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.divisi && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.divisi}
                                </p>
                            )}
                        </div>

                        {/* Status Field */}
                        <div>
                            <label className="block text-base font-semibold text-blue-900 mb-3">
                                Status
                            </label>
                            <div className="space-y-2">
                                {statusOptions.map((status, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            handleStatusChange(status)
                                        }
                                    >
                                        <div
                                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 ${
                                                data.status === status
                                                    ? "bg-blue-600 border-blue-600"
                                                    : "bg-transparent border-gray-700"
                                            }`}
                                        >
                                            {data.status === status && (
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            )}
                                        </div>
                                        <span className="text-gray-800 text-sm">
                                            {status}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.status && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.status}
                                </p>
                            )}
                        </div>

                        {/* Update Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full font-semibold py-3 px-6 rounded-md transition duration-200 ${
                                    processing
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700"
                                } text-white`}
                            >
                                {processing ? "Memperbarui..." : "Perbarui"}
                            </button>
                        </div>

                        {/* General Error */}
                        {errors.error && (
                            <div className="text-red-600 text-sm text-center">
                                {errors.error}
                            </div>
                        )}
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
