import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { TailwindElement } from "../shared/tailwind.element";

import styles from "../shared/tailwind.global.css";

import { Strength } from "enums/Strength";

import "../components/slider/slider.component";
import "../components/password-strength/password-strength.component";
import "../components/checkbox/checkbox.component"
import "../components/button/button.component"
import "../components/input/input.component"

@customElement("home-page")
export class Home extends TailwindElement(styles) {
  @state() protected value: Strength = 'too_weak';
  @state() protected password: string = '';

  _changeStrength() {
    this.value = {
      too_weak: 'weak',
      weak: 'medium',
      medium: 'strong',
      strong: 'too_weak',
    }[this.value] as Strength;
  }

  private _handleInput(e: CustomEvent) {
    this.password = e.detail;
  }

  render() {
    return html`
      <div class="w-full min-h-screen bg-very-dark-gray text-almost-white md:text-body">
        <div class="w-full max-w-[33.75rem] mx-auto p-4 flex flex-col gap-y-4 md:gap-y-6 justify-center items-center min-h-screen">
          <p class="md:text-heading-m text-grey">Password Generator</p>

          <div class="w-full">
            <app-input placeholder="P4$5W0rD!" 
              .value="${this.password}" 
              @change-input="${this._handleInput}">
            </app-input>
          </div>

          <div class="bg-dark-gray p-4 md:p-8 md:pt-6 w-full">
            <app-slider></app-slider>

            <div class="mt-8 flex flex-col gap-y-5">
              <app-checkbox label="Include Uppercase Letters"></app-checkbox>
              <app-checkbox label="Include Lowercase Letters"></app-checkbox>
              <app-checkbox label="Include Numbers"></app-checkbox>
              <app-checkbox label="Include Symbols"></app-checkbox>
            </div>

            <div class="mt-8 bg-very-dark-gray p-4 md:px-8 md:py-6">
              <password-strength value="${this.value}"></password-strength>
            </div>

            <div class="mt-8">
              <app-button>
                Generate
                <svg slot="icon" class="w-3 h-3" viewBox="0 0 12 12">
                  <path d="M5.10547 12L11.1054 6.00002L5.10547 0L3.84045 1.26501L7.68094 5.10547L0 
                    5.10547V6.8946L7.68094 6.8946L3.84045 10.735L5.10547 12Z" fill="currentColor"/>
                </svg>
              </app-button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
