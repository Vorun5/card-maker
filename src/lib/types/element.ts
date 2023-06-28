import { Coordinates } from './coordinates'
import { Size } from './size'

export interface Element {
    readonly id: string
    coordinates: Coordinates
    size: Size
}
