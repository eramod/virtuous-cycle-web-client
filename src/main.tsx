import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  RouterProvider,
  Route
} from 'react-router-dom';
import Root, { User } from './routes/root.tsx';
import ErrorPage from './error-page.tsx';
import Register from './routes/register.tsx';
import Login from './routes/login.tsx';
import Quotes from './routes/quotes.tsx';
import { registerAction } from './components/registration-form.tsx';
import { loginAction } from './components/login-form.tsx';
import { createQuoteAction } from './components/new-quote-form.tsx';
import { editQuoteAction } from './components/edit-quote-form.tsx';

const router = createBrowserRouter(
  createRoutesFromElements (
    <Route
      path="/"
      element={<Root />}
      loader={userLoader}
      errorElement={<ErrorPage />} >

      <Route
        path="register"
        element={<Register />}
        action={registerAction}/>

      <Route
        path="login"
        element={<Login />}
        action={loginAction} />

      <Route
        path="quotes"
        element={<Quotes />} >

        <Route
          path="new-quote-form"
          action={createQuoteAction} />

        <Route
          path="edit-quote-form"
          action={editQuoteAction} />

      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

async function userLoader(): Promise<User | null> {
  const response = await fetch('http://localhost:5001/auth/user', {credentials: 'include'});

  if (!response.ok) {
    redirect('/login');
    return null
  }

  const user = await response.json();

  return user;
}