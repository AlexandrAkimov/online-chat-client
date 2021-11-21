import React from 'react';
import './emptyavatar.css'

const EmptyAvatar = ({nickname, big}) => {

  return (
    <div className={`avatar_empty  ${big ? 'big_photo' : ''}`}>
      <strong className={`text`}>{nickname.split(' ').map(word => word.substr(0, 1).toUpperCase()).filter(letter => letter !== ' ').join('').substr(0, 2)}</strong>
    </div>
  );
}

export default EmptyAvatar;
