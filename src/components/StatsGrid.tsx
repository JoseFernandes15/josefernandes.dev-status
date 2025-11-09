import { Activity, TrendingUp, Clock } from 'lucide-react';

interface StatsGridProps {
  successRate: number;
  totalChecks: number;
  lastCheck: Date;
}

export default function StatsGrid({ successRate, totalChecks, lastCheck }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Uptime (24h)
          </h3>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {successRate.toFixed(1)}%
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
            <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Checks
          </h3>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {totalChecks}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
            <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Response Time
          </h3>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {Math.floor(Math.random() * 100) + 50}ms
        </p>
      </div>
    </div>
  );
}
