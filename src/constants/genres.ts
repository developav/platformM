export type GenreKey =
  | "history"
  | "horror"
  | "scifi"
  | "stand-up"
  | "fantasy"
  | "drama"
  | "mystery"
  | "family"
  | "comedy"
  | "romance"
  | "music"
  | "crime"
  | "tv-movie"
  | "documentary"
  | "action"
  | "thriller"
  | "western"
  | "animation"
  | "war"
  | "adventure";

export const genreMapping: Record<GenreKey, string> = {
  history: "Историческое",
  horror: "Ужасы",
  scifi: "Фантастика",
  "stand-up": "Стендап",
  fantasy: "Фэнтези",
  drama: "Драма",
  mystery: "Детектив",
  family: "Семейное",
  comedy: "Комедия",
  romance: "Романтика",
  music: "Музыка",
  crime: "Криминал",
  "tv-movie": "ТВ-фильм",
  documentary: "Документальный",
  action: "Экшн",
  thriller: "Триллер",
  western: "Вестерн",
  animation: "Анимация",
  war: "Военный",
  adventure: "Приключения",
};

export const genreImages: Partial<Record<GenreKey, string>> = {
  history: "/history.png",
  scifi: "/fantastic.png",
  drama: "/dram.png",
  mystery: "/detect.png",
  family: "/family.png",
  comedy: "/comedy.png",
  thriller: "/triller.png",
  adventure: "/adventure.png",
};