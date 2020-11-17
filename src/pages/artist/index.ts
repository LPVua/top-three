import style from "./style.module.css";
import { ArtistComponent } from "./components/artist.component";
import { SongsComponent } from "./components/songs.component";
import { SearchBarComponent } from "./components/search-bar.comopnent";

const backIcon = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M10.1 23a1 1 0 000-1.41L5.5 17h23.55a1 1 0 000-2H5.53l4.57-4.57A1 1 0 008.68 9l-6.36 6.37a.9.9 0 000 1.27L8.68 23a1 1 0 001.42 0z"/></svg>`;

const template = ({ page, artistId }) => `
${`
  <a class="${style["back-button"]}" href="${
  page > 1 ? `/artist/${artistId}?page=${page - 1}` : "/"
}">${backIcon()}</a>

  <div class="js-artist"></div>
  <div class="${style["latest-songs"]}">
    <h2 class="${style["latest-songs__title"]}">Latest Songs</h2>
    <div class="js-search-bar"></div>
    <div class="js-songs"></div>
  </div>
`}
`;

export const artistPage = (appElement: HTMLElement) =>
  function () {
    appElement.innerHTML = template({
      page: Number(this.page || 1),
      artistId: this.artistId,
    });

    const songs = SongsComponent(appElement.querySelector(".js-songs"), {
      artistId: this.artistId,
      page: Number(this.page) || 1,
    });

    ArtistComponent(appElement.querySelector(".js-artist"), {
      artistId: this.artistId,
    });
    SearchBarComponent(appElement.querySelector(".js-search-bar"), {
      onSearch: (text) => songs.filter(text),
    });
  };
