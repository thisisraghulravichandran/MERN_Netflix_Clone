import { Link } from "react-router-dom"
import { useState } from "react"
import { useAuthStore } from "../store/authUser";

const SignUpPage = () => {
  const {searchParams} = new URL(document.location);
  const emailValue = searchParams.get("email");

  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    signUp( {email, username, password});
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
                    Sign Up
                </h1>
                <form className="space-y-4" onSubmit={handleSignUp}>
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

                        <label htmlFor="username" className="mt-5 block mb-2 text-sm font-medium text-gray-300">
                            Username
                        </label>
                        <input type="text" 
                            id="username"
                            placeholder="John Doe" 
                            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-transparent text-white focus focus:ring focus:outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />

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
                            Sign Up
                        </button>

                        <div className="flex items-center text-gray-400 justify-center mt-5">
                            Already a member?
                            <Link to="/login" className="text-red-500 hover:underline ml-2">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUpPage