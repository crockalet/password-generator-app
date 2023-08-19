import { OptionsType, Score, zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import { Strength } from "enums/Strength";
import { generate } from "generate-password-browser";
import { ReactiveController, ReactiveControllerHost } from "lit";

export interface PasswordGeneratorOptions {
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

const strengths: Record<Score, Strength> = {
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

    const password = generate({
      length: length,
      numbers: includeNumbers,
      symbols: includeSymbols,
      lowercase: includeLowercase,
      uppercase: includeUppercase,
    });

    this.password = password;
    this.calculateStrength();

    this.host.requestUpdate();
  }

  copyPassword(callbacks?: { onSuccess: () => void; onError: () => void }) {
    navigator.clipboard
      .writeText(this.password)
      .then(
        () => { callbacks?.onSuccess() },
        () => { callbacks?.onError() }
      );
  }

  async loadZxcvbnOptions(): Promise<OptionsType> {
    const zxcvbnCommonPackage = await import(
      /* webpackChunkName: "zxcvbnCommonPackage" */ '@zxcvbn-ts/language-common'
    )
    const zxcvbnEnPackage = await import(
      /* webpackChunkName: "zxcvbnEnPackage" */ '@zxcvbn-ts/language-en'
    )

    return{
      translations: zxcvbnEnPackage.translations,
      graphs: zxcvbnCommonPackage.adjacencyGraphs,
      dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
      },
    }
  }

  async calculateStrength(): Promise<void> {
    const options = await this.loadZxcvbnOptions();

    zxcvbnOptions.setOptions(options);

    const result = zxcvbn(this.password);

    this.strength = strengths[result.score];

    this.host.requestUpdate();
  }
}