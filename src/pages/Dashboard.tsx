import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  Home,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface MobileParkData {
  name: string;
  location: string;
  lotSize: number;
  totalLots: number;
  occupiedLots: number;
  availableLots: number;
  residents: number;
  lotsSold: number;
  ipoTiers: number;
  avgLotPrice: number;
  monthlyRevenue: number;
  occupancyRate: number;
  yearEstablished: number;
}

const Dashboard = () => {
  const [selectedPark, setSelectedPark] = useState('messer');

  const mobileParksData: Record<string, MobileParkData> = {
    messer: {
      name: 'Messer Mobile Park',
      location: 'Phoenix, Arizona',
      lotSize: 5.2,
      totalLots: 142,
      occupiedLots: 128,
      availableLots: 14,
      residents: 387,
      lotsSold: 89,
      ipoTiers: 3,
      avgLotPrice: 45000,
      monthlyRevenue: 89500,
      occupancyRate: 90.1,
      yearEstablished: 1998,
    },
    riverside: {
      name: 'Riverside Estates',
      location: 'Tampa, Florida',
      lotSize: 4.8,
      totalLots: 168,
      occupiedLots: 154,
      availableLots: 14,
      residents: 421,
      lotsSold: 102,
      ipoTiers: 4,
      avgLotPrice: 52000,
      monthlyRevenue: 124800,
      occupancyRate: 91.7,
      yearEstablished: 2003,
    },
  };

  const currentPark = mobileParksData[selectedPark];

  return (
    <div className="min-h-screen bg-gradient-to-br from-scraper-bg-primary via-scraper-bg-secondary to-scraper-bg-primary">
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-scraper-gradient-primary rounded-xl flex items-center justify-center shadow-scraper-glow">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-scraper-text-primary tracking-tight">
                Mobile Parks
              </h1>
              <p className="text-scraper-text-secondary mt-1">
                Premium mobile home community analytics powered by Lucky AI
              </p>
            </div>
          </div>
        </div>

        {/* Park Selection Tabs */}
        <Tabs value={selectedPark} onValueChange={setSelectedPark} className="w-full">
          <TabsList className="bg-scraper-bg-card border border-scraper-border p-1.5 h-auto">
            <TabsTrigger 
              value="messer" 
              className="data-[state=active]:bg-scraper-gradient-primary data-[state=active]:shadow-scraper-glow data-[state=active]:text-white px-8 py-3 text-base"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Messer Mobile Park
            </TabsTrigger>
            <TabsTrigger 
              value="riverside"
              className="data-[state=active]:bg-scraper-gradient-primary data-[state=active]:shadow-scraper-glow data-[state=active]:text-white px-8 py-3 text-base"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Riverside Estates
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedPark} className="mt-8 space-y-6">
            {/* Park Overview Header */}
            <Card className="bg-scraper-bg-card border-scraper-border shadow-scraper-lg overflow-hidden">
              <div className="h-2 bg-scraper-gradient-primary"></div>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-3xl font-bold text-scraper-text-primary">
                      {currentPark.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 text-scraper-text-secondary">
                      <MapPin className="w-4 h-4" />
                      <span>{currentPark.location}</span>
                    </div>
                  </div>
                  <Badge className="bg-scraper-accent-success/20 text-scraper-accent-success border-scraper-accent-success text-lg px-4 py-2">
                    {currentPark.occupancyRate}% Occupied
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Visual Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Lot Size Card */}
              <Card className="bg-scraper-bg-card border-scraper-border hover:shadow-scraper-glow transition-all duration-300 hover-lift overflow-hidden group">
                <div className="absolute inset-0 bg-scraper-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-scraper-text-secondary">
                    Lot Size
                  </CardTitle>
                  <div className="p-2 bg-scraper-gradient-primary rounded-lg">
                    <Home className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-4xl font-bold text-scraper-text-primary mb-2">
                    {currentPark.lotSize}
                  </div>
                  <p className="text-sm text-scraper-text-muted">acres total</p>
                  <div className="mt-4 h-2 bg-scraper-bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-scraper-gradient-primary w-full animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>

              {/* Total Lots with Visual Bar */}
              <Card className="bg-scraper-bg-card border-scraper-border hover:shadow-scraper-glow transition-all duration-300 hover-lift overflow-hidden group">
                <div className="absolute inset-0 bg-scraper-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-scraper-text-secondary">
                    Total Lots
                  </CardTitle>
                  <div className="p-2 bg-gradient-to-br from-scraper-accent-secondary to-scraper-accent-warning rounded-lg">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-4xl font-bold text-scraper-text-primary mb-2">
                    {currentPark.totalLots}
                  </div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-scraper-accent-success">{currentPark.occupiedLots} occupied</span>
                    <span className="text-scraper-accent-warning">{currentPark.availableLots} available</span>
                  </div>
                  <Progress value={currentPark.occupancyRate} className="h-2" />
                </CardContent>
              </Card>

              {/* Residents Card */}
              <Card className="bg-scraper-bg-card border-scraper-border hover:shadow-scraper-glow transition-all duration-300 hover-lift overflow-hidden group">
                <div className="absolute inset-0 bg-scraper-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-scraper-text-secondary">
                    Residents
                  </CardTitle>
                  <div className="p-2 bg-gradient-to-br from-scraper-accent-primary to-scraper-accent-success rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-4xl font-bold text-scraper-text-primary mb-2">
                    {currentPark.residents}
                  </div>
                  <p className="text-sm text-scraper-accent-success mb-3">
                    ↑ Active community
                  </p>
                  <div className="flex space-x-1">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 h-8 bg-scraper-accent-primary/20 rounded"
                        style={{ 
                          opacity: i < 9 ? 1 : 0.3,
                          background: i < 9 ? 'linear-gradient(to top, hsl(var(--scraper-accent-primary)), hsl(var(--scraper-accent-success)))' : undefined
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Lots Sold with Visual */}
              <Card className="bg-scraper-bg-card border-scraper-border hover:shadow-scraper-glow transition-all duration-300 hover-lift overflow-hidden group">
                <div className="absolute inset-0 bg-scraper-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-scraper-text-secondary">
                    Lots Sold
                  </CardTitle>
                  <div className="p-2 bg-gradient-to-br from-scraper-accent-warning to-scraper-accent-secondary rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-4xl font-bold text-scraper-text-primary mb-2">
                    {currentPark.lotsSold}
                  </div>
                  <p className="text-sm text-scraper-text-muted mb-3">
                    {((currentPark.lotsSold / currentPark.totalLots) * 100).toFixed(1)}% of total
                  </p>
                  <div className="relative w-full h-2 bg-scraper-bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-scraper-gradient-primary rounded-full transition-all duration-500 shadow-scraper-glow"
                      style={{ width: `${(currentPark.lotsSold / currentPark.totalLots) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial & Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Financial Overview with Visual Bars */}
              <Card className="bg-scraper-bg-card border-scraper-border shadow-scraper-md">
                <CardHeader>
                  <CardTitle className="text-scraper-text-primary flex items-center space-x-2">
                    <div className="p-2 bg-scraper-gradient-primary rounded-lg">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <span>Financial Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Monthly Revenue */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-scraper-text-secondary">Monthly Revenue</span>
                      <span className="text-2xl font-bold text-scraper-accent-success">
                        ${currentPark.monthlyRevenue.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={85} className="h-3" />
                    <p className="text-xs text-scraper-text-muted">↑ 12.5% from last month</p>
                  </div>

                  {/* Average Lot Price */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-scraper-text-secondary">Avg. Lot Price</span>
                      <span className="text-2xl font-bold text-scraper-accent-secondary">
                        ${currentPark.avgLotPrice.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={70} className="h-3" />
                    <p className="text-xs text-scraper-text-muted">Competitive market pricing</p>
                  </div>

                  {/* IPO Tiers */}
                  <div className="p-4 bg-scraper-bg-secondary rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-scraper-text-secondary">IPO Tiers Available</span>
                      <Badge className="bg-scraper-accent-primary/20 text-scraper-accent-primary border-scraper-accent-primary px-3 py-1">
                        {currentPark.ipoTiers} Tiers
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div 
                          key={i}
                          className={`h-16 rounded-lg flex items-center justify-center text-xs font-bold ${
                            i < currentPark.ipoTiers 
                              ? 'bg-scraper-gradient-primary text-white shadow-scraper-glow' 
                              : 'bg-scraper-bg-primary/50 text-scraper-text-muted'
                          }`}
                        >
                          Tier {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Occupancy Analytics with Circular Progress */}
              <Card className="bg-scraper-bg-card border-scraper-border shadow-scraper-md">
                <CardHeader>
                  <CardTitle className="text-scraper-text-primary flex items-center space-x-2">
                    <div className="p-2 bg-gradient-to-br from-scraper-accent-primary to-scraper-accent-success rounded-lg">
                      <PieChart className="w-5 h-5 text-white" />
                    </div>
                    <span>Occupancy Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Circular Occupancy Indicator */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="hsl(var(--scraper-bg-secondary))"
                          strokeWidth="12"
                          fill="none"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="url(#gradient)"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 70}`}
                          strokeDashoffset={`${2 * Math.PI * 70 * (1 - currentPark.occupancyRate / 100)}`}
                          className="transition-all duration-1000"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--scraper-accent-primary))" />
                            <stop offset="100%" stopColor="hsl(var(--scraper-accent-secondary))" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-scraper-text-primary">
                          {currentPark.occupancyRate}%
                        </span>
                        <span className="text-xs text-scraper-text-muted">occupied</span>
                      </div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-scraper-bg-secondary rounded-lg text-center">
                      <Activity className="w-5 h-5 text-scraper-accent-success mx-auto mb-2" />
                      <div className="text-2xl font-bold text-scraper-text-primary">
                        {currentPark.occupiedLots}
                      </div>
                      <div className="text-xs text-scraper-text-muted">Occupied</div>
                    </div>
                    <div className="p-4 bg-scraper-bg-secondary rounded-lg text-center">
                      <BarChart3 className="w-5 h-5 text-scraper-accent-warning mx-auto mb-2" />
                      <div className="text-2xl font-bold text-scraper-text-primary">
                        {currentPark.availableLots}
                      </div>
                      <div className="text-xs text-scraper-text-muted">Available</div>
                    </div>
                  </div>

                  {/* Established Year */}
                  <div className="flex items-center justify-between p-4 bg-scraper-bg-secondary rounded-lg">
                    <div className="flex items-center space-x-2 text-scraper-text-secondary">
                      <Calendar className="w-4 h-4" />
                      <span>Established</span>
                    </div>
                    <span className="text-xl font-bold text-scraper-accent-secondary">
                      {currentPark.yearEstablished}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Investment Summary Banner */}
            <Card className="bg-gradient-to-r from-scraper-bg-card to-scraper-bg-secondary border-scraper-accent-primary shadow-scraper-glow overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-scraper-gradient-glow opacity-20 rounded-full blur-3xl"></div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-scraper-text-primary flex items-center space-x-3 relative">
                  <div className="w-12 h-12 bg-scraper-gradient-primary rounded-xl flex items-center justify-center shadow-scraper-glow">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span>Investment Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-scraper-bg-primary/50 rounded-xl backdrop-blur-sm border border-scraper-border">
                    <p className="text-sm text-scraper-text-secondary mb-3">Occupancy Rate</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-scraper-accent-success to-scraper-accent-primary bg-clip-text text-transparent">
                      {currentPark.occupancyRate}%
                    </p>
                  </div>
                  <div className="text-center p-6 bg-scraper-bg-primary/50 rounded-xl backdrop-blur-sm border border-scraper-border">
                    <p className="text-sm text-scraper-text-secondary mb-3">ROI Potential</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-scraper-accent-primary to-scraper-accent-secondary bg-clip-text text-transparent">
                      8.5%
                    </p>
                  </div>
                  <div className="text-center p-6 bg-scraper-bg-primary/50 rounded-xl backdrop-blur-sm border border-scraper-border">
                    <p className="text-sm text-scraper-text-secondary mb-3">Growth Rate</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-scraper-accent-secondary to-scraper-accent-warning bg-clip-text text-transparent">
                      +12.3%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
