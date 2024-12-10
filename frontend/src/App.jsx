import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from  './pages/home/HomePage'
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/HistoryPage";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage";

function App() {

  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck])

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex items-center justify-center bg-black h-full">
          <Loader className="animate-spin size-10 text-red-600" />
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={ !user ? <LoginPage /> : <Navigate to="/" /> } />
        <Route path="/signup" element={ !user ? <SignUpPage /> : <Navigate to="/" /> } />
        <Route path="/watch/:id" element={ user ? <WatchPage /> : <Navigate to="/login" /> } />
        <Route path="/search" element={ user ? <SearchPage /> : <Navigate to="/login" /> } />
        <Route path="/history" element={ user ? <HistoryPage /> : <Navigate to="/login" /> } />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
