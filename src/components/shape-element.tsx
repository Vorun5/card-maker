import { ShapeElement as IShapeElement } from 'lib/types/shape-element'
import { useRef } from 'react'

interface ShapeElementProps {
    shape: IShapeElement
}

export const ShapeElement = ({ shape }: ShapeElementProps) => {
    const style = {
        fill: shape.color,
        stroke: shape.borderColor,
        strokeWidth: shape.borderWidth,
    }

    const ref = useRef<HTMLDivElement>(null)

    const width = shape.size.width
    const height = shape.size.height

    return (
        <div ref={ref} className="shape-element">
            <svg width="100%" height="100%">
                {shape.type === 'triangle' && (
                    <polygon
                        style={style}
                        points={`${width / 2},0 0,${height} ${width},${height}`}
                    />
                )}
                {shape.type === 'rectangle' && (
                    <polygon
                        style={style}
                        points={`0,0 0,${height} ${width},${height} ${width},0`}
                    />
                )}
                {shape.type === 'circle' && (
                    <ellipse
                        style={style}
                        cx={width / 2}
                        cy={height / 2}
                        rx={width / 2}
                        ry={height / 2}
                    />
                )}
            </svg>
        </div>
    )
}
