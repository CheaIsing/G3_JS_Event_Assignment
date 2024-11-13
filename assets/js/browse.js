// const apiUrl = "https://mps2.chandalen.dev";
function getAllCatagory(endpoint) {
    fetch(apiUrl + endpoint)
        .then(res => res.json())
        .then(json => {
            let data = json.data;
            let listCata = '';
            data.forEach(element => {
                listCata += `<div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="${element.name}" id="cata${element.id}">
                                    <label class="form-check-label" for="cata${element.id}">
                                    ${element.name}
                                    </label>
                                </div>`;
            });
            document.getElementById('catagory').innerHTML += listCata;
        }
        )
}