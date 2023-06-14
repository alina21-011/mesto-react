import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;
  const avatarRef = React.useRef();

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
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input id="url-avatar" type="url" className="popup__input popup__input_data_url popup__input_link" name="avatar"
        placeholder="Ссылка на картинку" ref={avatarRef} required></input>
      <span id="url-avatar-error" className="popup__error url-avatar-error"></span>

    </PopupWithForm>
  )

}

export default EditAvatarPopup;