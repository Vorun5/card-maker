import { Element } from './element'

export type FontStyle = 'normal' | 'italic'

export type FontWeight = '300' | '400' | '500' | '700' | '900'

export type TextDecoration =
    | 'none'
    | 'underline'
    | 'wavy underline'
    | 'underline dotted'
    | 'underline dashed'
    | 'line-through'
    | 'overline'
    | 'overline dotted'
    | 'overline dashed'
    | 'wavy overline'

export interface TextElement extends Element {
    content: string
    fontFamily: string
    color: string
    fontStyle: FontStyle
    fontWeight: FontWeight
    fontSize: number
    textDecoration: TextDecoration
    textDecorationColor: string
}

export function isTextElement(element: Element): element is TextElement {
    if ('fontStyle' in element && typeof element.fontStyle === 'string') return true
    return false
}
