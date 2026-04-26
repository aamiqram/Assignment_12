import './globals.css';
import Navbar from '@/components/Navbar';
import Provider from '@/components/Provider';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Care.xyz - Trusted Care Services',
  description: 'Professional care services for baby, elderly, and sick patients. Reliable, trusted, and accessible caregiving.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Navbar />
          {children}
          <Toaster position="top-right" />
        </Provider>
      </body>
    </html>
  );
}