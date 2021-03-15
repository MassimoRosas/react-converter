import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

/* objectif : avoir un input (champ contrôlé) pour saisir le montant à convertir
- avoir dans le state une propriété qui représente la valeur de l'input
- ajouter une prop sur le composant pour contrôler en lecture.
  Attention à ce stade si on essaie de saisir des caractères dans l'input,
  ils n'apparaissent pas. Le warning propTypes onChange est normal dans la console.
  On peut vérifier que la valeur de l'input reflète la valeur dans le state en
  changeant la valeur du state avec React dev tool
- ajouter une prop sur le composant pour contrôler en écriture, utilisation de
  l'événement onChange pour pouvoir mettre à jour la valeur dans le state quand
  un caractère est saisi dans l'input
*/

const Header = ({ baseAmount, setBaseAmount, handleSubmit }) => (
  <header className="header">
    <h1 className="header-title">Converter</h1>
    <form onSubmit={(event) => {
      event.preventDefault();
      // console.log('submit');
      // pas besoin d'indiquer d'arguments ici, App connaît déjà la valeur de
      // l'input car c'est un champ contrôlé
      handleSubmit();
    }}
    >
      <input
        type="text"
        className="header-input"
        value={baseAmount}
        onChange={(event) => {
          // console.log(event.currentTarget.value);
          // on transforme en nombre pour rester cohérent avec la valeur initiale
          // dans le state
          setBaseAmount(parseFloat(event.currentTarget.value));
        }}
      />
    </form>
    <p className="header-amount">euro</p>
  </header>
);

Header.propTypes = {
  baseAmount: PropTypes.number.isRequired,
  setBaseAmount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Header;
