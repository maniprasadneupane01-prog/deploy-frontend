import { useState, useCallback } from 'react';
import { api } from '../utils/api';

const cache = new Map();

export function useSlots() {
  const [booked, setBooked] = useState([]);
  const [available, setAvailable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSlots = useCallback(async (date, branch) => {
    if (!date || !branch) return;
    const cacheKey = `${date}-${branch}`;
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      setBooked(cached.booked);
      setAvailable(cached.available);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/appointments/slots', { params: { date, branch } });
      setBooked(data.booked);
      setAvailable(data.available);
      cache.set(cacheKey, { booked: data.booked, available: data.available });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch slots');
    } finally {
      setLoading(false);
    }
  }, []);

  return { booked, available, loading, error, fetchSlots };
}
