const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");
// console.log(token);

function createNewEvent() {

    // Create event form variables
    let thumbnailFile = document.getElementById('fileUpload').files[0];
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
    let descPhoto = document.getElementById('photoUpload').files[0];
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
    // let agendaQuillContent = agendaQuill.root.innerHTML;  // or use quill.getText() for plain text
    // console.log("Editor Content:", agendaQuillContent);

    // let description = `<div class="descQill">${descQuillContent}</div><div class="agendaQill"><h2 class="fw-bold text-brand"><i class="fa-solid fa-calendar-days"></i> Agenda</h2>${agendaQuillContent}</div>`;
    let description = `<div class="descQill">${descQuillContent}</div>`;

    // add ticket form variables
    let ticketQty = document.getElementById('ticketQuantity').value;
    let ticketPrice = document.getElementById('price').value;
    let khqrImg = document.getElementById('khqrImg').value;

    let eventData = new FormData();
    eventData.append('name', eventName);
    // eventData.append('thumbnail', thumbnailFile);
    eventData.append('start_date', fullStartDate);
    eventData.append('end_date', fullEndDate);
    eventData.append('location', fullAddress);
    eventData.append('description', description);
    eventData.append('ticket_opacity', ticketQty);
    eventData.append('ticket_price', ticketPrice);
    eventData.append('event_category_ids', JSON.stringify(categoriesList));

    // eventData.forEach((element, key) => {
    //     console.log(element, key);

    // })

    fetch(`${apiUrl}/api/events`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json;"
        },
        body: eventData
    })
        .then(res => res.json())
        .then(json => {
            const { data } = json;
            let imgFIle = new FormData();
            imgFIle.append("thumbnail", thumbnailFile);

            fetch(`${apiUrl}/api/events/thumbnail/${data.id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Accept": "application/json;"
                },
                body: imgFIle
            })
            .then(res=>res.json())
            .then(json=>{
            })

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

// Fetch Event Categories
fetch(`${apiUrl}/api/event-categories?page=1&per_page=50&sort_col=name&sort_dir=asc&search`, {
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