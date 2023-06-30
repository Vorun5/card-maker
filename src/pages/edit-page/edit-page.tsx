import { Canvas } from 'components/canvas'
import { EditPageHeader } from './edit-page-header'

export const EditPage = () => {
    return (
        <main className="edit-page">
            <EditPageHeader />
            <Canvas />
        </main>
    )
}
