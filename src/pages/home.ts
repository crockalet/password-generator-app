import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TailwindElement } from "../shared/tailwind.element";

import styles from "../shared/tailwind.global.css";

import "../components/slider/slider.component";

@customElement("home-page")
export class Home extends TailwindElement(styles) {
  // static styles = [
  //   css`
  //     :host {
  //       display: block;
  //     }
  //   `
  // ];

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

        <div class="w-full min-h-screen flex justify-center items-center">
          <div class="w-[33.75rem] bg-dark-gray p-4">
            <app-slider> </app-slider>
          </div>
        </div>
      </div>
    `;
  }
}
