
function PopupWithForm({popup, title,isOpen, form, children, submitButtonText, onClose, onSubmit }) {
    const popupIsOpen = isOpen ? 'popup_opened' : '';
    return (
        <div className={`popup ${popup} ${popupIsOpen}`}>
        
        <div className="popup__container">
          <button className="popup__close"  onClick={onClose} type="reset" aria-label="Закрыть"/>
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form popup__form_profile" method="post" onSubmit={onSubmit}  name ={`form-${form}`}>
          {children}
            <button type="submit" className="popup__input-save"> {submitButtonText}</button>
          </form>
        </div>
      </div>
    )
}

export default PopupWithForm;
