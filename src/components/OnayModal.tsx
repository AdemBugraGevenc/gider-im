import React from 'react';
import { AlertCircle } from 'lucide-react';

interface OnayModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
}

export const OnayModal: React.FC<OnayModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Bu İşlem Silinsin Mi?',
    description = 'Seçili haraketi kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.'
}) => {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-[6px] p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] p-7 w-full max-w-xs shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in zoom-in duration-300">
                <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-[1.25rem] flex items-center justify-center mb-5 shadow-inner">
                        <AlertCircle className="w-7 h-7" />
                    </div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">{title}</h3>
                    <p className="text-[10px] font-bold text-slate-400 leading-relaxed mb-7 px-2">{description}</p>
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 bg-slate-50 text-slate-400 text-[10px] font-black rounded-xl uppercase tracking-widest active:scale-95 transition-all"
                        >
                            İPTAL
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-4 bg-rose-600 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-rose-200 active:scale-95 transition-all"
                        >
                            EVET, SİL
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
