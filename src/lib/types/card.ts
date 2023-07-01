import { Size } from './size'
import { Element } from './element'

export const maxCardSize = 10000
export const minCardSize = 100

export interface Card {
    readonly id: string
    name: string
    readonly createdAt: string
    backgroundColor: string
    borderRadius: number
    size: Size
    focusElements: string[]
    draggableElements: string[]
    elements: Element[]
}
