import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

const Main =({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) => {
  
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__main">
          <button className="profile__avatar-btn" type="button" onClick={onEditAvatar}>
            <img className="profile__avatar" alt="Главное фото профиля" src={currentUser.avatar} ></img>
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__description">{currentUser.about}</p>
            <button type="button" className="profile__edit-button" onClick={onEditProfile} aria-label="Редактировать информацию"></button>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace} aria-label="Добавить фото"></button>
      </section>
      <section className="gallery">
      {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;
