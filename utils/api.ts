export const getHouses = async (page: number = 1) => {
  const response = await fetch(`https://www.anapioficeandfire.com/api/houses?page=${page}`);
  return response.json();
}

export const getCharacter = async (url: string) => {
  const response = await fetch(url);
  return response.json();
}