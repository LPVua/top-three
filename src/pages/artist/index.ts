import style from "./style.module.css";
import { ArtistComponent } from "./components/artist.component";
import { SongsComponent } from "./components/songs.component";
import { SearchBarComponent } from "./components/search-bar.comopnent";

const backIcon = () =>
  `<?xml version="1.0" ?><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"/></g></svg>`;

const template = () => `
${`
  <a class="${style["back-button"]}" href="/">${backIcon()}</a>

  <div class="js-artist"></div>
  <div class="${style["latest-songs"]}">
    <h2 class="${style["latest-songs__title"]}">Latest Songs</h2>
    <div class="js-search-bar"></div>
    <div class="js-songs ${style["songs"]}"></div>
  </div>
`}
`;

export const artistPage = (appElement: HTMLElement) =>
  function () {
    appElement.innerHTML = template();

    const songs = SongsComponent(
      appElement.querySelector(".js-songs")
    ).setArtistId(this.artistId);

    ArtistComponent(appElement.querySelector(".js-artist")).setArtistId(
      this.artistId
    );
    SearchBarComponent(appElement.querySelector(".js-search-bar"), {
      onSearch: (text) => songs.filter(text),
    });
  };
