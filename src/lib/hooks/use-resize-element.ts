import { Coordinates } from 'lib/types/coordinates'
import { Size } from 'lib/types/size'
import { useEffect, RefObject } from 'react'

export const useResizeElement = (
    block: RefObject<HTMLElement>,
    defaultSize: Size,
    resizeBlockBL: RefObject<HTMLElement>,
    changeElementSize: (size: Size) => void,
    addDraggableElements: () => void,
    clearDraggableElements: () => void,
) => {
    useEffect(() => {
        const currentBlock = block.current
        const currnetResizeBL = resizeBlockBL.current

        if (!currentBlock || !currnetResizeBL) return

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

        let newSize: Size

        const handleMouseMove = (event: MouseEvent) => {
            if (!currentBlock) return
            if (!event.defaultPrevented) {
                event.preventDefault()
                const delta: Coordinates = {
                    x: event.pageX - startCoordinates.x,
                    y: event.pageY - startCoordinates.y,
                }
                newSize = {
                    width: defaultSize.width + delta.x,
                    height: defaultSize.height + delta.y,
                }
                currentBlock.style.width = `${newSize.width}px`
                currentBlock.style.height = `${newSize.height}px`
            }
        }

        const handleMouseUp = () => {
            if (newSize) {
                changeElementSize(newSize)
            }
            clearDraggableElements()
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        currnetResizeBL.addEventListener('mousedown', handleMousedown)
        return () => {
            currnetResizeBL.removeEventListener('mousedown', handleMousedown)
        }
    }, [
        block,
        defaultSize,
        changeElementSize,
        resizeBlockBL,
        addDraggableElements,
        clearDraggableElements,
    ])
}
