import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MessageSquare, 
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  Send,
  Plus,
  Eye,
  Edit,
  Smartphone
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const VolunteerCommunity = () => {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [newReport, setNewReport] = useState({ location: '', symptoms: '', severity: '' });

  const communityReports = [
    {
      id: 'RPT-001',
      source: 'SMS',
      location: 'Majuli Village - Ward 3',
      volunteer: 'Ravi Kumar',
      timestamp: '25 min ago',
      status: 'pending',
      severity: 'high',
      symptoms: 'Diarrhea, vomiting in 5 households',
      followUp: 'Field visit scheduled',
      contact: '+91-9876543210'
    },
    {
      id: 'RPT-002',
      source: 'IVR',
      location: 'Dibrugarh - Health Center',
      volunteer: 'Priya Das',
      timestamp: '1 hour ago',
      status: 'verified',
      severity: 'medium',
      symptoms: 'Stomach pain reported by 3 families',
      followUp: 'Water sample collected',
      contact: '+91-9876543211'
    },
    {
      id: 'RPT-003',
      source: 'Chatbot',
      location: 'Golaghat School Area',
      volunteer: 'Community Member',
      timestamp: '2 hours ago',
      status: 'resolved',
      severity: 'low',
      symptoms: 'Mild stomach discomfort after drinking well water',
      followUp: 'Advisory sent, monitoring continues',
      contact: 'Anonymous'
    },
    {
      id: 'RPT-004',
      source: 'Field Visit',
      location: 'Jorhat Rural - Block A',
      volunteer: 'Amit Singh',
      timestamp: '4 hours ago',
      status: 'investigating',
      severity: 'high',
      symptoms: 'Multiple cases of fever and diarrhea',
      followUp: 'Health team dispatched',
      contact: '+91-9876543212'
    }
  ];

  const volunteerTasks = [
    {
      id: 'TSK-001',
      task: 'Resample Water Source',
      location: 'Majuli Village Well #3',
      assignedTo: 'Ravi Kumar',
      priority: 'high',
      dueDate: 'Today 2:00 PM',
      status: 'in-progress',
      equipment: ['pH strips', 'Sample bottles', 'GPS device']
    },
    {
      id: 'TSK-002',
      task: 'Distribute ORS Packets',
      location: 'Dibrugarh Community Center',
      assignedTo: 'Priya Das',
      priority: 'medium',
      dueDate: 'Tomorrow 10:00 AM',
      status: 'assigned',
      equipment: ['ORS packets (50)', 'Information leaflets']
    },
    {
      id: 'TSK-003',
      task: 'Community Health Education',
      location: 'Golaghat School',
      assignedTo: 'Sunita Borah',
      priority: 'low',
      dueDate: 'Sept 25, 3:00 PM',
      status: 'planned',
      equipment: ['Educational materials', 'Projector', 'Handouts']
    }
  ];

  const chatbotAnalytics = [
    { intent: 'Water Quality Inquiry', count: 156, trend: 'up' },
    { intent: 'Symptom Reporting', count: 89, trend: 'stable' },
    { intent: 'Treatment Guidance', count: 67, trend: 'up' },
    { intent: 'Emergency Contact', count: 23, trend: 'down' },
    { intent: 'Prevention Tips', count: 145, trend: 'up' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'success';
      case 'verified': return 'primary';
      case 'investigating': return 'warning';
      case 'pending': return 'danger';
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'primary';
      default: return 'muted';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'assigned': return 'warning';
      case 'planned': return 'muted';
      default: return 'muted';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Volunteer & Community</h1>
            <p className="text-muted-foreground">Manage community health reports and volunteer assignments</p>
          </div>
          
          <div className="flex gap-3">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Button>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Assign Task
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="reports" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="reports">Community Reports</TabsTrigger>
                <TabsTrigger value="tasks">Volunteer Tasks</TabsTrigger>
                <TabsTrigger value="analytics">Chatbot Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="reports" className="space-y-4">
                {communityReports.map((report) => (
                  <Card 
                    key={report.id} 
                    className={`shadow-card hover:shadow-elevated transition-all cursor-pointer ${
                      selectedReport?.id === report.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedReport(report)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-${report.source === 'SMS' ? 'primary' : report.source === 'IVR' ? 'secondary' : report.source === 'Chatbot' ? 'success' : 'warning'}/10`}>
                            {report.source === 'SMS' && <MessageSquare className="h-4 w-4 text-primary" />}
                            {report.source === 'IVR' && <Phone className="h-4 w-4 text-secondary" />}
                            {report.source === 'Chatbot' && <Smartphone className="h-4 w-4 text-success" />}
                            {report.source === 'Field Visit' && <MapPin className="h-4 w-4 text-warning" />}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{report.location}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <Users className="h-3 w-3" />
                              {report.volunteer} • {report.timestamp}
                            </CardDescription>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary" 
                            className={`bg-${getSeverityColor(report.severity)}/10 text-${getSeverityColor(report.severity)} border-${getSeverityColor(report.severity)}/20`}
                          >
                            {report.severity.toUpperCase()}
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className={`bg-${getStatusColor(report.status)}/10 text-${getStatusColor(report.status)} border-${getStatusColor(report.status)}/20`}
                          >
                            {report.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        {report.symptoms}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          Follow-up: {report.followUp}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {report.source}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="tasks" className="space-y-4">
                {volunteerTasks.map((task) => (
                  <Card key={task.id} className="shadow-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{task.task}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {task.location}
                          </CardDescription>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary" 
                            className={`bg-${getPriorityColor(task.priority)}/10 text-${getPriorityColor(task.priority)} border-${getPriorityColor(task.priority)}/20`}
                          >
                            {task.priority.toUpperCase()}
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className={`bg-${getTaskStatusColor(task.status)}/10 text-${getTaskStatusColor(task.status)} border-${getTaskStatusColor(task.status)}/20`}
                          >
                            {task.status.replace('-', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Assigned to:</span>
                          <span className="font-medium">{task.assignedTo}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span>Due:</span>
                          <span className="font-medium">{task.dueDate}</span>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Required Equipment:</p>
                          <div className="flex flex-wrap gap-1">
                            {task.equipment.map((item, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-success" />
                      Chatbot Usage Analytics
                    </CardTitle>
                    <CardDescription>
                      Community engagement through automated assistance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {chatbotAnalytics.map((analytics, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">{analytics.intent}</p>
                            <p className="text-xs text-muted-foreground">
                              {analytics.count} interactions this week
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`text-2xl font-bold ${
                              analytics.trend === 'up' ? 'text-success' : 
                              analytics.trend === 'down' ? 'text-danger' : 'text-muted-foreground'
                            }`}>
                              {analytics.count}
                            </div>
                            <div className={`text-xs ${
                              analytics.trend === 'up' ? 'text-success' : 
                              analytics.trend === 'down' ? 'text-danger' : 'text-muted-foreground'
                            }`}>
                              {analytics.trend === 'up' ? '↗' : analytics.trend === 'down' ? '↘' : '→'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-base">Top Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>"Is my water safe to drink?"</span>
                        <Badge variant="secondary" className="text-xs">89 times</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>"What should I do if I feel sick?"</span>
                        <Badge variant="secondary" className="text-xs">67 times</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>"How do I report water problems?"</span>
                        <Badge variant="secondary" className="text-xs">45 times</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>"Where can I get clean water?"</span>
                        <Badge variant="secondary" className="text-xs">34 times</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {selectedReport ? (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Report Details
                  </CardTitle>
                  <CardDescription>
                    {selectedReport.id} • {selectedReport.source}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Location</p>
                    <p className="text-sm text-muted-foreground">{selectedReport.location}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Symptoms Reported</p>
                    <p className="text-sm text-muted-foreground">{selectedReport.symptoms}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Volunteer</p>
                    <p className="text-sm text-muted-foreground">{selectedReport.volunteer}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Contact</p>
                    <p className="text-sm text-muted-foreground">{selectedReport.contact}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Follow-up Action</p>
                    <p className="text-sm text-muted-foreground">{selectedReport.followUp}</p>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      Update Status
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Assign Task
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Select a community report to view details and take action
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Community Engagement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-sm">SMS Reports</span>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {communityReports.filter(r => r.source === 'SMS').length}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-secondary" />
                    <span className="text-sm">IVR Calls</span>
                  </div>
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                    {communityReports.filter(r => r.source === 'IVR').length}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-success" />
                    <span className="text-sm">Chatbot</span>
                  </div>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    {communityReports.filter(r => r.source === 'Chatbot').length}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-warning" />
                    <span className="text-sm">Field Visits</span>
                  </div>
                  <Badge variant="secondary" className="bg-warning/10 text-warning">
                    {communityReports.filter(r => r.source === 'Field Visit').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Add New Report */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Quick Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Location"
                  value={newReport.location}
                  onChange={(e) => setNewReport({...newReport, location: e.target.value})}
                />
                <Textarea
                  placeholder="Symptoms or concerns..."
                  value={newReport.symptoms}
                  onChange={(e) => setNewReport({...newReport, symptoms: e.target.value})}
                  rows={3}
                />
                <Select value={newReport.severity} onValueChange={(value) => setNewReport({...newReport, severity: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VolunteerCommunity;