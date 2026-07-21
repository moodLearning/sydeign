import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, UserCheck, Package, Trophy, Compass, LogOut, LogIn 
} from 'lucide-react';

interface ProfileDrawerContentProps {
  isLoggedIn: boolean;
  customerName?: string | null;
  onLogout: () => void;
  closeDrawer: () => void;
}

export function ProfileDrawerContent({ isLoggedIn, customerName, onLogout, closeDrawer }: ProfileDrawerContentProps) {
  if (isLoggedIn) {
    return (
      <div className="flex flex-col h-full bg-[#F2F2F2] -m-6 p-6 justify-center">
        <div className="p-4 pt-6 flex flex-col items-center border-b border-gray-200">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#4B6B40] shadow-md mb-4">
            <img 
              src="/profile-avatar.png" 
              alt="User Avatar" 
              className="w-full h-full object-cover" 
              onError={(e) => { 
                e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256"; 
              }} 
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 leading-tight">{customerName ?? 'My Account'}</h3>
        </div>

        <nav className="flex-1 py-8 flex flex-col gap-4 text-xl text-gray-800">
          <Link to="/account" onClick={closeDrawer} className="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-white transition">
            <User className="w-6 h-6 text-gray-600" />
            <span>My account</span>
          </Link>
          <Link to="/following" onClick={closeDrawer} className="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-white transition">
            <UserCheck className="w-6 h-6 text-gray-600" />
            <span>Following</span>
          </Link>
          <Link to="/orders" onClick={closeDrawer} className="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-white transition">
            <Package className="w-6 h-6 text-gray-600" />
            <span>View Orders</span>
          </Link>
          <Link to="/rewards" onClick={closeDrawer} className="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-white transition">
            <Trophy className="w-6 h-6 text-gray-600" />
            <span>My Rewards</span>
          </Link>
          <Link to="/track-orders" onClick={closeDrawer} className="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-white transition">
            <Compass className="w-6 h-6 text-gray-600" />
            <span>Track Orders</span>
          </Link>
          
          <button 
            onClick={onLogout} 
            className="flex items-center gap-5 px-4 py-3 mt-auto rounded-lg text-red-600 hover:bg-red-50 transition font-medium border border-dashed border-red-200"
          >
            <LogOut className="w-6 h-6" />
            <span>Log Out</span>
          </button>
        </nav>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F2F2F2] -m-6 p-6 justify-center">
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-[#D4D9C1] shadow-sm">
        <div className="p-4 bg-[#F2F4E1] rounded-full text-[#4B6B40] mb-4">
          <LogIn className="w-8 h-8" />
        </div>
        <h4 className="text-2xl font-cinzel font-bold text-[#4B6B40] mb-2">Welcome to SÝDEIGN</h4>
        <p className="text-sm text-[#7D8B62] mb-6 max-w-[240px] text-center">
          Create an account or login to unlock orders, tracking, and rewards.
        </p>
        <div className="flex flex-col gap-3 w-full">
          <Link 
            to="?auth=login" 
            onClick={closeDrawer}
            className="w-full py-3 bg-[#D36B45] hover:bg-[#b25130] text-white font-bold rounded-xl transition shadow-sm text-center text-sm"
          >
            Login Account
          </Link>
          <Link 
            to="?auth=signup" 
            onClick={closeDrawer}
            className="w-full py-3 border border-[#BAC3A1] text-[#4B6B40] font-bold rounded-xl bg-[#FFFCEB] hover:bg-[#F2F4E1] transition text-center text-sm"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}