
import {GraphData, TrendingWord} from "../models/trendingword";
import axios from "axios";
import { getListLocalStorage } from "services/localStorageService";

const client = axios.create({ baseURL: "https://knitalytics-backend.herokuapp.com/" });
/**
 * API abstraction of endpoints that interact with the backend
 */
class API {
	user_auth = localStorage.getItem("user_auth");

	/**
	 * @param search_term Optional search term to search for. If empty, the default search term is used.
	 * @param filter Optional boolean indicating wether to filter commonly occuring words.
	 * @param timeframe Optional string indicating which timeframe to retrieve statistics for. 
	 * Valid values: 
	 * - [last_day | last_week | last_month | last_three_months | last_year]
	 * @returns a JSON list of trening words with the gived metric value
	 */
	async getTrendingWords(search_term: string, filter: boolean, timeframe: string): Promise<TrendingWord[]> {
		let url = "/api/v1/trends";
		const params = {user_auth: this.user_auth, "search_term": search_term, "filter": filter, "timeframe": timeframe}; // build dictionary so we can loop
		
		// loop through parameters and iteratively build url string
		for (let i=0; i < Object.entries(params).length; i++) {
			const param = Object.entries(params)[i][0]; // param name
			const value = Object.entries(params)[i][1]; // param value
			if (i != 0) { // if this is not first parameter
				url += "&"; // need to concatenate parameters
			} else {
				url += "?"; // indicate parameters
			}
			url += `${param}=${value}`; // iteravely build string
		}

		const response = await client.get(url);
		return response.data;
	}

	/**
	 * @param searchTerm The given search term to get interest over time for.
     * @returns a JSON list of with date and relative interest value.
     */
	async getInterestOvertimeForSearchTerm(searchTerm:string):Promise<GraphData[]> {
		const response = await client.get(`/api/v1/interest_over_time/?user_auth=${this.user_auth}&search_term=${searchTerm}`);
		return response.data;
	}

	/**
	 * @param query The main hashtag to get related hashtags from
	 * @returns a JSON list of most popular hashtags co-appearing with query
	 */
	async getRelatedHashtags(query: string): Promise<string[]> {
		//filteredOutWords format: "word, word1, word2"
		const filteredOutWords = getListLocalStorage("filteredOutWords");
		const response = await client.get("/api/v1/related_hashtags", { params: { user_auth: this.user_auth, query, filteredOutWords } });
		return response.data;
	}

	/**
	 * @param query The hashtag to find related posts to
	 * @returns a JSON list with the URLS to the most popular posts with the hashtag 'query'
	 */
	async getRelatedPostURLS(query: string):Promise<string[]> {
		const response = await client.get("/api/v1/related_post_URLS", { params: {user_auth: this.user_auth, query } });
		return response.data;
	}

	/**
	 * @param followedUsers a list of all Instagram usernames to find posts from
	 * @param sort a string which says what to sort the post on. Options: user, likes, comments
	 * @param postAmount a number (format of a string) whcih says how many posts per user should be returned
	 * @returns a JSON list with the URLS of the posts of the 'followedUsers'
	 */
	async getUsersPostURLS(followedUsers: string[], sort: string, postAmount: string):Promise<string[]> {
		const response = await client.get("/api/v1/users_post_urls", { params: {
			user_auth: this.user_auth, followedUsers: JSON.stringify(followedUsers), sort, postAmount
		}});
		//filteredOutWords format: "word, word1, word2". String with comma between each word
		return response.data;
	}

	async getAllRelatedPostURLS(query: string):Promise<string[]> {
		const response = await client.get("/api/v1/related_post_URLS", { params: { user_auth: this.user_auth, query } });
		return response.data;
	}

	/**
	 * @param username a string with the username of the Instagram business user
	 * @returns a JSON object with the user id of the Instagram business user. Error message if user does not exist.
	 */
	async getBusinessUser(username: string):Promise<{id?: string, error?: {error_user_msg: string}}> {
		const response = await client.get("/api/v1/business_user", { params: {
			user_auth: this.user_auth, username: JSON.stringify(username) 
		}});
		return response.data;
	}

	/**
	 * @param hashtag a string with hashtag
	 * @returns a JSON object with the hashtag id of the hashtag. Error message if hashtag does not exist.
	 */
	async getHashtagId(hashtag: string):Promise<{error?: {error_user_msg: string}}> {
		const response = await client.get("/api/v1/hashtag_id", { params: {
			user_auth: this.user_auth, hashtag: JSON.stringify(hashtag) 
		}});
		return response.data;
	}
	
}

export default new API();



