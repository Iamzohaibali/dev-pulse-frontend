import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { SignIn, SignUp, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 bg-white flex items-center justify-between px-4 sm:px-6 py-4 border-b">
      <Link to="/" className="text-xl sm:text-2xl font-bold shrink-0">DevPulse</Link>
      <div className="flex items-center gap-2 sm:gap-3">
        <SignedOut>
          <Link
            to="/sign-in"
            className="text-sm font-medium px-4 py-2.5 rounded-md border min-h-[44px] flex items-center"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="text-sm font-medium bg-black text-white px-4 py-2.5 rounded-md min-h-[44px] flex items-center"
          >
            Sign Up
          </Link>
        </SignedOut>
        <SignedIn>
          <Link to="/dashboard" className="text-sm font-medium hidden sm:inline">Dashboard</Link>
          <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonBox: "scale-110" } }} />
        </SignedIn>
      </div>
    </nav>
  )
}

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">DevPulse</h1>
      <p className="text-gray-500 mb-8 text-base sm:text-lg max-w-md">Monitor your websites and servers, in real time.</p>
      <SignedOut>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto max-w-xs sm:max-w-none px-4 sm:px-0">
          <Link to="/sign-up" className="bg-black text-white px-6 py-3.5 rounded-md text-base font-medium min-h-[48px] flex items-center justify-center">Get Started</Link>
          <Link to="/sign-in" className="border px-6 py-3.5 rounded-md text-base font-medium min-h-[48px] flex items-center justify-center">Sign In</Link>
        </div>
      </SignedOut>
      <SignedIn>
        <Link to="/dashboard" className="bg-black text-white px-6 py-3.5 rounded-md text-base font-medium min-h-[48px] flex items-center justify-center">Go to Dashboard</Link>
      </SignedIn>
    </div>
  )
}

const clerkAppearance = {
  elements: {
    rootBox: "w-full flex justify-center",
    card: "w-full max-w-[420px] shadow-none border rounded-lg mx-2",
    formButtonPrimary: "text-base py-3",
    formFieldInput: "text-base py-3",
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
