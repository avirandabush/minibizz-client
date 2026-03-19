import './SettingPage.css'

export default function SettingsPage() {
  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>MiniBizz</h1>
        <h2>Manage your business settings</h2>
      </div>

      <div className="settings-content">
        <h3>Settings</h3>
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