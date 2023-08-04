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

  _changeStrength() {
    this.value = {
      too_weak: 'weak',
      weak: 'medium',
      medium: 'strong',
      strong: 'too_weak',
    }[this.value] as Strength;
  }

  render() {
    return html`
      <div
        class="w-full min-h-screen bg-very-dark-gray text-almost-white text-body"
      >
        <!-- <p>
          Password Generator P4$5W0rD! Character Length Include Uppercase
          Letters Include Lowercase Letters Include Numbers Include Symbols
          Strength Generate
        </p> -->

        <div class="w-full p-8 flex justify-center items-center">
          <div class="w-[33.75rem] bg-dark-gray p-4">
            <app-slider> </app-slider>
            
            <div class="mt-8">
              <password-strength .value=${this.value}>
              </password-strength>
            </div>

            <div class="mt-8">
              <app-checkbox label="Include Uppercase Letters" checked disabled></app-checkbox>
              <app-checkbox label="Include Lowercase Letters"></app-checkbox>
            </div>

            <div class="mt-8">
              <app-button @onClick=${console.log}>Test</app-button>
            </div>

            <button @click=${this._changeStrength} class="mt-8 w-full bg-almost-white text-dark-gray p-4">
              Test
            </button>
          </div>
        </div>

        <div class="w-[33.75rem] mx-auto p-4">
          <div class="mt-8">
            <app-input placeholder="P4$5W0rD!"></app-input>
          </div>
        </div>
      </div>
    `;
  }
}
