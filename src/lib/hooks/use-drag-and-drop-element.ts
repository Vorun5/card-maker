import { Coordinates } from 'lib/types/coordinates'
import { useEffect, RefObject } from 'react'

export const useDragAndDropElement = (
    block: RefObject<HTMLElement>,
    defaultCoordinates: Coordinates,
    changeElementCoordinates: (coordinates: Coordinates) => void,
    addDraggableElements: () => void,
    clearDraggableElements: () => void,
) => {
    useEffect(() => {
        const currentBlock = block.current

        if (!currentBlock) return

        let startCoordinates: Coordinates

        const handleMousedown = (event: MouseEvent) => {
            startCoordinates = {
                x: event.pageX,
                y: event.pageY,
            }
            addDraggableElements()
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        let newCoordinates: Coordinates

        const handleMouseMove = (event: MouseEvent) => {
            if (!currentBlock) return
            if (!event.defaultPrevented) {
                event.preventDefault()
                const delta: Coordinates = {
                    x: event.pageX - startCoordinates.x,
                    y: event.pageY - startCoordinates.y,
                }
                newCoordinates = {
                    x: defaultCoordinates.x + delta.x,
                    y: defaultCoordinates.y + delta.y,
                }
                currentBlock.style.left = `${newCoordinates.x}px`
                currentBlock.style.top = `${newCoordinates.y}px`
            }
        }

        const handleMouseUp = () => {
            if (newCoordinates) {
                changeElementCoordinates(newCoordinates)
            }
            clearDraggableElements()
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        currentBlock.addEventListener('mousedown', handleMousedown)
        return () => {
            currentBlock.removeEventListener('mousedown', handleMousedown)
        }
    }, [
        block,
        defaultCoordinates,
        changeElementCoordinates,
        addDraggableElements,
        clearDraggableElements,
    ])
}
