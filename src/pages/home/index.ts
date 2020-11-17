import artists from "./artists.json";
import style from "./index.module.css";

export const homePage = (appElement: HTMLElement) =>
  function () {
    const template = () => `
      <div class="${style["home"]}">
        <div class="${style["artists"]}">
          ${artists
            .map(
              (artist) => `
            <a class="js-artist ${style["artist"]}" href="/artist/${artist.id}">
              <div class="${style["artist__picture"]}">
                <img src="${artist.picture_medium}" alt="${artist.name}" />
              </div>
              <p class="${style["artist__name"]}">${artist.name}</p>
            </a>
          `
            )
            .join("")}
        </div>
      </div>
  `;

    appElement.innerHTML = template();
  };
