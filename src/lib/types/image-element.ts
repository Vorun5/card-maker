import { Element } from './element'

export interface ImageElement extends Element {
    src: string
}

export function isImageElement(element: Element): element is ImageElement {
    if ('src' in element && typeof element.src === 'string') return true
    return false
}
