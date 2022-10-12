
import {TrendingWord} from "../../models/trendingword";
import axios from "axios";
import { TredningWordsMetric } from "utils/trendingWordsMetric";

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
		const response = await client.get("/api/v1/relatedHashtags", { params: { query: query } });
		return response.data;
	}

	async getAllRelatedPostURLS(query: string):Promise<string[]> {
		const response = await client.get("/api/v1/relatedPostURLS", { params: { query: query } });
		return response.data;
	}
        
}

export default new API();
  

  
