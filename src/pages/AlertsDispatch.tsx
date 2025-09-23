import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  MessageSquare,
  Phone,
  Truck,
  Package,
  MapPin,
  Users,
  Send,
  Eye,
  Filter,
  Plus
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const AlertsDispatch = () => {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');

  const alerts = [
    {
      id: 'ALT-001',
      village: 'Majuli Village',
      type: 'Bacterial Contamination',
      severity: 'critical',
      status: 'active',
      timestamp: '15 min ago',
      description: 'E. coli detected in community well water source',
      affectedPopulation: 1250,
      coordinates: { lat: 27.0238, lng: 94.2179 },
      responses: [
        { type: 'SMS', sent: 145, delivered: 142, language: 'Assamese' },
        { type: 'IVR', calls: 89, completed: 76, language: 'Hindi' }
      ],
      dispatchOrders: [
        { id: 'DSP-001', item: 'ORS Packets', quantity: 500, status: 'dispatched' },
        { id: 'DSP-002', item: 'Chlorine Tablets', quantity: 200, status: 'pending' }
      ]
    },
    {
      id: 'ALT-002',
      village: 'Dibrugarh Rural',
      type: 'High Turbidity',
      severity: 'warning',
      status: 'monitoring',
      timestamp: '32 min ago',
      description: 'Turbidity levels exceeded WHO guidelines after recent rainfall',
      affectedPopulation: 680,
      coordinates: { lat: 27.4728, lng: 94.9120 },
      responses: [
        { type: 'Chatbot', interactions: 23, language: 'English' }
      ],
      dispatchOrders: [
        { id: 'DSP-003', item: 'Water Purification Kits', quantity: 50, status: 'approved' }
      ]
    },
    {
      id: 'ALT-003',
      village: 'Golaghat Area',
      type: 'pH Level Critical',
      severity: 'critical',
      status: 'resolved',
      timestamp: '1 hour ago',
      description: 'pH levels dropped below safe limits - corrective measures applied',
      affectedPopulation: 890,
      coordinates: { lat: 26.1635, lng: 93.9626 },
      responses: [
        { type: 'SMS', sent: 89, delivered: 87, language: 'Assamese' },
        { type: 'Field Visit', visits: 3, language: 'Local' }
      ],
      dispatchOrders: [
        { id: 'DSP-004', item: 'pH Correction Solution', quantity: 10, status: 'delivered' }
      ]
    }
  ];

  const dispatchInventory = [
    { item: 'ORS Packets', available: 2500, reserved: 500, unit: 'packets' },
    { item: 'Chlorine Tablets', available: 800, reserved: 200, unit: 'tablets' },
    { item: 'Water Purification Kits', available: 150, reserved: 50, unit: 'kits' },
    { item: 'Test Strips pH', available: 300, reserved: 0, unit: 'strips' },
    { item: 'Vaccines (Cholera)', available: 200, reserved: 0, unit: 'doses' },
    { item: 'Educational Pamphlets', available: 5000, reserved: 0, unit: 'pieces' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'primary';
      default: return 'muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'danger';
      case 'monitoring': return 'warning';
      case 'resolved': return 'success';
      default: return 'muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return AlertTriangle;
      case 'monitoring': return Clock;
      case 'resolved': return CheckCircle;
      default: return Bell;
    }
  };

  const getDispatchStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'dispatched': return 'primary';
      case 'approved': return 'warning';
      case 'pending': return 'muted';
      default: return 'muted';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Alerts & Dispatch</h1>
            <p className="text-muted-foreground">Monitor alerts and manage emergency response operations</p>
          </div>
          
          <div className="flex gap-3">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts List */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="alerts" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
                <TabsTrigger value="inventory">Dispatch Inventory</TabsTrigger>
              </TabsList>

              <TabsContent value="alerts" className="space-y-4">
                {alerts.map((alert) => {
                  const StatusIcon = getStatusIcon(alert.status);
                  return (
                    <Card 
                      key={alert.id} 
                      className={`shadow-card hover:shadow-elevated transition-all cursor-pointer ${
                        selectedAlert?.id === alert.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedAlert(alert)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-${getSeverityColor(alert.severity)}/10`}>
                              <StatusIcon className={`h-5 w-5 text-${getSeverityColor(alert.severity)}`} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{alert.village}</CardTitle>
                              <CardDescription className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                {alert.type} • {alert.timestamp}
                              </CardDescription>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="secondary" 
                              className={`bg-${getSeverityColor(alert.severity)}/10 text-${getSeverityColor(alert.severity)} border-${getSeverityColor(alert.severity)}/20`}
                            >
                              {alert.severity.toUpperCase()}
                            </Badge>
                            <Badge 
                              variant="secondary" 
                              className={`bg-${getStatusColor(alert.status)}/10 text-${getStatusColor(alert.status)} border-${getStatusColor(alert.status)}/20`}
                            >
                              {alert.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                          {alert.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{alert.affectedPopulation.toLocaleString()} affected</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4 text-muted-foreground" />
                              <span>{alert.responses.length} response types</span>
                            </div>
                          </div>
                          
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>

              <TabsContent value="inventory" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dispatchInventory.map((item, index) => (
                    <Card key={index} className="shadow-card">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Package className="h-4 w-4 text-primary" />
                          {item.item}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Available:</span>
                            <span className="font-medium">{item.available} {item.unit}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Reserved:</span>
                            <span className="font-medium text-warning">{item.reserved} {item.unit}</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium">
                            <span>Free Stock:</span>
                            <span className="text-success">{item.available - item.reserved} {item.unit}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Alert Detail Panel */}
          <div className="space-y-4">
            {selectedAlert ? (
              <>
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      Alert Details
                    </CardTitle>
                    <CardDescription>
                      {selectedAlert.id} • {selectedAlert.village}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Description</p>
                        <p className="text-sm text-muted-foreground">{selectedAlert.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-sm font-medium mb-1">Affected Population</p>
                          <p className="text-lg font-semibold text-foreground">
                            {selectedAlert.affectedPopulation.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Coordinates</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedAlert.coordinates.lat.toFixed(4)}, {selectedAlert.coordinates.lng.toFixed(4)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-secondary" />
                      Response Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedAlert.responses.map((response: any, index: number) => (
                        <div key={index} className="p-3 bg-muted/20 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium">{response.type}</p>
                            <Badge variant="outline" className="text-xs">
                              {response.language}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {response.sent && `Sent: ${response.sent}`}
                            {response.delivered && ` • Delivered: ${response.delivered}`}
                            {response.calls && `Calls: ${response.calls}`}
                            {response.completed && ` • Completed: ${response.completed}`}
                            {response.interactions && `Interactions: ${response.interactions}`}
                            {response.visits && `Visits: ${response.visits}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Truck className="h-4 w-4 text-warning" />
                      Dispatch Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedAlert.dispatchOrders.map((order: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">{order.item}</p>
                            <p className="text-xs text-muted-foreground">Qty: {order.quantity} • {order.id}</p>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={`bg-${getDispatchStatusColor(order.status)}/10 text-${getDispatchStatusColor(order.status)} border-${getDispatchStatusColor(order.status)}/20`}
                          >
                            {order.status}
                          </Badge>
                        </div>
                      ))}
                      
                      <Button size="sm" className="w-full mt-3">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Dispatch Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Select an alert from the list to view details and manage responses
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Send SMS Alert
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Phone className="h-4 w-4" />
                  Trigger IVR Call
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Truck className="h-4 w-4" />
                  Emergency Dispatch
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Assign Volunteers
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AlertsDispatch;