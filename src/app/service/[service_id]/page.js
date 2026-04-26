import { connectDB } from '@/lib/db.js';
import { Service } from '@/lib/models/Service.js';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { service_id } = await params;
  await connectDB();
  const service = await Service.findOne({ slug: service_id }).lean();
  
  if (!service) {
    return { title: 'Service Not Found - Care.xyz' };
  }
  
  return {
    title: `${service.name} - Care.xyz`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { service_id } = await params;
  await connectDB();
  const service = await Service.findOne({ slug: service_id }).lean();
  
  if (!service) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.name}</h1>
            <p className="text-gray-600 mb-6">{service.description}</p>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Pricing</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Per Hour</span>
                  <span className="font-semibold">৳{service.pricePerHour}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Per Day (8 hours)</span>
                  <span className="font-semibold">৳{service.pricePerDay}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link
              href={`/booking/${service.slug}`}
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Book Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}