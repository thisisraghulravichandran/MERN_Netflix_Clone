import { useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { formatReleaseDate } from "../utils/dateFunction";

const WatchPage = () => {

  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const {contentType} = useContentStore();

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
        setLoading(false);
        } catch (error) {
          if (error.message.includes("404")) { 
            setTrailers([]);
          }
      }
    }

    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
        setLoading(false);
        } catch (error) {
          if (error.message.includes("404")) { 
            setSimilarContent([]);
          }
      }
    }

    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
        setLoading(false);
        } catch (error) {
          if (error.message.includes("404")) { 
            setContent([]);
          }
      }
    }

    getContentDetails();
  }, [contentType, id]);

  const handleNext = () => {
    if (currentTrailerIndex < trailers.length - 1) {
      setCurrentTrailerIndex(currentTrailerIndex + 1);
    }
  }

  const handlePrev = () => {
    if (currentTrailerIndex > 0) {
      setCurrentTrailerIndex(currentTrailerIndex - 1);
    }
  }

  const [showArrows, setShowArrows] = useState(false);

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if(sliderRef.current) {
      sliderRef.current.scrollBy({left: -sliderRef.current.offsetWidth, behavior: "smooth"});
    }
  }

  const scrollRight = () => {
    if(sliderRef.current) {
      sliderRef.current.scrollBy({left: sliderRef.current.offsetWidth, behavior: "smooth"});
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Loader className="animate-spin text-red-500" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-2xl text-white">
        No Content Found
      </div>
    );  
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {trailers.length > 0 && (
          <div className="flex items-center justify-between mb-4">
            <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${ currentTrailerIndex === 0 ? "opacity-50 cursor-not-allowed" : "" }`} disabled={currentTrailerIndex === 0} onClick={handlePrev}>
              <ChevronLeft size={24} />
            </button>

            <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${ currentTrailerIndex === trailers.length - 1 ? "opacity-50 cursor-not-allowed" : "" }`} disabled={currentTrailerIndex === trailers.length - 1} onClick={handleNext} > 
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 aspect-video mb-14">
          {trailers.length > 0 && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex].key}`}
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
            />
          )}

          {trailers.length === 0 && (
            <div className="flex items-center justify-center h-full mb-14">
              <p className="text-2xl">No trailers available for <span className="text-red-600">{ content?.title || content?.name }</span></p>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-20 max-w-6xl mx-auto px-4 mb-14">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">{ content?.title || content?.name }</h2>
            <p className="mt-2 text-lg">
              { formatReleaseDate( content?.release_date || content?.first_air_date )} | {" "} 
              { content?.adult ? (
                  <span className="text-red-600">18+</span> ) : (
                  <span className="text-green-600">PG-13</span>
                )
              }
            </p>
            <p>Rating: { content?.vote_average }</p>
            <p>Overview: { content?.overview }</p>
          </div>
          <img src={ ORIGINAL_IMG_BASE_URL + content?.poster_path } 
          alt="Poster image" 
          className="max-h-[400px] rounded-md" />
        </div>

        {/* Similar Content */}
        <div className="bg-black text-white relative max-w-6xl mx-auto px-4 mb-14"
    onMouseEnter={() => setShowArrows(true)} onMouseLeave={() => setShowArrows(false)}>
      <h2 className="mb-4 text-2xl font-bold">
        Similar Movies/Tv Show
      </h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
        {similarContent.map((item) => {
          if(item.poster_path === null) return null;
          return (<Link to={`/watch/${item.id}`} key={item.id} className="min-w-[250px] relative group">
            <div className="rounded-lg overflow-hidden">
              <img src={ ORIGINAL_IMG_BASE_URL + item.poster_path } alt={`${item.title || item.name} thumbnail`}
              className="transition-transform duraction-300 ease-in-out group-hover:scale-125"/>
            </div>

            <p className="mt-2 text-center">{item.title || item.name}</p>
          </Link>);
        }
        )}
      </div>

      {showArrows && (
        <>
          <button className="absolute top-1/2 -translate-y-1/2 left-5 z-10 p-2 rounded-full
           bg-black md:left-8 flex items-center justify-center size-12 bg-opacity-50 hover:bg-opacity-75 text-white" onClick={scrollLeft}>
            <ChevronLeft size={24} />
          </button>
          <button className="absolute top-1/2 -translate-y-1/2 right-5 z-10 p-2 rounded-full
           bg-black md:right-8 flex items-center justify-center size-12 bg-opacity-50 hover:bg-opacity-75 text-white" onClick={scrollRight}>
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>

      </div>
    </div>
  )
}

export default WatchPage