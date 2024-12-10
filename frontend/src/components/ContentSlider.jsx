import { useEffect, useState, useRef } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ContentSlider = ({category}) => {
  const {contentType} = useContentStore();
  const [content, setContent] = useState([]);
  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";
  const formattedCategoryName = category.charAt(0).toUpperCase() + category.replaceAll("_", " ").slice(1);

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

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res.data.content);
    }

    getContent();
  },[category, contentType]);  

  return (
    <div className="bg-black text-white relative px-5 md:px-20"
    onMouseEnter={() => setShowArrows(true)} onMouseLeave={() => setShowArrows(false)}>
      <h2 className="mb-4 text-zxl font-bold">
        {formattedCategoryName} {formattedContentType}
      </h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
        {content.map((item) => (
          <Link to={`/watch/${item.id}`} key={item.id} className="min-w-[250px] relative group">
            <div className="rounded-lg overflow-hidden">
              <img src={ SMALL_IMG_BASE_URL + item.backdrop_path } alt={`${item.title || item.name} thumbnail`}
              className="transition-transform duraction-300 ease-in-out group-hover:scale-125"/>
            </div>

            <p className="mt-2 text-center">{item.title || item.name}</p>
          </Link>
        ))}
      </div>

      {showArrows && (
        <>
          <button className="absolute top-1/2 -translate-y-1/2 left-5 z-10 p-2 rounded-full
           bg-black md:left-24 flex items-center justify-center size-12 bg-opacity-50 hover:bg-opacity-75 text-white" onClick={scrollLeft}>
            <ChevronLeft size={24} />
          </button>
          <button className="absolute top-1/2 -translate-y-1/2 right-5 z-10 p-2 rounded-full
           bg-black md:right-24 flex items-center justify-center size-12 bg-opacity-50 hover:bg-opacity-75 text-white" onClick={scrollRight}>
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  )
}

export default ContentSlider