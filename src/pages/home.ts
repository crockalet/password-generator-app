import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TailwindElement } from "../shared/tailwind.element";

import styles from "../shared/tailwind.global.css";

import "../components/slider/slider.component";
import "../components/password-strength/password-strength.component";
import "../components/checkbox/checkbox.component";
import "../components/button/button.component";
import "../components/input/input.component";
import "../components/notification/app-notification.component";
import { PasswordGeneratorController } from "../controllers/password-generator-controller.controller";

@customElement("home-page")
export class Home extends TailwindElement(styles) {
  @state() length: number = 15;

  @state() includeUppercase: boolean = true;
  @state() includeLowercase: boolean = true;
  @state() includeNumbers: boolean = true;
  @state() includeSymbols: boolean = true;

  @state() showNotification: boolean = false;
  @state() notificationMessage: string = "";

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

  connectedCallback(): void {
    super.connectedCallback();
    this.generatePassword();
  }

  _onCopyError() {
    this.notificationMessage = "Failed to copy password";
    this.showNotification = true;
  }

  _onCopySuccess() {
    this.notificationMessage = "Password copied to clipboard";
    this.showNotification = true;
  }

  _copyPassword() {
    this.generator.copyPassword({
      onError: () => this._onCopyError(),
      onSuccess: () => this._onCopySuccess(),
    });
  }

  render() {
    return html`
      <main
        class="w-full min-h-screen bg-very-dark-gray text-almost-white md:text-body"
      >
        <div
          class="w-full max-w-[33.75rem] mx-auto p-4 flex flex-col gap-y-4 md:gap-y-6 justify-center items-center min-h-screen"
        >
          <h1 class="md:text-heading-m text-grey">Password Generator</h1>

          <div class="w-full">
            <app-input
              placeholder="P4$5W0rD!"
              .value="${this.generator.password}"
              .disabled="${true}"
            >
              <button slot="suffix" class="px-3 py-2 text-neon-green hover:text-neon-green/90 active:text-neon-green/60" 
                @click=${this._copyPassword}>
                <span class="sr-only">Copy password</span>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z" fill="currentColor"/>
              </svg>
              </button>
            </app-input>
          </div>

          <div class="bg-dark-gray p-4 md:p-8 md:pt-6 w-full">
            <app-slider .value=${this.length} 
              @change-slider=${(e: CustomEvent) => (this.length = e.detail)}>              
            </app-slider>

            <div class="mt-8 flex flex-col gap-y-5">
              <app-checkbox
                label="Include Uppercase Letters"
                name="includeUppercase"
                .checked=${this.includeUppercase}
                @change-checkbox=${(e: CustomEvent) =>
                  (this.includeUppercase = e.detail)}
              >
              </app-checkbox>
              <app-checkbox
                label="Include Lowercase Letters"
                name="includeLowercase"
                .checked=${this.includeLowercase}
                @change-checkbox=${(e: CustomEvent) =>
                  (this.includeLowercase = e.detail)}
              >
              </app-checkbox>
              <app-checkbox
                label="Include Numbers"
                name="includeNumbers"
                .checked=${this.includeNumbers}
                @change-checkbox=${(e: CustomEvent) =>
                  (this.includeNumbers = e.detail)}
              >
              </app-checkbox>
              <app-checkbox
                label="Include Symbols"
                name="includeSymbols"
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

          <app-notification .show=${this.showNotification} .message=${this.notificationMessage} @hide=${() => (this.showNotification = false)} duration=${2000}>
          </app-notification>
        </div>
      </main>
    `;
  }
}
