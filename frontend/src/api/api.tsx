
import {TrendingWord} from "../../models/trendingword";

/**
 * API abstraction of endpoints that interact with the backend
 */
 export class API {

    /**
     * @returns All existing ads
     */
    async getAllTrendingWords(): Promise<TrendingWord[]> {
      const response = fetch("/api/v1/trends").then((response) => {
          response.json().then((data) => {
            console.log("KAVU");
            console.log(data);
            return data;
            }).catch((error) => {console.log(error)})});
            return response as unknown as TrendingWord[];
          }
        

        
    }

  

export default new API();
  

  