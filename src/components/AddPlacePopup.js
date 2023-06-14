import React from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props) {
    const { isOpen, onClose, onAddPlace, buttonText } = props;
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
  
    function handleChangeName(e) {
      setName(e.target.value);
    }
  
    function handleChangeLink(e) {
      setLink(e.target.value);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      onAddPlace({
        name,
        link,
      });
    }
  
    React.useEffect(() => {
      setName('');
      setLink('');
    }, [isOpen]);
    return(
        <PopupWithForm
        title={'Новое место'}
        isOpen={isOpen}
        popup={'popup_add'}
        form={'card'}
        submitButtonText={buttonText}
        onClose={onClose}
       onSubmit={handleSubmit}>
         <input id="title" type="text" className="popup__input popup__input_data_title" required name="name"
          placeholder="Название" minLength="2" maxLength="30"  onChange={handleChangeName}></input>
          <span id="title-error" className="popup__error title-error"></span>

          <input id="url" type="url" className="popup__input popup__input_data_url" required name="link"
            placeholder="Ссылка на картинку"   onChange={handleChangeLink} ></input>
          <span id="url-error" className="popup__error url-error"></span>
        
        </PopupWithForm>
    )

}

export default AddPlacePopup;