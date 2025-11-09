import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

interface StatusCardProps {
  isOnline: boolean;
  status: string;
  lastUpdate: Date;
}

export default function StatusCard({ isOnline, lastUpdate }: StatusCardProps) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {isOnline ? (
            <CheckCircle2 className="w-12 h-12 text-green-500 animate-pulse" />
          ) : (
            <XCircle className="w-12 h-12 text-red-500 animate-pulse" />
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isOnline ? 'Sistema Operational' : 'Sistema Offline'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {isOnline ? 'Tudo Certo!' : 'Algo está errado...'}
            </p>
          </div>
        </div>
        <div
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            isOnline
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <RefreshCw className="w-4 h-4" />
        <span>Last checked: {lastUpdate.toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
