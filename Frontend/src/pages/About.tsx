import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Bot, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const About = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleTryNowClick = () => {
    if (isAuthenticated) {
      navigate('/chat');
    } else {
      toast({
        title: "Login Required",
        description: "Please log in to use the Asthma Care assistant.",
        variant: "default",
      });
      navigate('/login', { state: { from: '/chat' } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-light-ash to-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-saffron">Asthma Care</span> <span className="text-indian-green">Chatbot</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Using the power of artificial intelligence to help you manage and understand your asthma better.
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-700 mb-6">
                  Asthma Care Chatbot was created with a simple but powerful goal: to make asthma management accessible to everyone through artificial intelligence and machine learning.
                </p>
                <p className="text-gray-700 mb-6">
                  Our AI-powered assistant provides personalized guidance, symptom assessment, and educational resources to help people with asthma understand and manage their condition effectively.
                </p>
                <p className="text-gray-700">
                  By combining medical knowledge with cutting-edge technology, we aim to improve the quality of life for asthma sufferers and reduce the burden of this chronic condition.
                </p>
              </div>
              <div className="flex justify-center">
                <Card className="w-full max-w-md p-2 bg-gradient-to-br from-saffron/5 to-indian-green/5">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-light-ash rounded-lg flex items-center justify-center overflow-hidden">
                      <img 
                        src="/lovable-uploads/e340f3ae-832b-4085-93ce-b3175fb4d694.png"
                        alt="Asthma Care Chatbot" 
                        className="max-h-full object-contain p-6"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-light-ash">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-saffron" />
                </div>
                <h3 className="text-xl font-bold mb-3">Share Your Symptoms</h3>
                <p className="text-gray-600">
                  Chat with our AI assistant and describe your symptoms or answer simple questions about how you're feeling.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-indian-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-8 w-8 text-indian-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
                <p className="text-gray-600">
                  Our advanced AI model processes your symptoms and medical history to assess your asthma condition.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="h-8 w-8 text-saffron" />
                </div>
                <h3 className="text-xl font-bold mb-3">Get Recommendations</h3>
                <p className="text-gray-600">
                  Receive personalized advice, severity assessments, and actionable recommendations for managing your asthma.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                onClick={handleTryNowClick} 
                className="bg-saffron hover:bg-saffron/90 text-white py-6 px-8 text-lg rounded-full"
              >
                Try It Now
              </Button>
            </div>
          </div>
        </section>
        
        {/* Medical Disclaimer */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Medical Disclaimer</h2>
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6">
                <p className="text-gray-700 mb-4">
                  The Asthma Care Chatbot is designed to provide general information and assistance for asthma management, but it is not a replacement for professional medical advice, diagnosis, or treatment.
                </p>
                <p className="text-gray-700 mb-4">
                  Always consult with a qualified healthcare provider regarding any medical questions or conditions. If you are experiencing severe symptoms or an asthma emergency, please seek immediate medical attention.
                </p>
                <p className="text-gray-700">
                  The recommendations provided by this tool are based on the information you provide and general medical guidelines. Individual medical situations may require different approaches.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
