import React from 'react';

const DashboardCard = ({ title, value, icon: Icon, color = 'blue' }) => {
  return (
    <div className="card flex items-center justify-between">
      <div>
        <p className="text-light mb-2">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      {Icon && (
        <div style={{ padding: '1rem', borderRadius: '50%', backgroundColor: `var(--bg-color)`, color: `var(--${color}-500, var(--secondary-color))` }}>
          <Icon size={32} />
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
