export interface TrendingWord {
    word: string;
    frequency_growth?: number;
    search_count?: number;
  }

export interface GraphData{
  date: number;
  relative_search_value: number;
}
