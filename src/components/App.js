import logo from '../assets/logo2.webp';
import photoJoueur1 from '../assets/photoJoueur1.png';
import photoJoueur2 from '../assets/photoJoueur2.png';
import QuestionForm from './QuestionForm.js';
import '../styles/App.scss';
import {useEffect, useState} from 'react';
import {initialData} from './data.js';

export default function App() {
  /** joueur1, joueur2, joueurs sont des variables d'etat.
   * lobsterData est le nom du localStorage pour ce projet.
   * storedData est l'objet JS lie aux donnees de lobsterData.
   * data stocke dans le programme les donnees de lobsterData.
  */
  const [joueur1,setJoueur1] = useState({nom:'utilisateur 1', depenses:0});
  const [joueur2,setJoueur2] = useState({nom:'utilisateur 2', depenses:0});
  const [joueurs, setJoueurs] = useState([]);
  const lieu = "Barcelone";

  useEffect(() => {
    const storedData = localStorage.getItem('lobsterData');
    if (storedData){
      const data = JSON.parse(storedData);
      setJoueur1(data.joueur1);
      setJoueur2(data.joueur2);
      setJoueurs(data.joueurs);
    } 
    else {
      localStorage.setItem('lobsterData', JSON.stringify(initialData));
      setJoueur1(initialData.joueur1);
      setJoueur2(initialData.joueur2);
      setJoueurs(initialData.joueurs);
    }
  },[]);

  function ajouterActivite(item){
    /** Ajoute une activite item dans le localStorage appelé lobsterData */
    const [id, date, achat, montant, joueurNom] = item;
    const updatedList = [...joueurs, item];
    let updatedJoueur1 = {...joueur1};
    let updatedJoueur2 = {...joueur2};
    if (joueurNom === joueur1.nom) {
      updatedJoueur1.depenses += montant;
    } 
    else if (joueurNom === joueur2.nom) {
      updatedJoueur2.depenses += montant;
    }
    setJoueurs(updatedList);
    setJoueur1(updatedJoueur1);
    setJoueur2(updatedJoueur2);
    const updatedData = {
      joueur1: updatedJoueur1,
      joueur2: updatedJoueur2,
      joueurs: updatedList
    };
    localStorage.setItem('lobsterData', JSON.stringify(updatedData));
  }

  function resetData() {
    /** Reinitialise les donnees de localStorage appelees lobsterData */
    const confirmReset = window.confirm("Reset ?");
    if (confirmReset) {
      localStorage.setItem('lobsterData', JSON.stringify(initialData));
      setJoueur1(initialData.joueur1);
      setJoueur2(initialData.joueur2);
      setJoueurs(initialData.joueurs);
    }
  }

  function calculerDifference(depenses1, depenses2){
    /** Renvoie la difference de depenses si le resultat est positif et rien sinon */
    return depenses1<depenses2 ? `${depenses1-depenses2}` : null;
  }
            
  return (
    <div className="app">
      <header className="appHeader">
          <img src={logo} className="appLogo" alt="logo" />
      </header>
      <h1>Welcome to Lobster</h1>

      <h2>{lieu}</h2>
      <p className='argent'>&#128176; {joueur1.depenses+joueur2.depenses}</p>
      <div className="container">
        <div className="user-block">
          <img src={photoJoueur1} className='photoJoueur' alt='image joueur 1' />
          <h2 className="item">{joueur1.nom}</h2>
          <div className="item"><QuestionForm joueurKey="joueur1" joueur={joueur1} onAddItem={ajouterActivite} highlightButton={joueur1.depenses < joueur2.depenses} /></div>
          <div className="item"><p className='rouge'>{calculerDifference(joueur1.depenses, joueur2.depenses)}</p></div>
          <div className="item"><p className='argent'>&#128181; {joueur1.depenses}</p></div>
        </div>
        <div className="user-block">
          <img src={photoJoueur2} className='photoJoueur' alt='image joueur 2' />
          <h2 className="item">{joueur2.nom}</h2>
          <div className="item"><QuestionForm joueurKey="joueur2" joueur={joueur2} onAddItem={ajouterActivite} highlightButton={joueur2.depenses < joueur1.depenses} /></div>
          <div className="item"><p className='rouge'>{calculerDifference(joueur2.depenses, joueur1.depenses)}</p></div>
          <div className="item"><p className='argent'>&#128181; {joueur2.depenses}</p></div>
        </div>
      </div>

      <ul className="liste">
        {joueurs.map(([id, date, achat, montant, joueur]) => (
        <li key={id}>{date} {achat} {montant} {joueur}</li>
      ))}
      </ul>
      <button onClick={resetData} className="btn-reset">Reset</button>
    </div>
  );
}
