import { useEffect, useState } from 'react';
import { Moon, Sun, Globe, Clock } from 'lucide-react';
import StatusCard from './components/StatusCard';
import HistoryChart from './components/HistoryChart';
import StatsGrid from './components/StatsGrid';

interface StatusData {
  db: Array<{ Data: string; Resultado: string }>;
  real: string;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchStatus = async () => {
    try {
      const response = await fetch('https://verify.zepedrofernandessampaio.workers.dev/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch status');
      }

      const data = await response.json();
      setStatusData(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const isOnline = statusData?.real === 'Tudo Certo!';
  const recentChecks = statusData?.db?.slice(-24) || [];
  const successRate = recentChecks.length > 0
    ? (recentChecks.filter(r => r.Resultado === 'Tudo Certo!').length / recentChecks.length) * 100
    : 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Portfolio Status
            </h1>
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <a href="https://josefernandes.dev">josefernandes.dev</a>
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-8">
            <StatusCard
              isOnline={isOnline}
              status={statusData?.real || 'Unknown'}
              lastUpdate={lastUpdate}
            />

            <StatsGrid
              successRate={successRate}
              totalChecks={recentChecks.length}
              lastCheck={lastUpdate}
            />

            <HistoryChart data={recentChecks} />

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Activity
                </h2>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {recentChecks.slice().reverse().slice(0, 10).map((check, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          check.Resultado === 'Tudo Certo!'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {check.Resultado}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(check.Data).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Monitoring josefernandes.dev • Updated every minute</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
