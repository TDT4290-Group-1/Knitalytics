import { createContext, Dispatch, SetStateAction } from "react";
import { TrendingWord } from "../models/trendingword";



export interface SelectedWordContextType {
    trendingWord: TrendingWord;
    setTrendingWord: Dispatch<SetStateAction<TrendingWord>>;
  }


  
export const SelectedWordContext = createContext<SelectedWordContextType>({trendingWord: {word:""}, setTrendingWord: () => null});
