import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from '../../shared/tailwind.element';
import { Ref, createRef, ref } from "lit/directives/ref.js";

import style from './input.component.css?inline'
import { debounce } from '../../helpers/debounce';

@customElement('app-input')
export class Input extends TailwindElement(style) {
  @property({ type: String }) placeholder: string;
  @property({ type: String }) value: string;

  inputRef: Ref<HTMLInputElement> = createRef();

  focus() {
    this.inputRef.value?.focus();
  }

  _handleInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  render() {
    return html`
      <div @click=${this.focus} class="flex items-center justify-between cursor-text bg-dark-gray py-4 px-8">
        <input
          ${ref(this.inputRef)} 
          type="text" 
          .placeholder=${this.placeholder ?? ""} 
          .value=${this.value ?? ''}
          @input=${this._handleInput}
        />

        <slot name="suffix"></slot>
      </div>
    `;
  }
}
