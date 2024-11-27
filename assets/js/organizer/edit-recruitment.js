
            let editId = sessionStorage.getItem('editRecruitId')
            document.getElementById('btn-update').disabled = true;
    // Fetching and populating the form with vendor recruitment data
    fetch(`${API_URL}/api/vendors/${editId}`)
        .then(response => response.json())
        .then(data => {
            const vendorData = data.data;
    
            // Set the form fields with the data
            document.getElementById('postTitle').value = vendorData.name;
            document.getElementById('startDate').value = vendorData.start_date.split(' ')[0];
            document.getElementById('startTime').value = vendorData.start_date.split(' ')[1];
            document.getElementById('endDate').value = vendorData.end_date.split(' ')[0];
            document.getElementById('endTime').value = vendorData.end_date.split(' ')[1];
            document.getElementById('address1').value = vendorData.location.split(',')[0].trim();
            document.getElementById('address2').value = vendorData.location.split(',')[1].trim() || '';
            document.getElementById('city').value = vendorData.location.split(',')[2].trim() || ''
            document.getElementById('province').value = vendorData.location.split(',')[3].trim() || '';
            document.getElementById('country').value = vendorData.location.split(',')[4].trim() || '';
            const desc = vendorData.description;
            // Create a temporary DOM element to parse the HTML string
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(desc, 'text/html');

            // Extract the content of each section or return '' if it doesn't exist
            const detail = doc.querySelector('#recruit-full-desc').innerHTML.trim() || ''
            const requirement = doc.querySelector('#recruit-requiremnt').innerHTML.trim() || '';
            const vendorType = doc.querySelector('#vendor-type-need').innerHTML.trim() || '';
            descQuill.root.innerHTML = detail;
vendorTypeQuill.root.innerHTML = requirement;
requirementQuill.root.innerHTML = vendorType;


            // Fetch vendor categories and populate category select
            fetch(`${API_URL}/api/vendor-categories`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(json => {
                document.getElementById('btn-update').disabled = false;
                const { data: categories } = json;
    let eventCatSelect = document.getElementById('categorySelect');

    // Clear any existing options
    eventCatSelect.innerHTML = '';

    // Populate category select options
    categories.forEach(category => {
        let opt = document.createElement('option');
        opt.value = category.id;
        opt.innerHTML = category.name;
        eventCatSelect.appendChild(opt);
    });

    // Set the category select to the vendor's categories if available
    if (vendorData.categories && vendorData.categories.length > 0) {
        vendorData.categories.forEach(category => {
            const selectedOption = eventCatSelect.querySelector(`option[value="${category.id}"]`);
            if (selectedOption) {
                selectedOption.setAttribute('selected', '');
            }
        });
    }
            })
            .catch(error => console.error('Error fetching vendor categories:', error));

        })
        .catch(error => console.error('Error fetching vendor data:', error));
    
    // Function to handle the update form submission
    function updateRecruit(btn) {
        document.getElementById('btn-update').disabled = true;
        document.body.style.cursor = 'wait';

        let categoriesSelect = document.getElementById('categorySelect');
    let categoriesList = []
    for (let catOption of categoriesSelect.options) {
        if (catOption.selected) {
            categoriesList.push(catOption.value);
        }
    }

    let descQuillContent = descQuill.root.innerHTML;  // or use quill.getText() for plain text
    let vendorTypeQuillContent = vendorTypeQuill.root.innerHTML;
    let recruitmentQuillContent = requirementQuill.root.innerHTML;
    let defaultQuillContent = '<p><br></p>';

    let description = '';
    if (vendorTypeQuillContent == defaultQuillContent) {
        description = `<h2 class="title text-brand fw-bold">Detail</h2> 
                <div id="recruit-full-desc" class="recruit-full-desc-wrapper">
                    ${descQuillContent}
                </div>
                <h2 class="title text-brand fw-bold mt-4">Requirement</h2>
                <div id="recruit-requiremnt" class="recruit-requiremnt-wrapper">
                    ${recruitmentQuillContent} 
                </div>`;
    }
    else if (recruitmentQuillContent == defaultQuillContent) {
        description = `<h2 title class="title text-brand fw-bold">Detail</h2> 
                <div id="recruit-full-desc" class="recruit-full-desc-wrapper">
                    ${descQuillContent}
                </div>
                <h2 class="title text-brand fw-bold mt-4">Benefit</h2>
                <div id="vendor-type-need" class="vendor-type-need-wrapper">
                    ${vendorTypeQuillContent} <
                </div>
                `;
    }
    else if (vendorTypeQuillContent == defaultQuillContent && recruitmentQuillContent == defaultQuillContent) {
        description = `<h2 class="title text-brand fw-bold">Detail</h2> 
                <div id="recruit-full-desc" class="recruit-full-desc-wrapper">
                    ${descQuillContent}
                </div>`;
    }
    else {
        description = `<h2 class="title text-brand fw-bold">Detail</h2> 
                <div id="recruit-full-desc" class="recruit-full-desc-wrapper">
                    ${descQuillContent}
                </div>
                <h2 class="title text-brand fw-bold mt-4">Requirement</h2>
                <div id="recruit-requiremnt" class="recruit-requiremnt-wrapper">
                    ${recruitmentQuillContent} 
                </div>
                <h2 class="title text-brand fw-bold mt-4">Benefit</h2>
                <div id="vendor-type-need" class="vendor-type-need-wrapper">
                    ${vendorTypeQuillContent}
                </div>
                `;
    }

        const updatedData = {
            name: document.getElementById('postTitle').value,
            start_date: document.getElementById('startDate').value + ' ' + document.getElementById('startTime').value,
            end_date: document.getElementById('endDate').value + ' ' + document.getElementById('endTime').value,
            location: `${document.getElementById('address1').value}, ${document.getElementById('address2').value}, ${document.getElementById('province').value}, ${document.getElementById('city').value}, ${document.getElementById('country').value}`,
            description: description,
            vendor_category_ids: JSON.stringify(categoriesList)
        };

        if(isValid_Recruit() == true){
            fetch(`${API_URL}/api/vendors/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('btn-update').disabled = false;
        document.body.style.cursor = 'default';

            if(data.result == true){

                showToast('Updated Vendor Recruitment Successfully.', true);
                setTimeout(()=>{
                    location.href = "recruitment.html";
                }, 1500);
            }
            else{
                showToast('Failed to update vendor Recruitment post', false);
            }
        })
        .catch(error => {
            console.error('Error updating vendor post:', error);
            alert('Failed to update vendor post');
        });
        }



        
    }
