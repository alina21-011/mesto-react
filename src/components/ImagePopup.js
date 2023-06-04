import React from 'react';

const ImagePopup = ({ card, popup, onClose }) => {
  const popupIsOpen = card ? 'popup_opened' : '';
  return (
    <div className={`popup popup_${popup} ${popupIsOpen}`}>

      <div className="popup__container-img">
        <button className="popup__close popup__close_image" type="reset" aria-label="Закрыть" onClick={onClose}></button>
        <img className="popup__image" src={card ? card.link : ' '}
          alt={card ? card.name : ''} ></img>
        <h2 className="popup__image-title">{card ? card.name : ''}</h2>
      </div>
    </div>

  )

}
export default ImagePopup;
