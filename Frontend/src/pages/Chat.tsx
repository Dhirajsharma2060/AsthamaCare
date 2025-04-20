import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatMessage from '@/components/ChatMessage';
import { Link } from 'react-router-dom';
import { api } from '@/services/api';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

interface SymptomFormData {
  tiredness: boolean;
  dry_cough: boolean;
  difficulty_breathing: boolean;
  sore_throat: boolean;
  nasal_congestion: boolean;
  runny_nose: boolean;
  age: string;
  gender: string;
}

interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

interface ApiResponse {
  severity: number;
  recommendation: string;
  resources: Array<{
    title: string;
    url: string;
  }>;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Asthma Care assistant. I can help you assess your symptoms and provide personalized recommendations. How are you feeling today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [symptomData, setSymptomData] = useState<SymptomFormData>({
    tiredness: false,
    dry_cough: false,
    difficulty_breathing: false,
    sore_throat: false, 
    nasal_congestion: false,
    runny_nose: false,
    age: '',
    gender: ''
  });
  
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const sendMessage = () => {
    if (!input.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I understand you might be experiencing some respiratory symptoms. Would you like to complete a quick assessment to check your asthma status?",
        "It sounds like you may be having some asthma-related symptoms. Let's do a quick assessment to understand your condition better.",
        "I'd like to ask you some questions about your symptoms to provide better guidance. Would you like to take a quick assessment?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
      
      // Show the symptom form after a suitable response
      if (input.toLowerCase().includes('symptom') || 
          input.toLowerCase().includes('not feeling well') || 
          input.toLowerCase().includes('assess') ||
          Math.random() > 0.5) {
        setTimeout(() => setShowForm(true), 500);
      }
    }, 1500);
  };
  
  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  const handleSymptomChange = (symptom: keyof Omit<SymptomFormData, 'age' | 'gender'>, checked: boolean) => {
    setSymptomData(prev => ({
      ...prev,
      [symptom]: checked
    }));
  };
  
  const handleSubmitAssessment = async () => {
    try {
      const result = await api.predict(symptomData);
      
      // Create a formatted message content WITHOUT HTML tags
      let messageContent = `Based on your symptoms, your asthma severity level is: ${result.severity}.\n\n${result.recommendation}`;
      
      if (result.resources && result.resources.length > 0) {
        messageContent += "\n\nHelpful resources:";
        result.resources.forEach((resource, index) => {
          messageContent += `\n${index + 1}. ${resource.title}: ${resource.url}`;
        });
      }

      setTimeout(() => {
        const botResponse = {
          id: (Date.now() + 1).toString(),
          content: messageContent,
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, botResponse]);
        setShowForm(false);

        // Success toast
        toast({
          title: "Assessment complete",
          description: "View your results in the chat.",
        });
      }, 1000);
    } catch (error) {
      console.error('Error during prediction:', error);
      toast({
        title: "Error",
        description: "Failed to process your assessment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex justify-center items-center p-4 bg-light-ash">
        <Card className="w-full max-w-3xl mx-auto shadow-lg">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-2xl flex items-center gap-2">
              <img 
                src="/lovable-uploads/e340f3ae-832b-4085-93ce-b3175fb4d694.png" 
                alt="Asthma Care Bot" 
                className="h-12 w-12" 
              />
              Asthma Care Assistant
            </CardTitle>
            <CardDescription>
              Your personal assistant for asthma symptom assessment
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="h-[500px] overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <ChatMessage 
                  key={message.id} 
                  message={{ content: message.content }} 
                  isBot={message.isBot} 
                  timestamp={message.timestamp} 
                />
              ))}
              
              {isTyping && (
                <div className="flex gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="animate-pulse">...</span>
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3 text-sm">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {showForm && (
                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200 shadow-sm">
                  <h3 className="font-medium text-lg mb-3">Symptom Assessment</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Please check all symptoms that apply to you:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="tiredness" 
                        checked={symptomData.tiredness}
                        onCheckedChange={(checked) => handleSymptomChange('tiredness', checked as boolean)}
                      />
                      <Label htmlFor="tiredness" className="cursor-pointer">Tiredness</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="dry_cough" 
                        checked={symptomData.dry_cough}
                        onCheckedChange={(checked) => handleSymptomChange('dry_cough', checked as boolean)}
                      />
                      <Label htmlFor="dry_cough" className="cursor-pointer">Dry Cough</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="difficulty_breathing" 
                        checked={symptomData.difficulty_breathing}
                        onCheckedChange={(checked) => handleSymptomChange('difficulty_breathing', checked as boolean)}
                      />
                      <Label htmlFor="difficulty_breathing" className="cursor-pointer">Difficulty Breathing</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="sore_throat" 
                        checked={symptomData.sore_throat}
                        onCheckedChange={(checked) => handleSymptomChange('sore_throat', checked as boolean)}
                      />
                      <Label htmlFor="sore_throat" className="cursor-pointer">Sore Throat</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="nasal_congestion" 
                        checked={symptomData.nasal_congestion}
                        onCheckedChange={(checked) => handleSymptomChange('nasal_congestion', checked as boolean)}
                      />
                      <Label htmlFor="nasal_congestion" className="cursor-pointer">Nasal Congestion</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="runny_nose" 
                        checked={symptomData.runny_nose}
                        onCheckedChange={(checked) => handleSymptomChange('runny_nose', checked as boolean)}
                      />
                      <Label htmlFor="runny_nose" className="cursor-pointer">Runny Nose</Label>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input 
                        id="age" 
                        type="number" 
                        placeholder="Enter your age"
                        value={symptomData.age}
                        onChange={(e) => setSymptomData(prev => ({ ...prev, age: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select 
                        value={symptomData.gender} 
                        onValueChange={(value) => setSymptomData(prev => ({ ...prev, gender: value }))}
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSubmitAssessment} 
                    className="w-full bg-saffron hover:bg-saffron/90 text-white"
                  >
                    Get Prediction
                  </Button>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <CardFooter className="border-t p-4">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyPress}
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-indian-green hover:bg-indian-green/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
