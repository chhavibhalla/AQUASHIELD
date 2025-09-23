import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Droplets, 
  MapPin, 
  AlertTriangle, 
  Wifi, 
  WifiOff, 
  TrendingUp, 
  Users,
  Activity,
  ShieldAlert,
  Navigation,
  Settings,
  BarChart3,
  Bell
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const Overview = () => {
  const navigate = useNavigate();

  const kpiData = [
    { 
      title: 'Unsafe Water Sources', 
      value: '23', 
      change: '+3 from yesterday',
      color: 'danger',
      icon: AlertTriangle
    },
    { 
      title: 'High-Risk Villages', 
      value: '8', 
      change: '+1 from yesterday',
      color: 'warning', 
      icon: MapPin
    },
    { 
      title: 'Active Alerts', 
      value: '12', 
      change: '5 critical',
      color: 'danger',
      icon: Bell
    },
    { 
      title: 'Devices Online', 
      value: '156/178', 
      change: '87.6% uptime',
      color: 'success',
      icon: Wifi
    }
  ];

  const recentAlerts = [
    { id: 1, village: 'Majuli Village', type: 'Bacterial Contamination', severity: 'high', time: '15 min ago' },
    { id: 2, village: 'Dibrugarh Rural', type: 'High Turbidity', severity: 'medium', time: '32 min ago' },
    { id: 3, village: 'Golaghat Area', type: 'pH Level Critical', severity: 'high', time: '1 hour ago' },
    { id: 4, village: 'Jorhat District', type: 'TDS Exceeds Limit', severity: 'medium', time: '2 hours ago' }
  ];

  const riskForecast = [
    { day: 'Today', risk: 'High', confidence: 89 },
    { day: 'Tomorrow', risk: 'High', confidence: 85 },
    { day: 'Day 3', risk: 'Medium', confidence: 72 },
    { day: 'Day 4', risk: 'Medium', confidence: 68 },
    { day: 'Day 5', risk: 'Low', confidence: 58 }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'risk-high';
      case 'medium': return 'risk-medium';
      case 'low': return 'risk-low';
      default: return 'muted';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'muted';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Overview Dashboard</h1>
            <p className="text-muted-foreground">Real-time water quality monitoring and disease outbreak prevention</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-success border-success/30">
              Last Updated: 2 min ago
            </Badge>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 text-${kpi.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{kpi.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Risk Forecast */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Disease Risk Forecast
                  </CardTitle>
                  <CardDescription>AI-powered 5-day risk prediction</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/risk-forecast')}
                >
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskForecast.map((forecast, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium w-16">{forecast.day}</div>
                      <Badge 
                        variant="secondary" 
                        className={`bg-${getRiskColor(forecast.risk)}/10 text-${getRiskColor(forecast.risk)} border-${getRiskColor(forecast.risk)}/20`}
                      >
                        {forecast.risk} Risk
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={forecast.confidence} className="w-20 h-2" />
                      <span className="text-xs text-muted-foreground">{forecast.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-danger" />
                    Recent Alerts
                  </CardTitle>
                  <CardDescription>Latest water quality alerts</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/alerts')}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 rounded-lg border border-border hover:bg-muted/20 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {alert.village}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {alert.type}
                        </p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`bg-${getSeverityColor(alert.severity)}/10 text-${getSeverityColor(alert.severity)} border-${getSeverityColor(alert.severity)}/20 shrink-0`}
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2 hover:bg-primary/5 hover:border-primary/30"
            onClick={() => navigate('/map')}
          >
            <Navigation className="h-6 w-6 text-primary" />
            <span className="text-sm">Map View</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2 hover:bg-secondary/5 hover:border-secondary/30"
            onClick={() => navigate('/sensors')}
          >
            <Activity className="h-6 w-6 text-secondary" />
            <span className="text-sm">Sensors</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2 hover:bg-success/5 hover:border-success/30"
            onClick={() => navigate('/volunteers')}
          >
            <Users className="h-6 w-6 text-success" />
            <span className="text-sm">Community</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2 hover:bg-muted hover:border-muted-foreground/30"
            onClick={() => navigate('/admin')}
          >
            <Settings className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm">Settings</span>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;