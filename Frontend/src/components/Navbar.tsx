import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm z-50 relative">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/e340f3ae-832b-4085-93ce-b3175fb4d694.png" alt="Asthma Care Logo" className="h-8" />
            <span className="font-semibold text-xl text-indian-green">Asthma Care</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-saffron transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-saffron transition-colors">About</Link>
            {isAuthenticated && (
              <>
                <Link to="/chat" className="text-gray-700 hover:text-saffron transition-colors font-medium">
                  Assessment
                </Link>
                <Link to="/dashboard" className="text-gray-700 hover:text-saffron transition-colors">
                  Dashboard
                </Link>
              </>
            )}
            <div className="space-x-2">
              {isAuthenticated ? (
                <Button onClick={handleLogout} variant="outline" className="border-saffron text-saffron hover:bg-saffron hover:text-white">
                  Log Out
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" className="border-saffron text-saffron hover:bg-saffron hover:text-white">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild className="bg-indian-green text-white hover:bg-indian-green/90">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-gray-700"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[60px] left-0 w-full bg-white shadow-md z-[100] animate-fade-in">
          <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-saffron py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-saffron py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="block text-gray-700 hover:text-saffron transition-colors" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            )}
            {isAuthenticated && (
              <Link to="/chat" className="block text-gray-700 hover:text-saffron transition-colors" onClick={() => setIsMenuOpen(false)}>Assessment</Link>
            )}
            <div className="flex flex-col space-y-2 pt-2">
              {isAuthenticated ? (
                <Button onClick={handleLogout} variant="outline" className="border-saffron text-saffron hover:bg-saffron hover:text-white w-full">
                  Log Out
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" className="border-saffron text-saffron hover:bg-saffron hover:text-white w-full">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button asChild className="bg-indian-green text-white hover:bg-indian-green/90 w-full">
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
