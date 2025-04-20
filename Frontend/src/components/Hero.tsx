
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4 order-2 lg:order-1">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="text-saffron">Breathe Easy</span> with <br />
                <span className="text-indian-green">AI-powered Asthma Care</span>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get instant support, personalized recommendations, and symptom assessment for better asthma management.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="bg-saffron text-white hover:bg-saffron/90 rounded-full px-8 py-6 text-lg"
              >
                <Link to="/chat">Start Chatting</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-indian-green text-indian-green hover:bg-indian-green/10 rounded-full px-8 py-6 text-lg"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-md">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-saffron/30 to-indian-green/30 rounded-3xl transform rotate-3"></div>
              <img
                src="/lovable-uploads/e340f3ae-832b-4085-93ce-b3175fb4d694.png"
                alt="Asthma Care Chatbot"
                className="relative z-10 rounded-3xl object-cover w-full shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-40 h-40 bg-saffron/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-60 h-60 bg-indian-green/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
