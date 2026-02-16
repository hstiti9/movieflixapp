export const GENRES = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 878, name: 'Sci-Fi' },
    { id: 35, name: 'Comedy' },
    { id: 27, name: 'Horror' },
    { id: 53, name: 'Thriller' },
    { id: 18, name: 'Drama' },
];

export const getGenreName = (id) => {
    const genre = GENRES.find(g => g.id.toString() === id.toString());
    return genre ? genre.name : 'Movies';
};
