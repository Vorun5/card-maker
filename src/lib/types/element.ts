import { Coordinates } from './coordinates'
import { Size } from './size'

export const maxElementSize = 10000
export const minElementSize = 30

export interface Element {
    readonly id: string
    coordinates: Coordinates
    size: Size
}
