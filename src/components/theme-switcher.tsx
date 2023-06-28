import { RiMoonFill, RiSunFill } from 'react-icons/ri'
import { useTheme } from 'lib/hooks'

export const ThemeSwitcher = () => {
    const [theme, switchTheme] = useTheme()

    const iconStyle = {
        color: 'var(--text)',
        fontSize: '2rem',
    }

    return (
        <button type="button" onClick={switchTheme}>
            {theme === 'dark' ? <RiSunFill style={iconStyle} /> : <RiMoonFill style={iconStyle} />}
        </button>
    )
}
