import React from 'react';
import '../style.css';

const getStatusColor = (value, thresholds, mode) => {
    if (mode === 'depth') {
      if (value >= thresholds.safe) return 'green';
      if (value >= thresholds.low) return 'yellow';
      return 'gray';
    }
    if (value > thresholds.danger) return 'red';
    if (value > thresholds.safe) return 'green';
    if (value > thresholds.low) return 'yellow';
    return 'gray';
  };
  
  const getStatusLabel = (value, thresholds, mode) => {
    if (mode === 'depth') {
      if (value >= thresholds.safe) return 'Good';
      if (value >= thresholds.low) return 'Low';
      return 'Too Low';
    }
    if (value > thresholds.danger) return 'Danger';
    if (value > thresholds.safe) return 'Good';
    if (value > thresholds.low) return 'Low';
    return 'Too Low';
  };
  
  export default function WaterChart({
    value,
    mode = 'flow', // "flow" or "depth"
    label,
    unit,
    max,
    thresholds,
  }) {
    // Default settings for each mode
    const defaults = {
      flow: {
        label: 'Flow Rate',
        unit: 'cf/s',
        max: 300,
        thresholds: { low: 0, safe: 100, danger: 250 },
      },
      depth: {
        label: 'Water Depth',
        unit: 'ft',
        max: 6,
        thresholds: { low: 1, safe: 2 },
      },
    };
  
    const config = defaults[mode];
    const chartLabel = label || config.label;
    const chartUnit = unit || config.unit;
    const chartMax = max || config.max;
    const chartThresholds = thresholds || config.thresholds;
  
    const percent = Math.min((value / chartMax) * 100, 100);
    const color = getStatusColor(value, chartThresholds, mode);
    const status = getStatusLabel(value, chartThresholds, mode);
  
    return (
      <div className="water-chart">
        <div className="water-chart__label">{chartLabel}</div>
  
        <div className="water-chart__bar-wrapper">
          <div className="water-chart__bar">
            <div
              className={`water-chart__fill water-chart-fill--${color}`}
              style={{ '--fill-percent': `${percent}%` }}
            />
          </div>
          <div className="water-chart__value">{value} {chartUnit}</div>
        </div>
  
        <div className={`water-chart__status water-chart__status--${color}`}>
          {status}
        </div>
      </div>
    );
  }
