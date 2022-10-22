
import {GraphData, TrendingWord} from "../../models/trendingword";
import axios from "axios";
import { getListLocalStorage } from "api/localStorage";

const client = axios.create({ baseURL: "http://127.0.0.1:5000/" });
/**
 * API abstraction of endpoints that interact with the backend
 */
class API {


	/**
	 * @param metric 'frequency_growth' or 'search_count'. Used to show the most searched words or the fastest growing words.
	 * @param searchTerm Optional search term to search for. If empty, the default search term is used.
	 * @returns a JSON list of trening words with the gived metric value
	 */
	async getAllTrendingWords(searchTerm?: string, filter?: boolean): Promise<TrendingWord[]> {
		const response = await client.get(`/api/v1/trends?${searchTerm ? "&search_term=" + searchTerm : ""}${filter ? "&filter=" + filter : ""}`);
		return response.data;
	}

	/**
	 * @param searchTerm The given search term to get interest over time for.
     * @returns a JSON list of with date and relative interest value.
     */
	async getInteresOvertimeForSearchTerm(searchTerm:string):Promise<GraphData[]> {
		const response = await client.get(`/api/v1/interest_over_time/?search_term=${searchTerm}`);
		return response.data;
	}

	async getAllRelatedHashtags(query: string): Promise<string[]> {
		const filteredOutWords = getListLocalStorage("filteredOutWords");
		//filteredOutWords format: "word, word1, word2". String with comma between each word
		const response = await client.get("/api/v1/related_hashtags", { params: { query, filteredOutWords } });
		return response.data;
	}

	async getAllRelatedPostURLS(query: string):Promise<string[]> {
		const response = await client.get("/api/v1/related_post_URLS", { params: {  query } });
		return response.data;
	}

	async getBusinessPostURLS(followedUsers: string[]):Promise<string[]> {
		const response = await client.get("/api/v1/business_posts_urls", { params: { followedUsers: JSON.stringify(followedUsers) } });
		return response.data;
	}
	async getBusinessUser(username: string):Promise<{id?: string, error?: {error_user_msg: string}}> {
		const response = await client.get("/api/v1/business_user", { params: { username: JSON.stringify(username) } });
		return response.data;
	}
	
}


export default new API();



