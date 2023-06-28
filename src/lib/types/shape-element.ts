import { Element } from './element'

type ShapeType = 'triangle' | 'rectangle' | 'circle'

export interface ShapeElement extends Element {
    type: ShapeType
    color: string
    borderWidth: number
    borderColor: string
}

export function isShapeElement(element: Element): element is ShapeElement {
    if (
        'type' in element &&
        typeof element.type === 'string' &&
        'borderWidth' in element &&
        typeof element.borderWidth === 'number'
    )
        return true
    return false
}
