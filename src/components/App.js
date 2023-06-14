import '../index.css';
import React from "react";
import Header from './Header'
import Footer from './Footer'
import Main from './Main'

import ImagePopup from './ImagePopup'
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'


function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);

  React.useEffect(() => {
    api.getCards()
    .then((card) => {
      setCards(card);
    }) 
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
  }, []);

  React.useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);



  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }


  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
    console.log(selectedCard)
  }



  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);

  }

  

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));

      })
  
      .catch((err) => {
        console.log(`Ошибка ${err}`);
       
      });
  }

  


  function handleUpdateUser(data) {
    api
      .setUserData(data.name, data.about)
      .then((serverData) => {
        setCurrentUser(serverData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }
  function handleUpdateAvatar(data) {
    api
      .editUserAvatar(data.avatar)
      .then((serverData) => {
        setCurrentUser(serverData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }


  return (
    <div className="page">
       <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike ={handleCardLike}
        onCardDelete={handleCardDelete}

      />
      <Footer />

      <EditProfilePopup 
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups} 
      onUpdateUser={handleUpdateUser}
      />
           

      <AddPlacePopup
           isOpen={isAddPlacePopupOpen} 
           onClose={closeAllPopups} 
           buttonText="Создать"
           onAddPlace={handleAddPlaceSubmit}
           
        
        />

        <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}
        />
      
      <ImagePopup
        popup={'photo'}
        card={selectedCard}
        onClose={closeAllPopups}
      />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
