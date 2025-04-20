import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { Share2, ArrowLeft, Check, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Results = () => {
  const [resultData] = useState({
    severity: 'moderate', // can be 'controlled', 'moderate', or 'severe'
    score: 65, // out of 100
    recommendations: [
      {
        title: "Medication Management",
        content: "Take your prescribed controller medications regularly, even if you feel well. Ensure you have rescue inhalers available at all times."
      },
      {
        title: "Avoid Triggers",
        content: "Identify and minimize exposure to your asthma triggers like dust, pollen, pet dander, or cold air."
      },
      {
        title: "Regular Exercise",
        content: "Engage in appropriate exercise as recommended by your healthcare provider. Warm up properly before any physical activity."
      },
      {
        title: "Monitor Symptoms",
        content: "Keep track of your symptoms daily and note any changes. Use a peak flow meter if recommended by your doctor."
      },
      {
        title: "Follow-up Care",
        content: "Schedule regular check-ups with your healthcare provider to monitor your asthma control."
      }
    ],
    resourceLinks: [
      {
        title: "Understanding Asthma Medications",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      },
      {
        title: "How to Use an Inhaler Correctly",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      }
    ]
  });

  const getSeverityColor = () => {
    switch (resultData.severity) {
      case 'controlled': return 'bg-green-500';
      case 'moderate': return 'bg-saffron';
      case 'severe': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityText = () => {
    switch (resultData.severity) {
      case 'controlled': return 'Your asthma appears to be well-controlled.';
      case 'moderate': return 'Your asthma symptoms show moderate severity.';
      case 'severe': return 'Your symptoms indicate potentially severe asthma.';
      default: return 'Assessment complete.';
    }
  };

  const getSeverityAdvice = () => {
    switch (resultData.severity) {
      case 'controlled': 
        return 'Continue your current management plan and monitor regularly.';
      case 'moderate': 
        return 'Consider consulting with your doctor about adjusting your treatment plan.';
      case 'severe': 
        return 'Please contact your healthcare provider as soon as possible.';
      default: 
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 bg-light-ash">
        <div className="container mx-auto max-w-3xl">
          <Button 
            asChild 
            variant="ghost" 
            className="mb-6"
          >
            <Link to="/chat">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Chat
            </Link>
          </Button>
          
          <Card className="border-2 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-saffron/20 to-indian-green/20">
              <CardTitle className="text-2xl">Your Asthma Assessment Results</CardTitle>
              <CardDescription>
                Based on the symptoms and information you provided
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-8 text-center">
                <h3 className="font-medium text-lg mb-2">Severity Level</h3>
                <div className="w-full max-w-md mx-auto mb-4">
                  <Progress 
                    value={resultData.score} 
                    className="h-4 rounded-full"
                    indicatorClassName={getSeverityColor()}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-6 px-2">
                  <span>Controlled</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white ${getSeverityColor()}`}>
                  {resultData.severity === 'severe' ? (
                    <Info size={18} />
                  ) : (
                    <Check size={18} />
                  )}
                  <span className="font-medium capitalize">{resultData.severity}</span>
                </div>
                <p className="mt-4 text-lg">{getSeverityText()}</p>
                <p className="mt-2 text-gray-600">{getSeverityAdvice()}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="font-medium text-xl mb-4">Recommendations</h3>
                <Accordion type="single" collapsible className="w-full">
                  {resultData.recommendations.map((rec, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="font-medium">{rec.title}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">{rec.content}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              
              {resultData.severity === 'moderate' || resultData.severity === 'severe' ? (
                <div>
                  <h3 className="font-medium text-xl mb-4">Helpful Resources</h3>
                  <div className="grid gap-4">
                    {resultData.resourceLinks.map((resource, index) => (
                      <a 
                        key={index} 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="h-10 w-10 rounded bg-saffron/20 text-saffron flex items-center justify-center mr-4">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="h-5 w-5"
                          >
                            <polygon points="23 7 16 12 23 17 23 7" />
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-gray-500">Click to view video</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button asChild variant="outline">
                <Link to="/chat">
                  <ArrowLeft className="mr-1 h-4 w-4" /> Back to Chat
                </Link>
              </Button>
              <Button onClick={() => alert('Share functionality would be implemented here')}>
                <Share2 className="mr-1 h-4 w-4" /> Share Results
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
