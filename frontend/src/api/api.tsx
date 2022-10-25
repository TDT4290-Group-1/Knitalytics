
import {GraphData, TrendingWord} from "../../models/trendingword";
import axios from "axios";
import { getListLocalStorage } from "api/localStorage";
import { type } from "os";

const client = axios.create({ baseURL: "http://127.0.0.1:5000/" });
/**
 * API abstraction of endpoints that interact with the backend
 */
class API {


	/**
	 * @param search_term Optional search term to search for. If empty, the default search term is used.
	 * @param searchTerm 
	 * @returns a JSON list of trening words with the gived metric value
	 */
	async getAllTrendingWords(search_term: string, filter: boolean, timeframe: string): Promise<TrendingWord[]> {
		let url = "/api/v1/trends"
		let params = {"search_term": search_term, "filter": filter, "timeframe": timeframe}
		
		for (let i=0; i < Object.entries(params).length; i++) {
			const param = Object.entries(params)[i][0]
			const value = Object.entries(params)[i][1]
			if (i != 0) {
				url += '&'
			} else {
				url += '?'
			}
			url += `${param}=${value}`
		}

		console.log(`URL: ${url}`)

		const response = await client.get(url);
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
	async getHashtagId(hashtag: string):Promise<{error?: {error_user_msg: string}}> {
		const response = await client.get("/api/v1/hashtag_id", { params: { hashtag: JSON.stringify(hashtag) } });
		return response.data;
	}
	
}


export default new API();



