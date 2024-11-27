
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
            imageDisplay.src = '';
            imageDisplay.style.display = 'none';
            fileNameDisplay.textContent = 'No file chosen';
            btnRemoveImgFile.style.display = 'none';
            document.getElementById('imgInputBtn').style.display = 'block';
            document.getElementById('imgIcon').style.display = 'block';
        });

       

        let editId = sessionStorage.getItem('editBusinessid')
        fetch(
  `${apiUrl}/api/business-categories?page=1&per_page=50&sort_col=name&sort_dir=asc&search`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)
  .then((res) => res.json())
  .then((json1) => {
    const { data } = json1;
    let eventCatSelect = document.getElementById("categorySelect");
    eventCatSelect.innerHTML = ''
    data.forEach((element) => {
      let opt = document.createElement("option");
      opt.value = element.id;
      opt.innerHTML = element.name;
      eventCatSelect.appendChild(opt);
    });

    fetch(`${API_URL}/api/businesses?pages=1&per_page=10000`)
            .then(res => res.json())
            .then(json => {


                let businesses = json.data.filter(ele => ele.id == editId)[0];
                // Populate form fields
                document.getElementById('postTitle').value = businesses.name || '';

                const categorySelect = document.getElementById('categorySelect');
                businesses.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.text = category.name;
                    categorySelect.add(option);
                });

                 // Set the category select to the vendor's categories if available
    if (businesses.categories && businesses.categories.length > 0) {
        businesses.categories.forEach(category => {
            const selectedOption = document.querySelector(`option[value="${category.id}"]`);
            if (selectedOption) {
                selectedOption.setAttribute('selected', '');
            }
        });
    }


                descQuill.root.innerHTML = businesses.description || '';

                document.getElementById('email').value = businesses.email || '';
                document.getElementById('phone').value = businesses.phone || '';
                document.getElementById('facebook').value = businesses.facebook || '';
                document.getElementById('telegram').value = businesses.telegram || '';
                document.getElementById('tiktok').value = businesses.tiktok || '';
                document.getElementById('linkedin').value = businesses.linkedin || '';
                const str = businesses.location;

// Split the string into an array of values by using `split` with the comma and space as the delimiter
const parts = str.split(", ");

// Assign each part to a separate variable
const [address1, address2, city, province, country] = parts;
                
                document.getElementById('address1').value = address1 || '';
                document.getElementById('address2').value = address2 || '';
                document.getElementById('city').value = city || '';
                document.getElementById('province').value = province || '';
                document.getElementById('country').value = country || '';
                document.getElementById("imageDisplay").src = businesses.thumbnail
                document.getElementById("imageDisplay").style.display = 'block'


            })


  });



        function updateBusiness() {
            // Create Vendor Business form variables
            let thumbnailFile = document.getElementById('fileUpload').files[0];
            // let descPhoto = document.getElementById('photoUpload').files[0];
            // let servicePrice = document.getElementById('servicePrice').value;
            let businessName = document.getElementById('postTitle').value;
            let email = document.getElementById('email').value;
            let phone = document.getElementById('phone').value;
            let facebook = document.getElementById('facebook').value;
            let telegram = document.getElementById('telegram').value;
            let tiktok = document.getElementById('tiktok').value;
            let linkedin = document.getElementById('linkedin').value;
            let address1 = document.getElementById('address1').value;
            let address2 = document.getElementById('address2').value;
            let city = document.getElementById('city').value;
            let province = document.getElementById('province').value;
            let country = document.getElementById('country').value;
            let fullAddress = `${address1}, ${address2}, ${city}, ${province}, ${country}`;

            let categoriesSelect = document.getElementById('categorySelect');

            let categoriesList = []
            for (let catOption of categoriesSelect.options) {
                if (catOption.selected) {
                    categoriesList.push(catOption.value);
                }
            }

            //get text from Qill form

            let descQuillContent = descQuill.root.innerHTML;  // or use quill.getText() for plain text



            let description = descQuillContent;

            

            let eventData = new FormData();
            if (thumbnailFile) {
                eventData.append('thumbnail', thumbnailFile);
            }
            eventData.append('name', businessName);
            eventData.append('location', fullAddress);
            eventData.append('description', descQuill.root.innerHTML);
            eventData.append('phone', phone);
            eventData.append('email', email);
            eventData.append('facebook', facebook);
            eventData.append('linkedin', linkedin);
            eventData.append('telegram', telegram);
            eventData.append('tiktok', tiktok);
            eventData.append('business_category_ids', JSON.stringify(categoriesList));

            if (isValid_vendorBusiness() == true) {
                    document.getElementById('btn-update-bu').disabled = true
    document.body.style.cursor = 'wait'
                fetch(`${API_URL}/api/businesses/${editId}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Accept": "application/json",
                    },
                    body: eventData
                    // JSON.stringify(eventData)
                    // JSON.stringify({
                    //     name: businessName,
                    //     location: fullAddress,
                    //     description: description,
                    //     phone: phone,
                    //     email: email,
                    //     facebook: facebook,
                    //     linkedin: linkedin,
                    //     telegram: telegram,
                    //     tiktok: tiktok,
                    //     business_category_ids: JSON.stringify(categoriesList),
                    // })
                })
                    .then(res => res.json())
                    .then(json => {
                            document.getElementById('btn-update-bu').disabled = false
    document.body.style.cursor = 'default'
                        
                        showToast(json.result == true ?  "Updated Business Successfully.":json.message, json.result)
                        if (json.result == true) {
                            setTimeout(() => {
                                location.href = "vendor-business.html";
                            }, 1500);
                        }
                    })
            }

        }

   