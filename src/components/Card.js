import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = (props) => {
  const { onCardClick, card, onCardLike, onCardDelete } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner && card.owner._id === currentUser._id;
  const isLiked = card.likes && card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like ${isLiked && 'place__like_active'}`;


  function handleClickImage() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="place">
      <div className="place__image">
        <img className="place__photo" alt={card.name} src={card.link} onClick={handleClickImage}></img>
      </div>
      <div className="place__info">
        <h2 className="place__title" id="">{card.name}</h2>
        <div className="place__like_container">
          <button className={cardLikeButtonClassName} type="button" aria-label="Нравится фотография" onClick={handleLikeClick}></button>

          {card.likes && <p className="place__like_amount">{card.likes.length}</p>}

        </div>
        {isOwn && (
          <button className="place__delete" onClick={handleDeleteClick} type="button" aria-label="Удалить фотографию"></button>)}
      </div>
    </article>

  );
}

export default Card;
