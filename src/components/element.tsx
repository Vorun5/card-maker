import { Element as IElement } from 'lib/types/element'
import { isImageElement } from 'lib/types/image-element'
import { isShapeElement } from 'lib/types/shape-element'
import { isTextElement } from 'lib/types/text-element'
import { TextElement } from './text-elements'
import { ImageElement } from './image-element'
import { ShapeElement } from './shape-element'
import { memo, useRef } from 'react'
import { useDragAndDropElement } from 'lib/hooks'
import { Coordinates } from 'lib/types/coordinates'

interface ElementProps {
    index: number
    isFocus: boolean
    element: IElement
    addFocusElement: (id: string) => void
    removeFocusElement: (id: string) => void
    changeElementCoordinates: (id: string, coordinates: Coordinates) => void
}

export const Element = memo(function Element({
    element,
    index,
    isFocus,
    addFocusElement,
    removeFocusElement,
    changeElementCoordinates,
}: ElementProps) {
    const ref = useRef(null)

    useDragAndDropElement(
        ref,
        { x: element.coordinates.x, y: element.coordinates.y },
        (coordinates) => {
            changeElementCoordinates(element.id, coordinates)
        },
    )
    return (
        <div
            className={`element ${isFocus ? 'focus-element' : ''}`}
            id={element.id}
            ref={ref}
            style={{
                zIndex: isFocus ? 9999 : index,
                width: `${element.size.width}px`,
                height: `${element.size.height}px`,
                top: `${element.coordinates.y}px`,
                left: `${element.coordinates.x}px`,
            }}
            onMouseDown={() => {
                if (isFocus) {
                    removeFocusElement(element.id)
                    return
                }
                addFocusElement(element.id)
            }}
        >
            {isTextElement(element) && <TextElement text={element} />}
            {isImageElement(element) && <ImageElement image={element} />}
            {isShapeElement(element) && <ShapeElement shape={element} />}
        </div>
    )
})
