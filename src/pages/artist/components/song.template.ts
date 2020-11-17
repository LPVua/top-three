import style from "./song.module.css";

/**
 * Song template
 * @param song - Song to display
 */
export const songTemplate = (song) => {
  return `<div class="${style["song"]}">
    <div class="${style["song__cover"]}">
      <img src="${song.album.cover_small}" />
    </div>
    <div class="${style["song__content"]}">
      <a href="${song.link}" class="${style["song__title"]}">${song.title}</a>
      <div class="${style["song__album-title"]}">${song.album.title}</div>
    </div>
  </div>`;
};
