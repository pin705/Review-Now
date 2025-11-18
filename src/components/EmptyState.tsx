import React from 'react';
import { Icon } from 'zmp-ui';

interface EmptyStateProps {
  icon?: string; // zmp-ui icon name, e.g., 'zi-search'
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'zi-search',
  title,
  description,
  action
}) => {
  return (
    <div className="empty-state fade-in">
      <div className="empty-state-icon">
        <Icon icon={icon} size={48} className="text-gray-400" />
      </div>
      <div className="empty-state-title">{title}</div>
      {description && (
        <div className="empty-state-description mt-2">{description}</div>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary mt-6"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
