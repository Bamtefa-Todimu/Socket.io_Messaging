var emojis = document.querySelectorAll('.emoji')
var boldBtn = document.querySelector('#bold-btn')
var italicBtn = document.querySelector('#italic-btn')
var mobileBtn = document.querySelector('.mobile-menu-btn')
var leftSection = document.querySelector('.left-section')

var createRoom = document.querySelector('.create-room-container')
var createRoomBtn = document.querySelector('.create-room-btn')
var displayCreateRoom = document.querySelector('.addRoom')
var room = document.querySelector('.room')
var newRoominput = document.querySelector('.new-room-input')
var closeCreateBtn = document.querySelector('.close-create-room')
var roomName;

displayCreateRoom.addEventListener('click', function(e)
{
    createRoom.style.display = "flex"
})

createRoomBtn.addEventListener('click',function(e)
{
    roomName = newRoominput.value
    room.innerHTML += `<a href=""><p class = "individual-room" id = "${roomName}" onclick = "joinRoom(event)"># ${roomName}</p></a>`
    createRoom.style.display = "none"
})

closeCreateBtn.addEventListener('click',function(e)
{
    createRoom.style.display = "none"

})



emojis.forEach((emoji) => {

    emoji.addEventListener('click',function(e){
        var emojiValue = e.target.innerHTML
        
        var messageBox = document.querySelector('.message-box')
        messageBox.value += emojiValue
    })
})


boldBtn.addEventListener("click",() => changeStyle("bold"))
italicBtn.addEventListener("click",() => changeStyle("italic"))

mobileBtn.addEventListener("click",(e) => {
    e.preventDefault()
    leftSection.classList.toggle('left-section-displayed')
})


function changeStyle(style)
{
    var messageBox = document.querySelector('.message-box')
   
    if(style === "bold")messageBox.classList.toggle("bolded-message")
     else messageBox.classList.toggle("italized-message")
}   



    
    

