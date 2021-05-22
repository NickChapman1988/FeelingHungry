/*Code build following walkthrough from Code Institute 'Resume' project*/

function sendMail(contactForm) {
    emailjs.send("outlook","feeling_hungry", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "contact_message": contactForm.contactmessage.value
    })
    .then(
        function(response) {
            console.log("Success", response)
        }, 
        function(error) {
            console.log("Failed", error);
        });
    return false;    
}