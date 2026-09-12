import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { SignIn, SignUp, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b">
      <Link to="/" className="text-lg sm:text-xl font-bold shrink-0">DevPulse</Link>
      <div className="flex items-center gap-2 sm:gap-4">
        <SignedOut>
          <Link
            to="/sign-in"
            className="text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1.5 rounded-md border"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="text-xs sm:text-sm font-medium bg-black text-white px-2.5 sm:px-3 py-1.5 rounded-md"
          >
            Sign Up
          </Link>
        </SignedOut>
        <SignedIn>
          <Link to="/dashboard" className="text-xs sm:text-sm font-medium hidden sm:inline">Dashboard</Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  )
}

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">DevPulse</h1>
      <p className="text-gray-500 mb-6 text-sm sm:text-base max-w-md">Monitor your websites and servers, in real time.</p>
      <SignedOut>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0">
          <Link to="/sign-up" className="bg-black text-white px-5 py-2.5 rounded-md text-sm sm:text-base">Get Started</Link>
          <Link to="/sign-in" className="border px-5 py-2.5 rounded-md text-sm sm:text-base">Sign In</Link>
        </div>
      </SignedOut>
      <SignedIn>
        <Link to="/dashboard" className="bg-black text-white px-5 py-2.5 rounded-md text-sm sm:text-base">Go to Dashboard</Link>
      </SignedIn>
    </div>
  )
}

const clerkAppearance = {
  elements: {
    rootBox: "w-full flex justify-center",
    card: "w-full max-w-[400px] shadow-none border rounded-lg mx-2",
  },
}

const AuthPage = ({ mode }) => {
  return (
    <div className="flex justify-center py-8 sm:py-16 px-2 sm:px-4">
      {mode === 'sign-in' ? (
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
          appearance={clerkAppearance}
        />
      ) : (
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"
          appearance={clerkAppearance}
        />
      )}
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-in/*" element={<AuthPage mode="sign-in" />} />
        <Route path="/sign-up/*" element={<AuthPage mode="sign-up" />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
