import { html } from 'lit-element';
import '@vaadin/vaadin-menu-bar';

import { GdwcMenu } from '@gdwc/components/gdwc-menu/gdwc-menu.js';

export class GdwcVaadinMenuBar extends GdwcMenu {
  transformMenuTree(tree) {
    const treeItems = tree.map(item => {
      const title = item?.link?.attributes?.title;
      const children = item?.children;

      if (children.length) {
        return { text: title, children: this.transformMenuTree(children) }
      }
      return { text: title }
    })
    return treeItems;
  }

  render() {
    return html`
      <slot name="brand"><h2>${this.branding}</h2></slot>
      <vaadin-menu-bar open-on-hover items=${JSON.stringify(this.transformMenuTree(this.tree))}></vaadin-menu-bar>

    `;
  }
}

customElements.get('gdwc-vaadin-menu-bar') ||
  customElements.define('gdwc-vaadin-menu-bar', GdwcVaadinMenuBar);
