import { useState } from 'react'
import '../styles/QuestionForm.scss'

export default function QuestionForm({joueurKey, joueur, onAddItem, highlightButton}) {
    /** 
     * Construit un formulaire compose d'une date, d'un texte, d'un montant et d'un bouton.
     * lobsterData est le nom du localStorage pour ce projet.
     * storedData est l'objet JS lie aux donnees de lobsterData.
     * data stocke dans le programme les donnees de lobsterData.
     */
    const [date, setDate] = useState('');
    const [achat, setAchat] = useState('');
    const [montant, setMontant] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const storedData = JSON.parse(localStorage.getItem('lobsterData'));
        const newId = storedData.joueurs.length;
        const newItem = [newId, date, achat, parseFloat(montant), joueur.nom];
        onAddItem(newItem);

        // on reinitialise le formulaire
        setDate('');
        setAchat('');
        setMontant('');
    }

    return (
        <div className='colonne'>
            <form onSubmit={handleSubmit}>
                <input className='entree'
                name='queryDate'
                placeholder='jj/mm/aaaa'
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required />

                <input className='entree'
                name='queryAchat'
                placeholder='Achat'
                type='text'
                value={achat}
                onChange={(e) => setAchat(e.target.value)}
                required />

                <input className='entree'
                name='queryMontant'
                placeholder='Montant'
                type='number'
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                required />

                <button className={`${highlightButton ? 'btn-reset' : 'btn'}`} type='submit'>Valider</button>
            </form>
        </div>
    );
}
