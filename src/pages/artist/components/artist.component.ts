import style from "./artist.module.css";

const template = ({ artist }) =>
  !artist
    ? `<div class="${style["artist"]}">
      <div class="${style["artist__picture-loader"]}"></div>
      <div class="${style["artist__content-loader"]}"
    </div>`
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

export const ArtistComponent = (element: HTMLElement, { artistId }) => {
  let artist = null;
  element.innerHTML = template({ artist });
  const loadArtist = async () => {
    try {
      artist = await fetch(
        "http://localhost:3000/api/artist/" + artistId
      ).then((r) => r.json());

      element.innerHTML = template({ artist });
    } catch (e) {}
  };

  loadArtist();
};
