import React from 'react';
import { Home, Grid, Library, Download, Heart, Settings, HelpCircle, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'discover', icon: <Home size={20} />, label: 'Discover' },
    { id: 'category', icon: <Grid size={20} />, label: 'Category' },
    { id: 'library', icon: <Library size={20} />, label: 'My Library' },
    { id: 'download', icon: <Download size={20} />, label: 'Download' },
    { id: 'favorite', icon: <Heart size={20} />, label: 'Favorite' },
  ];

  const bottomItems = [
    { id: 'setting', icon: <Settings size={20} />, label: 'Setting' },
    { id: 'help', icon: <HelpCircle size={20} />, label: 'Help' },
    { id: 'logout', icon: <LogOut size={20} />, label: 'Log out' },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>THE BOOKS</h2>
      </div>

      <div className="menu-section">
        <p className="section-title">MENU</p>
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li 
              key={item.id} 
              className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="menu-section bottom-section">
        <ul className="menu-list">
          {bottomItems.map((item) => (
            <li 
              key={item.id} 
              className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <div className="footer-card">
          <div className="footer-icon">
            <Library size={24} color="white" />
          </div>
          <p>BOOK LIBRARY</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
