import { fetchfromTMDB } from "../services/tmdb.service.js"

export async function getTrendingTv(req, res) {
    try {
        const data = await fetchfromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomTv = data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({ success: true, content: randomTv });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error in controller" });
    }
}

export async function getTvTrailers(req, res) {
    try {
        const { id } = req.params;
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.json({ success: true, trailers: data.results });
    }
    catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).json({ success: false, message: "Tv show not found" });
        }
        res.status(500).json({ success: false, message: "Internal server error in controller" });
    }
}

export async function getTvDetails(req, res) {
    try {
        const { id } = req.params;
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.json({ success: true, content: data });
    }
    catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).json({ success: false, message: "Tv not found" });
        }
        res.status(500).json({ success: false, message: "Internal server error in controller" });
    }
}

export async function getSimilarTv(req, res) {
    try {
        const { id } = req.params;
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.json({ success: true, similar: data.results });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error in controller" });
    }
}

export async function getTvByCategory(req, res) {
    try {
        const { category } = req.params;
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.json({ success: true, content: data.results });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error in controller" });
    }
}