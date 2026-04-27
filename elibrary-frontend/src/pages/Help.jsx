import React, { useState } from 'react';
import { HelpCircle, Search, MessageCircle, Mail, Phone, Book, Settings, Download, Shield, ChevronDown } from 'lucide-react';
import './Help.css';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I add books to my library?",
      answer: "To add books to your library, browse through our collection, click on any book you like, and press the 'Add to Library' button in the book modal. Your books will be saved in the 'My Library' section.",
      category: "Library"
    },
    {
      id: 2,
      question: "Can I download books for offline reading?",
      answer: "Yes! Click on any book in your library and select the 'Download' option. Downloaded books will appear in the 'Download' section and can be accessed anytime, even without internet connection.",
      category: "Downloads"
    },
    {
      id: 3,
      question: "How do I search for specific books?",
      answer: "Use the search bar at the top of the Discover page. You can search by book title, author name, or keywords. You can also filter by category to narrow down your results.",
      category: "Search"
    },
    {
      id: 4,
      question: "What is the AI Chat Assistant?",
      answer: "The AI Chat Assistant helps you discover new books based on your preferences. It can recommend books, answer questions about literature, and help you find exactly what you're looking for.",
      category: "Features"
    },
    {
      id: 5,
      question: "How do I manage my notifications?",
      answer: "Go to Settings > Notifications to customize your notification preferences. You can enable or disable email notifications, push notifications, and book recommendations.",
      category: "Settings"
    },
    {
      id: 6,
      question: "Is my data secure?",
      answer: "Yes, we take your privacy seriously. All your data is encrypted and stored securely. You can manage your privacy settings in the Settings > Privacy & Security section.",
      category: "Security"
    },
    {
      id: 7,
      question: "How do I change my password?",
      answer: "Navigate to Settings > Privacy & Security, then click on 'Change Password'. Follow the instructions to update your password securely.",
      category: "Account"
    },
    {
      id: 8,
      question: "Can I share books with friends?",
      answer: "Currently, book sharing is not available. However, you can recommend books by sharing their titles and authors with your friends outside the platform.",
      category: "Sharing"
    }
  ];

  const helpTopics = [
    {
      icon: <Book size={32} />,
      title: "Getting Started",
      description: "Learn the basics of using our platform",
      color: "#6366f1"
    },
    {
      icon: <Download size={32} />,
      title: "Downloads & Offline",
      description: "How to download and read offline",
      color: "#8b5cf6"
    },
    {
      icon: <Settings size={32} />,
      title: "Account Settings",
      description: "Manage your account preferences",
      color: "#ec4899"
    },
    {
      icon: <Shield size={32} />,
      title: "Privacy & Security",
      description: "Keep your account safe and secure",
      color: "#10b981"
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="help-page">
      <header className="help-header">
        <div className="help-hero">
          <div className="hero-icon">
            <HelpCircle size={48} />
          </div>
          <h1>How can we help you?</h1>
          <p>Search our knowledge base or browse by category</p>
          
          <div className="help-search">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search for help..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <section className="help-topics">
        <h2>Browse by Topic</h2>
        <div className="topics-grid">
          {helpTopics.map((topic, index) => (
            <div key={index} className="topic-card" style={{ borderColor: topic.color }}>
              <div className="topic-icon" style={{ background: topic.color }}>
                {topic.icon}
              </div>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(faq => (
              <div 
                key={faq.id} 
                className={`faq-item ${openFAQ === faq.id ? 'open' : ''}`}
              >
                <button 
                  className="faq-question"
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={20} className="chevron" />
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </section>

      <section className="contact-section">
        <h2>Still need help?</h2>
        <p className="contact-desc">Our support team is here to assist you</p>
        
        <div className="contact-options">
          <div className="contact-card">
            <div className="contact-icon">
              <MessageCircle size={32} />
            </div>
            <h3>Live Chat</h3>
            <p>Chat with our support team in real-time</p>
            <button className="contact-btn">Start Chat</button>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <Mail size={32} />
            </div>
            <h3>Email Support</h3>
            <p>Get help via email within 24 hours</p>
            <button className="contact-btn">Send Email</button>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <Phone size={32} />
            </div>
            <h3>Phone Support</h3>
            <p>Call us Monday to Friday, 9AM - 6PM</p>
            <button className="contact-btn">Call Now</button>
          </div>
        </div>
      </section>

      <section className="feedback-section">
        <div className="feedback-card">
          <h3>Was this helpful?</h3>
          <p>Help us improve our support center</p>
          <div className="feedback-buttons">
            <button className="feedback-btn">👍 Yes, helpful</button>
            <button className="feedback-btn">👎 Not helpful</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
