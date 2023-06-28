import { TextElement as ITextElement } from 'lib/types/text-element'

interface TextElementProps {
    text: ITextElement
}

export const TextElement = ({ text }: TextElementProps) => {
    return (
        <span
            className="text-element"
            style={{
                color: text.color,
                fontStyle: text.fontStyle,
                fontFamily: text.fontFamily,
                fontWeight: text.fontWeight,
                fontSize: text.fontSize,
                textDecoration: text.textDecoration,
                textDecorationColor: text.textDecorationColor,
            }}
        >
            {text.content}
        </span>
    )
}
