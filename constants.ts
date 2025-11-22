import { RideType, User, UserRole, Driver } from "./types";

// Mock Users
export const MOCK_RIDER: User = {
  id: 'u1',
  name: 'John Doe',
  email: 'rider@speedride.com',
  role: UserRole.RIDER,
  rating: 4.8,
  walletBalance: 45.50,
  avatarUrl: 'https://picsum.photos/id/1005/100/100'
};

export const MOCK_DRIVER: Driver = {
  id: 'd1',
  name: 'Sarah Connor',
  email: 'driver@speedride.com',
  role: UserRole.DRIVER,
  rating: 4.9,
  vehicleModel: 'Toyota Camry (Black)',
  vehiclePlate: 'ABC-1234',
  isOnline: false,
  tripsCompleted: 1420,
  earningsToday: 125.00,
  avatarUrl: 'https://picsum.photos/id/1027/100/100'
};

export const MOCK_ADMIN: User = {
  id: 'a1',
  name: 'Admin User',
  email: 'admin@speedride.com',
  role: UserRole.ADMIN,
  avatarUrl: 'https://picsum.photos/id/1011/100/100'
};

export const MAP_CENTER = { lat: 40.7128, lng: -74.0060 }; // New York
