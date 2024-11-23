function isValid_Event() {
    let valid = true;
    let fileUpload = document.getElementById('fileUpload');
    let postTitle = document.getElementById('postTitle');
    let startDate = document.getElementById('startDate');
    let startTime = document.getElementById('startTime');
    let endDate = document.getElementById('endDate');
    let endTime = document.getElementById('endTime');
    let categorySelect = document.getElementById('categorySelect');
    // let address2 = document.getElementById('address2');
    // let city = document.getElementById('city');
    // let province = document.getElementById('province');
    // let country = document.getElementById('country');
    let ticketQuantity = document.getElementById('ticketQuantity');
    let price = document.getElementById('price');
    let khqrPhotoUpload = document.getElementById('khqrPhotoUpload');

    let lblPostTitle = document.getElementById('lblPostTitle');
    let lblStartDate = document.getElementById('lblStartDate');
    let lblStartTime = document.getElementById('lblStartTime');
    let lblEndDate = document.getElementById('lblEndDate');
    let lblEndTime = document.getElementById('lblEndTime');
    let lblCategorySelect = document.getElementById('lblCategorySelect');
    // let lblAddress2 = document.getElementById('lblAddress2');
    // let lblCity = document.getElementById('lblCity');
    // let lblProvince = document.getElementById('lblProvince');
    // let lblCountry = document.getElementById('lblCountry');
    let lblTicketQuantity = document.getElementById('lblTicketQuantity');
    let lblPrice = document.getElementById('lblPrice');


    if (categorySelect.value == '') {
        lblCategorySelect.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        categorySelect.style.borderColor = 'red';
        categorySelect.style.borderWidth = '2px';
        categorySelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
        categorySelect.focus();
        valid = false;
    }
    else {
        lblCategorySelect.innerHTML = '';
        postTitle.style.borderColor = '#DEE2E6';
        postTitle.style.borderWidth = '2px';
    }

    if (postTitle.value == '') {
        lblPostTitle.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
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

    if (startDate.value == '') {
        lblStartDate.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        startDate.style.borderColor = 'red';
        startDate.style.borderWidth = '2px';
        startDate.scrollIntoView({ behavior: 'smooth', block: 'center' });
        startDate.focus();
        valid = false;
    }
    else {
        lblStartDate.innerHTML = '';
        startDate.style.borderColor = '#DEE2E6';
        startDate.style.borderWidth = '2px';
    }

    if (startTime.value == '') {
        lblStartTime.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        startTime.style.borderColor = 'red';
        startTime.style.borderWidth = '2px';
        startTime.scrollIntoView({ behavior: 'smooth', block: 'center' });
        startTime.focus();
        valid = false;
    }
    else {
        lblStartTime.innerHTML = '';
        startTime.style.borderColor = '#DEE2E6';
        startTime.style.borderWidth = '2px';
    }

    if (endDate.value == '') {
        lblEndDate.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        endDate.style.borderColor = 'red';
        endDate.style.borderWidth = '2px';
        endDate.scrollIntoView({ behavior: 'smooth', block: 'center' });
        endDate.focus();
        valid = false;
    }
    else {
        lblEndDate.innerHTML = '';
        endDate.style.borderColor = '#DEE2E6';
        endDate.style.borderWidth = '2px';
    }

    if (endTime.value == '') {
        lblEndTime.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        endTime.style.borderColor = 'red';
        endTime.style.borderWidth = '2px';
        endTime.scrollIntoView({ behavior: 'smooth', block: 'center' });
        endTime.focus();
        valid = false;
    }
    else {
        lblEndTime.innerHTML = '';
        endTime.style.borderColor = '#DEE2E6';
        endTime.style.borderWidth = '2px';
    }

    if (ticketQuantity.value != '' && isNaN(Number(ticketQuantity.value))) {
        lblTicketQuantity.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        ticketQuantity.style.borderColor = 'red';
        ticketQuantity.style.borderWidth = '2px';
        ticketQuantity.scrollIntoView({ behavior: 'smooth', block: 'center' });
        ticketQuantity.focus();
        valid = false;
    }
    else if (ticketQuantity.value == '') {
        lblTicketQuantity.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        ticketQuantity.style.borderColor = 'red';
        ticketQuantity.style.borderWidth = '2px';
        ticketQuantity.scrollIntoView({ behavior: 'smooth', block: 'center' });
        ticketQuantity.focus();
        valid = false;
    }
    else {
        lblTicketQuantity.innerHTML = '';
        ticketQuantity.style.borderColor = '#DEE2E6';
        ticketQuantity.style.borderWidth = '2px';
    }

    if (price.value != '' && isNaN(Number(price.value))) {
        lblPrice.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        price.style.borderColor = 'red';
        price.style.borderWidth = '2px';
        price.scrollIntoView({ behavior: 'smooth', block: 'center' });
        price.focus();
        valid = false;
    }
    else if (price.value == '') {
        lblPrice.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        price.style.borderColor = 'red';
        price.style.borderWidth = '2px';
        price.scrollIntoView({ behavior: 'smooth', block: 'center' });
        price.focus();
        valid = false;
    }
    else {
        lblPrice.innerHTML = '';
        price.style.borderColor = '#DEE2E6';
        price.style.borderWidth = '2px';
    }

    let allowPhotoType = ['image/jpeg', 'image/png'];
    let thumbnailFileName = document.getElementById('fileName');
    let thumbnailUploadSection = document.getElementById('thumbnail-upload-section');

    if (fileUpload.files.length > 0) {
        if (!allowPhotoType.includes(fileUpload.files[0].type)) {
            thumbnailUploadSection = 'red';
            thumbnailUploadSection = '2px';
            fileUpload.scrollIntoView({ behavior: 'smooth', block: 'center' });
            fileUpload.focus();
            thumbnailFileName.innerHTML = `<span class="text-danger fw-bolder" style="font-size: 14px;">Invalid file type: <span class= "text-black"> ${fileUpload.files[0].name}. </span> Only JPEG and PNG are allowed.</span>`;
        }
    }

    let KhqrPhotoName = document.getElementById('KhqrPhotoName');
    let khqrUploadSection = document.getElementById('khqr-upload-section');

    if (khqrPhotoUpload.files.length > 0) {
        if (!allowPhotoType.includes(khqrPhotoUpload.files[0].type)) {
            khqrUploadSection = 'red';
            khqrUploadSection = '2px';
            khqrPhotoUpload.scrollIntoView({ behavior: 'smooth', block: 'center' });
            khqrPhotoUpload.focus();
            KhqrPhotoName.innerHTML = `<span class="text-danger fw-bolder" style="font-size: 14px;">Invalid file type: <span class= "text-black"> ${khqrPhotoUpload.files[0].name}. </span> Only JPEG and PNG are allowed.</span>`;
        }
    }
    else if ((khqrPhotoUpload.files).length === 0) {
        KhqrPhotoName.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        khqrUploadSection = 'red';
        khqrUploadSection = '2px';
    }
    return valid;
}

function isValid_vendorBusiness() {
    let valid = true;
    let fileUpload = document.getElementById('fileUpload');
    let postTitle = document.getElementById('postTitle');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let categorySelect = document.getElementById('categorySelect');

    let lblPostTitle = document.getElementById('lblPostTitle');
    let lblEmail = document.getElementById('lblEmail');
    let lblPhone = document.getElementById('lblPhone');
    let lblCategorySelect = document.getElementById('lblCategorySelect');

    if (categorySelect.value == '') {
        lblCategorySelect.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        categorySelect.style.borderColor = 'red';
        categorySelect.style.borderWidth = '2px';
        categorySelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
        categorySelect.focus();
        valid = false;
    }
    else {
        lblCategorySelect.innerHTML = '';
        postTitle.style.borderColor = '#DEE2E6';
        postTitle.style.borderWidth = '2px';
    }

    if (phone.value != '' && isNaN(Number(phone.value))) {
        lblPhone.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        phone.style.borderColor = 'red';
        phone.style.borderWidth = '2px';
        phone.scrollIntoView({ behavior: 'smooth', block: 'center' });
        phone.focus();
        valid = false;
    }
    else if (phone.value == '') {
        lblPhone.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
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
        lblEmail.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* Invalid Email.( <i>example@gmial.com</i> )</span>';
        email.style.borderColor = 'red';
        email.style.borderWidth = '2px';
        email.scrollIntoView({ behavior: 'smooth', block: 'center' });
        email.focus();
        valid = false;
    }
    else if (email.value == '') {
        lblEmail.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
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

    if (postTitle.value == '') {
        lblPostTitle.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
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


function isValid_Recruit() {
    let valid = true;
    let postTitle = document.getElementById('postTitle');
    let startDate = document.getElementById('startDate');
    let startTime = document.getElementById('startTime');
    let endDate = document.getElementById('endDate');
    let endTime = document.getElementById('endTime');
    let categorySelect = document.getElementById('categorySelect');

    let lblPostTitle = document.getElementById('lblPostTitle');
    let lblStartDate = document.getElementById('lblStartDate');
    let lblStartTime = document.getElementById('lblStartTime');
    let lblEndDate = document.getElementById('lblEndDate');
    let lblEndTime = document.getElementById('lblEndTime');
    let lblCategorySelect = document.getElementById('lblCategorySelect');


    if (categorySelect.value == '') {
        lblCategorySelect.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        categorySelect.style.borderColor = 'red';
        categorySelect.style.borderWidth = '2px';
        categorySelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
        categorySelect.focus();
        valid = false;
    }
    else {
        lblCategorySelect.innerHTML = '';
        postTitle.style.borderColor = '#DEE2E6';
        postTitle.style.borderWidth = '2px';
    }

    if (postTitle.value == '') {
        lblPostTitle.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
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

    if (startDate.value == '') {
        lblStartDate.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        startDate.style.borderColor = 'red';
        startDate.style.borderWidth = '2px';
        startDate.scrollIntoView({ behavior: 'smooth', block: 'center' });
        startDate.focus();
        valid = false;
    }
    else {
        lblStartDate.innerHTML = '';
        startDate.style.borderColor = '#DEE2E6';
        startDate.style.borderWidth = '2px';
    }

    if (startTime.value == '') {
        lblStartTime.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        startTime.style.borderColor = 'red';
        startTime.style.borderWidth = '2px';
        startTime.scrollIntoView({ behavior: 'smooth', block: 'center' });
        startTime.focus();
        valid = false;
    }
    else {
        lblStartTime.innerHTML = '';
        startTime.style.borderColor = '#DEE2E6';
        startTime.style.borderWidth = '2px';
    }

    if (endDate.value == '') {
        lblEndDate.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        endDate.style.borderColor = 'red';
        endDate.style.borderWidth = '2px';
        endDate.scrollIntoView({ behavior: 'smooth', block: 'center' });
        endDate.focus();
        valid = false;
    }
    else {
        lblEndDate.innerHTML = '';
        endDate.style.borderColor = '#DEE2E6';
        endDate.style.borderWidth = '2px';
    }

    if (endTime.value == '') {
        lblEndTime.innerHTML = '<span class="text-danger fw-bolder" style="font-size: 14px;">* This field is required.</span>';
        endTime.style.borderColor = 'red';
        endTime.style.borderWidth = '2px';
        endTime.scrollIntoView({ behavior: 'smooth', block: 'center' });
        endTime.focus();
        valid = false;
    }
    else {
        lblEndTime.innerHTML = '';
        endTime.style.borderColor = '#DEE2E6';
        endTime.style.borderWidth = '2px';
    }


    return valid;
}