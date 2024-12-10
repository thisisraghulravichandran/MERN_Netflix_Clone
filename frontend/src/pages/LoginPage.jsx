import { Link } from "react-router-dom"
import { useState } from "react"
import { useAuthStore } from "../store/authUser";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { logIn } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    logIn( {email, password} );
  }

  return (
    <div className="h-screen w-full hero-bg">
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
            <Link to={"/"}>
                <img src="netflix-logo.png" alt="logo" className="w-52" />
            </Link>
        </header>

        <div className="flex items-center justify-center mt-20 mx-3">
            <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
                <h1 className="text-center text-2xl font-bold text-white">
                    Login
                </h1>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input type="email" 
                            id="email"
                            placeholder="you@example.com" 
                            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-transparent text-white focus focus:ring focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="password" className="mt-5 block mb-2 text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input type="password" 
                            id="password"
                            placeholder="........." 
                            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-transparent text-white focus focus:ring focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                        <button type="submit" className="mt-5 w-full py-2 px-4 text-white bg-red-600 font-semibold rounded-md hover:bg-red-700">
                            Login
                        </button>

                        <div className="flex items-center text-gray-400 justify-center mt-5">
                            Don't have an account?
                            <Link to="/signup" className="text-red-500 hover:underline ml-2">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginPage