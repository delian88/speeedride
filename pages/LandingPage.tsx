import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Shield, Smartphone, ArrowRight, CheckCircle, MapPin } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

export const LandingPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (!user) return;
    if (user.role === 'ADMIN') navigate('/admin');
    else if (user.role === 'DRIVER') navigate('/driver');
    else navigate('/rider');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 flex items-center justify-between sticky top-0 z-50">
         <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl font-bold tracking-tighter">Speedride<span className="text-blue-500">.</span></span>
         </div>
         <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#ride" className="hover:text-gray-300 transition-colors">Ride</a>
            <a href="#drive" className="hover:text-gray-300 transition-colors">Drive</a>
            <a href="#business" className="hover:text-gray-300 transition-colors">Business</a>
            <a href="#about" className="hover:text-gray-300 transition-colors">About</a>
         </nav>
         <div className="flex items-center space-x-4">
            {isAuthenticated ? (
               <Button 
                 onClick={handleDashboardClick} 
                 className="bg-white text-black hover:bg-gray-200 border-none"
               >
                 Dashboard
               </Button>
            ) : (
               <>
                 <button onClick={() => navigate('/login')} className="text-sm font-medium hover:text-gray-300 transition-colors">Log in</button>
                 <Button onClick={() => navigate('/login')} className="bg-white text-black hover:bg-gray-200 py-2 h-9 border-none">Sign up</Button>
               </>
            )}
         </div>
      </header>

      {/* Hero Section */}
      <section className="bg-black text-white pt-20 pb-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8 animate-fade-in-up">
               <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                  Go anywhere with <span className="text-blue-500">Speedride</span>
               </h1>
               <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                  Request a ride, hop in, and go. Reliable rides, professional drivers, and fair prices at your fingertips.
               </p>
               
               <div className="bg-white p-2 rounded-lg max-w-md flex flex-col sm:flex-row gap-2 shadow-2xl">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Enter location" 
                      className="w-full p-3 pl-10 text-black outline-none rounded bg-transparent" 
                    />
                  </div>
                  <Button onClick={() => navigate('/login')} className="w-full sm:w-auto whitespace-nowrap px-6">See prices</Button>
               </div>
            </div>
            <div className="hidden md:block relative">
               {/* Abstract Visual */}
               <div className="w-full h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden border border-gray-800">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                  <Car className="w-48 h-48 text-white/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  
                  {/* Floating Cards */}
                  <div className="absolute top-12 right-12 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl animate-float">
                     <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                           <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                           <div className="text-sm font-bold">Ride Completed</div>
                           <div className="text-xs text-gray-300">Just now</div>
                        </div>
                     </div>
                  </div>

                  <div className="absolute bottom-12 left-12 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl animate-float-delayed">
                     <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                           <Car className="w-6 h-6 text-white" />
                        </div>
                        <div>
                           <div className="text-sm font-bold">Driver Arriving</div>
                           <div className="text-xs text-gray-300">2 mins away</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Features / Roles */}
      <section id="ride" className="py-24 px-6 bg-white">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Focused on what matters</h2>
               <p className="text-gray-500 max-w-2xl mx-auto">We build technology to help you move safely and efficiently.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
               <div className="group">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                     <Shield className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Safety First</h3>
                  <p className="text-gray-600 leading-relaxed">Every trip is tracked. Every driver is verified. We have 24/7 support to ensure your peace of mind.</p>
               </div>
               <div className="group">
                   <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                     <Smartphone className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Easy to Use</h3>
                  <p className="text-gray-600 leading-relaxed">Book a ride in 2 taps. Track your driver in real-time. Pay seamlessly with your in-app wallet.</p>
               </div>
               <div className="group">
                   <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                     <Car className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Reliable Fleet</h3>
                  <p className="text-gray-600 leading-relaxed">From standard sedans to luxury SUVs and XL vans, choose the ride that fits your style and budget.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Driver Call to Action */}
      <section id="drive" className="bg-gray-100 py-24 px-6">
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
               <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Drive when you want, <br/>make what you need</h2>
               <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Speedride. 
                  <br/><br/>
                  Enjoy instant payouts, flexible hours, and a dedicated support team.
               </p>
               <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => navigate('/login')} className="px-8 py-4 text-lg h-auto">Get Started</Button>
                  <button onClick={() => navigate('/login')} className="px-8 py-4 text-lg font-medium border border-gray-300 rounded-lg hover:bg-white transition-colors">Already have an account?</button>
               </div>
            </div>
            <div className="order-1 md:order-2 h-96 bg-white rounded-3xl overflow-hidden shadow-xl relative group">
               <img 
                 src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000" 
                 alt="Driver" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
               <div className="absolute bottom-8 left-8 text-white">
                  <div className="text-2xl font-bold">Earn up to $35/hr</div>
                  <div className="text-sm opacity-90">Terms apply</div>
               </div>
            </div>
         </div>
      </section>

      {/* App Download Section */}
      <section className="py-24 px-6 bg-black text-white overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
             <div className="mb-12 md:mb-0 md:mr-12 max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">It's easier in the apps</h2>
                <p className="text-gray-400 text-lg mb-8">Download the Speedride app to request rides, track drivers, and manage your account on the go.</p>
                <div className="flex gap-4">
                   <div className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-xl cursor-pointer flex items-center gap-3 border border-white/10">
                      <Smartphone className="w-8 h-8" />
                      <div>
                         <div className="text-xs text-gray-400">Download on the</div>
                         <div className="text-sm font-bold">App Store</div>
                      </div>
                   </div>
                   <div className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-xl cursor-pointer flex items-center gap-3 border border-white/10">
                      <Smartphone className="w-8 h-8" />
                      <div>
                         <div className="text-xs text-gray-400">GET IT ON</div>
                         <div className="text-sm font-bold">Google Play</div>
                      </div>
                   </div>
                </div>
             </div>
             <div className="relative">
                {/* Phone Mockup */}
                <div className="w-64 h-[500px] bg-gray-800 rounded-[3rem] border-[8px] border-gray-700 shadow-2xl overflow-hidden relative">
                   <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-700 rounded-b-xl"></div>
                   <div className="w-full h-full bg-white flex flex-col">
                      <div className="bg-black text-white p-4 pt-10">
                         <div className="text-lg font-bold">Speedride</div>
                         <div className="text-xs text-gray-400">Your ride is here</div>
                      </div>
                      <div className="flex-1 bg-gray-100 p-4 space-y-3">
                         <div className="h-32 bg-gray-300 rounded-xl w-full"></div>
                         <div className="h-16 bg-white rounded-xl w-full shadow-sm"></div>
                         <div className="h-16 bg-white rounded-xl w-full shadow-sm"></div>
                      </div>
                   </div>
                </div>
             </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-6 border-t border-gray-900">
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
            <div className="col-span-2 md:col-span-1">
               <h4 className="font-bold mb-6 text-xl tracking-tighter">Speedride.</h4>
               <p className="text-gray-400 mb-6">Move fast, ride safe. Reimagining transportation for the modern world.</p>
               <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                    <ArrowRight className="w-4 h-4" />
                  </div>
               </div>
            </div>
            <div>
               <h4 className="font-bold mb-6 text-gray-200">Company</h4>
               <ul className="space-y-4 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Our offerings</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Investors</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold mb-6 text-gray-200">Products</h4>
               <ul className="space-y-4 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Ride</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Drive</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Deliver</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Business</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold mb-6 text-gray-200">Global Citizenship</h4>
               <ul className="space-y-4 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Diversity and Inclusion</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <div>&copy; 2025 Speedride Inc. All rights reserved.</div>
            <div className="flex space-x-8 mt-6 md:mt-0">
               <a href="#" className="hover:text-white transition-colors">Privacy</a>
               <a href="#" className="hover:text-white transition-colors">Accessibility</a>
               <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
         </div>
      </footer>
    </div>
  );
};