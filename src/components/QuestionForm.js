import { useState } from 'react'
import '../styles/QuestionForm.scss'

export default function QuestionForm({joueurKey, joueur, onAddItem, highlightButton}) {
    const [date, setDate] = useState('');
    const [achat, setAchat] = useState('');
    const [montant, setMontant] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const stored = JSON.parse(localStorage.getItem('lobsterData'));
        const newId = stored.joueurs.length;
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
