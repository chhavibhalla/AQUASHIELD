import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Droplets, Shield, Users, Settings } from 'lucide-react';
import heroImage from '@/assets/as.png';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [language, setLanguage] = useState('en');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const roles = [
    { id: 'admin', label: 'Administrator', icon: Settings, description: 'Full system access' },
    { id: 'health-official', label: 'Health Official', icon: Shield, description: 'Monitor and respond to alerts' },
    { id: 'volunteer', label: 'Community Volunteer', icon: Users, description: 'Field data collection' }
  ];

  const languages = [
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'हिन्दी (Hindi)' },
    { id: 'as', label: 'অসমীয়া (Assamese)' },
    { id: 'bn', label: 'বাংলা (Bengali)' }
  ];

  const handleLogin = () => {
    if (selectedRole && credentials.username) {
      navigate('/overview');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Hero Section */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg">
              <Droplets className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">AquaShield</h1>
              <p className="text-muted-foreground">Water Quality Monitoring</p>
            </div>
          </div>
          
          <div className="relative w-80 h-80 mx-auto lg:mx-0 rounded-2xl shadow-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-2">
            <img 
                src={heroImage} 
                alt="AquaShield water quality monitoring system"
                className="w-full h-full object-contain rounded-2xl"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/10 to-transparent" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Preventing Waterborne Disease Outbreaks
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Real-time IoT monitoring, AI-powered risk forecasting, and community-driven health protection 
              for safer water access across rural communities.
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                Real-time Monitoring
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                AI Risk Prediction
              </Badge>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                Community Engagement
              </Badge>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="w-full max-w-md mx-auto shadow-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Access Dashboard</CardTitle>
            <CardDescription>
              Choose your role and sign in to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="role">Select Role</Label>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 text-left rounded-lg border-2 transition-all ${
                        selectedRole === role.id
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border hover:border-primary/50 bg-card'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${
                          selectedRole === role.id ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{role.label}</p>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>

            <Button 
              onClick={handleLogin}
              disabled={!selectedRole || !credentials.username}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Access Dashboard
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Demo credentials: Any username with selected role
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;