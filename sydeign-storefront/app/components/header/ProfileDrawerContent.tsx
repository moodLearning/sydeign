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
      <div className="profile-drawer-wrapper">
        <div className="profile-drawer-header">
          <div className="profile-drawer-avatar">
            <img
              src="/profile-avatar.png"
              alt="User Avatar"
              className="profile-drawer-avatar-img"
              onError={(e) => {
                e.currentTarget.src = "profile-default.png";
              }}
            />
          </div>
          <h3 className="profile-drawer-name">{customerName ?? 'My Account'}</h3>
        </div>

        <nav className="profile-drawer-nav">
          <Link to="/account" onClick={closeDrawer} className="profile-drawer-nav-link">
            <User className="profile-drawer-nav-icon" />
            <span>My account</span>
          </Link>
          <Link to="/following" onClick={closeDrawer} className="profile-drawer-nav-link">
            <UserCheck className="profile-drawer-nav-icon" />
            <span>Following</span>
          </Link>
          <Link to="/orders" onClick={closeDrawer} className="profile-drawer-nav-link">
            <Package className="profile-drawer-nav-icon" />
            <span>View Orders</span>
          </Link>
          <Link to="/rewards" onClick={closeDrawer} className="profile-drawer-nav-link">
            <Trophy className="profile-drawer-nav-icon" />
            <span>My Rewards</span>
          </Link>
          <Link to="/track-orders" onClick={closeDrawer} className="profile-drawer-nav-link">
            <Compass className="profile-drawer-nav-icon" />
            <span>Track Orders</span>
          </Link>

          <button
            onClick={onLogout}
            className="profile-drawer-logout-btn"
          >
            <LogOut className="w-6 h-6" />
            <span>Log Out</span>
          </button>
        </nav>
      </div>
    );
  }

  return (
    <div className="profile-drawer-wrapper">
      <div className="profile-drawer-guest-card">
        <div className="profile-drawer-guest-icon">
          <LogIn className="w-8 h-8" />
        </div>
        <h4 className="profile-drawer-guest-title">Welcome to SÝDEIGN</h4>
        <p className="profile-drawer-guest-desc">
          Create an account or login to unlock orders, tracking, and rewards.
        </p>
        <div className="profile-drawer-guest-actions">
          <Link
            to="?auth=login"
            onClick={closeDrawer}
            className="profile-drawer-login-btn"
          >
            Login Account
          </Link>
          <Link
            to="?auth=signup"
            onClick={closeDrawer}
            className="profile-drawer-signup-btn"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}