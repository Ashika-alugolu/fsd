import React from 'react';

const StatusBadge = ({ status }) => {
  let badgeClass = 'badge ';
  switch (status?.toLowerCase()) {
    case 'upcoming':
    case 'registered':
      badgeClass += 'badge-upcoming';
      break;
    case 'ongoing':
    case 'approved':
      badgeClass += 'badge-ongoing';
      break;
    case 'completed':
      badgeClass += 'badge-completed';
      break;
    case 'rejected':
      badgeClass += 'badge-rejected';
      break;
    default:
      badgeClass += 'badge-upcoming';
  }

  return (
    <span className={badgeClass}>
      {status}
    </span>
  );
};

export default StatusBadge;
