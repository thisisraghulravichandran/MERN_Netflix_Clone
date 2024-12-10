import { Link } from "react-router-dom"
import { ChevronLeft } from "lucide-react"

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white bg-black bg-opacity-60"
    style={{ backgroundImage: `url('/404.png')` }}
    >
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 hover:cursor-pointer">
        <Link to="/">
          <img src="/netflix-logo.png" alt="logo" className="w-32 sm:w-40" />
        </Link>
      </header>

      <main className="text-center error-page--content z-10">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg">Page Not Found</p>
        <Link to="/" className="text-lg font-semibold hover:underline flex items-center mt-10">
        <button className="mr-2 bg-white text-black px-4 py-2 rounded flex items-center"><ChevronLeft />
        Go Back</button>
        </Link>
      </main>

    </div>
  )
}

export default NotFoundPage