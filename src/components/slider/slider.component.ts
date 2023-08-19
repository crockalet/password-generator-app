import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TailwindElement } from "../../shared/tailwind.element";
import { Ref, createRef, ref } from "lit/directives/ref.js";

import styles from "./slider.component.css?inline";

@customElement("app-slider")
export class Slider extends TailwindElement(styles) {
  @property({ type: Number }) value: number = 50;
  @property({ type: Number }) min: number = 0;
  @property({ type: Number }) max: number = 100;
  @property({ type: String }) label: string = "Slider";
  @property({ type: String }) name: string = "slider";

  inputRef: Ref<HTMLInputElement> = createRef();

  updateValue(e: Event) {
    this.dispatchEvent(
      new CustomEvent("change-slider", {
        detail: parseInt((e.target as HTMLInputElement).value),
      })
    );
  }

  render() {
    return html`
      <div class="w-full">
        <div class="flex flex-row justify-between items-center">
          <p class="text-almost-white text-body">Character Length</p>
          <p class="text-heading-l text-neon-green">${this.value}</p>
        </div>

        <input
          ${ref(this.inputRef)}
          value="${this.value}"
          min="${this.min}"
          max="${this.max}"
          type="range"
          @input=${this.updateValue}
          class="slider w-full mt-4"
          .id=${this.name}
        />

        <label for=${this.name} class="sr-only">${this.label}</label>
      </div>
    `;
  }
}
