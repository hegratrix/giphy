let giphyArr = ["Hello", "Good-Bye", "Hey", "Good Morning", "Good Night", "Sweet Dreams", "Good Luck", "Thinking of You", "Sorry", "Have a Great Day", "Get Well", "Love You", "Miss You"]
let chosenGreeting = ""
let apiKey= 'Cq9dqB1rAP15arh4r7m2imChIUIf7mcl'
let firstClick = true

// makes buttons when page is loaded
$(document).ready(function (){
    makeButtons()
})

//  add a new button
$('#add-greeting').click(function (event) {
    event.preventDefault()
    let newGreeting = $('#greeting-input').val()
    giphyArr.push(newGreeting)
    makeButtons()
    $('#greeting-input').empty()
})

// makes buttons
function makeButtons (){
    $('#greeting-buttons').empty()
    for (let i = 0; i < giphyArr.length; i++) {
        let title = giphyArr[i]
        $('#greeting-buttons').append (`
            <button id ="btn${title}" class ="greeting-button" onclick="getPictures('${title}')">${title}</button>
        `)
    }
}

// generates 10 rated g/pg gifs
function getPictures (chosenGreeting){
    $('#greeting-gifs').empty()
    let picNumber = 10
    $.get('http://api.giphy.com/v1/gifs/search?q='+chosenGreeting+'&api_key='+apiKey+'&limit=15')
    .then(function (r){
        for (let i = 0; i <picNumber; i++) {
            let rating = (r.data[i].rating)
            if (rating ==='g' || rating ==='pg'){
                let clip = (r.data[i].images.original.url)
                let still = (r.data[i].images.original_still.url)
                $('#greeting-gifs').append (`
                    <div class="gif-div">
                        <img id ="pic${i}" class="clip" src="${clip}" onclick ="switchPic('still', ${i})">
                        <img id ="still${i}" class="still" src ="${still}" onclick ="switchPic('clip', ${i})">
                        <h3>'Rating: '${rating}</h3>
                    </div>
                `)
                $('.still').css("display", "none")
            } else {
             picNumber++
            }
        }
    })
    .catch (function (e) {
        console.log(e)
    })
}

// click on picture change from gif to still to back
function switchPic (type, id) {
    console.log(type)
    console.log(`'#pic${id}'`)
        if (type==='still'){
        $(`#pic${id}`).css("display", "none")
        $(`#still${id}`).css("display", "initial")
    } else {
        $(`#still${id}`).css("display", "none")
        $(`#pic${id}`).css("display", "initial")
    }

}