import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { Layout } from './components/layout'
import { Register } from './pages/Register'
import { Dashboard } from './pages/dashboard'
import { PrivateRoute } from './routes/Private'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/cadastre-se",
        element: <Register />
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>
      }
    ]
  }
])

export { router }