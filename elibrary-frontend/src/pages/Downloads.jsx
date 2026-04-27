import React, { useState } from 'react';
import { Download, Trash2, FolderOpen, FileText, Calendar, HardDrive } from 'lucide-react';
import './Downloads.css';

const Downloads = () => {
  const [downloads, setDownloads] = useState([
    {
      id: 1,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      format: "PDF",
      size: "2.4 MB",
      date: "2024-04-20",
      progress: 100,
      cover: "/src/assets/psychology_money.png"
    },
    {
      id: 2,
      title: "Company of One",
      author: "Paul Jarvis",
      format: "EPUB",
      size: "1.8 MB",
      date: "2024-04-18",
      progress: 100,
      cover: "/src/assets/company_of_one.png"
    },
    {
      id: 3,
      title: "How Innovation Works",
      author: "Matt Ridley",
      format: "PDF",
      size: "3.1 MB",
      date: "2024-04-15",
      progress: 100,
      cover: "/src/assets/innovation_works.png"
    }
  ]);

  const [filter, setFilter] = useState('all');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this download?')) {
      setDownloads(downloads.filter(d => d.id !== id));
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all downloads?')) {
      setDownloads([]);
    }
  };

  const getTotalSize = () => {
    const total = downloads.reduce((sum, d) => {
      const size = parseFloat(d.size);
      return sum + size;
    }, 0);
    return total.toFixed(1);
  };

  const filteredDownloads = filter === 'all' 
    ? downloads 
    : downloads.filter(d => d.format.toLowerCase() === filter);

  return (
    <div className="downloads-page">
      <header className="downloads-header">
        <div className="header-content">
          <div className="title-section">
            <div className="icon-wrapper">
              <Download size={32} />
            </div>
            <div>
              <h1>My Downloads</h1>
              <p>{downloads.length} files • {getTotalSize()} MB total</p>
            </div>
          </div>
          
          {downloads.length > 0 && (
            <button className="clear-all-btn" onClick={handleClearAll}>
              <Trash2 size={18} />
              Clear All
            </button>
          )}
        </div>

        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Files
          </button>
          <button 
            className={`filter-tab ${filter === 'pdf' ? 'active' : ''}`}
            onClick={() => setFilter('pdf')}
          >
            PDF
          </button>
          <button 
            className={`filter-tab ${filter === 'epub' ? 'active' : ''}`}
            onClick={() => setFilter('epub')}
          >
            EPUB
          </button>
        </div>
      </header>

      <div className="downloads-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FileText size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{downloads.length}</span>
            <span className="stat-label">Total Downloads</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <HardDrive size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{getTotalSize()} MB</span>
            <span className="stat-label">Storage Used</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">This Month</span>
            <span className="stat-label">{downloads.length} files</span>
          </div>
        </div>
      </div>

      {filteredDownloads.length > 0 ? (
        <div className="downloads-list">
          {filteredDownloads.map(download => (
            <div key={download.id} className="download-card">
              <div className="download-cover">
                <img src={download.cover} alt={download.title} />
              </div>
              
              <div className="download-info">
                <h3>{download.title}</h3>
                <p className="author">{download.author}</p>
                <div className="download-meta">
                  <span className="format-badge">{download.format}</span>
                  <span className="size">{download.size}</span>
                  <span className="date">{new Date(download.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="download-actions">
                <button className="action-btn open-btn">
                  <FolderOpen size={18} />
                  Open
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(download.id)}
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-downloads">
          <div className="empty-icon">
            <Download size={64} />
          </div>
          <h3>No downloads yet</h3>
          <p>Books you download will appear here</p>
        </div>
      )}
    </div>
  );
};

export default Downloads;
