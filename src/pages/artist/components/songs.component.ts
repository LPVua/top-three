import { songLoaderTemplate } from "./song-loader.template";
import { songTemplate } from "./song.template";
import style from "./songs.module.css";

const template = ({ songs }) => {
  if (songs.isLoading) {
    return [1, 2, 3, 4].map(songLoaderTemplate).join("");
  }

  return songs.filteredList.map(songTemplate).join("");
};

export const SongsComponent = (element: HTMLElement) => {
  const songs = {
    page: 1,
    list: [],
    filteredList: [],
    isLoading: true,
  };
  let artistId = null;

  element.innerHTML = template({ songs });

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
      "http://localhost:3000/api/artist/" + artistId + "/top?limit=25"
    ).then((r) => r.json());
    songs.list = tracks.data;
    songs.filteredList = getFilteredList(songs.list);
    songs.isLoading = false;

    element.innerHTML = template({ songs });
  };

  const component = {
    filter: (text: string) => {
      songs.filteredList = getFilteredList(songs.list, text);
      element.innerHTML = template({ songs });
    },
    setArtistId: (id: string) => {
      artistId = id;

      loadTracks();

      return component;
    },
  };

  return component;
};
