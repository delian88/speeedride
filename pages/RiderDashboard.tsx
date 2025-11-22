import React, { useState, useEffect } from 'react';
import { MapComponent } from '../components/MapComponent';
import { Button } from '../components/Button';
import { RideType, RideStatus, Location } from '../types';
import { estimateRideDetails } from '../services/geminiService';
import { MAP_CENTER, MOCK_RIDER } from '../constants';
import { MapPin, Navigation, Clock, CreditCard, Menu, X, Star, Phone } from 'lucide-react';

const RiderDashboard: React.FC = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [step, setStep] = useState<'search' | 'confirm' | 'searching' | 'trip'>('search');
  const [selectedType, setSelectedType] = useState<RideType>(RideType.STANDARD);
  const [estimates, setEstimates] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(MAP_CENTER);
  const [rideStatus, setRideStatus] = useState<RideStatus>(RideStatus.PENDING);

  // Simulate finding a driver
  useEffect(() => {
    if (step === 'searching') {
      const timer = setTimeout(() => {
        setStep('trip');
        setRideStatus(RideStatus.ACCEPTED);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) return;
    
    // Mock loading state logic would go here
    const data = await estimateRideDetails(pickup, dropoff);
    setEstimates(data);
    setStep('confirm');
  };

  return (
    <div className="h-screen w-full flex flex-col relative overflow-hidden">
      {/* Sidebar Menu */}
      {isMenuOpen && (
        <div className="absolute inset-0 z-50 flex">
          <div className="w-64 bg-white h-full shadow-xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Speedride</h2>
              <button onClick={() => setIsMenuOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="flex items-center mb-6">
              <img src={MOCK_RIDER.avatarUrl} alt="Profile" className="w-12 h-12 rounded-full mr-3" />
              <div>
                <div className="font-medium">{MOCK_RIDER.name}</div>
                <div className="text-sm text-gray-500">★ {MOCK_RIDER.rating}</div>
              </div>
            </div>
            <nav className="space-y-4 flex-1">
              <div className="flex items-center space-x-3 text-gray-700 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <Clock className="w-5 h-5" /> <span>Your Trips</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <CreditCard className="w-5 h-5" /> <span>Payment</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <Star className="w-5 h-5" /> <span>Saved Places</span>
              </div>
            </nav>
            <div className="border-t pt-4">
              <div className="text-sm text-gray-500">Wallet: ${MOCK_RIDER.walletBalance?.toFixed(2)}</div>
            </div>
          </div>
          <div className="flex-1 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="relative flex-1 bg-gray-200">
        <div className="absolute top-4 left-4 z-20">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        <MapComponent 
          center={currentLocation} 
          markers={[
             { lat: currentLocation.lat, lng: currentLocation.lng, type: 'driver' }, // Mock current loc
             ...(step === 'trip' ? [{lat: currentLocation.lat + 0.01, lng: currentLocation.lng + 0.01, type: 'dropoff' as const}] : [])
          ]}
        />

        {/* Bottom Sheet */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-30 max-h-[80vh] overflow-y-auto transition-all duration-300 ease-in-out">
          
          {step === 'search' && (
            <div className="p-6 pb-10">
              <h2 className="text-2xl font-bold mb-6">Where to?</h2>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-3.5 w-2 h-2 bg-black rounded-full"></div>
                  <input 
                    type="text" 
                    placeholder="Pickup location" 
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full bg-gray-100 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-3.5 w-2 h-2 bg-gray-400 rounded-none"></div>
                  <input 
                    type="text" 
                    placeholder="Dropoff location" 
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="w-full bg-gray-100 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <Button type="submit" fullWidth className="mt-4">Search Ride</Button>
              </form>
              
              {/* Recent locations */}
              <div className="mt-6">
                <div className="flex items-center space-x-3 py-3 border-b">
                  <div className="p-2 bg-gray-100 rounded-full"><Clock className="w-4 h-4" /></div>
                  <div>
                    <div className="font-medium">Central Station</div>
                    <div className="text-xs text-gray-500">123 Main St</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'confirm' && estimates && (
            <div className="p-6 pb-10">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-bold">Choose a ride</h3>
                 <button onClick={() => setStep('search')} className="text-sm text-gray-500">Back</button>
               </div>
               <div className="space-y-3 mb-6">
                 <div 
                   onClick={() => setSelectedType(RideType.STANDARD)}
                   className={`flex justify-between items-center p-4 rounded-xl border-2 cursor-pointer ${selectedType === RideType.STANDARD ? 'border-black bg-gray-50' : 'border-transparent hover:bg-gray-50'}`}
                 >
                   <div className="flex items-center">
                     <img src="https://img.icons8.com/ios-filled/50/000000/car.png" className="w-12 h-12 mr-4 object-contain" alt="Standard"/>
                     <div>
                       <div className="font-bold flex items-center">Standard <span className="ml-2 text-xs text-gray-500 font-normal">3 min</span></div>
                       <div className="text-sm text-gray-500">{estimates.duration} dropoff</div>
                     </div>
                   </div>
                   <div className="font-bold">${estimates.priceStandard}</div>
                 </div>

                 <div 
                   onClick={() => setSelectedType(RideType.PREMIUM)}
                   className={`flex justify-between items-center p-4 rounded-xl border-2 cursor-pointer ${selectedType === RideType.PREMIUM ? 'border-black bg-gray-50' : 'border-transparent hover:bg-gray-50'}`}
                 >
                   <div className="flex items-center">
                     <img src="https://img.icons8.com/ios-filled/50/000000/luxury.png" className="w-12 h-12 mr-4 object-contain" alt="Premium"/>
                     <div>
                       <div className="font-bold flex items-center">Premium <span className="ml-2 text-xs text-gray-500 font-normal">5 min</span></div>
                       <div className="text-sm text-gray-500">High-end cars</div>
                     </div>
                   </div>
                   <div className="font-bold">${estimates.pricePremium}</div>
                 </div>
               </div>

               <div className="flex items-center justify-between mb-4 px-1">
                 <div className="text-sm text-gray-600">Payment</div>
                 <div className="font-medium flex items-center">**** 4242 <CreditCard className="w-4 h-4 ml-2"/></div>
               </div>
               
               <Button onClick={() => setStep('searching')} fullWidth>Confirm {selectedType}</Button>
            </div>
          )}

          {step === 'searching' && (
             <div className="p-10 flex flex-col items-center justify-center text-center pb-16">
               <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-6"></div>
               <h3 className="text-xl font-bold mb-2">Finding your ride...</h3>
               <p className="text-gray-500">Connecting you with nearby drivers</p>
               <Button variant="outline" className="mt-8" onClick={() => setStep('search')}>Cancel</Button>
             </div>
          )}

          {step === 'trip' && (
            <div className="p-6 pb-10">
               <div className="flex justify-between items-start mb-6">
                 <div>
                   <div className="text-sm text-gray-500 mb-1">Driver is arriving in 2 min</div>
                   <h2 className="text-xl font-bold">Meet at {pickup}</h2>
                 </div>
                 <div className="bg-gray-100 px-3 py-1 rounded text-sm font-bold">ABC-1234</div>
               </div>

               <div className="flex items-center border-t border-b py-4 mb-4">
                 <img src="https://picsum.photos/id/1027/100/100" className="w-12 h-12 rounded-full mr-4" alt="Driver" />
                 <div className="flex-1">
                   <div className="font-bold">Sarah</div>
                   <div className="text-sm text-gray-500">Toyota Camry • 4.9 ★</div>
                 </div>
                 <div className="flex space-x-2">
                   <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"><Phone className="w-5 h-5" /></button>
                   <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"><Navigation className="w-5 h-5" /></button>
                 </div>
               </div>

               <Button variant="danger" onClick={() => setStep('search')} fullWidth>Cancel Ride</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
