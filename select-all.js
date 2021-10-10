import { LitElement, html } from 'lit-element';

export class SelectAllToggle extends LitElement {

  render() {
    return html`
        <slot name="select-all">
          <a href="#">Select All</a>
        </slot>
        <slot></slot>
    `;
  }

  get selectAll() {
    return this.shadowRoot.querySelector('slot[name="select-all"]').assignedElements({flatten: true});
  }

  firstUpdated() {
    this.selectAll.forEach(x => x.addEventListener('click', this.toggleChecked.bind(this)))
  }

  allCheckboxes() {
    return this.shadowRoot.querySelector('slot:not([name])')
      .assignedElements({ flatten: true })
      .flatMap(x => Array.from(x.querySelectorAll("input[type=checkbox]")))
  }

  toggleChecked(e) {
    if (e.target.checked !== undefined)
    {
      e.target.checked ? this.checkAll() : this.uncheckAll();
    } else {
      e.preventDefault();
      this.checkAll();
    }
  }

  checkAll(e) {
    this.allCheckboxes().forEach(input => input.checked = true)
  }

  uncheckAll(e) {
    this.allCheckboxes().forEach(input => input.checked = false)
  }
}

customElements.define('select-all', SelectAllToggle);
