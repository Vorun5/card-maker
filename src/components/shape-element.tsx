import { ShapeElement as IShapeElement } from 'lib/types/shape-element'

interface ShapeElementProps {
    shape: IShapeElement
}

export const ShapeElement = ({ shape }: ShapeElementProps) => {
    const width = shape.size.width
    const height = shape.size.height

    const style = {
        fill: shape.color,
        stroke: shape.borderColor,
        strokeWidth: shape.borderWidth,
    }

    return (
        <svg width={width} height={height}>
            {shape.type === 'triangle' && (
                <polygon style={style} points={`${width / 2},0 0,${height} ${width},${height}`} />
            )}
            {shape.type === 'rectangle' && (
                <polygon style={style} points={`0,0 0,${height} ${width},${height} ${width},0`} />
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
    )
}
