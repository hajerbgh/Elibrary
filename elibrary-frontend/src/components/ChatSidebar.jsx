import React from 'react';
import './ChatSidebar.css';
import { Send, Paperclip, MoreHorizontal } from 'lucide-react';

const ChatSidebar = () => {
  const messages = [
    { id: 1, type: 'bot', text: 'Good Day!', time: '10:00 AM' },
    { id: 2, type: 'user', text: "I'm looking for gift editions of the Harry Potter books. Do you have them?", time: '10:01 AM' },
    { id: 3, type: 'bot', text: 'Good Day! We have 3 popular gift editions. Which one would you like?', time: '10:02 AM' },
    { id: 4, type: 'user', text: 'I think the middle one is the one I was looking for.', time: '10:03 AM' },
  ];

  return (
    <div className="chat-sidebar">
      <div className="chat-header">
        <h2>Chat</h2>
        <MoreHorizontal size={20} />
      </div>

      <div className="support-card">
        <div className="support-info">
          <h4>Privacy and Support</h4>
          <p>Get Immediate Support</p>
        </div>
        <div className="support-arrow">›</div>
      </div>

      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message-wrapper ${msg.type}`}>
            <div className={`message-bubble ${msg.type}`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <div className="input-box">
          <Paperclip size={18} className="input-icon" />
          <input type="text" placeholder="Write a message..." />
          <div className="send-btn">
            <Send size={16} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
