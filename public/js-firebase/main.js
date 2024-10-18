window.addEventListener('load', function () {

    document.getElementById('log-in-google').addEventListener('click', function () {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                console.log('Logging successfully', result.user);
                location.href = 'culturalconnections.html';
            })
            .catch(function (error) {
                console.log('Logging fail', error);
            });
    });

    document.getElementById('log-in-manual').addEventListener('click', function () {
        let emailTxt = document.getElementById('email').value;
        let passtxt = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(emailTxt, passtxt)
            .then((userCredential) => {
                let user = userCredential.user;
                console.log('Logging successfully');
                alert('Logging successfully');
                location.href = 'culturalconnections.html';
            })
            .catch((error) => {
                let errorMessage = error.message;
                console.log('Logging fail', errorMessage);
            });
    });

    document.getElementById('log-in-phonenumber').addEventListener('click', function () {
        const phoneNumber = document.getElementById('phone-number').value; 
        const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container'); 

        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                const code = prompt('Enter the verification code you received via SMS:', '');
                return confirmationResult.confirm(code); 
            })
            .then((result) => {
                const user = result.user;
                console.log('Logging successfully with phone number:', user);
                alert('Logging successfully with phone number');
                location.href = 'culturalconnections.html';
            })
            .catch((error) => {
                console.error('Error during phone number sign-in:', error);
            });
    });

});
