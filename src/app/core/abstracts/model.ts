/* eslint-disable @typescript-eslint/no-explicit-any */
import { LangService } from 'src/app/core/services/lang.service'

export class Model {
  static PROPERTY_MODEL_MAPPING_KEY = Symbol('modelMapping')

  private lang?: string

  translationList: any

  constructor(data?: any, langService?: LangService, ignoredProperties?: string[]) {
    if (data) {
      Object.keys(data).forEach((key) => {
        if (ignoredProperties && ignoredProperties.includes(key)) {
          return
        }

        if (key in ((<any>this)[Model.PROPERTY_MODEL_MAPPING_KEY] || {})) {
          if (Array.isArray(data[key])) {
            ;(<any>this)[key] = (<any>this)[Model.PROPERTY_MODEL_MAPPING_KEY][key].fromJsonArray(data[key], langService)
          } else {
            ;(<any>this)[key] = (<any>this)[Model.PROPERTY_MODEL_MAPPING_KEY][key].fromJson(data[key], langService)
          }
        } else {
          ;(<any>this)[key] = data[key]
        }
      })
    }

    if (langService) {
      this.setLang(langService.lang)
      langService.langChanged.subscribe((lang) => {
        this.setLang(lang)
      })
    }
  }

  static fromJson<T>(data: T, langService?: LangService): any {
    return new this(data, langService)
  }

  static fromJsonArray<T>(data: T[], langService?: LangService): any[] {
    const models: any[] = []

    data.forEach((item) => {
      models.push(this.fromJson(item, langService))
    })

    return models
  }

  setLang(lang: string): void {
    if (this.lang === lang) {
      return
    }

    const translation = this.translationList?.find((item: any) => item.lang === lang)

    if (translation) {
      Object.keys(translation).forEach((key) => {
        ;(<any>this)[key] = translation[key] || (<any>this)[key]
      })
    }

    this.lang = lang
  }
}

/**
 * Makes mapping object with class property and its type.
 * Then in parent constructor these properties will be initialized with `Model.fromJson()` method
 *
 * @param type Type of decorated property
 */
export function TranslatableModel(type: any) {
  return (target: any, key: any): void => {
    if (target[Model.PROPERTY_MODEL_MAPPING_KEY]) {
      target[Model.PROPERTY_MODEL_MAPPING_KEY][key] = type
    } else {
      Reflect.set(target, Model.PROPERTY_MODEL_MAPPING_KEY, { [key]: type })
    }
  }
}
