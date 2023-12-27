export type Book = {
    guid: string,
    title: string,
    author: string,
    date: string,
    categoryId: number,
    categoryTitle?: string,
    isPublished: boolean
}