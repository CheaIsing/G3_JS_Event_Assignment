function isValid_Event() {
    let valid = true;
    let fileUpload = document.getElementById('fileUpload').files[0];
    let postTitle = document.getElementById('postTitle').value;
    let startDate = document.getElementById('startDate').value;
    let startTime = document.getElementById('startTime').value;
    let endDate = document.getElementById('endDate').value;
    let endTime = document.getElementById('endTime').value;
    // let address1 = document.getElementById('address1').value;
    // let address2 = document.getElementById('address2').value;
    // let city = document.getElementById('city').value;
    // let province = document.getElementById('province').value;
    // let country = document.getElementById('country').value;
    let ticketQuantity = document.getElementById('ticketQuantity').value;
    let price = document.getElementById('price').value;
    let khqrImg = document.getElementById('khqrImg').files[0];

    let lblPostTitle = document.getElementById('lblPostTitle');
    let lblStartDate = document.getElementById('lblStartDate');
    let lblStartTime = document.getElementById('lblStartTime');
    let lblEndDate = document.getElementById('lblEndDate');
    let lblEndTime = document.getElementById('lblEndTime');
    // let lblAddress1 = document.getElementById('lblAddress1');
    // let lblAddress2 = document.getElementById('lblAddress2');
    // let lblCity = document.getElementById('lblCity');
    // let lblProvince = document.getElementById('lblProvince');
    // let lblCountry = document.getElementById('lblCountry');
    let lblTicketQuantity = document.getElementById('lblTicketQuantity');
    let lblPrice = document.getElementById('lblPrice');
    let fileName = document.getElementById('fileName');


    if (postTitle == '') {
        lblPostTitle.innerHTML = '<span class="text-danger fw-lighter" style="font-size: 14px;">* This field is required.</span>';
        postTitle.style.borderColor = 'red';
        postTitle.style.borderWidth = '2px';
        postTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
        postTitle.focus();
        valid = false;
    }
    else{
        lblPostTitle.innerHTML = '';
        postTitle.style.borderColor = '#DEE2E6';
        postTitle.style.borderWidth = '2px';
    }

    if (startDate == '') {
        lblStartDate.innerHTML = 'Start Date<span class="text-danger fw-lighter" style="font-size: 14px;">* This field is required.</span>';
        startDate.style.borderColor = 'red';
        startDate.style.borderWidth = '2px';
        startDate.scrollIntoView({ behavior: 'smooth', block: 'center' });
        startDate.focus();
        valid = false;
    }
    else{
        lblStartDate.innerHTML = '';
        startDate.style.borderColor = '#DEE2E6';
        startDate.style.borderWidth = '2px';
    }
    
    if (startTime == '') {
        lblStartTime.innerHTML = 'Start Date<span class="text-danger fw-lighter" style="font-size: 14px;">* This field is required.</span>';
    }

    if (endDate == '') {
        lblEndDate.innerHTML = 'End Date<span class="text-danger fw-lighter" style="font-size: 14px;">* This field is required.</span>';
    }

    if (endTime == '') {
        lblEndTime.innerHTML = 'End Time<span class="text-danger fw-lighter" style="font-size: 14px;">* This field is required.</span>';
    }

    if (ticketQuantity == '') {
        lblTicketQuantity.innerHTML = 'Ticket Quantity<span class="text-danger fw-lighter" style="font-size: 14px;">* This field is required.</span>';
    }

    if (price == '') {
        lblPrice.innerHTML = 'Price<span class="text-danger fw-lighter" style="font-size: 14px;">* This field is required.</span>';
    }
    return valid;
}   

function isValid_vendorBusiness() {
    let valid = true;
    let fileUpload = document.getElementById('fileUpload');
    let postTitle = document.getElementById('postTitle');
    let servicePrice = document.getElementById("servicePrice");
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    // let categorySelect = document.getElementById('categorySelect');

    let lblPostTitle = document.getElementById('lblPostTitle');
    let lblServicePrice = document.getElementById('lblServicePrice');
    let lblEmail = document.getElementById('lblEmail');
    let lblPhone = document.getElementById('lblPhone');

    if (phone.value != '' && isNaN(Number(phone.value))) {
        lblPhone.innerHTML = '<span class="text-danger fw-lighter" style="font-size: 14px;">* This field is required.</span>';
        phone.style.borderColor = 'red';
        phone.style.borderWidth = '2px';
        phone.scrollIntoView({ behavior: 'smooth', block: 'center' });
        phone.focus();
        valid = false;
    }
    else if (phone.value == '') {
        lblPhone.innerHTML = '<span class="text-danger fw-lighter" style="font-size: 14px;">* This field is required.</span>';
        phone.style.borderColor = 'red';
        phone.style.borderWidth = '2px';
        phone.scrollIntoView({ behavior: 'smooth', block: 'center' });
        phone.focus();
        valid = false;
    }
    else {
        lblPhone.innerHTML = '';
        phone.style.borderColor = '#DEE2E6';
        phone.style.borderWidth = '2px';
    }

    let emailRegex = /^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z]{2,}([.\w]{2,})?$/;
    if (!(emailRegex.test(email.value)) && email.value != '') {
        lblEmail.innerHTML = '<span class="text-danger fw-lighter" style="font-size: 14px;">* Invalid Email.( <i>example@gmial.com</i> )</span>';
        email.style.borderColor = 'red';
        email.style.borderWidth = '2px';
        email.scrollIntoView({ behavior: 'smooth', block: 'center' });
        email.focus();
        valid = false;
    }
    else if (email.value == '') {
        lblEmail.innerHTML = '<span class="text-danger fw-lighter" style="font-size: 14px;">* This field is required.</span>';
        email.style.borderColor = 'red';
        email.style.borderWidth = '2px';
        email.scrollIntoView({ behavior: 'smooth', block: 'center' });
        email.focus();
        valid = false;
    }
    else {
        lblEmail.innerHTML = '';
        email.style.borderColor = '#DEE2E6';
        email.style.borderWidth = '2px';
    }

    if (servicePrice.value == '') {
        lblServicePrice.innerHTML = '<span class="text-danger fw-lighter" style="font-size: 14px;">* This field is required.</span>';
        servicePrice.style.borderColor = 'red';
        servicePrice.style.borderWidth = '2px';
        servicePrice.scrollIntoView({ behavior: 'smooth', block: 'center' });
        servicePrice.focus();
        valid = false;
    } else if (servicePrice.value != '' && isNaN(Number(servicePrice.value))) {
        lblServicePrice.innerHTML = '<span class="text-danger fw-lighter" style="font-size: 14px;">* Input number only. <i class="fa-regular fa-circle-xmark"></i></span>';
        servicePrice.style.borderColor = 'red';
        servicePrice.style.borderWidth = '2px';
        servicePrice.scrollIntoView({ behavior: 'smooth', block: 'center' });
        servicePrice.focus();
        console.log(typeof(40));
        valid = false;
    }
    else {
        lblServicePrice.innerHTML = '';
        servicePrice.style.borderColor = '#DEE2E6';
        servicePrice.style.borderWidth = '2px';
    }

    if (postTitle.value == '') {
        lblPostTitle.innerHTML = '<span class="text-danger fw-lighter" style="font-size: 14px;">* This field is required.</span>';
        postTitle.style.borderColor = 'red';
        postTitle.style.borderWidth = '2px';
        postTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
        postTitle.focus();
        valid = false;
    }
    else {
        lblPostTitle.innerHTML = '';
        postTitle.style.borderColor = '#DEE2E6';
        postTitle.style.borderWidth = '2px';
    }
    return valid;
}
// isValid_Event();
// #DEE2E6