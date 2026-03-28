import { useAuth } from '../../app/AuthContext'
import { useTranslation } from 'react-i18next'
import './SettingPage.css'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'he' ? 'en' : 'he'
    i18n.changeLanguage(newLang)
    localStorage.setItem('i18nextLng', newLang)
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>MiniBizz</h1>
        <h2>Manage your business settings</h2>
      </div>

      <div className="settings-content">
        <h3>Welcome</h3>
        <p>{user?.email}!</p>

        <div style={{ margin: '20px 0', padding: '10px' }}>
          <p> {t('settings.language.current')} {i18n.language === 'he' ? t('settings.language.hebrew') : 'English'}</p>
          <button onClick={toggleLanguage}>
            {i18n.language === 'he' ? 'Switch to English' : 'החלף לעברית'}
          </button>
        </div>

        <button onClick={logout}>התנתק</button>
      </div>

      <div className="settings-footer">
        <div>גרסה 1.0.0</div>
        <div>
          פותח על ידי{' '}
          <a href="https://avirandabush.co.il" target="_blank" rel="noreferrer">
            Aviran Dabush
          </a>
        </div>
      </div>
    </div>
  )
}