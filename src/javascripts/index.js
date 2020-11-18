// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// JavaScript
//TODO
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function displayCard(c) //HTML added to #cards
{
    return `
    <div class="card">
        <img src="${c.poster}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${c.title}</h5>
            <p class="card-text">Author: ${c.author}</p>
            <p class="card-text">Publication Year: ${c.publication}</p>
            <p class="card-text">${c.description}</p>
            <button class="btn btn-danger delete-card">Delete</button>
        </div>
    </div>
    `;
}
function displayCards() //Display the added cards
{
    let cards = JSON.parse(localStorage.getItem('cards') || '[]');
    document.querySelector('#cards').innerHTML = '';
    for(let c of cards)
    {
        let col = document.createElement('div');
        col.setAttribute('class', 'col-md-4');
        col.innerHTML = displayCard(c);
        document.querySelector('#cards').append(col);
    }
    document.querySelectorAll('.delete-card').forEach(function(b)
    {
        b.onclick = function(event)
        {
            let cards = JSON.parse(localStorage.getItem('cards') || '[]');
            let ndx = -1;
            for(let i in cards)
            {
                if(cards[i].title == event.target.closest('card').dataset.title)
                {
                    ndx = 1;
                    break;
                }
            }
            if(ndx != -1)
            {
                cards.splice(ndx, 1);
                localStorage.setItem('cards', JSON.stringify(cards));
                location.reload();
            }
        }
    })
}

function addNewCard(event) // populates card with inputed data
{
    if(event)
    {
        event.preventDefault();
    }
    let t = document.querySelector('#title').value;
    let d = document.querySelector('#description').value;
    let p = document.querySelector('#poster').value;
    let a = document.querySelector('#author').value;
    let pd = document.querySelector('#publication').value;

    let cards = JSON.parse(localStorage.getItem('cards') || '[]');
    if(t && d && p && a && pd)
    {
        let card = {title: t, description: d, poster: p, author: a, publication: pd};
        cards.push(card);
        localStoragel.setItem('cards', JSON.stringify(cards));
    }

    this.reset();
    displayCards();
}
document.forms[0].addEventListener('submit', addNewCard, false);
displayCards();