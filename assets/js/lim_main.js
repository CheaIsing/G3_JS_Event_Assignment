// Select all form elements
const forms = document.querySelectorAll('.sub-form-wrapper');

// Add click event listener to each form
forms.forEach(form => {
    form.addEventListener('click', () => {
        // Hide the form-display and show the form-wrapper
        let formDisplay = form.querySelector('.form-display');
        let formWrapper = form.querySelector('.main-form');

        formDisplay.style.display = 'none'; // Hide form-display
        formWrapper.style.display = 'block'; // Show form-wrapper
        form.style.outline = "2px solid #ff1694";
    });
});

// Upload File in create event
let fileInput = document.getElementById('fileUpload');
let fileNameDisplay = document.getElementById('fileName');
let btnRemoveImgFile = document.getElementById('btnRemoveImgFile');
let imageDisplay = document.getElementById('imageDisplay');

// Update the file name display when a file is selected
fileInput.addEventListener('change', function () {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;

        let reader = new FileReader();
        reader.onload = function (event) {
            imageDisplay.src = event.target.result; // Set the image source
            imageDisplay.style.display = 'block';   // Display the image
        }
        reader.readAsDataURL(fileInput.files[0]); // Read the file as a data URL

    }
    document.getElementById('imgInputBtn').style.display = 'none';
    document.getElementById('imgIcon').style.display = 'none';
    btnRemoveImgFile.style.display = 'block';
});

function removeImageFile() {
    fileInput.value = ''; // Clear the file input
    fileNameDisplay.textContent = 'No file chosen';
}
btnRemoveImgFile.addEventListener('click', function () {
    fileInput.value = '';
    imageDisplay.src ='';
    imageDisplay.style.display = 'none';
    fileNameDisplay.textContent = 'No file chosen';
    btnRemoveImgFile.style.display = 'none';
    document.getElementById('imgInputBtn').style.display = 'block';
    document.getElementById('imgIcon').style.display = 'block';
});

// --------------------------------------------------------

// Upload photo in create event deatil 
let photoInput = document.getElementById('photoUpload');
let photoNameDisplay = document.getElementById('photoName');
let btnRemoveImg = document.getElementById('btnRemoveImg');
let photoDisplay = document.getElementById('photoDisplay');

// Update the file name display when a file is selected
photoInput.addEventListener('change', function () {
    if (photoInput.files.length > 0) {
        photoNameDisplay.textContent = photoInput.files[0].name;

        let reader = new FileReader();
        reader.onload = function (event) {
            photoDisplay.src = event.target.result; // Set the image source
            photoDisplay.style.display = 'block';   // Display the image
        }
        reader.readAsDataURL(photoInput.files[0]); // Read the file as a data URL

    }
    document.getElementById('photoInputBtn').style.display = 'none';
    document.getElementById('photoIcon').style.display = 'none';
    btnRemoveImg.style.display = 'block';
});

function removeImageFile() {
    photoInput.value = ''; // Clear the file input
    photoNameDisplay.textContent = 'No file chosen';
}
btnRemoveImg.addEventListener('click', function () {
    photoInput.value = '';
    photoDisplay.src = "";
    photoDisplay.style.display = 'none';
    photoNameDisplay.textContent = 'No file chosen';
    btnRemoveImg.style.display = 'none';
    document.getElementById('photoInputBtn').style.display = 'block';
    document.getElementById('photoIcon').style.display = 'block';
});

