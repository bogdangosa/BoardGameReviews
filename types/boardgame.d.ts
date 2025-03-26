interface IBoardgame {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  myRating?: number;
}
