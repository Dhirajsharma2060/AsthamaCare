
import { Bot, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  const features = [
    {
      icon: Bot,
      title: "24/7 AI Chat Support",
      description: "Get instant answers to your asthma questions anytime, anywhere with our AI-powered chatbot.",
      color: 'saffron' as const
    },
    {
      icon: MessageSquare,
      title: "Symptom-based Prediction",
      description: "Our AI analyzes your symptoms to provide personalized insights about your asthma condition.",
      color: 'green' as const
    },
    {
      icon: User,
      title: "Personalized Health Tips",
      description: "Receive tailored recommendations to better manage your asthma and improve your quality of life.",
      color: 'saffron' as const
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-b from-light-ash to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Asthma AI Can Help You</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI-powered platform provides tools and insights to help you understand and manage your asthma better.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-saffron/20 to-indian-green/20 rounded-3xl p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Breathe Easier?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Start using our AI-powered asthma care assistant today and take control of your respiratory health.
              </p>
              <Link 
                to="/signup" 
                className="inline-block bg-saffron hover:bg-saffron/90 text-white font-medium rounded-full px-8 py-3 text-lg transition-colors"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
