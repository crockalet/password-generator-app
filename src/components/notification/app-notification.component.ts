import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from '../../shared/tailwind.element';
import style from './app-notification.component.css?inline'

export type NotificationType = 'neutral' | 'success' | 'error';

@customElement('app-notification')
export class AppNotification extends TailwindElement(style) {
  @property({ type: String }) type: NotificationType = 'neutral';
  @property({ type: String }) message: string = '';
  @property({ type: Boolean }) show: boolean = false;
  @property({ type: Number }) duration: number = 3000;

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('show')) {
      if (this.show) {
        setTimeout(() => {
          this.dispatchEvent(new CustomEvent('hide'));
          this.requestUpdate();
        }, this.duration);
      }
    }
  }

  render() {
    return this.show ? 
      html`
        <div class="notification ${this.type}">
          <p>${this.message}</p>
        </div>
      `
      : html``;
  }
}
