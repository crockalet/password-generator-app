import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from '../shared/tailwind.element';

import styles from '../shared/tailwind.global.css'

import '../components/slider.component'

@customElement('home-page')
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
      <div class="text-body">
        
    <p>Password Generator P4$5W0rD! Character Length Include Uppercase Letters
    Include Lowercase Letters Include Numbers Include Symbols Strength Generate</p>

    <app-slider>

    </app-slider>
    </div>
    `;
  }
}
