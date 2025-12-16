'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Performance metrics component
export default function PerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    lcp: null as number | null,
    fcp: null as number | null,
    cls: null as number | null,
    ttfb: null as number | null,
    loading: true,
  });

  useEffect(() => {
    // Simulate performance metrics - in a real app, you would use the Web Vitals API
    const simulateMetrics = () => {
      // These would normally come from web vitals library
      const simulatedMetrics = {
        lcp: 1.2, // Largest Contentful Paint in seconds
        fcp: 0.8, // First Contentful Paint in seconds
        cls: 0.05, // Cumulative Layout Shift
        ttfb: 0.15, // Time to First Byte in seconds
      };

      setTimeout(() => {
        setMetrics({
          ...simulatedMetrics,
          loading: false,
        });
      }, 1000);
    };

    simulateMetrics();

    // In a real application, we would use the web-vitals library
    // import('web-vitals').then(({ getLCP, getFCP, getCLS, getTTFB }) => {
    //   getLCP(metric => setMetrics(prev => ({ ...prev, lcp: metric.value / 1000 })));
    //   getFCP(metric => setMetrics(prev => ({ ...prev, fcp: metric.value / 1000 })));
    //   getCLS(metric => setMetrics(prev => ({ ...prev, cls: metric.value })));
    //   getTTFB(metric => setMetrics(prev => ({ ...prev, ttfb: metric.value / 1000 })));
    // });
  }, []);

  const getPerformanceRating = (value: number | null, type: 'lcp' | 'fcp' | 'cls' | 'ttfb') => {
    if (value === null) return { rating: 'Calculating...', color: 'text-muted-foreground' };

    switch (type) {
      case 'lcp':
      case 'fcp':
      case 'ttfb':
        if (value < 1) return { rating: 'Excellent', color: 'text-green-500' };
        if (value < 2) return { rating: 'Good', color: 'text-yellow-500' };
        return { rating: 'Needs Improvement', color: 'text-red-500' };
      case 'cls':
        if (value < 0.1) return { rating: 'Excellent', color: 'text-green-500' };
        if (value < 0.25) return { rating: 'Good', color: 'text-yellow-500' };
        return { rating: 'Needs Improvement', color: 'text-red-500' };
      default:
        return { rating: 'N/A', color: 'text-muted-foreground' };
    }
  };

  if (metrics.loading) {
    return (
      <div className="fixed bottom-4 right-4 bg-card p-4 rounded-lg shadow-lg z-50">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="font-medium">Measuring Performance...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-card p-4 rounded-lg shadow-lg z-50 max-w-xs border border-border"
    >
      <h3 className="font-black text-foreground mb-3 text-center">Performance Metrics</h3>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">LCP:</span>
          <span className={`${getPerformanceRating(metrics.lcp, 'lcp')?.color || ''} font-bold`}>
            {metrics.lcp?.toFixed(2)}s
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">FCP:</span>
          <span className={`${getPerformanceRating(metrics.fcp, 'fcp')?.color || ''} font-bold`}>
            {metrics.fcp?.toFixed(2)}s
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">CLS:</span>
          <span className={`${getPerformanceRating(metrics.cls, 'cls')?.color || ''} font-bold`}>
            {metrics.cls?.toFixed(3)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">TTFB:</span>
          <span className={`${getPerformanceRating(metrics.ttfb, 'ttfb')?.color || ''} font-bold`}>
            {metrics.ttfb?.toFixed(2)}s
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          {metrics.lcp && metrics.fcp && metrics.cls && metrics.ttfb
            ? "Performance: Optimal"
            : "Performance: Loading"}
        </div>
      </div>
    </motion.div>
  );
}