import style from "./style.module.css";

export const artistPage = (appElement: HTMLElement) =>
  function () {
    const state = {
      artist: null,
    };
    const template = ({ artist }) => `
      ${
        !artist
          ? `
          <div>Loading</div>
          `
          : `
        <div class="${style["artist"]}">
          <div class="${style["artist__picture"]}">
            <img src="${artist.picture_medium}" alt="${artist.name}" />
          </div>
          <div>
            <div class="${style["artist__name"]}">${artist.name}</div>
            <div class="${style["artist__albums"]}">Albums: ${artist.nb_album}</div>
            <div class="${style["artist__fans"]}">Fans: ${artist.nb_fan}</div>
          </div>

        </div>
      `
      }
    `;
    document.addEventListener("app.render", () => {
      appElement.innerHTML = template(state);
    });
    const renderEvent = new Event("app.render");
    document.dispatchEvent(renderEvent);
    const loadArtist = async () => {
      try {
        state.artist = await fetch(
          "http://localhost:3000/api/artist/" + this.artistId
        ).then((r) => r.json());
        document.dispatchEvent(renderEvent);
        const tracks = await fetch(
          "http://localhost:3000/api/artist/" +
            state.artist.id +
            "/top?limit=25"
        ).then((r) => r.json());
        console.log(tracks);
      } catch (e) {}
    };

    loadArtist();
  };
