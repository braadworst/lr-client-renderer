module.exports = update => {

  let placeholders = {};

  function addObserver(id) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'lg-placeholder') {
          update({ matchValue : window.location.pathname, updateType : 'domReady' });
        }
      });
    });

    // pass in the target node, as well as the observer options
    observer.observe(document.querySelector(id), { attributes : true, childList : false, subtree : false });
    placeholders[id].observer = observer;
  }

  const exposed = {
    render(html, id) {
      if (placeholders[id] && placeholders[id].observer) {
        placeholders[id].observer.disconnect();
      }
      placeholders[id] = { html };
    },
    html() {
      Object
        .keys(placeholders)
        .filter(id => placeholders[id].html)
        .forEach(id => {
          if (!document.querySelector(id)) {
            throw new Error(`Trying to render, but could not find placeholder ${ id }`);
          }
          addObserver(id);
          document.querySelector(id).innerHTML = placeholders[id].html;
          document.querySelector(id).setAttribute('lg-placeholder', id);
          delete placeholders[id].html;
        });
    }
  }

  return exposed;
};
