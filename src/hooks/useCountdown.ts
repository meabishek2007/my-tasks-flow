import { useState, useEffect } from 'react';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOverdue: boolean;
  isUrgent: boolean;
}

export function useCountdown(targetDate: Date): CountdownResult {
  const [countdown, setCountdown] = useState<CountdownResult>(calculateCountdown(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}

function calculateCountdown(targetDate: Date): CountdownResult {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  const isOverdue = difference < 0;
  const absDiff = Math.abs(difference);

  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);

  // Urgent if less than 24 hours remaining
  const isUrgent = !isOverdue && difference < 24 * 60 * 60 * 1000;

  return { days, hours, minutes, seconds, isOverdue, isUrgent };
}
