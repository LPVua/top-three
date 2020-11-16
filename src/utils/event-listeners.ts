export const eventListeners = (listeners) => {
  return {
    attach: (element: HTMLElement) => {
      Object.keys(listeners).forEach((selector) => {
        Object.keys(listeners[selector]).forEach((eventName) => {
          element.querySelectorAll(selector).forEach((element) => {
            element.removeEventListener(
              eventName,
              listeners[selector][eventName]
            );
            element.addEventListener(eventName, listeners[selector][eventName]);
          });
        });
      });
    },
  };
};
