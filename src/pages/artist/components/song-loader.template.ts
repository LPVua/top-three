import style from "./song-loader.module.css";

/**
 * Song loader template
 */
export const songLoaderTemplate = () => `<div class="${style["song-loader"]}">
  <div class="${style["song-loader__picture"]}"></div>
  <div class="${style["song-loader__content"]}"></div>
</div>`;
