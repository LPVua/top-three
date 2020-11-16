import style from "./song.template.module.css";

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
