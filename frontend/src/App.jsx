import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//import Navbar from './components/shared/Navbar'
// User
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Home from "./components/Home"
import Positions from './components/Positions'
import Browse from './components/Browse'
import Profile from './components/Profile'
import PositionDescription from './components/PositionDescription'
// Club
import Clubs from './components/admin/Clubs'
import ClubCreate from './components/admin/ClubCreate'
import ClubSetup from './components/admin/ClubSetup'
import AdminPositions from "./components/admin/AdminPositions";
import PostPosition from './components/admin/PostPosition'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/positions',
    element: <Positions/>
  },
  {
    path: '/description/:id',
    element: <PositionDescription/>
  },
  {
    path: '/browse',
    element: <Browse/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  // admin ke liye yha se start hoga
  {
    path:"/admin/clubs",
    element: <ProtectedRoute><Clubs/></ProtectedRoute>
  },
  {
    path:"/admin/clubs/create",
    element: <ProtectedRoute><ClubCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/clubs/:id",
    element:<ProtectedRoute><ClubSetup/></ProtectedRoute> 
  },
  {
    path:"/admin/positions",
    element:<ProtectedRoute><AdminPositions/></ProtectedRoute> 
  },
  {
    path:"/admin/positions/create",
    element:<ProtectedRoute><PostPosition/></ProtectedRoute> 
  },
  {
    path:"/admin/positions/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
  
])

function App() {

  return (
    <>
      <RouterProvider router = {appRouter}/>
    </>
  )
}

export default App
