interface IBoardgame {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  myRating?: number;
  nrOfPlayers?: number;
  playTime?: number;
  year?: number;
  age?: number;
  weight?: number;
  designer?: string;
}
