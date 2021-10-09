---
marp: true
---
<!-- paginate: true -->

# Using Web Components Well

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
  * HTML Templates
  * ES Modules
  * *Custom Events*
---
# The spooooky Shadow DOM
## A DOM within a DOM
## No CSS goes in or out
## Unless you want it to :)
## Lit renders into one by default
---
# Shadow DOM Example
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
# Different jobs...
## Server-rendered (with or without magic)
## Design Systems
## SPAs
## Micro-apps (3rd party js)
---
# ...need different tools
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
## Associate a `tag-name` w/ `customElements.define`
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
# Some help you might want...
## Attribute/property handling
* Serializing/Deserializing
* Re-rendering on change
## Template language
## Rendering into a Shadow DOM
---
# How to choose tho?
## There are [*soo* many options] but they are [easy to try]
## Performance
## Templating language (JSX/ES6 template literal)
## Design preferences (class/functional/hooks)
---
# My current favorite: Lit
## Started by Google
## Lessons learned from Polymer
## Simple and lightweight
---
# Let's try Lit!
---

# Server Rendered Renaissance
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
# LitGoogleMaps to the rescue!
## `<lit-google-map>`
* displays a map (you may have guessed that)
* emits a `bounds_changed` event when the user pans
## `<lit-google-map-marker>`
* nest these inside the map element to display pins
---
# Let's see it!
---
# Ideas that have worked well..
## Props/attributes for inbound
## Events for outbound
---
# And not as much...
## Components with complex internal state
---
# Slots
## Feature of Shadow DOM
## Let's you render custom element children
## Allows you to build container elements
---
# Specifics
## `<slot><slot>` element renders content from main (light) DOM inside shadow DOM
## `<slot name='foo></slot>` allows for multiple named slots

---
# Toggle menu example
---
# HTML elements that should exist but don't (yet)
---
# `<select-all-toggle>`
---
# But some things you (almost) always need
## Test runner: @web/test-runner
## ~~Build tool~~
## Dev server: @web/dev-server
## Starter kit: `npm init open-wc`
---
# Another example: It's about time
## Time zones are a thing
## What if we could make them go away?
(or at least not be *our* problem)

---

# `datetime-utc-elements`
## Let's you store datetimes as UTC
## User interacts with them in their local timezone
## Too simple? Maybe?

---

# `<datetime-utc-output>`

