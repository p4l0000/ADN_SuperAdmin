import React, { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const DaftarJurnal = () => {
    const [activeTab, setActiveTab] = useState("adn");

    // Sample data for jurnal ADN
    const jurnalADN = [
        {
            id: 1,
            title: "Smart Big Data App Pre Ethical Clearance pada Penentuan Modelling Genom Manusia, Virus dan Senyawa Obat untuk Penyembuhan Penyakit Apapun, Khususnya Covid-19 Menggunakan Meta-Deep AI Reinforcement Lea",
            publikasi: "Riset",
            link: "https://www.researchgate.net/publication/365456197_Smart_big_data_app_for_determining_modeling_of_human_genome_virus_and_medicinal_compounds_to_healing_any_disease_especially_for_Covid-19_by_meta-deep_AI_reinforcement_learning_using_core_engine_contai",
            authors:
                "Cholissodin, I., Sutrisno, Soebroto, A. A., Suganda, M.T.I., Anggraeni, A. (2021). Conference: THE PROCEEDINGS OF THE 4TH EPI INTERNATIONAL CONFERENCE ON SCIENCE AND ENGINEERING (EICSE) 2020",
        },
    ];

    // Sample data for jurnal Member
    const jurnalMember = [
        {
            id: 1,
            title: "Pelatihan Pengelolaan Layanan Dasar Cloud Computing Berbasis Amazon Web Service (AWS) untuk Sekolah Menengah Kejuruan di Kota Malang",
            publikasi: "Pengabdian Kepada Masyarakat",
            link: "https://www.researchgate.net/publication/365456197_Smart_big_data_app_for_determining_modeling_of_human_genome_virus_and_medicinal_compounds_to_healing_any_disease_especially_for_Covid-19_by_meta-deep_AI_reinforcement_learning_using_core_engine_contai",
            authors:
                "Cholissodin, I., Sutrisno, Soebroto, A. A., Suganda, M.T.I., Anggraeni, A. (2021). Conference: THE PROCEEDINGS OF THE 4TH EPI INTERNATIONAL CONFERENCE ON SCIENCE AND ENGINEERING (EICSE) 2020",
        },
    ];

    const handleAddJurnal = (type) => {
        console.log(`Add jurnal for ${type}`);
        // Implementasi logika untuk menambah jurnal
    };

    const handleEdit = (id, type) => {
        console.log(`Edit jurnal ${id} from ${type}`);
    };

    const handleDelete = (id, type) => {
        console.log(`Delete jurnal ${id} from ${type}`);
    };

    const JurnalCard = ({ jurnal, type }) => (
        <div className="bg-white rounded-lg p-6 mb-4 shadow-sm border border-gray-200">
            <h3 className="text-green-600 font-medium text-lg mb-3 leading-relaxed">
                {jurnal.title}
            </h3>

            <div className="mb-3">
                <span className="text-gray-500 italic text-sm">
                    Publikasi {jurnal.publikasi}
                </span>
            </div>

            <div className="mb-4">
                <a
                    href={jurnal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 text-sm break-all"
                >
                    {jurnal.link}
                </a>
            </div>

            <div className="mb-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                    {jurnal.authors}
                </p>
            </div>

            <div className="flex justify-end gap-2">
                <button
                    onClick={() => handleEdit(jurnal.id, type)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit"
                >
                    <Edit size={16} />
                </button>
                <button
                    onClick={() => handleDelete(jurnal.id, type)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-green-100 p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Daftar Jurnal
                        </h1>
                    </div>

                    {/* Tab Navigation */}
                    <div className="bg-white rounded-t-lg shadow-sm border border-gray-200 border-b-0">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab("adn")}
                                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === "adn"
                                        ? "border-green-500 text-green-600 bg-green-50"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                Jurnal ADN
                            </button>
                            <button
                                onClick={() => setActiveTab("member")}
                                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === "member"
                                        ? "border-green-500 text-green-600 bg-green-50"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                Jurnal Member
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 border-t-0">
                        {/* Add Button */}
                        <div className="p-6 border-b border-gray-200">
                            <button
                                onClick={() => handleAddJurnal(activeTab)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Plus size={16} />
                                Tambah Jurnal{" "}
                                {activeTab === "adn" ? "ADN" : "Member"}
                            </button>
                        </div>

                        {/* Jurnal List */}
                        <div className="p-6">
                            {activeTab === "adn" && (
                                <div>
                                    {jurnalADN.length > 0 ? (
                                        jurnalADN.map((jurnal) => (
                                            <JurnalCard
                                                key={jurnal.id}
                                                jurnal={jurnal}
                                                type="adn"
                                            />
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            <p>Belum ada jurnal ADN</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "member" && (
                                <div>
                                    {jurnalMember.length > 0 ? (
                                        jurnalMember.map((jurnal) => (
                                            <JurnalCard
                                                key={jurnal.id}
                                                jurnal={jurnal}
                                                type="member"
                                            />
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            <p>Belum ada jurnal member</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default DaftarJurnal;
