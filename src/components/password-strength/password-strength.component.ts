import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from "../../shared/tailwind.element";

import styles from "./password-strength.component.css?inline";
import { Strength } from 'enums/Strength';

const STRENGTH_LABEL: Record<Strength, string> = {
  too_weak: 'Too Weak!',
  weak: 'Weak',
  medium: 'Medium',
  strong: 'Strong',
};

@customElement('password-strength')
export class PasswordStrength extends TailwindElement(styles) {
  @property({ type: String }) value: Strength;

  render() {
    return html`
      <div class="flex justify-between items-center">
        <p class="uppercase text-grey">Strength</p>

        <div class="flex items-center gap-x-4">
          <p class="uppercase text-almost-white">${STRENGTH_LABEL[this.value]}</p>

          <div class="flex gap-x-2 items-stretch relative">
            ${[...Array(4).keys()].map((_, i) => 
              html`<div class="h-[28px] w-[10px] border-2 border-almost-white"></div>`
            )}

            <div class="bar ${this.value} h-[28px] bg-clip-border absolute inset-0 bg-slate-600 transition-[width,background-color] ease-in"></div>
          </div>

          <svg width="0" height="0" class="sr-only">
            <defs>
              <clipPath id="clip-path">
                <rect x="0" width="10.5" height="28" />
                <rect x="18" width="10.5" height="28" />
                <rect x="36" width="10.5" height="28" />
                <rect x="54" width="10.5" height="28" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    `;
  }
}
