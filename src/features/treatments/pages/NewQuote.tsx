import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppUser } from '@/features/user/providers/UserProvider'
import { useCustomers } from '@/features/customers/hooks/useCustomers'
import SignatureCanvas from 'react-signature-canvas'
import SignaturePad from 'react-signature-canvas'
import '@/shared/components/form/NewForm.css'
import './newQuote.css'

export default function NewQuote() {
    const navigate = useNavigate()
    const { userProfile } = useAppUser()
    const { customers } = useCustomers()
    const sigCanvas = useRef<SignatureCanvas>(null)

    const [showPreview, setShowPreview] = useState(false)
    const [loading, setLoading] = useState(false)
    const [signatureURL, setSignatureURL] = useState<string | null>(null)

    const [form, setForm] = useState({
        customerId: '',
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        title: '',
        description: '',
        price: '',
        validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    })

    // בחירת לקוח מהרשימה
    const handleCustomerChange = (customerId: string) => {
        const customer = customers.find(c => c.id === customerId)
        if (customer) {
            setForm(prev => ({
                ...prev,
                customerId,
                clientName: customer.personal.name,
                clientPhone: customer.contact.phone || '',
                clientEmail: customer.contact.email || '',
            }))
        } else {
            setForm(prev => ({ ...prev, customerId: '', clientName: '' }))
        }
    }

    const updateField = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    // שמירת החתימה מה-Canvas ל-URL
    const saveSignature = () => {
        if (sigCanvas.current) {
            setSignatureURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'))
        }
    }

    const clearSignature = () => {
        sigCanvas.current?.clear()
        setSignatureURL(null)
    }

    const handleTogglePreview = () => {
        if (!showPreview) {
            try {
                // בודק אם ה-Ref קיים ואם יש חתימה
                if (sigCanvas.current && !sigCanvas.current.isEmpty()) {

                    // נסיון ראשון: השיטה המובנית של הספרייה
                    // אם היא קורסת, אנחנו תופסים את זה ב-catch
                    const canvas = sigCanvas.current.getCanvas();
                    const data = canvas.toDataURL('image/png');
                    setSignatureURL(data);

                }
            } catch (err) {
                console.error("Signature capture failed, falling back to basic canvas", err);

                // Fallback: אם getTrimmedCanvas קורס, ננסה לגשת ל-canvas הישיר
                const rawCanvas = document.querySelector('.sigCanvas') as HTMLCanvasElement;
                if (rawCanvas) {
                    setSignatureURL(rawCanvas.toDataURL('image/png'));
                }
            }
        }
        setShowPreview(!showPreview);
    };

    return (
        <div className="page-container quote-page">
            <div className="header-actions">
                <button className="cancel-btn-top" onClick={() => navigate(-1)}>ביטול</button>
                <h2>{showPreview ? 'תצוגה מקדימה' : 'הצעת מחיר חדשה'}</h2>
                <div style={{ width: '40px' }}></div> {/* לאיזון ויזואלי */}
            </div>

            {!showPreview ? (
                <div className="quote-form">
                    <div className="form-section">
                        <h3>פרטי לקוח</h3>
                        <div className="form-group">
                            <label>בחר לקוח קיים</label>
                            <select value={form.customerId} onChange={e => handleCustomerChange(e.target.value)}>
                                <option value="">לקוח חדש / הזנה ידנית</option>
                                {customers.map(c => (
                                    <option key={c.id} value={c.id}>{c.personal.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>שם הלקוח *</label>
                            <input type="text" value={form.clientName} onChange={e => updateField('clientName', e.target.value)} />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>טלפון</label>
                                <input type="tel" value={form.clientPhone} onChange={e => updateField('clientPhone', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>אימייל</label>
                                <input type="email" value={form.clientEmail} onChange={e => updateField('clientEmail', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>פרטי ההצעה</h3>
                        <div className="form-group">
                            <label>נושא ההצעה *</label>
                            <input type="text" value={form.title} onChange={e => updateField('title', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>תיאור השירות</label>
                            <textarea rows={4} value={form.description} onChange={e => updateField('description', e.target.value)} />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>סכום (₪) *</label>
                                <input type="number" value={form.price} onChange={e => updateField('price', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>בתוקף עד</label>
                                <input type="date" value={form.validUntil} onChange={e => updateField('validUntil', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="form-section signature-section">
                        <h3>חתימה</h3>
                        <div className="signature-wrapper">
                            <SignatureCanvas
                                ref={sigCanvas}
                                penColor='black'
                                canvasProps={{ className: 'sigCanvas', style: { width: '100%', height: '100%' } }}
                                onEnd={saveSignature}
                            />
                        </div>
                        <button type="button" className="clear-sig" onClick={clearSignature}>נקה חתימה</button>
                    </div>
                </div>
            ) : (
                /* PDF PREVIEW */
                <div className="pdf-preview-container">
                    <div className="pdf-page">
                        <div className="pdf-header">
                            {userProfile?.logoUrl && <img src={userProfile.logoUrl} className="pdf-logo" />}
                            <div className="business-info">
                                <strong>{userProfile?.business?.name}</strong>
                                <p>{userProfile?.contact?.phone} | {userProfile?.contact?.email}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="pdf-body">
                            <h1 className="pdf-title">הצעת מחיר</h1>
                            <div className="pdf-meta">
                                <div className="to">
                                    <strong>לכבוד:</strong>
                                    <p>{form.clientName}</p>
                                    <p>{form.clientPhone}</p>
                                </div>
                                <div className="date-info">
                                    <p>תאריך: {new Date().toLocaleDateString('he-IL')}</p>
                                    <p>מספר הצעה: {Math.floor(Math.random() * 10000)}</p>
                                </div>
                            </div>
                            <div className="pdf-content">
                                <h3>{form.title}</h3>
                                <p className="desc">{form.description}</p>
                            </div>
                            <div className="pdf-total">
                                <span>סה"כ לתשלום:</span>
                                <strong>{Number(form.price).toLocaleString()} ₪</strong>
                            </div>
                        </div>
                        <div className="pdf-footer">
                            <p>הצעה זו בתוקף עד {new Date(form.validUntil).toLocaleDateString('he-IL')}</p>
                            <div className="pdf-signatures">
                                <div className="sig-block">
                                    <p>חתימת העסק</p>
                                    <div className="sig-img-placeholder">
                                        {signatureURL ? <img src={signatureURL} alt="signature" /> : <div className="line" />}
                                    </div>
                                    <span>{userProfile?.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="form-actions fixed-bottom">
                <button className="secondary-btn" onClick={handleTogglePreview}>
                    {showPreview ? 'חזור לעריכה' : 'צפה ב-PDF'}
                </button>

                {showPreview ? (
                    <button className="primary-btn share" onClick={() => {/* שליחה */ }}>שלח הצעה</button>
                ) : (
                    <button className="primary-btn" onClick={() => {/* שמירה */ }} disabled={!form.clientName || !form.price}>שמור הצעה</button>
                )}
            </div>
        </div>
    )
}