
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-light-ash">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <h1 className="text-9xl font-bold text-saffron">404</h1>
            <div className="h-2 bg-indian-green w-24 mx-auto my-6"></div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild className="bg-saffron hover:bg-saffron/90 text-white px-6">
              <Link to="/">Go Home</Link>
            </Button>
            <Button asChild variant="outline" className="border-indian-green text-indian-green hover:bg-indian-green/10 px-6">
              <Link to="/chat">Chat with AI</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
