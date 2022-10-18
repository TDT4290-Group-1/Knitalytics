import { createContext, Dispatch, SetStateAction } from "react";



export interface SelectedWordContextType {
    word: string;
    setWord: Dispatch<SetStateAction<string>>;
  }
  
export const SelectedWordContext = createContext<SelectedWordContextType>({word: "", setWord: () => null});
