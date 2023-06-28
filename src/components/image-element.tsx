import { ImageElement as IImageElement } from 'lib/types/image-element'

interface ImageElementProps {
    image: IImageElement
}

export const ImageElement = ({ image }: ImageElementProps) => {
    return <img className="image-element" draggable={false} src={image.src} alt={image.id} />
}
