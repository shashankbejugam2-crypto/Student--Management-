import { HiOutlineExclamation } from 'react-icons/hi'

export default function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60" onClick={onCancel} />

            {/* Modal */}
            <div className="relative glass-card rounded-2xl p-6 max-w-sm w-full animate-scale-in">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center">
                        <HiOutlineExclamation className="text-red-400" size={22} />
                    </div>
                    <h3 className="font-semibold text-white text-lg">{title}</h3>
                </div>

                <p className="text-sm text-surface-400 mb-6">{message}</p>

                <div className="flex gap-3">
                    <button
                        id="cancel-delete-btn"
                        onClick={onCancel}
                        className="flex-1 py-2.5 rounded-xl text-sm font-medium text-surface-300 bg-surface-700/50 hover:bg-surface-700 transition"
                    >
                        Cancel
                    </button>
                    <button
                        id="confirm-delete-btn"
                        onClick={onConfirm}
                        className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition shadow-lg shadow-red-500/20"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
