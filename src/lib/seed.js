import { connectDB } from '@/lib/db.js';
import { Service } from '@/lib/models/Service.js';

const services = [
  {
    name: 'Baby Care Service',
    slug: 'baby-care',
    description: 'Professional and experienced caretakers to take care of your little ones. Our baby care specialists are trained to provide the best care for infants and toddlers, ensuring their safety, health, and happiness.',
    shortDescription: 'Professional caretakers for your little ones',
    pricePerHour: 300,
    pricePerDay: 2400,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    category: 'baby',
    features: [
      'Experienced baby caretakers',
      '24/7 availability',
      'Infant feeding and nursing',
      'Play and development activities',
      'Health and safety monitoring',
      'Emergency response',
    ],
  },
  {
    name: 'Elderly Care Service',
    slug: 'elderly-care',
    description: 'Compassionate and skilled caregivers to provide comprehensive care for your elderly loved ones. We ensure their comfort, health, and dignity with personalized care plans.',
    shortDescription: 'Compassionate care for elderly family members',
    pricePerHour: 350,
    pricePerDay: 2800,
    image: 'https://images.unsplash.com/photo-1516307365426-bea591f050d0?w=800',
    category: 'elderly',
    features: [
      'Personal care assistance',
      'Medication management',
      'Daily activity support',
      'Companionship',
      'Physical therapy support',
      'Nutritional planning',
    ],
  },
  {
    name: 'Sick Patient Care',
    slug: 'sick-care',
    description: 'Specialized medical-attendant care for sick or recovering patients. Our trained caregivers provide professional护理 and support during recovery periods.',
    shortDescription: 'Professional care for sick family members',
    pricePerHour: 400,
    pricePerDay: 3200,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    category: 'sick',
    features: [
      'Post-surgery care',
      'Medical parameter monitoring',
      'Medication administration',
      'Wound care assistance',
      'Physiotherapy support',
      '24/7 medical attendant',
    ],
  },
];

export async function seedServices() {
  await connectDB();
  for (const service of services) {
    const existing = await Service.findOne({ slug: service.slug });
    if (!existing) {
      await Service.create(service);
    }
  }
}

seedServices();