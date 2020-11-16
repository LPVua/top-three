import { eventListeners } from "../../utils/event-listeners";
import style from "./style.module.css";
import { artistTemplate } from "./templates/artist.template";
import { songsTemplate } from "./templates/songs.component";

const renderEvent = new Event("app.render");

const template = ({ artist, songs }) => `
${`
  ${artistTemplate({ artist })}
  <div class="${style["latest-songs"]}">
    <h2 class="${style["latest-songs__title"]}">Latest Songs</h2>
    <div class="js-songs"></div>
    ${songsTemplate({ songs })}
  </div>
`}
`;

export const artistPage = (appElement: HTMLElement) =>
  function () {
    const state = {
      artist: null,
      songs: {
        page: 1,
        list: [],
        filteredList: [],
        isLoading: true,
      },
    };

    const listeners = eventListeners({
      ".js-search-input": {
        input: (e: InputEvent) => {
          console.log((e.target as HTMLInputElement).value);
        },
      },
    });

    document.addEventListener("app.render", () => {
      appElement.innerHTML = template(state);
      listeners.attach(appElement);
    });
    document.dispatchEvent(renderEvent);

    const loadArtist = async () => {
      try {
        state.artist = await fetch(
          "http://localhost:3000/api/artist/" + this.artistId
        ).then((r) => r.json());
        document.dispatchEvent(renderEvent);
      } catch (e) {}
    };

    const loadTracks = async () => {
      const tracks = await fetch(
        "http://localhost:3000/api/artist/" + this.artistId + "/top?limit=25"
      ).then((r) => r.json());
      state.songs.list = tracks.data;
      state.songs.filteredList = tracks.data;
      state.songs.isLoading = false;
      document.dispatchEvent(renderEvent);
    };

    Promise.all([loadArtist(), loadTracks()]);
  };
