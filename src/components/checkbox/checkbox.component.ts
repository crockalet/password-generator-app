import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from '../../shared/tailwind.element';
import style from './checkbox.component.css?inline'

@customElement('app-checkbox')
export class Checkbox extends TailwindElement(style) {
  @property({ type: Boolean }) checked: boolean = false;
  @property({ type: String }) label: string = '';
  @property({ type: String }) name: string = 'checkbox';
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: String }) id: string = '';

  _handleClick() {
    if (!this.disabled) {
      this.dispatchEvent(
        new CustomEvent(
          'change-checkbox',
          { detail: !this.checked }
        )
      )
    }
  }

  render() {
    return html`
      <div @click=${this._handleClick} class="flex items-center gap-x-6 hover:cursor-pointer group/checkbox">
        <div class="relative">
            <input type="checkbox"
              .checked=${this.checked}
              name=${this.name}
              .id=${this.name} />

            <svg class="bg-neon-green text-dark-gray absolute inset-0 pointer-events-none transition-all will-change-transform ease-out ${this.checked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}" 
              viewBox="0 0 20 20" fill="none">
              <path d="M4 10.6066L7.39341 14L15.3934 6" stroke="currentColor" stroke-width="3"/>
            </svg>
        </div>

        <label for=${this.name} class="text-almost-white pointer-events-none">${this.label}</label>
      </div>
    `;
  }
}
