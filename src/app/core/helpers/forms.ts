export const toggleInputType = (input: HTMLInputElement): void => {
  if (input && input.type) {
    input.type = input.type === 'password' ? 'text' : 'password'
  }
}

export class RegExPatterns {
  static readonly noNumbersPattern = /^[^\d]+$/u

  static readonly certificateIdPattern = /^.*-[А-ЯІЇҐЄA-Z]{2}\s?№?\s?\d{6}$/

  static readonly onlyNumbersPattern = /^\d+$/u

  static readonly onlyLettersPattern = /^[A-Za-zА-ЯІЇҐЄа-яіїґє'-]+$/u

  static readonly classCodePattern = /^[A-Za-zА-ЯІЇҐЄа-яіїґє0-9-]+$/u
}
