'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function MyBookingsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchBookings() {
      if (status !== 'authenticated' || !session?.user?.email) return;
      try {
        const res = await fetch(`/api/booking?email=${encodeURIComponent(session.user.email)}`);
        const data = await res.json();
        if (data.bookings) {
          setBookings(data.bookings);
        }
      } catch (err) {
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [status, session]);

  const handleCancel = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    if (!session?.user?.email) return;
    
    try {
      const res = await fetch(`/api/booking/${bookingId}?email=${encodeURIComponent(session.user.email)}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setBookings(bookings.map(b => 
          b._id === bookingId ? { ...b, status: 'cancelled' } : b
        ));
      }
    } catch (err) {
      alert('Failed to cancel booking');
    }
  };

  const getStatusColor = (bookingStatus) => {
    switch (bookingStatus) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>
        )}

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">You have no bookings yet.</p>
            <button
              onClick={() => router.push('/#services')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {typeof booking.service === 'object' ? booking.service.name : 'Service'}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="block text-gray-500">Duration</span>
                        {booking.duration} {booking.durationType}
                      </div>
                      <div>
                        <span className="block text-gray-500">Location</span>
                        {booking.city}, {booking.district}
                      </div>
                      <div>
                        <span className="block text-gray-500">Area</span>
                        {booking.area}
                      </div>
                      <div>
                        <span className="block text-gray-500">Total Cost</span>
                        <span className="font-semibold text-blue-600">৳{booking.totalCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    {booking.status === 'pending' && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}