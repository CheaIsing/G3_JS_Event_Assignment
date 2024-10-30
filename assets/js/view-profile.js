const API_URL = "https://mps2.chandalen.dev";
const token = localStorage.getItem('authToken');

fetch(`${API_URL}/api/profile/detail/${8}`, {
    headers: {
        Authorization: `Bearer ${token}`,
      }
})
.then(res=>res.json())
.then(json=>{
    // console.log(json);
    const {events, vendor_recruitments, businesses} = json.data;

    // console.log(events.length, vendor_recruitments.length, businesses.length);

    document.getElementById('event-sum').innerHTML = events.length;
    document.getElementById('vendor-sum').innerHTML = vendor_recruitments.length;
    document.getElementById('business-sum').innerHTML = businesses.length;

    document.getElementById('avarta').src = json.data.avarta;
    document.getElementById('fullname').innerHTML = json.data.full_name;
    document.getElementById('email').innerHTML = json.data.email? json.data.email : 'None'
    document.getElementById('tel').innerHTML = json.data.phone_number ? json.data.phone_number : 'None'

    let eventHTML = ''

    if(events.length >0){
        events.forEach(ele=>{
            console.log(ele);
    
            eventHTML = `
            <div class="col-4" data-id="${ele.id}">
                                                <div class="card position-relative">
                                                    <a href>
                                                        <img
                                                            src="${ele.thumbnail}"
                                                            class="card-img-top object-fit-cover "
                                                            alt="..." width="100%" height="210">
                                                    </a>
                                                    <button
                                                        class="i-wish border-0 position-absolute top-0 end-0">
                                                        <i
                                                            class="fa-regular fa-heart"></i>
                                                    </button>
                                                    <div class="card-body">
                                                        <h5 class="card-title">
                                                            <a href>${ele.name}</a>
                                                        </h5>
                                                        <p class="mb-0 "><i
                                                                class="fa-regular fa-calendar text-brand me-2"></i><span
                                                                class="c-loca">${ele.start_date} - ${ele.end_date} </span></p>
                                                        <p class="mb-0 "><i
                                                                class="fa-regular fa-clock text-brand me-2"></i><span>6:00
                                                                PM-10:00
                                                                PM</span></p>
                                                        <p class="card-text"><i
                                                                class="fa-solid fa-location-dot me-2 text-brand"></i>
                                                            <small
                                                                class="text-body-secondary">${ele.location}</small></p>
                                                    </div>
                                                </div>
                                            </div>`
    
                                            
            
        })
    }else{
        eventHTML = '<h4 class="text-center my-5">No Event</h4>'
    }

    document.querySelector('#event-upcoming .row').innerHTML = eventHTML;

    console.log(vendor_recruitments);

    let vendorHTML = '';
    if(vendor_recruitments.length > 0){
        vendor_recruitments.forEach(ele=>{
            vendorHTML = `
            <div class="col-4" data-id="${ele.id}">
                                                <div class="card position-relative">
                                                    <div class="card-body">
                                                        <h5 class="card-title">
                                                            <a href>${ele.name}</a>
                                                        </h5>
                                                        <p class="mb-0 "><i
                                                                class="fa-regular fa-calendar text-brand me-2"></i><span
                                                                class="c-loca">${ele.start_date} - ${ele.end_date} </span></p>
                                                        <p class="card-text"><i
                                                                class="fa-solid fa-location-dot me-2 text-brand"></i>
                                                            <small
                                                                class="text-body-secondary">${ele.location}</small></p>
                                                    </div>
                                                </div>
                                            </div>`
        })
    }else{
        vendorHTML ='<h4 class="text-center my-5">No Vendor Recruitment</h4>'
    }

    document.querySelector('#vendor-upcoming .row').innerHTML = vendorHTML;

    let businessHTML = '';

    if(businesses.length > 0){

        businesses.forEach(ele=>{
            businessHTML = `
            <div class="col-4" data-id="${ele.id}">
                                                <div class="card position-relative">
                                                    <div class="card-body">
                                                        <h5 class="card-title">
                                                            <a href>${ele.name}</a>
                                                        </h5>
                                                        <p class="mb-0 "><i
                                                                class="fa-regular fa-calendar text-brand me-2"></i><span
                                                                class="c-loca">${ele.start_date} - ${ele.end_date} </span></p>
                                                        <p class="card-text"><i
                                                                class="fa-solid fa-location-dot me-2 text-brand"></i>
                                                            <small
                                                                class="text-body-secondary">${ele.location}</small></p>
                                                    </div>
                                                </div>
                                            </div>`;
        })
    }
    else{
        businessHTML = '<h4 class="text-center my-5">No Business</h4>';
    }

    document.querySelector('#business-upcoming .row').innerHTML = businessHTML;

    

})