export interface MetaData {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  keywords?: string
  ogImageUrl?: string
  ogVideoUrl?: string
}

export interface Page<T> {
  slug: string
  title: string
  metaData: MetaData
  contentData: T
}
