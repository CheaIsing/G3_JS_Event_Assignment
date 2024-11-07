const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");
// console.log(token);

function createRecruit() {
    // Create event form variables
    let eventName = document.getElementById('postTitle').value;
    let startDate = document.getElementById('startDate').value;
    let startTime = document.getElementById('startTime').value;
    let endDate = document.getElementById('endDate').value;
    let endTime = document.getElementById('endTime').value;
    let fullStartDate = `${startDate} ${startTime}:00`;
    let fullEndDate = `${endDate} ${endTime}:00`;
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
    

    let description = `${descQuillContent}`;


    let eventData = new FormData();
    eventData.append('name', eventName);
    // eventData.append('thumbnail', thumbnailFile);
    eventData.append('start_date', fullStartDate);
    eventData.append('end_date', fullEndDate);
    eventData.append('location', fullAddress);
    eventData.append('description', description);
    eventData.append('vendor_category_ids', JSON.stringify(categoriesList));

    eventData.forEach((element, key) => {
        console.log(element, key);

    })

    fetch(`${apiUrl}/api/vendors`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json;"
        },
        body: eventData
    })
        .then(res => res.json())
        .then(json => {
            alert('Success created');

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

// Fetch vendor Categories
fetch(`${apiUrl}/api/vendor-categories`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(res => res.json())
    .then(json => {
        const { data } = json;
        let eventCatSelect = document.getElementById('categorySelect');
        data.forEach(element => {
            let opt = document.createElement('option');
            opt.value = element.id;
            opt.innerHTML = element.name;
            eventCatSelect.appendChild(opt);
        });
    })