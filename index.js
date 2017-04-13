module.exports = update => {

  let placeholders = {};

  function addObserver(id) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(node => {
          if (node.getAttribute && node.getAttribute('data-lr')) {
            if (!node.getAttribute('id')) {
              throw new Error('Could not create an update event for component, id is missing: ', node);
            }
            const updateType = node.getAttribute('id') + node.getAttribute('data-lr').slice(0, 1).toUpperCase() + node.getAttribute('data-lr').slice(1);
            update({ matchValue : window.location.pathname, updateType });
          }
        });
      });
    });

    // pass in the target node, as well as the observer options
    observer.observe(document.querySelector(id), { attributes : false, childList : true, subtree : false });
    placeholders[id] = observer;
  }

  const exposed = {
    render(html, id) {
      if (!placeholders[id]) {
        addObserver(id);
      }
      if (!document.querySelector(id)) {
        throw new Error(`Trying to render, but could not find placeholder ${ id }`);
      }
      document.querySelector(id).innerHTML = html;
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    [].slice.call(document.querySelectorAll('[data-lr="loaded"]')).forEach(component => {
      if (!component.getAttribute('id')) {
        throw new Error('Found component, but id is missing: ', component);
      }
      update({ matchValue : window.location.pathname, updateType : component.getAttribute('id') + 'Loaded' });
    });
  });

  return exposed;
};
