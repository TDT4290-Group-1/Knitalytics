import json
import string


class TrendingWord():
    def __init__(self, word, frequency_growth, search_count) -> None:
        self.word: string = word.strip()
        frequency_growth: float = frequency_growth
        search_count: int = search_count

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)    
    