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
import { Size } from 'lib/types/size'
import { useResizeElement } from 'lib/hooks/use-resize-element'

interface ElementProps {
    index: number
    isFocus: boolean
    isDraggble: boolean
    element: IElement
    addFocusElement: (id: string) => void
    removeFocusElement: (id: string) => void
    changeElementCoordinates: (id: string, coordinates: Coordinates) => void
    changeElementSize: (id: string, size: Size) => void
    addDraggableElements: (ids: string[]) => void
    clearDraggableElements: () => void
}

export const Element = memo(function Element({
    element,
    index,
    isFocus,
    isDraggble,
    addFocusElement,
    removeFocusElement,
    changeElementCoordinates,
    changeElementSize,
    addDraggableElements,
    clearDraggableElements,
}: ElementProps) {
    console.log(element.id)
    const ref = useRef(null)
    const resizeRefBL = useRef(null)

    useDragAndDropElement(
        ref,
        element.coordinates,
        (coordinates) => changeElementCoordinates(element.id, coordinates),
        () => addDraggableElements([element.id]),
        clearDraggableElements,
    )

    useResizeElement(
        ref,
        element.size,
        resizeRefBL,
        (size) => changeElementSize(element.id, size),
        () => addDraggableElements([element.id]),
        clearDraggableElements,
    )

    return (
        <div
            className={`element ${isFocus || isDraggble ? 'focus-element' : ''}`}
            id={element.id}
            ref={ref}
            style={{
                zIndex: isFocus || isDraggble ? 9999 : index,
                width: `${element.size.width}px`,
                height: `${element.size.height}px`,
                top: `${element.coordinates.y}px`,
                left: `${element.coordinates.x}px`,
            }}
            onContextMenu={(event) => {
                event.preventDefault()
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
            <div ref={resizeRefBL} className="element-resize element-rezie-bl" />
        </div>
    )
})
