import './Modal.css'

const Modal = ({open, onClose, title, description, btnPrimary, btnOutline}) => {
    if (!open) return null;

  return (
    <div className='overlay'>
        <div className='modalContainer'>
            <button className="closeBtn" onClick={onClose}>X</button>
            <div className="content">
                {title && <h1>{title}</h1>}
                {description && <p>{description}</p>}
            </div>
            <div className="btnContainer">
                {btnPrimary && <button onClick={onClose} className="btnPrimary"><span className="bold">{btnPrimary}</span></button>}
                {btnOutline && <button onClick={onClose} className="btnOutline"><span className="bold">{btnOutline}</span></button>}
            </div>
        </div>
    </div>
  )
}

export default Modal