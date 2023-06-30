import { Card } from 'lib/types/card'
import { Size } from 'lib/types/size'
import { create } from 'zustand'
import { Element } from 'lib/types/element'
import { ImageElement } from 'lib/types/image-element'
import { TextElement } from 'lib/types/text-element'
import { ShapeElement } from 'lib/types/shape-element'
import { Coordinates } from 'lib/types/coordinates'

const getElements = (): Element[] => {
    const text: TextElement = {
        id: 'text',
        size: {
            width: 300,
            height: 300,
        },
        textDecoration: 'overline',
        color: 'red',
        content: 'text',
        coordinates: {
            x: 100,
            y: 100,
        },
        fontFamily: 'Arial',
        fontSize: 23,
        fontStyle: 'normal',
        fontWeight: '400',
        textDecorationColor: 'green',
    }
    const image: ImageElement = {
        id: 'image',
        size: {
            width: 300,
            height: 300,
        },
        coordinates: {
            x: 50,
            y: 50,
        },
        src: 'https://live.staticflickr.com/3179/2778393845_4af978d9e8_z.jpg',
    }

    const triangle: ShapeElement = {
        id: 'triangle',
        size: {
            width: 100,
            height: 300,
        },
        coordinates: {
            x: 50,
            y: 50,
        },
        type: 'triangle',
        color: 'red',
        borderWidth: 2,
        borderColor: 'white',
    }

    const rectangle: ShapeElement = {
        id: 'rectangle',
        size: {
            width: 200,
            height: 100,
        },
        coordinates: {
            x: 400,
            y: 400,
        },
        type: 'rectangle',
        color: 'blue',
        borderWidth: 2,
        borderColor: 'black',
    }

    const circle: ShapeElement = {
        id: 'circle',
        size: {
            width: 300,
            height: 30,
        },
        coordinates: {
            x: -20,
            y: -20,
        },
        type: 'circle',
        color: 'purple',
        borderWidth: 0,
        borderColor: 'none',
    }

    return [image, text, triangle, rectangle, circle]
}

type State = Card

type Action = {
    changeCardName: (name: string) => void
    changeCardSize: (size: Size) => void
    changeCardBorderRadius: (borderRaius: number) => void
    addElementToCard: (element: Element) => void
    addFocusElement: (elementId: string) => void
    removeFocusElement: (elementId: string) => void
    clearFocusElements: () => void
    changeElementCoordinates: (elementId: string, coordinates: Coordinates) => void
}

export const useEditCardStore = create<State & Action>((set) => ({
    id: Date.now().toString(),
    backgroundColor: 'grey',
    createdAt: Date.now().toLocaleString(),
    borderRadius: 0,
    elements: getElements(),
    focusElements: [],
    name: 'Undefined',
    size: {
        height: 500,
        width: 500,
    },
    changeCardName: (name) => {
        const newName = name.trim()
        if (newName.length >= 3 && newName.length <= 25) {
            set({ name })
        }
    },
    changeCardSize: (size) => set({ size }),
    changeCardBorderRadius: (borderRadius) => set({ borderRadius }),
    addElementToCard: (element) => set((state) => ({ elements: [...state.elements, element] })),
    addFocusElement: (elementId) =>
        set((state) => ({ focusElements: [...state.focusElements, elementId] })),
    removeFocusElement: (elementId) =>
        set((state) => ({ focusElements: state.focusElements.filter((id) => elementId !== id) })),
    clearFocusElements: () => set(() => ({ focusElements: [] })),
    changeElementCoordinates: (elementId, coordinates) =>
        set((state) => ({
            elements: state.elements.map((element) => {
                if (element.id !== elementId) return element
                return {
                    ...element,
                    coordinates,
                }
            }),
        })),
}))
