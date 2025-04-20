
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/e340f3ae-832b-4085-93ce-b3175fb4d694.png" 
                alt="Asthma Care Logo" 
                className="h-10" 
              />
              <div>
                <h2 className="text-lg font-bold">
                  <span className="text-saffron">Asthma</span>{" "}
                  <span className="text-indian-green">Care</span>
                </h2>
                <p className="text-xs text-gray-500">AI-powered health assistant</p>
              </div>
            </div>
            <p className="text-gray-500 mb-4">
              Helping you manage asthma symptoms with AI-powered insights and personalized recommendations.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-saffron transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-500 hover:text-saffron transition-colors">About</Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-500 hover:text-saffron transition-colors">Chat with AI</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-500 hover:text-saffron transition-colors">Login</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-500 hover:text-saffron transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-500 hover:text-saffron transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-500 hover:text-saffron transition-colors">Medical Disclaimer</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-saffron transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Asthma Care Chatbot. All rights reserved. <br />
            <span className="text-xs">
              This tool is not a substitute for professional medical advice, diagnosis, or treatment.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
