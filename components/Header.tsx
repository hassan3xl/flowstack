import React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

interface StatCardData {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onRefresh?: () => void;
  showRefresh?: boolean;
  stats?: StatCardData[];
  actions?: React.ReactNode;
}

const StatCard = ({ title, value, icon, trend }: StatCardData) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md hover:border-ring transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground">{value}</h3>

          <p className="text-sm font-medium text-primary mb-1">{title}</p>
          {trend && (
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${
                trend.isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              {trend.value}
            </p>
          )}
        </div>
        <div className="bg-muted p-3 rounded-lg text-foreground">{icon}</div>
      </div>
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onRefresh,
  showRefresh = true,
  stats,
  actions,
}) => {
  return (
    <div className="mb-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Left side - title/subtitle */}
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="text-md sm:text-lg text-muted-foreground mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right side - actions */}
        <div className="flex items-center gap-2">
          {actions && <div className="flex items-center gap-2">{actions}</div>}
          {showRefresh && onRefresh && (
            <Button
              variant="outline"
              size="icon"
              onClick={onRefresh}
              title="Refresh"
              className="hover:bg-accent hover:text-foreground transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Stats Section */}
      {stats && stats.length > 0 && (
        <div
          className={`grid grid-cols-2 md:grid-cols-2  ${
            stats.length > 2
              ? "lg:grid-cols-2 xl:grid-cols-4"
              : "lg:grid-cols-" + stats.length
          } gap-6`}
        >
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
