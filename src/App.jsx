import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { Layout } from './components/layout'
import { Register } from './pages/Register'

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
      }
    ]
  }
])

export { router }