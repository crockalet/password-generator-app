import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TailwindElement } from "../shared/tailwind.element";

import styles from "../shared/tailwind.global.css";

import "../components/slider/slider.component";
import "../components/password-strength/password-strength.component";
import "../components/checkbox/checkbox.component";
import "../components/button/button.component";
import "../components/input/input.component";
import { PasswordGeneratorController } from "../controllers/password-generator-controller.controller";

@customElement("home-page")
export class Home extends TailwindElement(styles) {
  @state() length: number = 15;

  @state() includeUppercase: boolean = true;
  @state() includeLowercase: boolean = true;
  @state() includeNumbers: boolean = true;
  @state() includeSymbols: boolean = true;

  private generator = new PasswordGeneratorController(this);

  generatePassword() {
    this.generator.generatePassword({
      length: this.length,
      includeLowercase: this.includeLowercase,
      includeUppercase: this.includeUppercase,
      includeNumbers: this.includeNumbers,
      includeSymbols: this.includeSymbols,
    });
  }

  render() {
    return html`
      <div
        class="w-full min-h-screen bg-very-dark-gray text-almost-white md:text-body"
      >
        <div
          class="w-full max-w-[33.75rem] mx-auto p-4 flex flex-col gap-y-4 md:gap-y-6 justify-center items-center min-h-screen"
        >
          <p class="md:text-heading-m text-grey">Password Generator</p>

          <div class="w-full">
            <app-input
              placeholder="P4$5W0rD!"
              .value="${this.generator.password}"
              .disabled="${true}"
            >
            </app-input>
          </div>

          <div class="bg-dark-gray p-4 md:p-8 md:pt-6 w-full">
            <app-slider .value=${this.length} 
              @change-slider=${(e: CustomEvent) => (this.length = e.detail)}>              
            </app-slider>

            <div class="mt-8 flex flex-col gap-y-5">
              <app-checkbox
                label="Include Uppercase Letters"
                .checked=${this.includeUppercase}
                @change-checkbox=${(e: CustomEvent) =>
                  (this.includeUppercase = e.detail)}
              >
              </app-checkbox>
              <app-checkbox
                label="Include Lowercase Letters"
                .checked=${this.includeLowercase}
                @change-checkbox=${(e: CustomEvent) =>
                  (this.includeLowercase = e.detail)}
              >
              </app-checkbox>
              <app-checkbox
                label="Include Numbers"
                .checked=${this.includeNumbers}
                @change-checkbox=${(e: CustomEvent) =>
                  (this.includeNumbers = e.detail)}
              >
              </app-checkbox>
              <app-checkbox
                label="Include Symbols"
                .checked=${this.includeSymbols}
                @change-checkbox=${(e: CustomEvent) =>
                  (this.includeSymbols = e.detail)}
              >
              </app-checkbox>
            </div>

            <div class="mt-8 bg-very-dark-gray p-4 md:px-8 md:py-6">
              <password-strength
                value="${this.generator.strength}"
              ></password-strength>
            </div>

            <div class="mt-8">
              <app-button @onClick="${this.generatePassword}">
                Generate
                <svg slot="icon" class="w-3 h-3" viewBox="0 0 12 12">
                  <path
                    d="M5.10547 12L11.1054 6.00002L5.10547 0L3.84045 1.26501L7.68094 5.10547L0 
                    5.10547V6.8946L7.68094 6.8946L3.84045 10.735L5.10547 12Z"
                    fill="currentColor"
                  />
                </svg>
              </app-button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
