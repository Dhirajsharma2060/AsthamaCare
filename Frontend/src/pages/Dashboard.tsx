import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Result {
  symptoms: number[];
  age: number;
  gender: string;
  severity: number;
  recommendation: string;
  timestamp: string;
  username: string;
}

const Dashboard = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [comparisonData, setComparisonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, username } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/dashboard' } });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!isAuthenticated) return;
      
      try {
        setLoading(true);
        const response = await fetch('https://asthamacare-backend.onrender.com/api/results', {
          // const response = await fetch('http://localhost:5000/api/results', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.status === 401) {
          setError('Please log in to view your dashboard');
          setLoading(false);
          return;
        }
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API response data:', data);
        
        // Filter out incomplete entries
        const validResults = data.filter((result: any) => 
          result.username === username && 
          result.severity !== undefined &&
          result.timestamp !== undefined &&
          Array.isArray(result.symptoms)
        );

        setResults(validResults);

        if (validResults.length > 0) {
          // Prepare chart data
          const severityCounts = [0, 0, 0, 0];
          validResults.forEach((result: Result) => {
            if (typeof result.severity === 'number' && result.severity >= 0 && result.severity < 4) {
              severityCounts[result.severity]++;
            }
          });

          setChartData({
            labels: ['Controlled (0)', 'Mild (1)', 'Moderate (2)', 'Severe (3)'],
            datasets: [
              {
                label: 'Severity Levels',
                data: severityCounts,
                backgroundColor: ['#4caf50', '#ffeb3b', '#ff9800', '#f44336'],
              },
            ],
          });

          // Prepare comparison data (latest vs previous)
          if (validResults.length > 1) {
            const latest = validResults[validResults.length - 1];
            const previous = validResults[validResults.length - 2];
            setComparisonData({
              labels: ['Previous', 'Latest'],
              datasets: [
                {
                  label: 'Severity',
                  data: [previous.severity, latest.severity],
                  backgroundColor: ['#ff9800', '#f44336'],
                },
              ],
            });
          }
        }
      } catch (error) {
        console.error('Error fetching results:', error);
        setError('Failed to load your assessment data');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [isAuthenticated, username]);

  if (!isAuthenticated) {
    return null; // We're redirecting in the useEffect above
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 px-4 bg-light-ash">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold mb-6">Your Asthma Assessment Dashboard</h1>
          
          {loading ? (
            <Card className="mb-8">
              <CardContent className="py-8">
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indian-green"></div>
                  <span className="ml-3">Loading your results...</span>
                </div>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="mb-8">
              <CardContent className="py-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <AlertTriangle className="h-12 w-12 text-red-500" />
                  </div>
                  <p className="text-lg text-red-500 mb-4">{error}</p>
                  <Button asChild>
                    <Link to="/login">Log In</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : results.length === 0 ? (
            <Card className="mb-8">
              <CardContent className="py-8">
                <div className="text-center">
                  <p className="text-lg mb-4">You don't have any assessment results yet.</p>
                  <Button asChild>
                    <Link to="/chat">Take an Assessment</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Chart Section */}
              <div className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Severity Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {chartData ? (
                      <Bar
                        data={chartData}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Asthma Severity Levels' },
                          },
                        }}
                      />
                    ) : (
                      <p>No chart data available</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Comparison Section */}
              {comparisonData && (
                <div className="mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Progress (Latest vs Previous)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Bar
                        data={comparisonData}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Severity Comparison' },
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Results Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Assessment History</h2>
                {results.map((result, index) => (
                  <Card key={index} className="mb-4">
                    <CardHeader>
                      <CardTitle>Assessment #{results.length - index}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p><strong>Symptoms:</strong> {Array.isArray(result.symptoms) ? result.symptoms.join(', ') : 'No symptoms recorded'}</p>
                      <p><strong>Age:</strong> {result.age || 'Not specified'}</p>
                      <p><strong>Gender:</strong> {result.gender || 'Not specified'}</p>
                      <p><strong>Severity:</strong> {result.severity !== undefined ? result.severity : 'Not determined'}</p>
                      <p><strong>Recommendation:</strong> {result.recommendation || 'No recommendation available'}</p>
                      <p><strong>Timestamp:</strong> {result.timestamp ? new Date(result.timestamp).toLocaleString() : 'No timestamp'}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;