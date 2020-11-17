import { fetchArtist } from "../../../services/artist";
import style from "./artist.module.css";

/**
 * Artist Component Template
 */
const template = ({ artist }) =>
  !artist
    ? `
      <div class="${style["artist"]}">
        <div class="${style["artist__picture-loader"]}"></div>
        <div class="${style["artist__content-loader"]}"
      </div>
    `
    : `
      <div class="${style["artist"]}">
        <div class="${style["artist__picture"]}">
          <img src="${artist.picture_big}" alt="${artist.name}" />
        </div>
        <div class="${style["artist__content"]}">
          <h1 class="${style["artist__name"]}">${artist.name}</h1>
          <div class="${style["artist__albums"]}">Albums: ${artist.nb_album}</div>
          <div class="${style["artist__fans"]}">Fans: ${artist.nb_fan}</div>
        </div>
      </div>
    `;

/**
 * Artist Component
 */
export const ArtistComponent = (element: HTMLElement, { artistId }) => {
  let artist = null;

  const render = () => {
    element.innerHTML = template({ artist });
  };

  render();

  /**
   * Load artist
   */
  const loadArtist = async () => {
    try {
      artist = await fetchArtist({ artistId });

      render();
    } catch (e) {
      // TODO: log message into newrelic or sentry or datadog instead
      console.error(e.message);
    }
  };

  loadArtist();
};
