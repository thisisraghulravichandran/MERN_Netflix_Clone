import { fetchfromTMDB } from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";

export async function searchNetflix (req, res) {
    try {
        const { query } = req.params;
        const { type } = req.params;
        
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/search/${type}?query=${query}&language=en-US&page=1`);
        if(data.results.length === 0) {
            return res.status(404).json({ success: false, message: "Results not found" });
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].profile_path ? data.results[0].profile_path : data.results[0].poster_path,
                    title: data.results[0].name ? data.results[0].name : data.results[0].title,
                    searchType: type,
                    createdAt: Date.now()
                }
            }
        })
        res.json({ success: true, content: data.results });
    } catch(error) {
        res.status(500).json({ success: false, message: "Internal server error in controller search netflix" });
    }
}

export async function getSearchHistory (req, res) {
    try {
        res.json({ success: true, content: req.user.searchHistory });
    } catch(error) {
        res.status(500).json({ success: false, message: "Internal server error in controller search" });
    }
}

export async function deleteItemSearchHistory(req, res) {
    try {
        let { id } = req.params;
        id = parseInt(id);

        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory:{ id: id },
            }
        });
        res.json({ success: true, message: "Search Item removed" });
    } catch(error) {
        res.status(500).json({ success: false, message: "Internal server error in controller delete" });
    }
}