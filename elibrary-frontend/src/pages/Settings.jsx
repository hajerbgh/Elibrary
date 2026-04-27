import React, { useState } from 'react';
import { User, Bell, Lock, Globe, Palette, Database, Shield, Mail, Phone, MapPin } from 'lucide-react';
import './Settings.css';

const Settings = ({ user }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      recommendations: true,
      updates: false
    },
    privacy: {
      showProfile: true,
      showLibrary: false,
      showActivity: true
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      language: 'en'
    }
  });

  const [profile, setProfile] = useState({
    name: user?.name || 'User',
    email: user?.email || 'user@example.com',
    phone: '+216 XX XXX XXX',
    location: 'Tunis, Tunisia',
    bio: 'Book lover and avid reader'
  });

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handlePrivacyChange = (key) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const handleProfileChange = (key, value) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const sections = [
    { id: 'profile', icon: <User size={20} />, label: 'Profile' },
    { id: 'notifications', icon: <Bell size={20} />, label: 'Notifications' },
    { id: 'privacy', icon: <Shield size={20} />, label: 'Privacy & Security' },
    { id: 'appearance', icon: <Palette size={20} />, label: 'Appearance' },
    { id: 'data', icon: <Database size={20} />, label: 'Data Management' }
  ];

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account and preferences</p>
      </header>

      <div className="settings-content">
        <aside className="settings-sidebar">
          {sections.map(section => (
            <button
              key={section.id}
              className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="nav-icon">{section.icon}</span>
              <span className="nav-label">{section.label}</span>
            </button>
          ))}
        </aside>

        <main className="settings-main">
          {activeSection === 'profile' && (
            <div className="settings-section">
              <h2>Profile Information</h2>
              <p className="section-desc">Update your personal information and profile details</p>

              <div className="profile-photo-section">
                <img 
                  src={user?.avatar || "https://i.pravatar.cc/150"} 
                  alt="Profile" 
                  className="profile-photo"
                />
                <div>
                  <button className="change-photo-btn">Change Photo</button>
                  <p className="photo-hint">JPG, PNG or GIF. Max size 2MB</p>
                </div>
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <User size={20} />
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={20} />
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-with-icon">
                  <Phone size={20} />
                  <input 
                    type="tel" 
                    value={profile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location</label>
                <div className="input-with-icon">
                  <MapPin size={20} />
                  <input 
                    type="text" 
                    value={profile.location}
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea 
                  rows="4"
                  value={profile.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <button className="save-btn">Save Changes</button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              <p className="section-desc">Choose what notifications you want to receive</p>

              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Email Notifications</h3>
                    <p>Receive updates and recommendations via email</p>
                  </div>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={settings.notifications.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Push Notifications</h3>
                    <p>Get instant updates on your device</p>
                  </div>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={settings.notifications.push}
                      onChange={() => handleNotificationChange('push')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Book Recommendations</h3>
                    <p>Receive personalized book suggestions</p>
                  </div>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={settings.notifications.recommendations}
                      onChange={() => handleNotificationChange('recommendations')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Platform Updates</h3>
                    <p>News about new features and improvements</p>
                  </div>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={settings.notifications.updates}
                      onChange={() => handleNotificationChange('updates')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="settings-section">
              <h2>Privacy & Security</h2>
              <p className="section-desc">Control your privacy settings and account security</p>

              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Public Profile</h3>
                    <p>Allow others to view your profile</p>
                  </div>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={settings.privacy.showProfile}
                      onChange={() => handlePrivacyChange('showProfile')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Show Library</h3>
                    <p>Display your book collection publicly</p>
                  </div>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={settings.privacy.showLibrary}
                      onChange={() => handlePrivacyChange('showLibrary')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Activity Status</h3>
                    <p>Show when you're active on the platform</p>
                  </div>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={settings.privacy.showActivity}
                      onChange={() => handlePrivacyChange('showActivity')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="security-section">
                <h3>Password & Security</h3>
                <button className="action-btn">Change Password</button>
                <button className="action-btn">Enable Two-Factor Authentication</button>
                <button className="action-btn danger">Delete Account</button>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="settings-section">
              <h2>Appearance</h2>
              <p className="section-desc">Customize how the app looks and feels</p>

              <div className="form-group">
                <label>Theme</label>
                <select 
                  value={settings.appearance.theme}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    appearance: { ...prev.appearance, theme: e.target.value }
                  }))}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div className="form-group">
                <label>Font Size</label>
                <select 
                  value={settings.appearance.fontSize}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    appearance: { ...prev.appearance, fontSize: e.target.value }
                  }))}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div className="form-group">
                <label>Language</label>
                <select 
                  value={settings.appearance.language}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    appearance: { ...prev.appearance, language: e.target.value }
                  }))}
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            </div>
          )}

          {activeSection === 'data' && (
            <div className="settings-section">
              <h2>Data Management</h2>
              <p className="section-desc">Manage your data and download your information</p>

              <div className="data-card">
                <Database size={32} />
                <h3>Download Your Data</h3>
                <p>Get a copy of all your library data, favorites, and activity</p>
                <button className="action-btn">Request Data Export</button>
              </div>

              <div className="data-card">
                <Shield size={32} />
                <h3>Clear Cache</h3>
                <p>Remove temporary files to free up space</p>
                <button className="action-btn">Clear Cache</button>
              </div>

              <div className="data-card danger-card">
                <Lock size={32} />
                <h3>Delete All Data</h3>
                <p>Permanently remove all your data from our servers</p>
                <button className="action-btn danger">Delete All Data</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;
