
import {TrendingWord} from "../../models/trendingword";
import axios from "axios";
import { TredningWordsMetric } from "utils/trendingWordsMetric";
import { getListLocalStorage } from "api/localStorage";

const client = axios.create({ baseURL: "http://127.0.0.1:5000/" });
/**
 * API abstraction of endpoints that interact with the backend
 */
class API {

 
	/**
	 * @param metric 'frequency_growth' or 'search_count'. Used to show the most searched words or the fastest growing words.
	 * @param searchTerm Optional search term to search for. If empty, the default search term is used.
     * @returns All existing ads
     */
	async getAllTrendingWords(metric:TredningWordsMetric, searchTerm?:string):Promise<TrendingWord[]> {
		const response = await client.get(`/api/v1/trends/?metric=${metric}${searchTerm ? "&searchTerm=" + searchTerm : ""}`);
	
		
		return response.data;
	}

	async getAllRelatedHashtags(query: string):Promise<string[]> {
		const filteredOutWords = getListLocalStorage("filteredOutWords");
		//filteredOutWords format: "word, word1, word2". String with comma between each word
		const response = await client.get("/api/v1/relatedHashtags", { params: { query: query, filteredOutWords: filteredOutWords } });
		return response.data;
	}

	async getAllRelatedPostURLS(query: string):Promise<string[]> {
		const response = await client.get("/api/v1/relatedPostURLS", { params: { query: query } });
		return response.data;
	}
	async getBusinessUser(username: string):Promise<{id?: string, error?: {error_user_msg: string}}> {
		const response = await client.get("/api/v1/business_user", { params: { username: JSON.stringify(username) } });
		return response.data;
	}
	async getHashtagId(hashtag: string):Promise<{error?: {error_user_msg: string}}> {
		const response = await client.get("/api/v1/hashtag_id", { params: { hashtag: JSON.stringify(hashtag) } });
		return response.data;
	}
	
}

export default new API();
  

  
