import { fetchfromTMDB } from "../services/tmdb.service.js"

export async function getTrending(req, res) {
    try {
        const { type } = req.params;
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/trending/${type}/day?language=en-US`);
        const randomTv = data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({ success: true, content: randomTv });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error in controller trending" });
    }
}

export async function getTrailers(req, res) {
    try {
        const { id } = req.params;
        const { type } = req.params;
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`);
        res.json({ success: true, trailers: data.results });
    }
    catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).json({ success: false, message: "Tv show not found" });
        }
        res.status(500).json({ success: false, message: "Internal server error in controller trailer" });
    }
}

export async function getDetails(req, res) {
    try {
        const { id } = req.params;
        const { type } = req.params;
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`);
        res.json({ success: true, content: data });
    }
    catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).json({ success: false, message: "Tv not found" });
        }
        res.status(500).json({ success: false, message: "Internal server error in controller details" });
    }
}

export async function getSimilar(req, res) {
    try {
        const { id } = req.params;
        const { type } = req.params;
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`);
        res.json({ success: true, similar: data.results });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error in controller similar" });
    }
}

export async function getByCategory(req, res) {
    try {
        const { category } = req.params;
        const { type } = req.params;
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`);
        res.json({ success: true, content: data.results });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error in controller categoty" });
    }
}