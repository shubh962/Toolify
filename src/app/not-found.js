import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
      {/* 1. The Big Error Message */}
      <h2 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h2>
      
      {/* 2. Helpful Text for User */}
      <p className="text-gray-600 mb-8 max-w-md">
        Oops! The page you are looking for might have been removed or deleted.
      </p>
      
      {/* 3. The "Recovery" Action (Crucial for AdSense) */}
      <Link 
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  )
}
