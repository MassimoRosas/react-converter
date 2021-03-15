import React from 'react';
import PropTypes from 'prop-types';

import './currencies.scss';

/*
l'input est un champ contrôlé : sa valeur est le reflet du state, c'est le state
qui pilote ce qu'il affiche (but : avoir une seule source de vérité, ne pas avoir
une valeur stockée dans le DOM)
Quand on saisit un caractère : on met à jour la valeur dans le state, un rendu de App
est fait, donc aussi un rendu de Currencies, et donc input récupère cette nouvelle
valeur.
Pour cela on a ajouté deux props :
- une qui permet de lire la valeur du state
- une qui permet de provoquer une modification de la valeur du state
https://fr.reactjs.org/docs/forms.html#controlled-components
*/

// on transforme le composant pour qu'il soit écrit en classe, pour avoir accès aux
// méthodes du cycle de vie

class Currencies extends React.Component {
  // constructor(props) {
  //   super(props);

  //   console.log('[Currencies] constructor');
  // }

  componentDidMount() {
    // console.log('[Currencies] componentDidMount');
  }

  componentDidUpdate() {
    // console.log('[Currencies] componentDidUpdate');
  }

  // appelé quand le composant va disparaître de la page
  componentWillUnmount() {
    // console.log('[Currencies] componentWillUnmount');
  }

  render() {
    const {
      currencies,
      handleClick,
      search,
      handleSearchChange,
    } = this.props;

    // console.log('[Currencies] render');

    return (
      <div className="currencies">
        <input
          className="currencies-search"
          type="text"
          placeholder="Rechercher"
          value={search}
          onChange={(event) => {
            // console.log(event.currentTarget.value);
            handleSearchChange(event.currentTarget.value);
          }}
        />
        <ul>
          {
            currencies.map((currency) => (
              <li
                key={currency.name}
                className="currency"
                onClick={() => {
                  // façon "React" de récupérer l'information : utiliser les données
                  // (props) plutôt que ce qui est dans le DOM
                  // console.log(`clic sur une devise : ${currency.name}`);
                  handleClick(currency.name);
                }}
              >
                {currency.name}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
};

Currencies.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      // facultatif de valider ce qu'on n'utilise pas dans le composant
      // rate: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  // valeur à afficher dans l'input
  search: PropTypes.string.isRequired,
  // informer d'un changement de valeur de l'input
  handleSearchChange: PropTypes.func.isRequired,
};

export default Currencies;
