import React, { useEffect, useState } from 'react';
import {
  Building2,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Headset,
  Shield,
  ShieldCheck,
  Sliders,
  User,
} from 'lucide-react';
import { useBanking } from '../../context/BankingContext';

interface ProfileViewProps {
  onNavigateToAdmin?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onNavigateToAdmin }) => {
  const { user, accounts, allAccounts, registeredUsers, isAdminMode } = useBanking();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const isAdmin = user?.id === 'usr_admin' || isAdminMode;

  // For admins, allow selecting which client account profile to preview
  const [selectedClientId, setSelectedClientId] = useState<string>(() => {
    return registeredUsers[0]?.id || user?.id || '';
  });

  // Keep admin selected client up-to-date with registered clients list
  useEffect(() => {
    if (isAdmin && registeredUsers.length > 0) {
      if (!selectedClientId || selectedClientId === 'usr_admin' || !registeredUsers.some((u) => u.id === selectedClientId)) {
        setSelectedClientId(registeredUsers[0].id);
      }
    }
  }, [isAdmin, registeredUsers, selectedClientId]);

  const displayedUser = isAdmin
    ? (registeredUsers.find((u) => u.id === selectedClientId) || registeredUsers[0] || user)
    : user;

  const primaryAccount =
    allAccounts.find((a) => a.userId === displayedUser?.id) ||
    accounts.find((a) => a.userId === displayedUser?.id) ||
    accounts[0];

  const signalUrl = 'https://signal.me/#eu/kgG_VLbqr4n0DL7-E3zJRCAvsGww08T-M068Q3alvMrBv4NB845P-JROQcPWhg6-';
  const whatsappNumber = '+1 314 735 3877';
  const whatsappUrl = 'https://wa.me/13147353877';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Account Owner Profile
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Verified institutional client identity, security parameters, and banking credentials
          </p>
        </div>

        {onNavigateToAdmin && isAdmin && (
          <button
            onClick={onNavigateToAdmin}
            className="self-start sm:self-center flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Open Admin Panel</span>
          </button>
        )}
      </div>

      {/* Admin Client Account Selector (Only shown to Administrator) */}
      {isAdmin && registeredUsers.length > 0 && (
        <div className="p-3 sm:p-4 rounded-xl border border-indigo-200 bg-indigo-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-indigo-950">Admin Client Profile Preview</p>
              <p className="text-[11px] text-indigo-700">Select any registered client to inspect their live profile and credentials</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-[11px] font-semibold text-indigo-900 whitespace-nowrap">Viewing Client:</label>
            <select
              value={selectedClientId || registeredUsers[0]?.id || ''}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-indigo-300 rounded-lg text-slate-900 shadow-2xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
            >
              {registeredUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.company || u.email})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center text-2xl font-bold font-mono shadow-xs shrink-0">
              {displayedUser?.avatarInitials || 'AV'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">{displayedUser?.name}</h2>
                <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">{displayedUser?.company || 'Commercial Entity'}</p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">{displayedUser?.tier} Client</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-800">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-medium">Verified Commercial Client Profile</span>
          </div>
        </div>

        {/* Detailed Owner Attributes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Contact & Entity Information
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Legal Full Name</span>
                <span className="font-semibold text-slate-900">{displayedUser?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Commercial Entity</span>
                <span className="font-semibold text-slate-900">{displayedUser?.company || 'Commercial Entity'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Official Email</span>
                <span className="font-mono text-slate-900">{displayedUser?.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Authorized Phone</span>
                <span className="font-mono text-slate-900">{displayedUser?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Client Since</span>
                <span className="text-slate-900">{displayedUser?.memberSince || 'October 2026'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Primary Account Credentials
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Account Name</span>
                <span className="font-semibold text-slate-900">{primaryAccount?.name || 'Primary Checking'}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Available Balance</span>
                <span className="font-mono font-bold text-blue-700 text-sm">
                  ${(primaryAccount?.balance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Primary Account</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-slate-900 font-semibold">{primaryAccount?.fullAccountNumber}</span>
                  <button
                    onClick={() => copyToClipboard(primaryAccount?.fullAccountNumber || '', 'acct')}
                    className="p-1 hover:text-blue-600 text-slate-400 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {copiedKey === 'acct' && <span className="text-[10px] text-blue-600 font-medium">Copied</span>}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">ABA Fedwire Routing</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-slate-900 font-semibold">{primaryAccount?.routingNumber || '021000021'}</span>
                  <button
                    onClick={() => copyToClipboard(primaryAccount?.routingNumber || '021000021', 'rtn')}
                    className="p-1 hover:text-blue-600 text-slate-400 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {copiedKey === 'rtn' && <span className="text-[10px] text-blue-600 font-medium">Copied</span>}
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">SWIFT / BIC</span>
                <span className="font-mono text-slate-900 font-semibold">USAGUS33NYC</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Charter Bank</span>
                <span className="text-slate-900">USA Grant Funding N.A.</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">FDIC Certificate</span>
                <span className="font-mono text-blue-700 font-semibold">#34910</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Service Provider Contact Card */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-blue-50/50 border border-blue-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Headset className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Dedicated Service Provider Assigned</p>
              <p className="text-[11px] text-slate-600">
                Institutional Banking Relationship Desk · Direct secure messaging & wire clearance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Signal Desk Link */}
            <div className="flex items-center gap-1">
              <a
                href={signalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-[0.98]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.08L2 22l5.08-1.38A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
                </svg>
                <span>Signal Desk</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
              <button
                onClick={() => copyToClipboard(signalUrl, 'desk-signal')}
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors"
                title="Copy Signal Link"
              >
                {copiedKey === 'desk-signal' ? (
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* WhatsApp Desk Link */}
            <div className="flex items-center gap-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-[0.98]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2M12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15M16.56 14.39C16.31 14.27 15.09 13.67 14.86 13.58C14.64 13.5 14.47 13.46 14.31 13.7C14.15 13.95 13.68 14.5 13.54 14.66C13.4 14.82 13.25 14.85 13 14.72C12.75 14.6 11.95 14.33 11 13.49C10.26 12.83 9.76 12.02 9.61 11.78C9.47 11.53 9.6 11.4 9.72 11.28C9.83 11.17 9.97 11 10.1 10.85C10.22 10.7 10.27 10.59 10.35 10.43C10.43 10.26 10.39 10.12 10.33 10C10.27 9.88 9.77 8.65 9.57 8.16C9.37 7.68 9.17 7.74 9.02 7.74C8.88 7.73 8.71 7.73 8.55 7.73C8.38 7.73 8.11 7.8 7.89 8.04C7.66 8.28 7.03 8.87 7.03 10.07C7.03 11.27 7.9 12.43 8.03 12.6C8.15 12.76 9.75 15.24 12.21 16.3C12.8 16.55 13.25 16.7 13.61 16.82C14.2 17 14.74 16.98 15.16 16.91C15.63 16.84 16.61 16.32 16.81 15.75C17.02 15.18 17.02 14.7 16.96 14.6C16.89 14.51 16.74 14.45 16.56 14.39Z" />
                </svg>
                <span>WhatsApp: {whatsappNumber}</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
              <button
                onClick={() => copyToClipboard(whatsappNumber, 'desk-whatsapp')}
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors"
                title="Copy WhatsApp Number"
              >
                {copiedKey === 'desk-whatsapp' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
