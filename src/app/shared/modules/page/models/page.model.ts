import { Model } from 'src/app/core/abstracts/model'
import { MetaData } from 'src/app/core/interfaces/page'

export class PageModel<T> extends Model {
  readonly id?: number
  slug?: string
  title?: string
  metaData?: MetaData
  contentData?: T
}
