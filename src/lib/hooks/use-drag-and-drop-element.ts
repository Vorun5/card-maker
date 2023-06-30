import { Coordinates } from 'lib/types/coordinates'
import { useEffect, RefObject } from 'react'

export function useDragAndDropElement(
    block: RefObject<HTMLElement>,
    defPos: Coordinates,
    changeElementCoordinates: (coordinates: Coordinates) => void,
): void {
    useEffect(() => {
        const currentBlock: HTMLElement | null = block.current

        if (!currentBlock) return

        let startPos: Coordinates

        function handleMousedown(event: MouseEvent): void {
            startPos = {
                x: event.pageX,
                y: event.pageY,
            }
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        let newPos: Coordinates

        function handleMouseMove(event: MouseEvent): void {
            if (!currentBlock) return
            if (!event.defaultPrevented) {
                event.preventDefault()
                const delta: Coordinates = {
                    x: event.pageX - startPos.x,
                    y: event.pageY - startPos.y,
                }
                newPos = {
                    x: defPos.x + delta.x,
                    y: defPos.y + delta.y,
                }
                currentBlock.style.left = `${newPos.x}px`
                currentBlock.style.top = `${newPos.y}px`
            }
        }

        function handleMouseUp(): void {
            if (newPos) {
                changeElementCoordinates({ x: newPos.x, y: newPos.y })
            }
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        currentBlock.addEventListener('mousedown', handleMousedown)
        return () => {
            currentBlock.removeEventListener('mousedown', handleMousedown)
        }
    }, [block, defPos, changeElementCoordinates])
}
