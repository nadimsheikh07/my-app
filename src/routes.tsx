import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import App from './App';
import { ServicesPage } from './pages/ServicesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/services',
        element: <ServicesPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
    ],
  },
]);



export default function MyRoutes() {
  return (
    <RouterProvider router={router} />
  )
}