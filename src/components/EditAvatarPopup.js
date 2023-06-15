import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";

function EditAvatarPopup(props) {
  const { isOpen, onUpdateAvatar,buttonText } = props;
  const avatarRef = React.useRef();
  const App = React.useContext(AppContext);

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      isOpen={isOpen}
      popup={'popup_avatar'}
      form={'avatar'}
      submitButtonText={'Сохранить'}
      onClose={App.closeAllPopups}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <input id="url-avatar" type="url" className="popup__input popup__input_data_url popup__input_link" name="avatar"
        placeholder="Ссылка на картинку" ref={avatarRef} required></input>
      <span id="url-avatar-error" className="popup__error url-avatar-error"></span>

    </PopupWithForm>
  )

}

export default EditAvatarPopup;