import { ThemeSwitcher } from 'components/theme-switcher'
import { useEditCardStore } from 'lib/stores/edit-card-store'

export const EditPageHeader = () => {
    const { changeCardName, name, size, changeCardSize } = useEditCardStore()

    const parseNumbre = (str: string) => {
        let number = 100
        try {
            number = Number.parseInt(str)
        } catch {
            return 100
        }

        return number
    }

    return (
        <header className="ep-header">
            <div className="ep-header-left">
                <div className="ep-header-logo">{/* <Logo /> */}</div>
                <div className="ep-header-info">
                    <input
                        className="ep-header-name clean-input"
                        type="text"
                        value={name}
                        onChange={(event) => changeCardName(event.target.value)}
                    />
                    <div className="card-size">
                        <input
                            className="card-size-input clean-input"
                            type="number"
                            value={size.width}
                            onChange={(event) => {
                                changeCardSize({
                                    width: parseNumbre(event.target.value),
                                    height: size.height,
                                })
                            }}
                        />
                        <span className="card-size-divider">X</span>
                        <input
                            className="card-size-input clean-input"
                            type="number"
                            value={size.height}
                            onChange={(event) => {
                                changeCardSize({
                                    width: size.width,
                                    height: parseNumbre(event.target.value),
                                })
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="ep-header-settings">
                <ThemeSwitcher />
            </div>
        </header>
    )
}
