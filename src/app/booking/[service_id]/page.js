'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { bangladeshDivisions } from '@/types/index.js';

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const serviceSlug = params.service_id;

  const [service, setService] = useState(null);
  const [duration, setDuration] = useState('');
  const [durationType, setDurationType] = useState('hours');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pageLoading, setPageLoading] = useState(true);

  const districts = bangladeshDivisions.find(d => d.name === division)?.districts || [];

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchService() {
      if (!serviceSlug) return;
      try {
        const res = await fetch(`/api/services?slug=${serviceSlug}`);
        const data = await res.json();
        if (data.service) {
          setService(data.service);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setPageLoading(false);
      }
    }
    fetchService();
  }, [serviceSlug]);

  useEffect(() => {
    if (service && duration) {
      const rate = durationType === 'hours' ? service.pricePerHour : service.pricePerDay;
      setTotalCost(rate * parseInt(duration) || 0);
    }
  }, [service, duration, durationType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!service || !duration || !division || !district || !city || !area || !address) {
      setError('All fields are required');
      return;
    }

    if (!session?.user?.email) {
      setError('Please sign in to book');
      router.push('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service._id,
          duration: parseInt(duration),
          durationType,
          division,
          district,
          city,
          area,
          address,
          userEmail: session.user.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Booking failed');
        return;
      }

      router.push('/my-bookings');
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book {service.name}</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="durationType"
                  value="hours"
                  checked={durationType === 'hours'}
                  onChange={() => setDurationType('hours')}
                  className="mr-2"
                />
                Hours
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="durationType"
                  value="days"
                  checked={durationType === 'days'}
                  onChange={() => setDurationType('days')}
                  className="mr-2"
                />
                Days
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration ({durationType})
            </label>
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder={`Enter number of ${durationType}`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Division
            </label>
            <select
              value={division}
              onChange={(e) => {
                setDivision(e.target.value);
                setDistrict('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Division</option>
              {bangladeshDivisions.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              District
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={!division}
              required
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter city name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area
            </label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter area name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              placeholder="Enter full address"
              required
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total Cost:</span>
              <span className="text-2xl font-bold text-blue-600">৳{totalCost.toLocaleString()}</span>
            </div>
            {duration && (
              <p className="text-sm text-gray-600 mt-1">
                {durationType === 'hours' ? `৳${service.pricePerHour}/hour` : `৳${service.pricePerDay}/day`} x {duration} {durationType}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}