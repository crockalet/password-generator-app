import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from "../shared/tailwind.element";

@customElement('app-slider')
export class Slider extends TailwindElement() {
  @property({ type: Number }) value: number = 50;
  @property({ type: Number }) min: number = 0;
  @property({ type: Number }) max: number = 100;

  render() {
    return html`
      <div>
        <div class="flex flex-row justify-between">
          <p class="text-almost-white">Character Length</p>
          <p>${this.value}</p>
        </div>
        <input type="range">
      </div>
    `;
  }
}
