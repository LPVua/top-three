import style from "./artist.template.module.css";

export const artistTemplate = ({ artist }) =>
  !artist
    ? `<div>Loading</div>`
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
