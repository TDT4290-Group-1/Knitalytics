
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
		console.log("khjkjk");
		const response = await client.get("/api/v1/trends");
		//  await fetch("/api/v1/trends").then((response) => {
		// 	console.log(response);
		// 	response.json().then((data) => {
		// 		console.log("KAVU");
		// 		console.log(data);
		// 	}).catch((error) => {console.log(error);});
		// });
		return response.data;
	}
        

        
}

  

export default new API();
  

  
