import React from 'react';
import { MOCK_ADMIN } from '../constants';
import { Users, Map as MapIcon, DollarSign, Activity } from 'lucide-react';
import { MapComponent } from '../components/MapComponent';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 flex flex-col">
         <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-tighter">Speedride<span className="text-blue-500">.</span></h1>
            <p className="text-xs text-slate-400">Admin Panel</p>
         </div>
         <nav className="space-y-2 flex-1">
            <a href="#" className="flex items-center space-x-3 bg-slate-800 text-white px-4 py-3 rounded-lg">
               <Activity className="w-5 h-5" /> <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-slate-400 hover:text-white px-4 py-3 rounded-lg">
               <Users className="w-5 h-5" /> <span>Users</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-slate-400 hover:text-white px-4 py-3 rounded-lg">
               <MapIcon className="w-5 h-5" /> <span>Live Map</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-slate-400 hover:text-white px-4 py-3 rounded-lg">
               <DollarSign className="w-5 h-5" /> <span>Financials</span>
            </a>
         </nav>
         <div className="pt-6 border-t border-slate-800">
            <div className="flex items-center">
               <img src={MOCK_ADMIN.avatarUrl} className="w-8 h-8 rounded-full mr-3" alt="Admin"/>
               <div className="text-sm">
                  <div className="font-medium">Admin</div>
                  <div className="text-xs text-slate-500">Super User</div>
               </div>
            </div>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
         <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
            <div className="text-sm text-slate-500">Last updated: Just now</div>
         </div>

         {/* Stats Grid */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
               <div className="text-slate-500 text-sm mb-1">Total Rides Today</div>
               <div className="text-3xl font-bold text-slate-800">1,240</div>
               <div className="text-green-500 text-xs mt-2">↑ 12% from yesterday</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
               <div className="text-slate-500 text-sm mb-1">Active Drivers</div>
               <div className="text-3xl font-bold text-slate-800">342</div>
               <div className="text-slate-400 text-xs mt-2">Total: 850 registered</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
               <div className="text-slate-500 text-sm mb-1">Revenue</div>
               <div className="text-3xl font-bold text-slate-800">$14,205</div>
               <div className="text-green-500 text-xs mt-2">↑ 8% this week</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
               <div className="text-slate-500 text-sm mb-1">Pending Approvals</div>
               <div className="text-3xl font-bold text-slate-800">12</div>
               <div className="text-orange-500 text-xs mt-2">Action required</div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Rides Table */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
               <div className="p-6 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800">Recent Rides</h3>
               </div>
               <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                     <tr>
                        <th className="px-6 py-4 font-medium">Ride ID</th>
                        <th className="px-6 py-4 font-medium">Rider</th>
                        <th className="px-6 py-4 font-medium">Driver</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Amount</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {[1, 2, 3, 4, 5].map((i) => (
                        <tr key={i} className="hover:bg-slate-50">
                           <td className="px-6 py-4 text-slate-500">#RID-202{i}</td>
                           <td className="px-6 py-4">John Doe</td>
                           <td className="px-6 py-4">Sarah C.</td>
                           <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Completed</span></td>
                           <td className="px-6 py-4 font-medium">$24.50</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Live Map View */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
               <div className="p-6 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800">Live Fleet</h3>
               </div>
               <div className="flex-1 min-h-[300px] relative bg-gray-200">
                  <MapComponent 
                    center={{lat: 40.7128, lng: -74.0060}}
                    markers={[
                      {lat: 40.7128, lng: -74.0060, type: 'driver'},
                      {lat: 40.7228, lng: -74.0160, type: 'driver'},
                      {lat: 40.7028, lng: -73.9960, type: 'driver'}
                    ]} 
                  />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
