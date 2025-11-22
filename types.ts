export enum UserRole {
  RIDER = 'RIDER',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN'
}

export enum RideStatus {
  PENDING = 'PENDING', // Searching for driver
  ACCEPTED = 'ACCEPTED', // Driver on way
  IN_PROGRESS = 'IN_PROGRESS', // Riding
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum RideType {
  STANDARD = 'Standard',
  PREMIUM = 'Premium',
  XL = 'XL'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  rating?: number;
  walletBalance?: number;
}

export interface Driver extends User {
  vehicleModel: string;
  vehiclePlate: string;
  isOnline: boolean;
  tripsCompleted: number;
  earningsToday: number;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Ride {
  id: string;
  riderId: string;
  driverId?: string;
  pickup: Location;
  dropoff: Location;
  status: RideStatus;
  price: number;
  distance: string; // e.g. "5.2 km"
  duration: string; // e.g. "15 min"
  type: RideType;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
