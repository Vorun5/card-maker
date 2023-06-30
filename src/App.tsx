import { useTheme } from 'lib/hooks'
import { EditPage } from 'pages/edit-page/edit-page'

export const App = () => {
    useTheme()

    return (
        <div className="background">
            <EditPage />
        </div>
    )
}
