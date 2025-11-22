import React, { useState } from 'react';
import { MapComponent } from '../components/MapComponent';
import { Button } from '../components/Button';
import { MOCK_DRIVER, MAP_CENTER } from '../constants';
import { Menu, Power, DollarSign, MapPin, User } from 'lucide-react';

const DriverDashboard: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);

  const toggleOnline = () => {
    const newState = !isOnline;
    setIsOnline(newState);
    if (newState) {
      // Simulate request coming in
      setTimeout(() => setHasRequest(true), 2000);
    } else {
      setHasRequest(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col relative">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur z-20 shadow-sm px-4 py-3 flex justify-between items-center">
         <div className="flex items-center bg-gray-100 rounded-full px-4 py-1">
           <DollarSign className="w-4 h-4 text-green-600 mr-1" />
           <span className="font-bold">${MOCK_DRIVER.earningsToday.toFixed(2)}</span>
         </div>
         <div className={`px-3 py-1 rounded-full text-xs font-bold ${isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {isOnline ? 'ONLINE' : 'OFFLINE'}
         </div>
         <div className="w-8 h-8 rounded-full overflow-hidden">
           <img src={MOCK_DRIVER.avatarUrl} alt="Profile" />
         </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative bg-gray-200">
         <MapComponent center={MAP_CENTER} markers={hasRequest ? [{lat: 40.72, lng: -74.01, type: 'pickup'}] : []} />
      </div>

      {/* Go Online Button / Request Modal */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-10 bg-transparent z-30 flex justify-center pointer-events-none">
         {!hasRequest && (
            <button 
            onClick={toggleOnline}
            className={`pointer-events-auto w-20 h-20 rounded-full shadow-xl flex items-center justify-center border-4 transition-colors ${isOnline ? 'bg-red-500 border-red-200 text-white' : 'bg-blue-600 border-blue-200 text-white'}`}
          >
            <Power className="w-8 h-8" />
          </button>
         )}
      </div>

      {/* Request Modal */}
      {hasRequest && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-40 p-6 animate-slide-up">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-green-600">$15.50</h2>
            <p className="text-gray-500 text-sm">Standard Ride • 3.5 km</p>
          </div>
          
          <div className="space-y-6 mb-6 relative">
             <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200 -z-10"></div>
             <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mr-3 shrink-0 mt-1">P</div>
                <div>
                  <div className="text-xs text-gray-400 uppercase">Pickup</div>
                  <div className="font-medium">123 Broadway St</div>
                  <div className="text-xs text-gray-500">2 mins away</div>
                </div>
             </div>
             <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs mr-3 shrink-0 mt-1">D</div>
                <div>
                  <div className="text-xs text-gray-400 uppercase">Dropoff</div>
                  <div className="font-medium">Central Park West</div>
                  <div className="text-xs text-gray-500">15 mins trip</div>
                </div>
             </div>
          </div>

          <div className="flex items-center justify-between">
             <div className="flex items-center">
                <div className="bg-yellow-100 p-1 rounded text-yellow-700 font-bold text-sm mr-2">4.8</div>
                <span className="text-gray-600">Rider Name</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
             <Button variant="secondary" onClick={() => setHasRequest(false)}>Decline</Button>
             <Button onClick={() => { alert('Ride Accepted!'); setHasRequest(false); }}>Accept Ride</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
