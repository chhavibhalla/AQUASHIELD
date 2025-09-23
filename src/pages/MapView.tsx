import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, 
  Droplets, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Thermometer,
  Activity,
  Users,
  Cloud,
  CloudRain
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import mockMap from '@/assets/mockmap.png';

const MapView = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [weatherOverlay, setWeatherOverlay] = useState(false);
  const [selectedSite, setSelectedSite] = useState<any>(null);

  const waterSites = [
    {
      id: 1,
      name: 'Majuli Village Well',
      lat: 27.0238,
      lng: 94.2179,
      status: 'unsafe',
      risk: 'high',
      lastReading: '15 min ago',
      ph: 6.2,
      tds: 850,
      turbidity: 45,
      bacterial: 'detected'
    },
    {
      id: 2,
      name: 'Dibrugarh Community Center',
      lat: 27.4728,
      lng: 94.9120,
      status: 'safe',
      risk: 'low',
      lastReading: '5 min ago',
      ph: 7.1,
      tds: 320,
      turbidity: 2,
      bacterial: 'not detected'
    },
    {
      id: 3,
      name: 'Golaghat School',
      lat: 26.1635,
      lng: 93.9626,
      status: 'needs-review',
      risk: 'medium',
      lastReading: '22 min ago',
      ph: 8.3,
      tds: 680,
      turbidity: 8,
      bacterial: 'not detected'
    },
    {
      id: 4,
      name: 'Jorhat Health Center',
      lat: 26.7509,
      lng: 94.2037,
      status: 'safe',
      risk: 'low',
      lastReading: '3 min ago',
      ph: 7.4,
      tds: 280,
      turbidity: 1,
      bacterial: 'not detected'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'water-safe';
      case 'unsafe': return 'water-unsafe';
      case 'needs-review': return 'water-review';
      default: return 'muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return CheckCircle;
      case 'unsafe': return AlertTriangle;
      case 'needs-review': return Clock;
      default: return MapPin;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'risk-high';
      case 'medium': return 'risk-medium';
      case 'low': return 'risk-low';
      default: return 'muted';
    }
  };

  const filteredSites = waterSites.filter(site => {
    if (selectedFilter === 'all') return true;
    return site.status === selectedFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Map View</h1>
            <p className="text-muted-foreground">Interactive water source monitoring and risk visualization</p>
          </div>
          
          <div className="flex gap-3">
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="safe">Safe Sources</SelectItem>
                <SelectItem value="unsafe">Unsafe Sources</SelectItem>
                <SelectItem value="needs-review">Needs Review</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant={weatherOverlay ? "default" : "outline"}
              onClick={() => setWeatherOverlay(!weatherOverlay)}
            >
              <CloudRain className="h-4 w-4 mr-2" />
              Weather
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="shadow-card h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Assam Region Water Sources
                </CardTitle>
                <CardDescription>
                  {filteredSites.length} of {waterSites.length} sites shown
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full p-0">
                {/* Placeholder for actual map - in real implementation, use Mapbox/Google Maps */}
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  {/* Static mock map image */}
                  <img
                    src={mockMap}
                    alt="Mock Map"
                    className="absolute inset-0 w-full h-full object-contain"
                  />

                  {/* Simulated map markers (kept for mock/demo) */}
                  
                  {/* Simulated map markers */}
                  {filteredSites.map((site, index) => {
                    const StatusIcon = getStatusIcon(site.status);
                    return (
                      <button
                        key={site.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-all hover:scale-110 bg-${getStatusColor(site.status)} text-white ring-4 ring-${getStatusColor(site.status)} animate-pulse`}
                        style={{
                          left: `${20 + (index * 20)}%`,
                          top: `${30 + (index * 15)}%`
                        }}
                        onClick={() => setSelectedSite(site)}
                      >
                        <StatusIcon className="h-4 w-4" />
                      </button>
                    );
                  })}
                  
                  {/* Map legend */}
                  <div className="absolute bottom-4 left-4 bg-card p-3 rounded-lg shadow-md border border-border">
                    <p className="text-sm font-medium mb-2">Legend</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-water-safe" />
                        <span>Safe</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-water-review" />
                        <span>Needs Review</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-water-unsafe" />
                        <span>Unsafe</span>
                      </div>
                    </div>
                  </div>
                  
                  {weatherOverlay && (
                    <div className="absolute top-4 right-4 bg-card p-3 rounded-lg shadow-md border border-border">
                      <p className="text-sm font-medium mb-2">Weather Overlay</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <CloudRain className="h-3 w-3 text-primary" />
                          <span>Rainfall: 12mm</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-3 w-3 text-danger" />
                          <span>Temp: 28°C</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Site Details Panel */}
          <div className="space-y-4">
            {selectedSite ? (
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{selectedSite.name}</CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={`bg-${getStatusColor(selectedSite.status)}/10 text-${getStatusColor(selectedSite.status)} border-${getStatusColor(selectedSite.status)}/20`}
                    >
                      {selectedSite.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription>
                    Last reading: {selectedSite.lastReading}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">pH Level</p>
                      <p className="text-lg font-semibold">{selectedSite.ph}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">TDS (ppm)</p>
                      <p className="text-lg font-semibold">{selectedSite.tds}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">Turbidity</p>
                      <p className="text-lg font-semibold">{selectedSite.turbidity} NTU</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">Bacterial</p>
                      <p className="text-sm font-medium text-foreground">{selectedSite.bacterial}</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Risk Assessment</p>
                      <Badge 
                        variant="secondary" 
                        className={`bg-${getRiskColor(selectedSite.risk)}/10 text-${getRiskColor(selectedSite.risk)} border-${getRiskColor(selectedSite.risk)}/20`}
                      >
                        {selectedSite.risk.toUpperCase()} RISK
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {selectedSite.risk === 'high' && 'Immediate action recommended. Distribute boil water advisories.'}
                      {selectedSite.risk === 'medium' && 'Monitor closely. Consider preventive measures.'}
                      {selectedSite.risk === 'low' && 'Water quality within acceptable range.'}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Create Alert
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Click on a map marker to view site details
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-water-safe" />
                    <span className="text-sm">Safe Sources</span>
                  </div>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    {waterSites.filter(s => s.status === 'safe').length}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-water-unsafe" />
                    <span className="text-sm">Unsafe Sources</span>
                  </div>
                  <Badge variant="secondary" className="bg-danger/10 text-danger">
                    {waterSites.filter(s => s.status === 'unsafe').length}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-water-review" />
                    <span className="text-sm">Needs Review</span>
                  </div>
                  <Badge variant="secondary" className="bg-warning/10 text-warning">
                    {waterSites.filter(s => s.status === 'needs-review').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapView;