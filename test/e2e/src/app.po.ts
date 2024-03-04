import { browser, by, element } from 'protractor'

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return await (<Promise<unknown>>browser.get(browser.baseUrl))
  }

  async getTitleText(): Promise<string> {
    return await (<Promise<string>>element(by.css('app-root h1')).getText())
  }
}
