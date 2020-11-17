export const fetchTracks = ({ artistId, page, songsLimit }) => {
  return fetch(
    `http://localhost:3000/api/artist/${artistId}/top?limit=${songsLimit}&index=${
      (page - 1) * songsLimit
    }`
  ).then((r) => r.json());
};

export const fetchArtist = ({ artistId }) => {
  return fetch("http://localhost:3000/api/artist/" + artistId).then((r) =>
    r.json()
  );
};
