import { describe, it, expect, beforeAll } from "vitest";
import { generatePassword } from "../../src/lib/generate-password";

describe("Funcionalidade: generatePassword", () => {
  beforeAll(() => {
    if (typeof window !== "undefined" && !window.crypto) {
      Object.defineProperty(window, "crypto", {
        writable: true,
        value: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          getRandomValues: (buffer: any) => {
            return crypto.getRandomValues(buffer);
          },
        },
      });
    }
  });

  it("should generate a password of the specified length", () => {
    const length = 16;
    const password = generatePassword(length);

    expect(password).toHaveLength(length);
  });

  it("It must contain ONLY characters from the whitelist.", () => {
    const whitelist = /^[a-zA-Z0-9!@#$%^&*()_+]+$/;
    const password = generatePassword(50);

    expect(password).toMatch(whitelist);
  });

  it("should generate different passwords on subsequent calls", () => {
    const password1 = generatePassword(12);
    const password2 = generatePassword(12);

    expect(password1).not.toBe(password2);
  });
});
