const signUpForm = document.querySelector('.signup-form-container')
const signuplink = document.querySelector('.signupLink')
const loginLink = document.querySelector('.loginLink')

signuplink.addEventListener('click',function(e)
{
    signUpForm.style.display ="flex"
})

loginLink.addEventListener('click',function(e)
{
    signUpForm.style.display ="none"
})