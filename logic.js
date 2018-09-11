let giphyArr = ["Hello", "Good-Bye", "Hey", "Good Morning", "Good Night", "Sweet Dreams", "Good Luck", "Thinking of You", "Sorry", "Have a Great Day", "Get Well", "Love You", "Miss You"]
let btnColor = ["#ff6600", "#00cccf", "#fed700"]
let chosenGreeting = ""
let apiKey= 'Cq9dqB1rAP15arh4r7m2imChIUIf7mcl'

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
    $('#greeting-input').val('')
})

// makes buttons
function makeButtons (){
    $('#greeting-buttons').empty()
    for (let i = 0; i < giphyArr.length; i++) {
        let title = giphyArr[i]
        let color = btnColor[Math.floor(Math.random() * btnColor.length)]
        console.log(color)
        $('#greeting-buttons').append (`
            <button id ="btn${title}" class ="greeting-button" style ="background-color: ${color}" onclick="getPictures('${title}')">${title}</button>
        `)
    }
}

// generates 10 rated g/pg gifs
function getPictures (greeting){
    $('#greeting-gifs').empty()
    let picNumber = 10
    let frame = 1
    $.get('http://api.giphy.com/v1/gifs/search?q='+greeting+'&api_key='+apiKey+'&limit=15')
    .then(function (r){
        for (let i = 0; i <picNumber; i++) {
            let rating = (r.data[i].rating)
            if (rating ==='g' || rating ==='pg'){
                let clip = (r.data[i].images.original.url)
                let still = (r.data[i].images.original_still.url)
                $('#greeting-gifs').append (`
                    <div class="gif-div" style="border-image: url(./images/frame${frame}.png) 240 round;">
                        <img id ="pic${i}" class="clip" src="${clip}" onclick ="switchPic('still', ${i})">
                        <img id ="still${i}" class="still" src ="${still}" onclick ="switchPic('clip', ${i})">
                        <h3 id ="rating">'Rating: '${rating}</h3>
                    </div>
                `)
                $('.still').css("display", "none")
                frame++
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
        if (type==='still'){
        $(`#pic${id}`).css("display", "none")
        $(`#still${id}`).css("display", "initial")
    } else {
        $(`#still${id}`).css("display", "none")
        $(`#pic${id}`).css("display", "initial")
    }

}