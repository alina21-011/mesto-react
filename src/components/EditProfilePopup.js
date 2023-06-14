import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const { isOpen, onClose } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      isOpen={isOpen}
      popup={'popup_edit'}
      form={'profile'}
      submitButtonText={'Сохранить'}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input id="name" type="text" className="popup__input popup__input_data_name" required name="name" placeholder="Имя"
            minLength="2" maxLength="40" onChange={handleChangeName} value={name || ''} ></input>
          <span id="name-error" className="popup__error name-error"></span>
          <input id="info" type="text" className="popup__input popup__input_data_info" required name="info"
            placeholder="Информация о себе" minLength="2" maxLength="200" onChange={handleChangeDescription} value={description || ''}></input>
          <span id="info-error" className="popup__error info-error"></span>
        </>
      }
    />
  );
};
export default EditProfilePopup;