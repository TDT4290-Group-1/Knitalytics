class TrendingWord:
    # Represents a trending word. Contains the word, the frequency growth and the search count.

    def __init__(self, word, frequency_growth, search_count) -> None:
        self.word: str = word.strip()
        self.frequency_growth: float = frequency_growth
        self.search_count: int = search_count
