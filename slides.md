---
marp: true
---
<!-- paginate: true -->

# Using Web Components Well
Chris Nelson
chris@gaslight.co
@superchris

---

# Agenda
### A brief (re)-intro to Web Components
### Scenarios
### Approaches
### Lots of examples
---

# Web Components: What are they?

##  Several specs that work together:
  * Custom Elements
  * Shadow DOM
  * *Custom Events*
---
# Frameworks come and go but the platform evolves
---
# Browser support has [arrived](https://chromestatus.com/metrics/feature/timeline/popularity/1689)
---
# All the cool kids are doing it!
## Apple
## Github
## Microsoft
## Salesforce
## SAP 
---
# It is early times
## We are just beginning to understand what we can do with them
## I am excite!
---
# Different jobs
## SPAs
## Server-rendered (with or without magic)
## Design Systems
## Micro-apps (3rd party js)
---
# Different approaches
## VanillaJS HTMLElement
## Libraries (Lit, FAST)
## Compilers (Stencil, SolidJS, Svelte)
## Framework wrappers (Angular, Vue)
---

# Custom Elements
## Extend `HTMLElement`
## Implement lifecycle methods
* connectedCallback
* adoptedCallback
* disconnectedCallback
* attributeChanged
## `customElements.define`
Associates a `tag-name` with a class

---
# Custom Events
## `name`
## `detail` - an arbitrary payload
## `bubbles` - can be caught by parents
## `composed` - can leave a Shadow DOM
---

# Real-world VanillaJS: Mobile navigation

---

# Two elements:
## `<nav-bar>`
## `<nav-mobile-toggle>`

---
# `<nav-mobile-toggle>`
```javascript
class NavMobileToggle extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("toggle-menu", {bubbles: true})
      );
    });
  }
}

customElements.define('nav-mobile-toggle', NavMobileToggle);
```
---
# `<nav-bar>`
```javascript
export class NavBar extends HTMLElement {
  connectedCallback() {
    this.addEventListener("toggle-menu", (e) => {
      this.classList.toggle("open");
    }, true);
  }
}

customElements.define('nav-bar', NavBar);
```
---
# What's not here
* A lot of code
* Any framework or library
* Shadow DOM
* Client-side rendering
* Server interaction
---

# Server Rendered++
## Server rendered with live updates over WebSockets
## LiveView (Elixir and Phoenix)
## HotWire (Ruby and Rails)
## Blazor Server (.NET)

---
## A brief history of pendulum swings

* Dumb terminals
* Client-server
* Web 1.0 (server rendered apps)
* SPAs
* (You are here!)
---
# SRAs and Web Components
## SRAs are already good at HTML
## Custom elements are a great way to add capabilities
---
# SRA Example: Map
## We want to...
* Render a map
* Display pins from a DB search within displayed area
* Search again when the user pans
---

# Demo

---
# LitGoogleMaps to the rescue!
## `<lit-google-map>`
* displays a map (you may have guessed that)
* emits a `bounds_changed` event when the user pans
## `<lit-google-map-marker>`
* nest these inside the map element to display pins
---

# Handling Custom Events
## We need to make our server app aware of `bounds_changed`
## How to do this is framework specific

---
# The spooooky Shadow DOM
## Encapsulated DOM within a DOM
## `querySelector` from outside DOM will not see inside
## No CSS goes in or out
## Unless you want it to :)
## Libraries often render into one by default
---
# How to Shadow DOM
## `Element.attachShadow({mode: 'open'})`
Creates an `open` Shadow DOM. This gives you:
## `Element.shadowRoot`
Once created, this is how you access it
---
# [Shadow DOM Example](./shadow-dom.html)
---
# Slots
## Feature of Shadow DOM
## Let's you render custom element children
## Allows you to build container elements
---
# Specifics
## `<slot><slot>` 
In a Shadow DOM, renders content from main (light) DOM inside shadow DOM
## `<slot name="foo"></slot>`
Same as above but renders a named slot
### In children of custom element, use a`slot` attribute to fill a named slot
```html
<custom-element>
  I am in the default, un-named slot
  <div slot="foo">I am in the slot named foo</div>
</custom-element>
```
---
# [Simple slot example](./gray-box.html)
---
# Shadow Parts
## Let's you choose what can be styled
## `part` attribute in Shadow DOM
## `::part(partName)` selector in CSS
## Supported in modern browsers
---
# [Shadow Part example](./shadow-part.html)
---
# Some help you might want...
## Attribute/property handling
* Serializing/Deserializing
* Re-rendering on change
## Template language
## Rendering into a Shadow DOM
---
# How to choose tho?
## There are [*soo* many options]() but they are [easy to try](https://webcomponents.dev)
## Performance
## Templating language (JSX/ES6 template literal)
## Design preferences (class/functional/hooks)
---
# My current favorite: Lit
## Started by Google
## Lessons learned from Polymer
## Simple and lightweight
---

# Putting it all together: [`<select-all-toggle>`](select-all.html)

---

# Design systems
## There are a lot based on Custom Elements
## FAST - MS
## Carbon - IBM
## UI5 - SAP
## Everyone else...
---
# Trying them out is pretty [easy...](https://backlight.dev/)
---
# SPAs
## Lots of options
## Framework or Librar(y|ies)
## Check out [Custom Elements Everywhere](https://custom-elements-everywhere.com)
## Custom element "wrappers" are a thing
---

# Microapps
## What you used to do with third party javascript, you can do better with Custom Elements

---

# Example: Adding a feedback form

---
# The conventional approach
## Add a `<script>` tag to your page
## Limited if any control over look and feel
## Entirely proprietary
---
# Custom Element micro-apps
## You can have complete control over styling
## Plain ole' HTML and CSS
---
# Demo
---
# Some things you (almost) always need
## Test runner: @web/test-runner
## ~~Build tool~~
## Dev server: @web/dev-server
## Starter kit: `npm init open-wc`
---
# Starter project with tests
---
# Some Final Thoughts
## Think in terms of HTML Elements that should exist but don't
## Use attributes or properties to pass data in
## Use (Custom) Events to send data out
## Use Shadow DOM, slots, and parts to build powerful, flexible elements
---
# Final(er) Thoughts
## Test your Custom Elements
## Simpler is always better
## Choose a library that fits
---

