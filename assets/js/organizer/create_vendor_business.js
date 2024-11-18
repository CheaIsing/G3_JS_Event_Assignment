const apiUrl = "https://mps2.chandalen.dev";
// const token = localStorage.getItem("authToken");
// console.log(token);

function createBusiness() {
    // Create Vendor Business form variables
    // let thumbnailFile = document.getElementById('fileUpload').files[0];
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
    let fullAddress = `${address1}, ${address2}, ${province}, ${city}, ${country}`;

    let categoriesSelect = document.getElementById('categorySelect');

    let categoriesList = []
    for (let catOption of categoriesSelect.options) {
        if (catOption.selected) {
            categoriesList.push(catOption.value);
        }
    }

    //get text from Qill form

    let descQuillContent = descQuill.root.innerHTML;  // or use quill.getText() for plain text
    // console.log("Editor Content:", descQuillContent);


    let description = descQuillContent;



    let eventData = new FormData();
    eventData.append('name', businessName);
    eventData.append('location', fullAddress);
    eventData.append('description', description);
    eventData.append('phone', phone);
    eventData.append('email', email);
    eventData.append('facebook', facebook);
    eventData.append('linkedin', linkedin);
    eventData.append('telegram', telegram);
    eventData.append('tiktok', tiktok);
    eventData.append('business_category_ids', JSON.stringify(categoriesList));

    // eventData.forEach((element, key) => {
    //     console.log(element, key);

    // })

    if(isValid_vendorBusiness() == true){
        fetch(`${apiUrl}/api/businesses`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Accept": "application/json;",
            },
            body: eventData
        })
            .then(res => res.json())
            .then(json => {
                location.href = "vendor-business.html";                
            })
            // .then(response => {
            //     if (!response.ok) {
            //         // Extract the JSON error message from the response
            //         return response.json().then(errorData => {
            //             console.error("Error message:", errorData.message);
            //             console.error("Detailed error:", errorData.data);
    
    
            //             throw new Error(`HTTP error! Status: ${response.status}`);
            //         });
            //     }
            //     return response.json();
            // })
            // .catch(error => console.error('Request Failed:', error));
    }

}
