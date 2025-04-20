
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: 'saffron' | 'green';
}

const FeatureCard = ({ icon: Icon, title, description, color }: FeatureCardProps) => {
  return (
    <Card className="h-full overflow-hidden border-2 hover:border-gray-300 transition-all duration-300 hover:shadow-md">
      <div className={`h-2 ${color === 'saffron' ? 'bg-saffron' : 'bg-indian-green'}`} />
      <CardHeader className="pt-6">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          color === 'saffron' ? 'bg-saffron/10 text-saffron' : 'bg-indian-green/10 text-indian-green'
        }`}>
          <Icon size={24} />
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
