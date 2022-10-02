
import {TrendingWord} from "../../models/trendingword";
import axios from "axios";

const client = axios.create({ baseURL: "http://127.0.0.1:5000/" });
/**
 * API abstraction of endpoints that interact with the backend
 */
class API {


	/**
     * @returns All existing ads
     */
	async getAllTrendingWords():Promise<TrendingWord[]> {
		const response = await client.get("/api/v1/trends");
		return response.data;
	}
        

        
}

  

export default new API();
  

  
