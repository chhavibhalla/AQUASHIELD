import { useState } from 'react';
// Helper for safe conditional classNames (for Tailwind)
const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Users, 
  Shield,
  AlertTriangle,
  Languages,
  Smartphone,
  Database,
  Activity,
  Bell,
  Eye,
  Edit,
  Trash2,
  Plus,
  Save,
  RotateCcw,
  Droplets
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const AdminSettings = () => {
  const [thresholds, setThresholds] = useState({
    ph: { min: 6.5, max: 8.5 },
    tds: { max: 500 },
    turbidity: { max: 5 },
    bacterial: { threshold: 'any_detection' },
    temperature: { min: 10, max: 40 }
  });

  const [alertSettings, setAlertSettings] = useState({
    smsEnabled: true,
    ivrEnabled: true,
    chatbotEnabled: true,
    emailEnabled: false,
    riskThreshold: 75
  });

  const users = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@health.gov.in',
      role: 'Administrator',
      status: 'active',
      lastLogin: '2 hours ago',
      permissions: ['full_access']
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@health.gov.in',
      role: 'Health Official',
      status: 'active',
      lastLogin: '30 min ago',
      permissions: ['alerts', 'dispatch', 'reports']
    },
    {
      id: 3,
      name: 'Ravi Patel',
      email: 'ravi.patel@volunteer.org',
      role: 'Volunteer Coordinator',
      status: 'active',
      lastLogin: '1 hour ago',
      permissions: ['community', 'reports', 'tasks']
    },
    {
      id: 4,
      name: 'Amit Singh',
      email: 'amit.singh@field.org',
      role: 'Field Volunteer',
      status: 'offline',
      lastLogin: '1 day ago',
      permissions: ['reports_submit']
    }
  ];

  const languages = [
    { id: 'en', name: 'English', status: 'active', messages: 45, audio: true },
    { id: 'hi', name: 'Hindi', status: 'active', messages: 38, audio: true },
    { id: 'as', name: 'Assamese', status: 'active', messages: 42, audio: false },
    { id: 'bn', name: 'Bengali', status: 'active', messages: 35, audio: false },
    { id: 'or', name: 'Odia', status: 'inactive', messages: 0, audio: false }
  ];

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-09-22 14:30:15',
      user: 'Dr. Rajesh Kumar',
      action: 'Alert Triggered',
      details: 'Bacterial contamination alert for Majuli Village',
      severity: 'high'
    },
    {
      id: 2,
      timestamp: '2024-09-22 14:15:32',
      user: 'System',
      action: 'Threshold Breach',
      details: 'pH level exceeded safe limits at AQS-001',
      severity: 'medium'
    },
    {
      id: 3,
      timestamp: '2024-09-22 13:45:18',
      user: 'Priya Sharma',
      action: 'Dispatch Approved',
      details: 'ORS packets dispatch approved for DSP-001',
      severity: 'low'
    },
    {
      id: 4,
      timestamp: '2024-09-22 13:20:44',
      user: 'Ravi Patel',
      action: 'User Created',
      details: 'New volunteer account created for field team',
      severity: 'low'
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrator': return 'danger';
      case 'Health Official': return 'primary';
      case 'Volunteer Coordinator': return 'secondary';
      case 'Field Volunteer': return 'success';
      default: return 'muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'offline': return 'warning';
      case 'inactive': return 'muted';
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
            <h1 className="text-3xl font-bold text-foreground">Admin Settings</h1>
            <p className="text-muted-foreground">Configure system parameters and manage user access</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="thresholds" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
            <TabsTrigger value="users">Users & Roles</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="thresholds" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Water Quality Thresholds */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    Water Quality Limits
                  </CardTitle>
                  <CardDescription>
                    Set safe ranges based on BIS/WHO standards
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>pH Level</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Minimum</Label>
                        <Input
                          type="number"
                          value={thresholds.ph.min}
                          onChange={(e) => setThresholds({
                            ...thresholds,
                            ph: { ...thresholds.ph, min: parseFloat(e.target.value) }
                          })}
                          step="0.1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Maximum</Label>
                        <Input
                          type="number"
                          value={thresholds.ph.max}
                          onChange={(e) => setThresholds({
                            ...thresholds,
                            ph: { ...thresholds.ph, max: parseFloat(e.target.value) }
                          })}
                          step="0.1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>TDS (ppm)</Label>
                    <Input
                      type="number"
                      value={thresholds.tds.max}
                      onChange={(e) => setThresholds({
                        ...thresholds,
                        tds: { max: parseInt(e.target.value) }
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Turbidity (NTU)</Label>
                    <Input
                      type="number"
                      value={thresholds.turbidity.max}
                      onChange={(e) => setThresholds({
                        ...thresholds,
                        turbidity: { max: parseInt(e.target.value) }
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Bacterial Contamination</Label>
                    <Select
                      value={thresholds.bacterial.threshold}
                      onValueChange={(value) => setThresholds({
                        ...thresholds,
                        bacterial: { threshold: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any_detection">Any Detection</SelectItem>
                        <SelectItem value="high_levels">High Levels Only</SelectItem>
                        <SelectItem value="critical_levels">Critical Levels Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Alert Settings */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-warning" />
                    Alert Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure alert triggers and notification methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Risk Threshold for Alerts (%)</Label>
                    <Input
                      type="number"
                      value={alertSettings.riskThreshold}
                      onChange={(e) => setAlertSettings({
                        ...alertSettings,
                        riskThreshold: parseInt(e.target.value)
                      })}
                      min="0"
                      max="100"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>Notification Methods</Label>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">SMS Alerts</Label>
                        <p className="text-xs text-muted-foreground">Send text message alerts</p>
                      </div>
                      <Switch
                        checked={alertSettings.smsEnabled}
                        onCheckedChange={(checked) => setAlertSettings({
                          ...alertSettings,
                          smsEnabled: checked
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">IVR Calls</Label>
                        <p className="text-xs text-muted-foreground">Automated voice calls</p>
                      </div>
                      <Switch
                        checked={alertSettings.ivrEnabled}
                        onCheckedChange={(checked) => setAlertSettings({
                          ...alertSettings,
                          ivrEnabled: checked
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Chatbot Notifications</Label>
                        <p className="text-xs text-muted-foreground">In-app chatbot alerts</p>
                      </div>
                      <Switch
                        checked={alertSettings.chatbotEnabled}
                        onCheckedChange={(checked) => setAlertSettings({
                          ...alertSettings,
                          chatbotEnabled: checked
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Email Notifications</Label>
                        <p className="text-xs text-muted-foreground">Email alerts to officials</p>
                      </div>
                      <Switch
                        checked={alertSettings.emailEnabled}
                        onCheckedChange={(checked) => setAlertSettings({
                          ...alertSettings,
                          emailEnabled: checked
                        })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">User Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>

            <div className="grid gap-4">
              {users.map((user) => (
                <Card key={user.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">Last login: {user.lastLogin}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <Badge
                            variant="secondary"
                            className={classNames(
                              'mb-1',
                              getRoleColor(user.role) === 'danger' && 'bg-danger/10 text-danger border-danger/20',
                              getRoleColor(user.role) === 'primary' && 'bg-primary/10 text-primary border-primary/20',
                              getRoleColor(user.role) === 'secondary' && 'bg-secondary/10 text-secondary border-secondary/20',
                              getRoleColor(user.role) === 'success' && 'bg-success/10 text-success border-success/20',
                              getRoleColor(user.role) === 'muted' && 'bg-muted/10 text-muted border-muted/20'
                            )}
                          >
                            {user.role}
                          </Badge>
                          <div>
                            <Badge 
                              variant="secondary" 
                              className={`bg-${getStatusColor(user.status)}/10 text-${getStatusColor(user.status)} border-${getStatusColor(user.status)}/20`}
                            >
                              {user.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3 text-danger" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-muted-foreground mr-2">Permissions:</span>
                        {user.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="languages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Language Support</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </div>

            <div className="grid gap-4">
              {languages.map((language) => (
                <Card key={language.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-secondary/10 rounded-lg">
                          <Languages className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{language.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {language.messages} translated messages
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right space-y-1">
                          <div>
                            <Badge 
                              variant="secondary" 
                              className={`bg-${getStatusColor(language.status)}/10 text-${getStatusColor(language.status)} border-${getStatusColor(language.status)}/20`}
                            >
                              {language.status}
                            </Badge>
                          </div>
                          <div>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${language.audio ? 'text-success' : 'text-muted-foreground'}`}
                            >
                              {language.audio ? 'Audio Ready' : 'Text Only'}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Smartphone className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <h2 className="text-xl font-semibold">External Integrations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                    SMS Gateway
                  </CardTitle>
                  <CardDescription>Configure SMS service provider</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Provider</Label>
                    <Select defaultValue="twilio">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="aws-sns">AWS SNS</SelectItem>
                        <SelectItem value="textlocal">TextLocal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>API Key</Label>
                    <Input type="password" placeholder="Enter API key" />
                  </div>
                  <Button className="w-full">Test Connection</Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-secondary" />
                    Weather API
                  </CardTitle>
                  <CardDescription>Weather data integration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Provider</Label>
                    <Select defaultValue="openweather">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openweather">OpenWeatherMap</SelectItem>
                        <SelectItem value="weatherapi">WeatherAPI</SelectItem>
                        <SelectItem value="imd">IMD API</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>API Key</Label>
                    <Input type="password" placeholder="Enter API key" />
                  </div>
                  <Button className="w-full">Test Connection</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Audit Logs</h2>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="alerts">Alerts Only</SelectItem>
                    <SelectItem value="users">User Actions</SelectItem>
                    <SelectItem value="system">System Events</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Export</Button>
              </div>
            </div>

            <Card className="shadow-card">
              <CardContent className="p-0">
                <div className="space-y-0">
                  {auditLogs.map((log, index) => (
                    <div key={log.id} className={`p-4 ${index !== auditLogs.length - 1 ? 'border-b border-border' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-full bg-${getSeverityColor(log.severity)}/10`}>
                            <Activity className={`h-3 w-3 text-${getSeverityColor(log.severity)}`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{log.action}</p>
                            <p className="text-xs text-muted-foreground">{log.details}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{log.user}</p>
                          <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;