import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from '../../shared/tailwind.element';

import style from './button.component.css?inline'

@customElement('app-button')
export class Button extends TailwindElement(style) {
  @property({ type: String }) label = 'Button';

  render() {
    return html`
      <button class="bg-neon-green text-dark-gray uppercase p-5 border-2 border-neon-green
        w-full flex items-center justify-center gap-x-6
        transition-colors duration-200 ease-out
        hover:bg-dark-gray hover:text-neon-green"
        @click=${() => this.dispatchEvent(new Event('onClick'))}>
        <slot>${this.label}</slot>
        <slot name="icon"></slot>
      </button>
    `;
  }
}
