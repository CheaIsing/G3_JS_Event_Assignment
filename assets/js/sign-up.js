
      const togglePassword = document.querySelector('#togglePassword');
      const password = document.querySelector('#password');
      const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
      const confirmPassword = document.querySelector('#confirmPassword');
      const emailInput = document.querySelector('#email');
      const emailError = document.querySelector('#email-error');
      const usernameInput = document.querySelector('#username');
      const usernameError = document.querySelector('#username-error');
      const signUpBtn = document.querySelector('#Sign-up');
      const passwordError = document.querySelector('#password-error');
      const confirmPasswordError = document.querySelector('#confirm-password-error');
  
      togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('bi-eye');
        this.classList.toggle('bi-eye-slash-fill');
      });
  
      toggleConfirmPassword.addEventListener('click', function () {
        const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPassword.setAttribute('type', type);
        this.classList.toggle('bi-eye');
        this.classList.toggle('bi-eye-slash-fill');
      });
  
      function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
  
      function isValidFullName(name) {
        const nameRegex = /^[a-zA-Z\s]+$/;
        return nameRegex.test(name);
      }
  
      function isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?~-]{8,}$/;
        return passwordRegex.test(password);
      }
  
      signUpBtn.addEventListener('click', function () {
        const emailValue = emailInput.value.trim();
        const usernameValue = usernameInput.value.trim();
        const passwordValue = password.value;
        const confirmPasswordValue = confirmPassword.value;
        let formIsValid = true;
  
        if (!isValidEmail(emailValue)) {
          emailError.style.display = 'block';
          emailInput.classList.add('is-invalid');
          formIsValid = false;
        } else {
          emailError.style.display = 'none';
          emailInput.classList.remove('is-invalid');
        }
  
        if (usernameValue === '' || !isValidFullName(usernameValue)) {
          usernameError.style.display = 'block';
          usernameInput.classList.add('is-invalid');
          formIsValid = false;
        } else {
          usernameError.style.display = 'none';
          usernameInput.classList.remove('is-invalid');
        }
  
        if (!isValidPassword(passwordValue)) {
          passwordError.style.display = 'block';
          password.classList.add('is-invalid');
          document.getElementById('togglePassword').style.top = "29%"
          formIsValid = false;
        } else {
          passwordError.style.display = 'none';
          password.classList.remove('is-invalid');
          document.getElementById('togglePassword').style.top = "50%"
        }
  
        if (passwordValue !== confirmPasswordValue) {
          confirmPasswordError.style.display = 'block';
          confirmPassword.classList.add('is-invalid');
          document.getElementById('toggleConfirmPassword').style.top = "37%"
          formIsValid = false;
        } else {
          confirmPasswordError.style.display = 'none';
          confirmPassword.classList.remove('is-invalid');
          document.getElementById('toggleConfirmPassword').style.top = "50%"
        }
  
        if (formIsValid) {
          signUpBtn.disabled = true;
          document.body.style.cursor = 'wait';
          fetch('https://mps2.chandalen.dev/api/register', {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              full_name: usernameValue,
              email: emailValue,
              password: passwordValue,
              password_confirmation: confirmPasswordValue
            })
          })
          .then(res => res.json())
          .then(json => {
            signUpBtn.disabled = false;
            document.body.style.cursor = 'default';
            console.log(json);
            showToast(typeof json.data.email != 'string' ? json.data.email[0] : json.message, json.result);
            if(json.result === true){
              localStorage.setItem('authToken', json.data.token)
              setTimeout(()=>{
                location.href = "../homepage.html"; 
              }, 1500);
            }
          })
          .catch(error => {console.error('Error:', error)
          });
        }
      });
  
      emailInput.addEventListener('input', function () {
        if (isValidEmail(this.value)) {
          emailError.style.display = 'none';
          emailInput.classList.remove('is-invalid');
        }
      });
  
      usernameInput.addEventListener('input', function () {
        if (isValidFullName(this.value)) {
          usernameError.style.display = 'none';
          usernameInput.classList.remove('is-invalid');
        }
      });
  
      password.addEventListener('input', function () {
        if (isValidPassword(this.value)) {
          passwordError.style.display = 'none';
          password.classList.remove('is-invalid');
          document.getElementById('togglePassword').style.top = "50%"
        }
      });
  
      confirmPassword.addEventListener('input', function () {
        if (password.value === confirmPassword.value) {
          confirmPasswordError.style.display = 'none';
          confirmPassword.classList.remove('is-invalid');
          document.getElementById('toggleConfirmPassword').style.top = "50%"
        }
      });
