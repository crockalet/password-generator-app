import { PasswordStrength } from "components/password-strength/password-strength.component";
import { Strength } from "enums/Strength";
import { ReactiveController, ReactiveControllerHost } from "lit";

export interface PasswordGeneratorOptions {
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

const strengths: Record<number, Strength> = {
  0: "too_weak",
  1: "too_weak",
  2: "weak",
  3: "medium",
  4: "strong",
}

export class PasswordGeneratorController implements ReactiveController {
  host: ReactiveControllerHost;
  password: string = "";
  strength: Strength = "too_weak";

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostConnected() {}

  generatePassword(options?: PasswordGeneratorOptions) {
    const length = options?.length || 12;
    const includeLowercase = options?.includeLowercase ?? true;
    const includeUppercase = options?.includeUppercase ?? true;
    const includeNumbers = options?.includeNumbers ?? true;
    const includeSymbols = options?.includeSymbols ?? true;

    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+=";

    let chars = "";
    if (includeLowercase) {
      chars += lowercase;
    }
    if (includeUppercase) {
      chars += uppercase;
    }
    if (includeNumbers) {
      chars += numbers;
    }
    if (includeSymbols) {
      chars += symbols;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    this.password = password;
    this.strength = this.calculateStrength();

    this.host.requestUpdate();
  }

  copyPassword() {
    navigator.clipboard.writeText(this.password);
  }

  calculateStrength(): Strength {
    let strength = 0;

    if (this.password.length >= 8) {
      strength++;
    }

    if (this.password.match(/[a-z][A-Z]+/)) {
      strength++;
    }

    if (this.password.match(/[0-9]+/)) {
      strength++;
    }

    if (this.password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
      strength++;
    }

    return strengths[strength];
  }
}