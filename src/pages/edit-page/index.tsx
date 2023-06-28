import { Canvas } from 'widgets/canvas'
import { EditPageHeader } from './edit-page-header'
// import { useEditCardStore } from 'lib/stores/edit-card-store'

export const EditPage = () => {
    // const { changeCardName, name } = useEditCardStore()

    return (
        <main className="edit-page">
            <EditPageHeader />
            <Canvas />
        </main>
    )
}
