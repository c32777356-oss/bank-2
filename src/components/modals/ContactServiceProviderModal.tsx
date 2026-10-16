import React, { useState } from 'react';
import { Check, Copy, ExternalLink, Headset, MessageSquare, ShieldAlert, X } from 'lucide-react';
import { useBanking } from '../../context/BankingContext';

interface ContactServiceProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: 'deposit' | 'transfer' | null;
}

export const ContactServiceProviderModal: React.FC<ContactServiceProviderModalProps> = ({
  isOpen,
  onClose,
  actionType,
}) => {
  const { user, accounts } = useBanking();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const actionName = actionType === 'deposit' ? 'Deposit' : 'Transfer';
  const primaryAccount = accounts.find((a) => a.userId === user?.id) || accounts[0];

  const signalUrl = 'https://signal.me/#eu/kgG_VLbqr4n0DL7-E3zJRCAvsGww08T-M068Q3alvMrBv4NB845P-JROQcPWhg6-';
  const whatsappNumber = '+1 314 735 3877';
  const whatsappUrl = 'https://wa.me/13147353877';

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog / Mobile Bottom Sheet */}
      <div className="relative w-full max-w-md rounded-t-3xl sm:rounded-2xl border border-slate-200 bg-white shadow-2xl text-slate-900 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Mobile drag handle indicator */}
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mt-3 mb-1 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
              <Headset className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {actionName} Notice
              </h2>
              <p className="text-[11px] text-slate-500">Service Provider Authorization Required</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Main Headline Notice */}
          <div className="text-center py-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <ShieldAlert className="w-7 h-7 text-blue-600 stroke-[2.2]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              You need to contact your provider for more info
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xs mx-auto">
              Contact service provider to continue with your requested <span className="font-semibold text-slate-700">{actionName.toLowerCase()}</span>.
            </p>
          </div>

          {/* Wire on Hold Notice */}
          {actionType === 'transfer' && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-center space-y-1">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide block font-mono">
                Wire on hold
              </span>
              
              <p className="text-[11px] text-amber-700 leading-normal">
              A $5000 fee is required  before funds can be released, contact our supports agents below for further assistance
              </p>
            </div>
          )}

          {/* Account Verification Summary */}
          <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-3.5 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Account Owner</span>
              <span className="font-semibold text-slate-900">{user?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Account Number</span>
              <span className="font-mono font-semibold text-slate-800">{primaryAccount?.accountNumber || '•••• 4892'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Routing Number</span>
              <span className="font-mono font-medium text-slate-800">{primaryAccount?.routingNumber || '021000021'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Request Reference</span>
              <span className="font-mono text-blue-700 font-bold bg-white px-1.5 py-0.5 rounded border border-blue-200">
                AUTH-77356-USD
              </span>
            </div>
          </div>

          {/* Assigned Service Contacts */}
          <div className="space-y-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block font-mono">
              Assigned Service Contacts
            </span>

            {/* Signal Desk Button & Link */}
            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 hover:bg-blue-50/80 transition-all flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  {/* Signal Icon */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.08L2 22l5.08-1.38A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Signal Direct Desk</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded font-semibold font-mono">Encrypted</span>
                  </p>
                  <p className="text-[11px] text-slate-500">Immediate clearance authorization</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={signalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors min-h-[34px]"
                >
                  <span>Open Signal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => handleCopy(signalUrl, 'signal')}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                  title="Copy Signal Link"
                >
                  {copiedKey === 'signal' ? (
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* WhatsApp Provider Desk Button & Link */}
            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/80 transition-all flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  {/* WhatsApp Icon */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2M12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15M16.56 14.39C16.31 14.27 15.09 13.67 14.86 13.58C14.64 13.5 14.47 13.46 14.31 13.7C14.15 13.95 13.68 14.5 13.54 14.66C13.4 14.82 13.25 14.85 13 14.72C12.75 14.6 11.95 14.33 11 13.49C10.26 12.83 9.76 12.02 9.61 11.78C9.47 11.53 9.6 11.4 9.72 11.28C9.83 11.17 9.97 11 10.1 10.85C10.22 10.7 10.27 10.59 10.35 10.43C10.43 10.26 10.39 10.12 10.33 10C10.27 9.88 9.77 8.65 9.57 8.16C9.37 7.68 9.17 7.74 9.02 7.74C8.88 7.73 8.71 7.73 8.55 7.73C8.38 7.73 8.11 7.8 7.89 8.04C7.66 8.28 7.03 8.87 7.03 10.07C7.03 11.27 7.9 12.43 8.03 12.6C8.15 12.76 9.75 15.24 12.21 16.3C12.8 16.55 13.25 16.7 13.61 16.82C14.2 17 14.74 16.98 15.16 16.91C15.63 16.84 16.61 16.32 16.81 15.75C17.02 15.18 17.02 14.7 16.96 14.6C16.89 14.51 16.74 14.45 16.56 14.39Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>WhatsApp Desk</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded font-semibold font-mono">24/7 Live</span>
                  </p>
                  <p className="text-[11px] text-slate-600 font-mono font-medium">{whatsappNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors min-h-[34px]"
                >
                  <span>WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => handleCopy(whatsappNumber, 'whatsapp')}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                  title="Copy WhatsApp number"
                >
                  {copiedKey === 'whatsapp' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] rounded-xl transition-all shadow-sm shadow-blue-600/20 min-h-[44px]"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
