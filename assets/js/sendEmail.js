/*Code built following walkthrough from Code Institute 'Resume' project*/

function sendMail(contactForm) {
    emailjs.send("outlook","feeling_hungry", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "contact_message": contactForm.contactmessage.value
    })
    .then(
        function(response) {
            console.log("Success", response);

            document.getElementById("message-success").innerHTML = `<p class="col-6 offset-3 center-block message-success">Thanks for your message!</p>`

            document.getElementById("fullname").value = "";
            document.getElementById("emailaddress").value = "";
            document.getElementById("contactmessage").value = "";
        }, 
        function(error) {
            console.log("Failed", error);
        });   
    return false;
}