    //declarations of error message span which is inside label
    var nameError = document.getElementById('name-error');
    var phoneError = document.getElementById('phone-error');
    var emailError = document.getElementById('email-error');
    var messageError = document.getElementById('message-error');

    
    //name
    function validateName() {
        var name = document.getElementById('contact-name').value;
        

        if (name.trim().length === 0) {
            nameError.innerHTML = '<span style="color: red;float: right;">Name is required</span>';
            return false;
        }

        var namePattern = /^[A-Za-z]+\s+[A-Za-z]+$/;
        if (!namePattern.test(name)) {
            nameError.innerHTML = '<span style="color: red;float: right;">Please enter your full name</span>';
            return false;
        }

        nameError.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
        nameError.style.color = 'green';
        nameError.style.float = 'right';
        return true;
    }


    //phone number
    function validatePhone(event) {
        var phoneInput = document.getElementById('contact-phone');
        
        // Remove non-digit characters
        var sanitizedValue = phoneInput.value.replace(/\D/g, '');
        // Update the input value
        phoneInput.value = sanitizedValue;
        // Check if there are any non-digit characters
        if (/[^\d]/.test(sanitizedValue)) {
            phoneError.innerHTML = '<span style="color: red;float: right;">Only digits are allowed</span>';
            return false;
        }
        if (sanitizedValue.length !== 10) {
            phoneError.innerHTML = '<span style="color: red;float: right;">Enter up to 10 digits</span>';
            return false;
        }
        phoneError.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
        phoneError.style.color = 'green';
        phoneError.style.float = 'right';
        return true;
    }
    // Attach the function to the oninput event
    document.getElementById('contact-phone').addEventListener('input', validatePhone);


    //email
    function validateEmail(inputText) {
        var email = document.getElementById('contact-email').value;
        var mailFormat = /\S+@\S+\.\S+/;/^[A-Za-z._-][0-9]*@[A-Za-z]+\.[a-z]{2,4}$/
        if(email.match(mailFormat)) {
            emailError.innerHTML = '<span style="color: green;float: right;"><i class="fa-regular fa-circle-check"></i></span>';
            return true;
        }
        else {
            emailError.innerHTML = '<span style="color: red;float: right;">Invalid Email</span>';
            return false;
        }
    }
    

    //message
    function validateMessage() {
        var message = document.getElementById('contact-message').value;

        if(message.length == 0) {
            messageError.innerHTML = '<span style="color: red;float: right;">Message is required</span>';
            return false;
        }
        if(message.length<30) {
            messageError.innerHTML = '<span style="color: red;float: right;">Enter more than 20 letters</span>';
            return false;
        }
        messageError.innerHTML = '<span style="color: green;float: right;"><i class="fa-regular fa-circle-check"></i></span>';
    }

    //formspree
    var form = document.getElementById("contactForm");

    async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
    }).then(response => {
    if (response.ok) {
        status.innerHTML = "Thank you! We'll get back to you soon!";
        setTimeout(function() {
        // Then we remove the text after 3 seconds.
        status.innerHTML = "";
    }, 3000);
        document.getElementById("contactForm").reset();
        document.getElementById('name-error').innerHTML = "";
        document.getElementById('phone-error').innerHTML = "";
        document.getElementById('email-error').innerHTML = "";
        document.getElementById('message-error').innerHTML = "";
    } else {
        response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            setTimeout(function() {
        // Then we remove the text after 3 seconds.
        status.innerHTML = "";
    }, 3000);
        } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
            setTimeout(function() {
        // Then we remove the text after 3 seconds.
        status.innerHTML = "";
    }, 3000);
        }
        })
    }
    }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form 2";
    setTimeout(function() {
        // Then we remove the text after 3 seconds.
        status.innerHTML = "";
    }, 3000);
    });
}
form.addEventListener("submit", handleSubmit)
