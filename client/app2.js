


var emojis = document.querySelectorAll('.emoji')
// var toggleMode = document.querySelector('.toggle-mode')
// var navbar = document.querySelector('.navbar')
// var sidebar = document.querySelector('.left-section')
// var messageSent = document.getElementsByClassName("message-sent")


emojis.forEach((emoji) => {

    emoji.addEventListener('click',function(e){
        var emojiValue = e.target.innerHTML
        
        var messageBox = document.querySelector('.message-box')
        messageBox.value += emojiValue
    })
})


    
    // toggleMode.addEventListener('click',function(e)
    // {
    //     document.body.classList.toggle('body-dark')
    //     navbar.classList.toggle('navbar-dark')
    //     sidebar.classList.toggle('sidebar-dark')
    //     alert("here")
        
    //     console.log(messageSent);
    //     for(let message of messageSent)
    //     {
    //         // alert("here")
    //         message.classList.toggle('message-dark')
    //      }
    // })
    

    
    

