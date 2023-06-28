import { Size } from './size'
import { Element } from './element'

export interface Card {
    readonly id: string
    name: string
    readonly createdAt: string
    backgroundColor: string
    borderRadius: number
    size: Size
    focusItems: string[]
    elements: Element[]
}
