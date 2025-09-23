import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Wifi, 
  WifiOff, 
  Battery, 
  Thermometer,
  Droplets,
  Zap,
  MapPin,
  Calendar,
  Search,
  Filter,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Sun,
  Cloud,
  BarChart3,
  RefreshCw,
  Download,
  Eye,
  Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';
import sensorImage from '@/assets/sensor-equipment.jpg';

const Sensors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSensor, setSelectedSensor] = useState<any>(null);
  const [selectedParameter, setSelectedParameter] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  // Generate time series data for charts
  const generateTimeSeriesData = () => {
    const data = [];
    const now = new Date();
    for (let i = 47; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - (i * 30 * 60000)); // 30-minute intervals
      data.push({
        timestamp: timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        fullTimestamp: timestamp.toLocaleString(),
        ph: 6.5 + (Math.random() * 2.5 - 1.25) + Math.sin(i * 0.1) * 0.8,
        tds: 300 + (Math.random() * 200 - 100) + Math.sin(i * 0.15) * 50,
        turbidity: 5 + (Math.random() * 15 - 7.5) + Math.sin(i * 0.2) * 3,
        temperature: 25 + (Math.random() * 6 - 3) + Math.sin(i * 0.08) * 2,
        conductivity: 450 + (Math.random() * 200 - 100) + Math.sin(i * 0.12) * 80,
        bacterial: Math.random() > 0.8 ? 10 + Math.random() * 20 : Math.random() * 5
      });
    }
    return data;
  };

  const timeSeriesData = generateTimeSeriesData();

  const sensors = [
    {
      id: 'AQS-001',
      name: 'Majuli Village Station',
      location: 'Majuli, Assam',
      status: 'online',
      lastReading: '2 min ago',
      battery: 85,
      signal: 'strong',
      calibrationDue: false,
      sensors: {
        ph: { value: 6.2, status: 'warning', unit: '', range: '6.5 - 8.5', compliance: 73 },
        tds: { value: 850, status: 'danger', unit: 'ppm', range: '0 - 500 ppm', compliance: 45 },
        turbidity: { value: 45, status: 'danger', unit: 'NTU', range: '0 - 5 NTU', compliance: 10 },
        temperature: { value: 28.5, status: 'normal', unit: '°C', range: '15 - 35 °C', compliance: 85 },
        conductivity: { value: 1200, status: 'warning', unit: 'µS/cm', range: '0 - 1000 µS/cm', compliance: 60 },
        bacterial: { value: 15, status: 'danger', unit: 'CFU/100ml', range: '0 - 10 CFU/100ml', compliance: 25 }
      },
      hardware: {
        solar: 95,
        battery: 85,
        lora: 'connected',
        gps: 'active'
      }
    },
    {
      id: 'AQS-002',
      name: 'Dibrugarh Community Station',
      location: 'Dibrugarh, Assam',
      status: 'online',
      lastReading: '1 min ago',
      battery: 92,
      signal: 'excellent',
      calibrationDue: false,
      sensors: {
        ph: { value: 7.1, status: 'normal', unit: '', range: '6.5 - 8.5', compliance: 92 },
        tds: { value: 320, status: 'normal', unit: 'ppm', range: '0 - 500 ppm', compliance: 88 },
        turbidity: { value: 2, status: 'normal', unit: 'NTU', range: '0 - 5 NTU', compliance: 95 },
        temperature: { value: 26.8, status: 'normal', unit: '°C', range: '15 - 35 °C', compliance: 92 },
        conductivity: { value: 480, status: 'normal', unit: 'µS/cm', range: '0 - 1000 µS/cm', compliance: 88 },
        bacterial: { value: 0, status: 'normal', unit: 'CFU/100ml', range: '0 - 10 CFU/100ml', compliance: 100 }
      },
      hardware: {
        solar: 100,
        battery: 92,
        lora: 'connected',
        gps: 'active'
      }
    },
    {
      id: 'AQS-003',
      name: 'Golaghat School Station',
      location: 'Golaghat, Assam',
      status: 'maintenance',
      lastReading: '2 hours ago',
      battery: 45,
      signal: 'weak',
      calibrationDue: true,
      sensors: {
        ph: { value: 8.3, status: 'warning', unit: '', range: '6.5 - 8.5', compliance: 78 },
        tds: { value: 680, status: 'warning', unit: 'ppm', range: '0 - 500 ppm', compliance: 65 },
        turbidity: { value: 8, status: 'warning', unit: 'NTU', range: '0 - 5 NTU', compliance: 72 },
        temperature: { value: 29.2, status: 'normal', unit: '°C', range: '15 - 35 °C', compliance: 88 },
        conductivity: { value: 920, status: 'warning', unit: 'µS/cm', range: '0 - 1000 µS/cm', compliance: 68 },
        bacterial: { value: 3, status: 'normal', unit: 'CFU/100ml', range: '0 - 10 CFU/100ml', compliance: 90 }
      },
      hardware: {
        solar: 60,
        battery: 45,
        lora: 'intermittent',
        gps: 'active'
      }
    },
    {
      id: 'AQS-004',
      name: 'Jorhat Health Center',
      location: 'Jorhat, Assam',
      status: 'offline',
      lastReading: '6 hours ago',
      battery: 12,
      signal: 'none',
      calibrationDue: false,
      sensors: {
        ph: { value: 7.4, status: 'normal', unit: '', range: '6.5 - 8.5', compliance: 95 },
        tds: { value: 280, status: 'normal', unit: 'ppm', range: '0 - 500 ppm', compliance: 92 },
        turbidity: { value: 1, status: 'normal', unit: 'NTU', range: '0 - 5 NTU', compliance: 98 },
        temperature: { value: 27.1, status: 'normal', unit: '°C', range: '15 - 35 °C', compliance: 90 },
        conductivity: { value: 420, status: 'normal', unit: 'µS/cm', range: '0 - 1000 µS/cm', compliance: 95 },
        bacterial: { value: 0, status: 'normal', unit: 'CFU/100ml', range: '0 - 10 CFU/100ml', compliance: 100 }
      },
      hardware: {
        solar: 0,
        battery: 12,
        lora: 'disconnected',
        gps: 'inactive'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'sensor-online';
      case 'offline': return 'sensor-offline';
      case 'maintenance': return 'warning';
      default: return 'muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return CheckCircle;
      case 'offline': return WifiOff;
      case 'maintenance': return AlertTriangle;
      default: return Activity;
    }
  };

  const getSensorStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'success';
      case 'warning': return 'warning';
      case 'danger': return 'danger';
      default: return 'muted';
    }
  };

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'excellent':
      case 'strong': return Wifi;
      case 'weak': return Wifi;
      case 'none': return WifiOff;
      default: return Wifi;
    }
  };

  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch = sensor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sensor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sensor.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sensor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const parameterColors = {
    ph: '#3b82f6',
    tds: '#10b981',
    turbidity: '#ef4444',
    temperature: '#f59e0b',
    conductivity: '#8b5cf6',
    bacterial: '#ec4899'
  };

  const parameterThresholds = {
    ph: { min: 6.5, max: 8.5 },
    tds: { min: 0, max: 500 },
    turbidity: { min: 0, max: 5 },
    temperature: { min: 15, max: 35 },
    conductivity: { min: 0, max: 1000 },
    bacterial: { min: 0, max: 10 }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{payload[0]?.payload?.fullTimestamp}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium">{entry.name.toUpperCase()}:</span>
              <span>{typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sensor Network</h1>
            <p className="text-muted-foreground">Monitor and manage water quality sensor stations</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sensors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Time Series Analysis and Sensor Parameter Cards */}
        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Time Series Analysis
            </TabsTrigger>
            <TabsTrigger value="parameters" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Live Parameters
            </TabsTrigger>
            <TabsTrigger value="sensors" className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              Sensor Network
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Time Series Analysis
                    </CardTitle>
                    <CardDescription>Monitor water quality parameters over time with anomaly detection</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      Anomalies Detected
                    </Badge>
                    <Button size="sm" variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Auto-refresh: ON
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Parameter Filter Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant={selectedParameter === 'all' ? 'default' : 'outline'}
                      onClick={() => setSelectedParameter('all')}
                    >
                      All Parameters
                    </Button>
                    {Object.keys(parameterColors).map((param) => (
                      <Button 
                        key={param}
                        size="sm" 
                        variant={selectedParameter === param ? 'default' : 'outline'}
                        onClick={() => setSelectedParameter(param)}
                        className={selectedParameter === param ? '' : 'hover:bg-opacity-20'}
                        style={{
                          backgroundColor: selectedParameter === param ? parameterColors[param as keyof typeof parameterColors] : 'transparent',
                          borderColor: parameterColors[param as keyof typeof parameterColors],
                          color: selectedParameter === param ? 'white' : parameterColors[param as keyof typeof parameterColors]
                        }}
                      >
                        {param.toUpperCase()}
                      </Button>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={timeSeriesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="timestamp" 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        
                        {/* Reference lines for thresholds */}
                        {selectedParameter !== 'all' && parameterThresholds[selectedParameter as keyof typeof parameterThresholds] && (
                          <>
                            <ReferenceLine 
                              y={parameterThresholds[selectedParameter as keyof typeof parameterThresholds].max} 
                              stroke="#ef4444" 
                              strokeDasharray="5 5" 
                              label="Max Threshold"
                            />
                            <ReferenceLine 
                              y={parameterThresholds[selectedParameter as keyof typeof parameterThresholds].min} 
                              stroke="#ef4444" 
                              strokeDasharray="5 5" 
                              label="Min Threshold"
                            />
                          </>
                        )}
                        
                        {/* Lines for each parameter */}
                        {(selectedParameter === 'all' ? Object.keys(parameterColors) : [selectedParameter]).map((param) => (
                          <Line
                            key={param}
                            type="monotone"
                            dataKey={param}
                            stroke={parameterColors[param as keyof typeof parameterColors]}
                            strokeWidth={2}
                            dot={{ r: 3, fill: parameterColors[param as keyof typeof parameterColors] }}
                            activeDot={{ r: 5, stroke: parameterColors[param as keyof typeof parameterColors], strokeWidth: 2 }}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span>Zoom Level: 1.0x</span>
                      <span>48 Data Points</span>
                    </div>
                    <span>Last updated: {new Date().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parameters" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Live Water Quality Parameters</h3>
                <p className="text-sm text-muted-foreground">Real-time sensor readings with WHO/BIS compliance indicators</p>
              </div>
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Sensor Filters
                <Badge variant="secondary" className="ml-2">Show Filters</Badge>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sensors.map((sensor) => (
                <div key={sensor.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{sensor.name}</h4>
                    <Badge variant={sensor.status === 'online' ? 'default' : 'secondary'} className="text-xs">
                      {sensor.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(sensor.sensors).map(([key, sensorData]: [string, any]) => (
                      <Card 
                        key={key} 
                        className={`p-3 hover:shadow-md transition-shadow cursor-pointer border-l-4`}
                        style={{ 
                          borderLeftColor: parameterColors[key as keyof typeof parameterColors],
                          backgroundColor: sensorData.status === 'danger' ? 'hsl(var(--destructive) / 0.05)' : 
                                         sensorData.status === 'warning' ? 'hsl(var(--warning) / 0.05)' : 
                                         'hsl(var(--success) / 0.05)'
                        }}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {key === 'ph' && <Droplets className="h-3 w-3" />}
                              {key === 'temperature' && <Thermometer className="h-3 w-3" />}
                              {key === 'conductivity' && <Zap className="h-3 w-3" />}
                              {(key === 'tds' || key === 'turbidity' || key === 'bacterial') && <Activity className="h-3 w-3" />}
                              <span className="text-xs font-medium text-muted-foreground uppercase">{key}</span>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                sensorData.status === 'normal' ? 'text-success bg-success/10 border-success/20' :
                                sensorData.status === 'warning' ? 'text-warning bg-warning/10 border-warning/20' :
                                'text-danger bg-danger/10 border-danger/20'
                              }`}
                            >
                              {sensorData.status === 'normal' ? 'Safe' : 
                               sensorData.status === 'warning' ? 'Warning' : 'Critical'}
                            </Badge>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="text-lg font-bold" style={{ color: parameterColors[key as keyof typeof parameterColors] }}>
                              {typeof sensorData.value === 'number' ? sensorData.value.toFixed(1) : sensorData.value}
                              <span className="text-sm font-normal text-muted-foreground ml-1">{sensorData.unit}</span>
                            </div>
                            
                            <div className="text-xs text-muted-foreground">
                              Range: {sensorData.range}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Progress value={sensorData.compliance} className="h-1 flex-1" />
                              <span className="text-xs font-medium">{sensorData.compliance}%</span>
                            </div>
                            
                            <div className="text-xs text-muted-foreground">
                              WHO/BIS Compliance: {sensorData.compliance}%
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span>2 Healthy</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span>1 Warning</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-danger rounded-full"></div>
                <span>1 Critical</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sensors">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sensors List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredSensors.map((sensor) => {
              const StatusIcon = getStatusIcon(sensor.status);
              const SignalIcon = getSignalIcon(sensor.signal);
              
              return (
                <Card 
                  key={sensor.id} 
                  className={`shadow-card hover:shadow-elevated transition-all cursor-pointer ${
                    selectedSensor?.id === sensor.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedSensor(sensor)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${getStatusColor(sensor.status)}/10`}>
                          <StatusIcon className={`h-5 w-5 text-${getStatusColor(sensor.status)}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{sensor.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {sensor.location} • ID: {sensor.id}
                          </CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="secondary" 
                          className={`bg-${getStatusColor(sensor.status)}/10 text-${getStatusColor(sensor.status)} border-${getStatusColor(sensor.status)}/20`}
                        >
                          {sensor.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <Battery className={`h-4 w-4 mx-auto mb-1 ${
                          sensor.battery > 50 ? 'text-success' : sensor.battery > 20 ? 'text-warning' : 'text-danger'
                        }`} />
                        <p className="text-xs text-muted-foreground">Battery</p>
                        <p className="text-sm font-medium">{sensor.battery}%</p>
                      </div>
                      
                      <div className="text-center">
                        <SignalIcon className={`h-4 w-4 mx-auto mb-1 ${
                          sensor.signal === 'none' ? 'text-danger' : 
                          sensor.signal === 'weak' ? 'text-warning' : 'text-success'
                        }`} />
                        <p className="text-xs text-muted-foreground">Signal</p>
                        <p className="text-sm font-medium capitalize">{sensor.signal}</p>
                      </div>
                      
                      <div className="text-center">
                        <Calendar className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Last Reading</p>
                        <p className="text-sm font-medium">{sensor.lastReading}</p>
                      </div>
                      
                      <div className="text-center">
                        <AlertTriangle className={`h-4 w-4 mx-auto mb-1 ${
                          sensor.calibrationDue ? 'text-warning' : 'text-success'
                        }`} />
                        <p className="text-xs text-muted-foreground">Calibration</p>
                        <p className="text-sm font-medium">{sensor.calibrationDue ? 'Due' : 'OK'}</p>
                      </div>
                    </div>
                    
                    {/* Quick sensor readings */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">pH</p>
                        <p className={`text-sm font-semibold text-${getSensorStatusColor(sensor.sensors.ph.status)}`}>
                          {sensor.sensors.ph.value}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">TDS</p>
                        <p className={`text-sm font-semibold text-${getSensorStatusColor(sensor.sensors.tds.status)}`}>
                          {sensor.sensors.tds.value}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Turbidity</p>
                        <p className={`text-sm font-semibold text-${getSensorStatusColor(sensor.sensors.turbidity.status)}`}>
                          {sensor.sensors.turbidity.value}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Sensor Detail Panel */}
          <div className="space-y-4">
            {selectedSensor ? (
              <>
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      {selectedSensor.name}
                    </CardTitle>
                    <CardDescription>
                      Detailed sensor readings and status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Sensor readings */}
                    <div className="space-y-3">
                      {Object.entries(selectedSensor.sensors).map(([key, sensor]: [string, any]) => (
                        <div key={key} className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
                          <div>
                            <p className="text-sm font-medium capitalize">{key.replace('_', ' ')}</p>
                            <p className="text-xs text-muted-foreground">
                              {sensor.value} {sensor.unit}
                            </p>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={`bg-${getSensorStatusColor(sensor.status)}/10 text-${getSensorStatusColor(sensor.status)} border-${getSensorStatusColor(sensor.status)}/20`}
                          >
                            {sensor.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full" size="sm">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Historical Data
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-base">Hardware Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-warning" />
                        <span className="text-sm">Solar Panel</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={selectedSensor.hardware.solar} className="w-16 h-2" />
                        <span className="text-xs font-medium">{selectedSensor.hardware.solar}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Battery className="h-4 w-4 text-success" />
                        <span className="text-sm">Battery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={selectedSensor.hardware.battery} className="w-16 h-2" />
                        <span className="text-xs font-medium">{selectedSensor.hardware.battery}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-sm">LoRa</span>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          selectedSensor.hardware.lora === 'connected' ? 'bg-success/10 text-success' :
                          selectedSensor.hardware.lora === 'intermittent' ? 'bg-warning/10 text-warning' :
                          'bg-danger/10 text-danger'
                        }`}
                      >
                        {selectedSensor.hardware.lora}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-secondary" />
                        <span className="text-sm">GPS</span>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          selectedSensor.hardware.gps === 'active' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                        }`}
                      >
                        {selectedSensor.hardware.gps}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <img 
                    src={sensorImage} 
                    alt="Sensor equipment"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <p className="text-muted-foreground">
                    Select a sensor from the list to view detailed information
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Sensors;