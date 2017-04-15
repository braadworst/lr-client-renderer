# lr-client-renderer reference

A Lagoon road extension that gives you renderer functionality on the client. This renderer does quick replacement and doesn't do virtual dom html difference changes. It should suffice for about 95% of all cases. When you start working more with a websocket pub/sub system you might want to consider writing your own renderer or use a virtual dom approach so user input will not get replaced on dom updates. Read more about writing extensions in the [guide](https://lagoonroad.com/guide).

> The client side renderer sends out update events whenever a component has been added to the DOM. See the [guide](https://lagoonroad.com/guide/working-with-dom-events) to understand how to implement this.

| Information | - |
| ----------- | - |
| Code coverage | - |
| Repo link | [lr-client-renderer](https://github.com/lagoon-road/lr-client-renderer) |
| Dependencies | - |
| Size (Browserify, Babel and Gzip)| 851 bytes |
| Version | 1.0.0 |
| License | MIT |
| Usage | [guide](https://lagoonroad.com/guide) |

---

### Adding the extension to lagoon road

```
const router   = require('lr-client-renderer');
const core     = require('lr-core');
const road     = core('client')
  .extension('renderer', renderer, true);
```

---

### renderer.render(html, placeholder)
```
renderer.render('<section>...</section>', '.placeholderName');
```

_Add component to the template._

**html:string**  
The components html that you want to load.

**placeholder:string**  
A html selector that should be the parent of the html you want to add. The contents of the placeholder will be replaced with the new html.
