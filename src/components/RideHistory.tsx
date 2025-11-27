import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, DollarSign, RotateCcw } from 'lucide-react';

const rideHistory = [
  {
    id: 1,
    date: '2024-01-20',
    time: '2:30 PM',
    from: 'Downtown Plaza',
    to: 'Airport Terminal',
    driver: 'Sarah Johnson',
    rating: 5,
    price: 28.50,
    status: 'completed',
    duration: '35 min'
  },
  {
    id: 2,
    date: '2024-01-18',
    time: '9:15 AM',
    from: 'Home',
    to: 'Central Station',
    driver: 'Mike Davis',
    rating: 4,
    price: 15.75,
    status: 'completed',
    duration: '18 min'
  },
  {
    id: 3,
    date: '2024-01-15',
    time: '6:45 PM',
    from: 'Office Building',
    to: 'Restaurant District',
    driver: 'Emily Chen',
    rating: 5,
    price: 12.25,
    status: 'completed',
    duration: '22 min'
  },
  {
    id: 4,
    date: '2024-01-12',
    time: '11:30 AM',
    from: 'Mall Complex',
    to: 'University Campus',
    driver: 'David Wilson',
    rating: 4,
    price: 18.90,
    status: 'cancelled',
    duration: 'N/A'
  },
];

const RideHistory = () => {
  const totalSpent = rideHistory
    .filter(ride => ride.status === 'completed')
    .reduce((sum, ride) => sum + ride.price, 0);

  const totalRides = rideHistory.filter(ride => ride.status === 'completed').length;

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Summary Card */}
      <Card className="shadow-elevated border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-center">Ride History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-2xl font-bold text-primary">{totalRides}</p>
              <p className="text-sm text-muted-foreground">Total Rides</p>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
              <p className="text-2xl font-bold text-secondary">${totalSpent.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ride List */}
      <div className="space-y-4">
        {rideHistory.map((ride) => (
          <Card key={ride.id} className="shadow-md border-0 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      variant={ride.status === 'completed' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {ride.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {ride.date} • {ride.time}
                    </span>
                  </div>
                  
                  {/* Route */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="font-medium">{ride.from}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="font-medium">{ride.to}</span>
                    </div>
                  </div>

                  {/* Driver Info */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Driver: {ride.driver}
                    </div>
                    {ride.status === 'completed' && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{ride.rating}.0</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right ml-4">
                  {ride.status === 'completed' ? (
                    <>
                      <p className="text-lg font-bold text-primary">${ride.price}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {ride.duration}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Cancelled</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {ride.status === 'completed' && (
                <div className="flex gap-2 pt-3 border-t">
                  <Button size="sm" variant="outline" className="flex-1 gap-2">
                    <RotateCcw className="h-3 w-3" />
                    Book Again
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Star className="h-3 w-3" />
                    Rate
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="gap-2">
          Load More Rides
        </Button>
      </div>
    </div>
  );
};

export default RideHistory;