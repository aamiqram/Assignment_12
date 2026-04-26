import Link from 'next/link';
import { connectDB } from '@/lib/db.js';
import { Service } from '@/lib/models/Service.js';

export const metadata = {
  title: 'Care.xyz - Trusted Care Services for Baby, Elderly & Sick',
  description: 'Professional care services for baby, elderly, and sick patients. Reliable, trusted, and accessible caregiving at your fingertips.',
};

async function getServices() {
  await connectDB();
  const services = await Service.find({}).lean();
  return services;
}

export default async function Home() {
  const services = await getServices();

  return (
    <main className="flex-1">
      {/* Banner Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Trusted Care for Your Loved Ones
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Professional care services for baby, elderly, and sick patients
            </p>
            <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
              We connect you with trusted, experienced caretakers who provide compassionate care 
              for your family members in the comfort of your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#services"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Explore Services
              </Link>
              <Link
                href="/register"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Care.xyz
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our mission is to make caregiving easy, secure, and accessible for everyone. 
              We understand the importance of trust when it comes to caring for your loved ones.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Caregivers</h3>
              <p className="text-gray-600">
                Verified and trained professionals you can trust with your loved ones
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock support whenever you need us
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8H12m-3 7a3 3 0 016 0m-6 7a3 3 0 016 0" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Simple and quick booking process from anywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive care solutions tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">
                      ৳{service.pricePerHour}/hr
                    </span>
                    <Link
                      href={`/service/${service.slug}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                "Care.xyz provided excellent care for my mother. The caregiver was 
                professional and compassionate. Highly recommended!"
              </p>
              <p className="font-semibold">- Sarah Ahmed</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                "Very reliable service. They made it so easy to find a caretaker 
                for my newborn. Great experience overall."
              </p>
              <p className="font-semibold">- Michael Rahman</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                "Professional and trustworthy. The booking process was simple 
                and the caretaker was excellent."
              </p>
              <p className="font-semibold">- Lisa Khan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Contact us today and find the perfect care solution for your loved ones
            </p>
            <Link
              href="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Care.xyz</h3>
              <p>Trusted care services for your loved ones</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link href="/service/baby-care" className="hover:text-white">Baby Care</Link></li>
                <li><Link href="/service/elderly-care" className="hover:text-white">Elderly Care</Link></li>
                <li><Link href="/service/sick-care" className="hover:text-white">Sick Patient Care</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/login" className="hover:text-white">Login</Link></li>
                <li><Link href="/register" className="hover:text-white">Register</Link></li>
                <li><Link href="/my-bookings" className="hover:text-white">My Bookings</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
              <p>Email: info@care.xyz</p>
              <p>Phone: +880 1234 567890</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 Care.xyz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}