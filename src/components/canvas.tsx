import { useEditCardStore } from 'lib/stores/edit-card-store'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Element } from 'components/element'
import { Coordinates } from 'lib/types/coordinates'

const CanvasMouseCoordinats = () => {
    const canvas = document.getElementById('canvas')
    const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 })

    const canvasMouseMove = useCallback(
        (event: MouseEvent) => {
            if (canvas === null) return
            const x = event.clientX
            const y = event.clientY
            const rect = canvas.getBoundingClientRect()
            const blockX = rect.left
            const blockY = rect.top
            const relX = x - blockX
            const relY = y - blockY
            setCoordinates({ x: relX, y: relY })
        },
        [canvas],
    )

    useEffect(() => {
        if (canvas === null) return
        canvas.addEventListener('mousemove', canvasMouseMove)
        return () => {
            canvas.removeEventListener('mousemove', canvasMouseMove)
        }
    }, [canvasMouseMove, canvas])

    return (
        <div className="convas-mouse-coordinates">
            <span className="convas-mouse-coordinate">{Math.round(coordinates.x)}</span>
            <span className="convas-mouse-coordinate">{Math.round(coordinates.y)}</span>
        </div>
    )
}

export const Canvas = () => {
    const {
        size,
        backgroundColor,
        borderRadius,
        elements,
        focusElements,
        clearFocusElements,
        addFocusElement,
        removeFocusElement,
        changeElementCoordinates,
    } = useEditCardStore()

    const displayedSize = size
    if (size.width < 100) displayedSize.width = 100
    if (size.height < 100) displayedSize.height = 100
    if (size.width > 10000) displayedSize.width = 10000
    if (size.height > 10000) displayedSize.height = 10000

    const canvasRef = useRef<HTMLDivElement>(null)

    const changeCoordinates = useCallback(
        (id: string, coordinates: Coordinates) => {
            changeElementCoordinates(id, coordinates)
        },
        [changeElementCoordinates],
    )

    return (
        <div className="canvas-container">
            <CanvasMouseCoordinats />
            <div
                className="canvas"
                id="canvas"
                ref={canvasRef}
                style={{
                    backgroundColor,
                    borderRadius,
                    width: `${displayedSize.width}px`,
                    height: `${displayedSize.height}px`,
                }}
            >
                <div className="canvas-click" onClick={clearFocusElements} />
                {elements.map((element, index) => (
                    <Element
                        changeElementCoordinates={changeCoordinates}
                        key={element.id}
                        element={element}
                        index={index}
                        isFocus={focusElements.includes(element.id)}
                        addFocusElement={addFocusElement}
                        removeFocusElement={removeFocusElement}
                    />
                ))}
            </div>
        </div>
    )
}
