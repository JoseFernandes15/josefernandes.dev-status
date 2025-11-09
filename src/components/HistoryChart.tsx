import { BarChart3 } from 'lucide-react';

interface HistoryChartProps {
  data: Array<{ Data: string; Resultado: string }>;
}

export default function HistoryChart({ data }: HistoryChartProps) {
  const last24 = data.slice(-24);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          24-Hour Status History
        </h2>
      </div>
      <div className="flex items-end gap-1 h-32">
        {last24.map((check, idx) => {
          const isSuccess = check.Resultado === 'Tudo Certo!';
          return (
            <div
              key={idx}
              className="flex-1 group relative"
              style={{ minWidth: '4px' }}
            >
              <div
                className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-80 ${
                  isSuccess
                    ? 'bg-green-500 dark:bg-green-400'
                    : 'bg-red-500 dark:bg-red-400'
                }`}
                style={{ height: isSuccess ? '100%' : '30%' }}
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                  <div className="font-semibold">{check.Resultado}</div>
                  <div className="text-gray-300 dark:text-gray-400">
                    {new Date(check.Data).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
        <span>24h ago</span>
        <span>Now</span>
      </div>
    </div>
  );
}
