import React, { useState } from 'react';
import Card from "components/card";
import { MdClose, MdExpandMore, MdVisibility } from 'react-icons/md';
import BudgetDetailModal from './BudgetDetailModal';

const BudgetModules = ({ budgetModules, featureDetails }) => {
    const [selectedModule, setSelectedModule] = useState(null);

    const openModal = (moduleId) => {
        setSelectedModule(moduleId);
    };

    const closeModal = () => {
        setSelectedModule(null);
    };

    return (
        <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Fitur Manajemen Anggaran</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
                {budgetModules.map((module, index) => (
                    <div key={module.id} className="relative" data-aos="fade-up" data-aos-delay={module.delay}>
                        <Card
                            extra={`flex flex-col p-6 cursor-pointer h-full border ${selectedModule === module.id ? 'border-indigo-300 shadow-lg dark:border-indigo-800' : 'border-gray-100 dark:border-navy-700'} rounded-2xl ${module.color} overflow-hidden relative transition-all duration-300`}
                        >
                            {/* Background design elements */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white dark:bg-navy-800 opacity-10 rounded-full transform translate-x-6 -translate-y-6"></div>
                            <div className="absolute bottom-0 left-0 w-12 h-12 bg-white dark:bg-navy-800 opacity-10 rounded-full transform -translate-x-4 translate-y-4"></div>

                            <div className="flex items-center justify-between">
                                <div className="rounded-2xl p-4 bg-white dark:bg-navy-800 shadow-md transition-all">
                                    {module.icon}
                                </div>
                            </div>

                            <h4 className="mt-5 text-xl font-bold text-gray-800 dark:text-white transition-colors">
                                {module.title}
                            </h4>

                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {module.description}
                            </p>

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => openModal(module.id)}
                                    className="px-4 py-2 bg-white dark:bg-navy-700 text-indigo-500 dark:text-indigo-400 rounded-xl border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-navy-600 flex items-center transition-all"
                                >
                                    <MdVisibility className="mr-2 h-4 w-4" />
                                    Lihat Detail
                                </button>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Modal for showing details */}
            <BudgetDetailModal
                isOpen={!!selectedModule}
                onClose={closeModal}
                moduleId={selectedModule}
                module={budgetModules.find(m => m.id === selectedModule)}
                featureDetails={selectedModule ? featureDetails[selectedModule] : null}
            />
        </div>
    );
};

export default BudgetModules;
