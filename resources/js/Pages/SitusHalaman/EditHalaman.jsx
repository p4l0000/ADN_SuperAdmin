import React, { useState } from "react";
import {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    List,
    Link,
    Image,
    Video,
} from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const EditHalaman = () => {
    const [content, setContent] = useState("");

    const ToolbarButton = ({ icon: Icon, onClick, title }) => (
        <button
            onClick={onClick}
            title={title}
            className="p-2 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
        >
            <Icon size={16} className="text-gray-700" />
        </button>
    );

    const handleFormatting = (command) => {
        console.log(`Format command: ${command}`);
    };

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-green-100 p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            Edit Situs Halaman
                        </h1>
                    </div>

                    {/* Editor Container */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        {/* Section Title */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-700">
                                Detail Situs Halaman
                            </h2>
                        </div>

                        {/* Toolbar */}
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center gap-4">
                                {/* Text Formatting Group */}
                                <div className="flex items-center gap-1">
                                    <ToolbarButton
                                        icon={Bold}
                                        onClick={() => handleFormatting("bold")}
                                        title="Bold"
                                    />
                                    <ToolbarButton
                                        icon={Italic}
                                        onClick={() =>
                                            handleFormatting("italic")
                                        }
                                        title="Italic"
                                    />
                                    <ToolbarButton
                                        icon={Underline}
                                        onClick={() =>
                                            handleFormatting("underline")
                                        }
                                        title="Underline"
                                    />
                                </div>

                                {/* Separator */}
                                <div className="w-px h-6 bg-gray-300"></div>

                                {/* Alignment Group */}
                                <div className="flex items-center gap-1">
                                    <ToolbarButton
                                        icon={AlignLeft}
                                        onClick={() =>
                                            handleFormatting("alignLeft")
                                        }
                                        title="Align Left"
                                    />
                                    <ToolbarButton
                                        icon={AlignCenter}
                                        onClick={() =>
                                            handleFormatting("alignCenter")
                                        }
                                        title="Align Center"
                                    />
                                    <ToolbarButton
                                        icon={List}
                                        onClick={() => handleFormatting("list")}
                                        title="List"
                                    />
                                </div>

                                {/* Separator */}
                                <div className="w-px h-6 bg-gray-300"></div>

                                {/* Media Group */}
                                <div className="flex items-center gap-1">
                                    <ToolbarButton
                                        icon={Link}
                                        onClick={() => handleFormatting("link")}
                                        title="Insert Link"
                                    />
                                    <ToolbarButton
                                        icon={Image}
                                        onClick={() =>
                                            handleFormatting("image")
                                        }
                                        title="Insert Image"
                                    />
                                    <ToolbarButton
                                        icon={Video}
                                        onClick={() =>
                                            handleFormatting("video")
                                        }
                                        title="Insert Video"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Editor Content Area */}
                        <div className="px-6 py-4">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Mulai menulis konten halaman di sini..."
                                className="w-full h-96 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                            <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                                Batal
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditHalaman;
