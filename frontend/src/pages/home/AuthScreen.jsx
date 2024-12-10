import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { ChevronRight } from "lucide-react"
const AuthScreen = () => {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  }

  return (
    <div className="relative hero-bg">
        {/* Navbar */}
        <header className=" max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
            <img src="netflix-logo.png" alt="logo" className="w-32 md:w-52" />
            <Link to={"/login"} className="bg-red-600 px-4 py-2 rounded-md text-white">
                Sign In
            </Link>
        </header>

        {/* Hero */}
        <div className="flex flex-col space-y-4 text-center justify-center items-center text-white py-10">
            <h1 className="text-3xl md:text-5xl font-bold">Unlimited movies, TV shows and more.</h1>
            <h2 className="text-sm md:text-lg">Watch anywhere. Cancel anytime.</h2>
            <p className="text-sm md:text-lg">Ready to watch? Enter your email to create or restart your membership.</p>
            <form className="flex flex-col md:flex-row justify-center gap-4 w-1/2" onSubmit={handleSubmit}>
                <input 
                type="email"
                placeholder="Email Address"
                className="p-2 flex-1 rounded bg-black/80 focus focus:ring focus:outline-none border border-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 md:py-2 rounded flex justify-center items-center">
                    Get Started
                    <ChevronRight className="size-8 md:size-10" />
                </button>
            </form>
        </div>

        {/* Separator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden="true"/>

        {/* Test-left video-right */}
        <div className="py-10 bg-black text-white">
          <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
            {/* Left */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Enjoy on your TV. </h2> 
              <p className="text-lg md:text-xl">smart TVs, smartphones, tablets, streaming media players and game consoles.</p>
            </div>

            {/* Right */}
            <div className="flex-1 relative">
              <img src="tv.png" alt="tv" className="mt-4 relative z-20" />
              <video className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10" 
              playsInline autoPlay={true} muted loop>
                <source src="hero-vid.m4v" type='video/mp4' />
              </video>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden="true"/>

        {/* Image-left text-right */}
        <div className="py-10 bg-black text-white">
          
          <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
            {/* Left */}
            <div className="flex-1">
              <div className="relative">
                <img src="stranger-things-lg.png" alt="Stranger things img" className="mt-4" />
                <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
                  <img src="stranger-things-sm.png" alt="Stranger things icon" className="h-full" />
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col gap-0">
                      <span className="text-md lg:text-lg font-bold">Stranger Things</span>
                      <span className="text-sm text-blue-500">Downloading...</span>
                    </div>
                    <img src="download-icon.gif" alt="download icon" className="h-12" />
                  </div>
                </div>
              </div>
            </div>
            {/* Right */}
            <div className="flex-1 relative md:text-left text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Download your shows to watch offline.
              </h2> 
              <p className="text-lg md:text-xl">Save your favorites easily and always have something to watch.</p>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden="true"/>

        {/* 3rd section */}
        <div className="py-10 bg-black text-white">
          <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
            {/* Left */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Watch Everywhere</h2> 
              <p className="text-lg md:text-xl">In smart TVs, smartphones, tablets, streaming media players and game consoles.</p>
            </div>

            {/* Right */}
            <div className="flex-1 relative">
              <img src="device-pile.png" alt="Device png" className="mt-4 relative z-20" />
              <video className="absolute top-16 left-1/2 -translate-x-1/2 h-[45%] z-10" 
              playsInline autoPlay={true} muted loop>
                <source src="/video-devices.m4v" type='video/mp4' />
              </video>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden="true"/>

        {/* 4th section */}
         {/* Image-left text-right */}
        <div className="py-10 bg-black text-white">
          <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
            {/* Left */}
            <div className="flex-1">
              <div className="relative">
                <img src="kids.png" alt="Stranger things img" className="mt-4" />
              </div>
            </div>
            {/* Right */}
            <div className="flex-1 relative md:text-left text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Create profile for kids.
              </h2> 
              <p className="text-lg md:text-xl">Some kids on adventures with their favorite characters in a space made just for them - free with your membership.</p>
            </div>
          </div>
        </div>

    </div>
  )
}

export default AuthScreen