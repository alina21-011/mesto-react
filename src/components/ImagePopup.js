import React from 'react';
import { AppContext } from "../contexts/AppContext";

const ImagePopup = ({ card, popup, onClose }) => {
  const popupIsOpen = card ? 'popup_opened' : '';
  const App = React.useContext(AppContext);
  return (
    <div className={`popup popup_${popup} ${popupIsOpen}`}>

      <div className="popup__container-img">
        <button className="popup__close popup__close_image" type="reset" aria-label="Закрыть" onClick={App.closeAllPopups}></button>
        <img className="popup__image" src={card ? card.link : ' '}
          alt={card ? card.name : ''} ></img>
        <h2 className="popup__image-title">{card ? card.name : ''}</h2>
      </div>
    </div>

  )

}
export default ImagePopup;
