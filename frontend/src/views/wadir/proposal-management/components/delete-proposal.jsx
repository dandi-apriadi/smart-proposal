import React, { useState, useEffect } from 'react';
import {
  MdDelete,
  MdWarning,
  MdHistory,
  MdArchive,
  MdClose,
  MdInfo,
  MdAutorenew
} from 'react-icons/md';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DeleteProposal = ({ proposal, onClose, onDelete }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = async () => {
    if (!deleteReason) {
      alert('Mohon masukkan alasan penghapusan');
      return;
    }

    setIsProcessing(true);
    // Simulate deletion process
    await new Promise(resolve => setTimeout(resolve, 1500));
    onDelete && onDelete(proposal.id, deleteReason);
    setIsProcessing(false);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" data-aos="fade">
      <div className="w-full max-w-lg mx-4">
        <Card extra="p-6" data-aos="zoom-in">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2 bg-red-100">
                <MdDelete className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Hapus Proposal</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <MdClose className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Warning Message */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <MdWarning className="h-6 w-6 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800">Peringatan</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Tindakan ini tidak dapat dibatalkan. Semua data terkait proposal ini akan dihapus secara permanen.
                </p>
              </div>
            </div>
          </div>

          {/* Proposal Info */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Detail Proposal</h3>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Judul</p>
                <p className="font-medium">{proposal?.title || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Pengaju</p>
                <p className="font-medium">{proposal?.submitter || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status ML</p>
                <p className="font-medium text-blue-600">{proposal?.mlScore || 'N/A'}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tanggal Submit</p>
                <p className="font-medium">{proposal?.submissionDate || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Delete Reason */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alasan Penghapusan
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 h-32 resize-none"
              placeholder="Masukkan alasan penghapusan proposal..."
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-all"
            >
              Batal
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              disabled={isProcessing}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <MdAutorenew className="h-5 w-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <MdDelete className="h-5 w-5" />
                  Hapus Proposal
                </>
              )}
            </button>
          </div>

          {/* Confirmation Dialog */}
          {showConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md mx-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Konfirmasi Penghapusan</h3>
                <p className="text-gray-600 mb-6">
                  Anda yakin ingin menghapus proposal ini? Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                  >
                    Ya, Hapus
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DeleteProposal;
