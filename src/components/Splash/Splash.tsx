import './Splash.css'

function Splash() {
    return (
        <div className="splash">
            <div className="splash-content">
                <img src="/MiniBizz_Logo.svg" alt="MiniBizz Logo" className="splash-logo" />
                <h1 className="splash-title">MiniBizz</h1>
                <h2 className="splash-subtitle">Business Manager</h2>
                <p className="splash-loading">טוען נתונים...</p>
            </div>
        </div>
    )
}

export default Splash