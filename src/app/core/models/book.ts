export interface Book {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: string;
  characters: string[];
  povCharacters: string[];

  // New property to uniquely identify a book
  id: string;
  // New optional property to track favorite status
  isFavorite?: boolean;
};
