/* eslint-disable react/no-access-state-in-setstate */
// == Import npm
import React from 'react';

// == Import
import Header from 'src/components/Header';
import Currencies from 'src/components/Currencies';
import Amount from 'src/components/Amount';
import CustomButton from 'src/components/CustomButton';

// import du fichier de données
import currenciesList from 'src/data/currencies';

import './styles.scss';

/*
state (état) de l'application : données qui peuvent changer au fil du temps.
Si on change ces données, React met automatiquement à jour l'affichage => rappel de
la méthode render, et on refait le rendu des composants utilisés
Deux façons de mettre en place un state :
- transformer le composant en classe
- hook d'état (et le composant reste une fonction)

=> un composant React c'est une fonction... sauf si on a besoin d'utiliser un state
ou des méthodes du cycle de vie
Dans ce cas, on convertit le composant fonction en classe
https://fr.reactjs.org/docs/state-and-lifecycle.html#converting-a-function-to-a-class
*/

/*
cycle de vie du composant : méthodes qui permettent d'exécuter un traitement à un
moment précis : par exemple juste après le premier rendu du composant
https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
*/

// == Composant
// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  // constructor(props) {
  //   super(props);

  //   console.log('[App] constructor');
  // }

  // grâce au plugin de Babel "plugin-proposal-class-properties"
  // on peut définir le state sans écrire un constructeur

  // on crée le state du composant
  state = {
    // indique si on affiche Currencies
    open: true,
    // montant à convertir (contenu de l'input)
    baseAmount: 1,
    // montant à convertir, après soumission du formulaire
    baseAmountSubmitted: 1,
    // devise sélectionnée
    currency: 'United States Dollar',
    // contenu de l'input de recherche
    inputSearch: '',
  };

  // appelé après le premier rendu
  componentDidMount() {
    // bon moment pour aller interroger une API pour récupérer des données
    console.log('[App] componentDidMount');
    this.updateTitle();
  }

  // appelé après chaque rendu du composant, sauf le premier
  // https://fr.reactjs.org/docs/react-component.html#componentdidupdate
  // paramètres optionnels :
  // - prevProps : la valeur des props avant la mise à jour
  // - prevState : la valeur du state avant la mise à jour
  componentDidUpdate(prevProps, prevState) {
    console.log('[App] componentDidUpdate');
    // console.log(this.state);
    // console.log(prevState);

    // on met à jour le titre seulement si la devise a changé
    // on compare currency du state actuel avec currency du state précédent
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.currency !== prevState.currency) {
      this.updateTitle();
    }
  }

  updateTitle = () => {
    // eslint-disable-next-line react/destructuring-assignment
    document.title = `Converter - ${this.state.currency}`;

    console.log('mise à jour du titre');
  }

  // grâce au plugin de Babel "plugin-proposal-class-properties"
  // au lieu de définir une méthode, on définit une propriété de type function
  handleClick = (newValue) => {
    // console.log('clic sur le bouton');
    // on voudrait modifier la valeur de open

    // INTERDIT de modifier le state directement, il faut utiliser setState
    // (sinon l'affichage n'est pas mis à jour)
    // this.state.open = false;

    // je décris les modifications à appliquer sur le state
    this.setState({
      open: newValue,
      // éviter de lire la valeur actuelle du state pour calculer la valeur suivante
      // https://fr.reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
      // open: !this.state.open
    });
  }

  setCurrency = (currency) => {
    // mettre à jour currency dans le state avec la nouvelle valeur
    this.setState({
      // currency: currency,
      // le nom de la propriété à remplir est le même que le nom de la variable qui
      // contient la valeur => strictement équivalent à :
      currency,
    });

    // en fait, setState programme une mise à jour du state, la nouvelle valeur
    // sera disponible seulement au moment du prochain appel de render()
    // console.log(this.state.currency); // affiche la devise d'avant, pas la nouvelle
  }

  setSearch = (newValue) => {
    this.setState({
      inputSearch: newValue,
    });
  }

  setBaseAmount = (newBaseAmount) => {
    this.setState({
      baseAmount: newBaseAmount,
    });
  }

  handleSubmit = () => {
    // on transfère la valeur "brouillon" dans l'emplacement validé
    this.setState({
      // eslint-disable-next-line react/destructuring-assignment
      baseAmountSubmitted: this.state.baseAmount,
    });
  }

  getFilteredCurrencies = () => {
    const { inputSearch } = this.state;

    let filteredCurrencies = currenciesList;

    // si le champ n'est pas vide, on filtre
    // trim : enlever les espaces au début et à la fin
    if (inputSearch.trim().length > 0) {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
      filteredCurrencies = currenciesList.filter((currency) => {
        // chaîne à rechercher : toute en minuscules
        const loweredSearch = inputSearch.toLowerCase();
        const loweredCurrency = currency.name.toLowerCase();
        return loweredCurrency.includes(loweredSearch);
      });
    }

    return filteredCurrencies;
  }

  // fait la conversion et retourne le résultat
  computeAmount = () => {
    // destructuring : ici on récupére la propriété baseAmountSubmitted du state
    // et on la stocke dans une variable qui s'appelle baseAmount
    // (but : ne pas devoir modifier tout le code en-dessous)
    const { baseAmountSubmitted: baseAmount, currency } = this.state;

    // récupérer le taux correspondant à la devise sélectionnée
    const currencyData = currenciesList.find((data) => data.name === currency);

    // multiplier baseAmount par le taux ("rate") de la devise sélectionnée
    const result = baseAmount * currencyData.rate;

    // arrondir à deux décimales
    // const roundedResult = Math.round(result * 100) / 100;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
    const roundedResult = result.toFixed(2);
    // on adapte la validation de la prop amount de Amount : string désormais

    return roundedResult;
  }

  // render : méthode qui retourne du JSX
  render() {
    // if (open) <Currencies currencies={currenciesList} />

    /*
    Javascript sait que pour la condition complète soit vraie, il faut que les deux
    sous-conditions soient vraies. Donc s'il voit que la première est fausse, il
    s'arrête là, il évalue pas la deuxième.
    */
    // if (a > 2 && b < 5) {
    //   // faire quelque chose
    // }

    /*
    Affichage conditionnel d'un composant
    {open === true && <Currencies currencies={currenciesList} />}
    => si open est vrai la suite est évaluée (donc on affiche le composant)
    => si open est faux la suite est ignorée (donc on n'affiche pas le composant)
    On peut simplifier car la variable open est un booléen
    {open && <Currencies currencies={currenciesList} />}
    */

    const {
      open,
      baseAmount,
      currency,
      inputSearch,
    } = this.state;

    // console.log('[App] render');

    // on pourrait aussi écrire this.state.truc pour accéder à une donnée du state,
    // mais ESLint nous conseille le destructring

    // objectif : faire la conversion "1 euro" vers la devise sélectionnée
    const result = this.computeAmount();

    const filteredCurrencies = this.getFilteredCurrencies();

    return (
      <div className="app">
        <Header
          baseAmount={baseAmount}
          setBaseAmount={this.setBaseAmount}
          handleSubmit={this.handleSubmit}
        />
        <CustomButton open={open} manageClick={this.handleClick} />
        {open && (
          <Currencies
            currencies={filteredCurrencies}
            handleClick={this.setCurrency}
            search={inputSearch}
            handleSearchChange={this.setSearch}
          />
        )}
        <Amount currency={currency} amount={result} />
      </div>
    );
  }
}

// == Export
export default App;
