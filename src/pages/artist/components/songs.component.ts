import { fetchTracks } from "../../../services/artist";
import { songLoaderTemplate } from "./song-loader.template";
import { songTemplate } from "./song.template";
import style from "./songs.module.css";

type SongsComponentConfig = {
  /**
   * Artist id
   */
  artistId: string;

  /**
   * Current page
   */
  page: number;
};

/**
 * Songs component template
 */
const template = ({ songs, artistId, page }) => {
  if (songs.isLoading) {
    return `<div class="${style.songs}">${[1, 2, 3, 4]
      .map(songLoaderTemplate)
      .join("")}</div>`;
  }

  return `<div class="${style.songs}">
    ${songs.filteredList.map(songTemplate).join("")}
  </div>
   ${
     page
       ? `
    <a href="/artist/${artistId}?page=${page}" class="${style["songs__pagination"]}">
      Next Page
    </a>
`
       : ""
   }`;
};

const songsLimit = 25;

/**
 * Songs component
 */
export const SongsComponent = (
  element: HTMLElement,
  { artistId, page }: SongsComponentConfig
) => {
  const songs = {
    total: 0,
    list: [],
    filteredList: [],
    isLoading: true,
  };

  /**
   * Render template
   */
  const render = () => {
    const totalPages = Math.round(songs.total / (songsLimit * page));

    element.innerHTML = template({
      songs,
      page: totalPages > 1 ? page + 1 : null,
      artistId,
    });
  };

  render();

  /**
   * Returns list of filtered elements
   * @param list - List to filter
   * @param text - Text to filter list by
   */
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

  /**
   * Load tracks
   */
  const loadTracks = async () => {
    const tracks = await fetchTracks({ artistId, page, songsLimit });
    songs.list = tracks.data;
    songs.filteredList = getFilteredList(songs.list);
    songs.isLoading = false;
    songs.total = tracks.total;

    render();
  };

  loadTracks();

  const component = {
    /**
     * Frontend filter of songs list (filters only current page)
     */
    filter: (text: string) => {
      songs.filteredList = getFilteredList(songs.list, text);
      render();
    },
  };

  return component;
};
