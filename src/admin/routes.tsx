import { Navigate, type RouteObject } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import { useAuth } from './auth/AuthContext';
import UserTable from './pages/users/UserTable';
import UserForm from './pages/users/UserForm';
import BlogTable from './pages/blogs/BlogTable';
import BlogForm from './pages/blogs/BlogForm';
import { type ReactNode } from 'react';

function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/admin/signin" replace />;
  return <>{children}</>;
}

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin/signin',
    element: <SignIn />,
  },
  {
    path: '/admin/signup',
    element: <SignUp />,
  },
  {
    path: '/admin',
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/users" replace /> },
      { path: 'users', element: <UserTable /> },
      { path: 'users/new', element: <UserForm /> },
      { path: 'users/:id/edit', element: <UserForm /> },
      { path: 'blogs', element: <BlogTable /> },
      { path: 'blogs/new', element: <BlogForm /> },
      { path: 'blogs/:id/edit', element: <BlogForm /> },
    ],
  },
];