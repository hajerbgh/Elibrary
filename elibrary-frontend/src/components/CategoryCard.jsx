import React from 'react';
import './CategoryCard.css';
import { Wallet, Palette, Briefcase, Zap } from 'lucide-react';

const icons = {
  Wallet: <Wallet size={24} />,
  Palette: <Palette size={24} />,
  Briefcase: <Briefcase size={24} />,
  Zap: <Zap size={24} />
};

const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <div className="category-icon-wrapper">
        {icons[category.icon] || <Briefcase size={24} />}
      </div>
      <p className="category-name">{category.name}</p>
    </div>
  );
};

export default CategoryCard;
