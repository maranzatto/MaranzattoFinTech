import React from 'react';
import { Card } from '../common/Card';

export const StatCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <Card className="p-6 hover:scale-[1.02]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold">{value}</h3>
        </div>
        <div className="p-3 bg-primary/10 rounded-theme">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`
            text-sm font-medium
            ${trend > 0 ? 'text-success' : 'text-danger'}
          `}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span className="ml-2 text-sm text-gray-500">vs último mês</span>
        </div>
      )}
    </Card>
  );
}; 