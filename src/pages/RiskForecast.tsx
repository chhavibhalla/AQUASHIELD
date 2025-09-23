import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  TrendingUp, 
  TrendingDown,
  Brain,
  BarChart3,
  AlertTriangle,
  Droplets,
  CloudRain,
  Thermometer,
  Activity,
  Info,
  Target,
  Zap
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const RiskForecast = () => {
  const [turbiditySlider, setTurbiditySlider] = useState([25]);
  const [rainfallSlider, setRainfallSlider] = useState([12]);
  const [temperatureSlider, setTemperatureSlider] = useState([28]);

  const forecastData = [
    { 
      day: 'Today', 
      date: '22 Sep', 
      risk: 'High', 
      confidence: 89, 
      trend: 'up',
      factors: ['Bacterial contamination', 'High turbidity', 'Recent rainfall']
    },
    { 
      day: 'Tomorrow', 
      date: '23 Sep', 
      risk: 'High', 
      confidence: 85, 
      trend: 'stable',
      factors: ['Persistent contamination', 'Weather conditions']
    },
    { 
      day: 'Day 3', 
      date: '24 Sep', 
      risk: 'Medium', 
      confidence: 72, 
      trend: 'down',
      factors: ['Improving water quality', 'Reduced rainfall']
    },
    { 
      day: 'Day 4', 
      date: '25 Sep', 
      risk: 'Medium', 
      confidence: 68, 
      trend: 'down',
      factors: ['Treatment effects', 'Stable conditions']
    },
    { 
      day: 'Day 5', 
      date: '26 Sep', 
      risk: 'Low', 
      confidence: 58, 
      trend: 'down',
      factors: ['Expected improvement', 'Dry weather']
    },
    { 
      day: 'Day 6', 
      date: '27 Sep', 
      risk: 'Low', 
      confidence: 52, 
      trend: 'stable',
      factors: ['Stable conditions', 'Monitoring continues']
    },
    { 
      day: 'Day 7', 
      date: '28 Sep', 
      risk: 'Low', 
      confidence: 48, 
      trend: 'stable',
      factors: ['Long-term stability', 'Preventive measures']
    }
  ];

  const featureImportance = [
    { feature: 'Bacterial Presence', importance: 92, color: 'danger' },
    { feature: 'Turbidity Level', importance: 87, color: 'warning' },
    { feature: 'Recent Rainfall', importance: 76, color: 'primary' },
    { feature: 'Temperature', importance: 64, color: 'secondary' },
    { feature: 'pH Level', importance: 58, color: 'muted' },
    { feature: 'TDS Concentration', importance: 45, color: 'muted' },
    { feature: 'Population Density', importance: 38, color: 'muted' },
    { feature: 'Historical Outbreaks', importance: 32, color: 'muted' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'risk-high';
      case 'medium': return 'risk-medium';
      case 'low': return 'risk-low';
      default: return 'muted';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Activity;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'danger';
      case 'down': return 'success';
      default: return 'muted';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Disease Risk Forecast</h1>
            <p className="text-muted-foreground">AI-powered waterborne disease outbreak prediction</p>
          </div>
          
          <div className="flex gap-3">
            <Badge variant="outline" className="text-primary border-primary/30">
              <Brain className="h-3 w-3 mr-1" />
              LSTM Model v2.1
            </Badge>
            <Badge variant="outline" className="text-success border-success/30">
              Updated 5 min ago
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Forecast Chart */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  7-Day Risk Forecast
                </CardTitle>
                <CardDescription>
                  Disease outbreak probability with confidence intervals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forecastData.map((forecast, index) => {
                    const TrendIcon = getTrendIcon(forecast.trend);
                    return (
                      <div key={index} className="p-4 rounded-lg border border-border hover:bg-muted/20 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-center min-w-0">
                              <p className="text-sm font-medium">{forecast.day}</p>
                              <p className="text-xs text-muted-foreground">{forecast.date}</p>
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={`bg-${getRiskColor(forecast.risk)}/10 text-${getRiskColor(forecast.risk)} border-${getRiskColor(forecast.risk)}/20`}
                            >
                              {forecast.risk} Risk
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Progress value={forecast.confidence} className="w-20 h-2" />
                              <span className="text-xs font-medium text-muted-foreground">
                                {forecast.confidence}%
                              </span>
                            </div>
                            <TrendIcon className={`h-4 w-4 text-${getTrendColor(forecast.trend)}`} />
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {forecast.factors.map((factor, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Importance */}
          <div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-secondary" />
                  Feature Importance
                </CardTitle>
                <CardDescription>
                  Key factors driving risk predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureImportance.map((feature, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{feature.feature}</p>
                        <span className="text-xs text-muted-foreground">{feature.importance}%</span>
                      </div>
                      <Progress 
                        value={feature.importance} 
                        className={`h-2 bg-${feature.color}/10`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What-If Analysis */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              What-If Scenario Analysis
            </CardTitle>
            <CardDescription>
              Simulate different conditions to see impact on risk predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-primary" />
                  <label className="text-sm font-medium">Turbidity Level</label>
                </div>
                <div className="space-y-2">
                  <Slider
                    value={turbiditySlider}
                    onValueChange={setTurbiditySlider}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 NTU</span>
                    <span className="font-medium">{turbiditySlider[0]} NTU</span>
                    <span>100 NTU</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CloudRain className="h-4 w-4 text-primary" />
                  <label className="text-sm font-medium">Rainfall (24h)</label>
                </div>
                <div className="space-y-2">
                  <Slider
                    value={rainfallSlider}
                    onValueChange={setRainfallSlider}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 mm</span>
                    <span className="font-medium">{rainfallSlider[0]} mm</span>
                    <span>50 mm</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-primary" />
                  <label className="text-sm font-medium">Temperature</label>
                </div>
                <div className="space-y-2">
                  <Slider
                    value={temperatureSlider}
                    onValueChange={setTemperatureSlider}
                    min={15}
                    max={45}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>15°C</span>
                    <span className="font-medium">{temperatureSlider[0]}°C</span>
                    <span>45°C</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Simulated Risk Level</p>
                  <p className="text-xs text-muted-foreground">Based on adjusted parameters</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="secondary" 
                    className="bg-warning/10 text-warning border-warning/20 text-lg px-3 py-1"
                  >
                    Medium Risk
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">74% confidence</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Model Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-4 w-4 text-success" />
                Model Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">89.3%</div>
                <p className="text-sm text-muted-foreground">Historical validation</p>
                <div className="mt-3">
                  <Progress value={89.3} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>IoT Sensors</span>
                  <Badge variant="secondary" className="text-xs">156 active</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Weather API</span>
                  <Badge variant="secondary" className="text-xs bg-success/10 text-success">Live</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Health Reports</span>
                  <Badge variant="secondary" className="text-xs">Daily</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                Alert Threshold
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">75%</div>
                <p className="text-sm text-muted-foreground">Risk confidence trigger</p>
                <div className="mt-3">
                  <Button size="sm" variant="outline" className="w-full">
                    Adjust Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RiskForecast;