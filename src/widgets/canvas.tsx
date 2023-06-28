import { ImageElement } from 'components/image-element'
import { ShapeElement } from 'components/shape-element'
import { TextElement } from 'components/text-elements'
import { useEditCardStore } from 'lib/stores/edit-card-store'
import { isImageElement } from 'lib/types/image-element'
import { isShapeElement } from 'lib/types/shape-element'
import { isTextElement } from 'lib/types/text-element'

export const Canvas = () => {
    const { size, backgroundColor, borderRadius, elements } = useEditCardStore()

    const displayedSize = size
    if (size.width < 100) displayedSize.width = 100
    if (size.height < 100) displayedSize.height = 100
    if (size.width > 10000) displayedSize.width = 10000
    if (size.height > 10000) displayedSize.height = 10000

    return (
        <div className="canvas-container">
            <div
                className="canvas"
                style={{
                    backgroundColor,
                    borderRadius,
                    width: `${displayedSize.width}px`,
                    height: `${displayedSize.height}px`,
                }}
            >
                {elements.map((element, index) => (
                    <div
                        key={element.id}
                        className="element"
                        style={{
                            zIndex: index + 1,
                            width: `${element.size.width}px`,
                            height: `${element.size.height}px`,
                            top: `${element.coordinates.y}px`,
                            left: `${element.coordinates.x}px`,
                        }}
                    >
                        {isTextElement(element) && <TextElement text={element} />}
                        {isImageElement(element) && <ImageElement image={element} />}
                        {isShapeElement(element) && <ShapeElement shape={element} />}
                    </div>
                ))}
            </div>
        </div>
    )
}
