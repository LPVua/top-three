import artists from "./artists.json";

export const homePage = (appElement: HTMLElement) =>
  function () {
    const template = () => `
    <div class="artists">
      ${artists
        .map(
          (artist) => `
        <a class="js-artist artist" data-artist-id="${artist.id}" href="/artist/${artist.id}">
          <div class="artist__picture">
            <img src="${artist.picture_medium}" alt="${artist.name}" />
          </div>
          <p class="artist__name">${artist.name}</p>
        </a>
      `
        )
        .join("")}
    </div>
  `;

    appElement.innerHTML = template();
  };
