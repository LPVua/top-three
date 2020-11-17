import { songLoaderTemplate } from "./song-loader.template";
import { songTemplate } from "./song.template";
import style from "./songs.module.css";

const template = ({ songs, artistId, page }) => {
  if (songs.isLoading) {
    return `<div class="${style.songs}">${[1, 2, 3, 4]
      .map(songLoaderTemplate)
      .join("")}</div>`;
  }

  return `<div class="${style.songs}">
    ${songs.filteredList.map(songTemplate).join("")}
  </div>
   ${page ? `
    <a href="/artist/${artistId}?page=${page}" class="${
      style["songs__pagination"]
    }">
      Next Page
    </a>
` : ''}`;
};

const songsLimit = 25;

export const SongsComponent = (element: HTMLElement, { artistId, page }) => {
  const songs = {
    total: 0,
    list: [],
    filteredList: [],
    isLoading: true,
  };

  const render = () => {
    const totalPages = Math.round((songs.total / (songsLimit * page));

    element.innerHTML = template({
      songs,
      page: totalPages > 1 ? page + 1 : null,
      artistId,
    });
  };

  const getFilteredList = (list, text: string = "") => {
    const cleanedText = text.toLowerCase().trim();

    return cleanedText
      ? list.filter((song) => {
          return (
            song.title.toLowerCase().includes(cleanedText) ||
            song.album.title.toLowerCase().includes(cleanedText)
          );
        })
      : list;
  };

  const loadTracks = async () => {
    const tracks = await fetch(
      `http://localhost:3000/api/artist/${artistId}/top?limit=${songsLimit}&index=${
        (page - 1) * songsLimit
      }`
    ).then((r) => r.json());
    songs.list = tracks.data;
    songs.filteredList = getFilteredList(songs.list);
    songs.isLoading = false;
    songs.total = tracks.total;

    render();
  };

  loadTracks();

  const component = {
    filter: (text: string) => {
      songs.filteredList = getFilteredList(songs.list, text);
      render();
    },
  };

  return component;
};
