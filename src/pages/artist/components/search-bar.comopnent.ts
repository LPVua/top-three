import style from "./search-bar.module.css";

/**
 * Search Icon
 */
const searchIcon = ({ className }) =>
  `<?xml version="1.0" ?><svg enable-background="new 0 0 32 32" id="Editable-line" class="${className}" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="14" cy="14" fill="none" id="XMLID_42_" r="9" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><line fill="none" id="XMLID_44_" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="27" x2="20.366" y1="27" y2="20.366"/></svg>`;

/**
 * Search bar component template
 */
const template = () => `
  <div class="${style["search-bar"]}">
    ${searchIcon({ className: style["search-bar__search-icon"] })}
    <input class="js-search-input ${
      style["search-bar__input"]
    }" type="text" placeholder="Filter by song or album.."/>
  </div>
`;

type SearchBarComponentProps = {
  /**
   * Handle search
   * @param text - search text
   */
  onSearch(text: string): void;
};

/**
 * Search Bar Component
 *
 * @param element - Element to render component in
 * @param props
 */
export const SearchBarComponent = (
  element: HTMLElement,
  { onSearch = () => {} }: SearchBarComponentProps
) => {
  element.innerHTML = template();

  element.querySelector(".js-search-input").addEventListener("input", (e) => {
    onSearch((e.target as HTMLInputElement).value);
  });
};
