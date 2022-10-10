from typing import List


class TrendingPost:
    # Represents a trending word. Contains the word, the frequency growth and the search count.

    def __init__(self, id, like_count, caption) -> None:
        self.id: str = id
        self.like_count: int = like_count
        self.caption: str = caption
