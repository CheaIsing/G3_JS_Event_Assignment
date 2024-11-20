let recruitId = sessionStorage.getItem('recruitDetailId')
fetch(`${API_URL}/api/vendors/${recruitId}`)
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    document.getElementById('recruit-name').innerHTML = json.data.name
    document.getElementById("ev-startDate").innerHTML = json.data.start_date
    document.getElementById("ev-endDate").innerHTML = json.data.end_date
    document.getElementById("ev-catagory").innerHTML = json.data.categories.map(category => category.name).join(", ");
    document.getElementById("ev-location").innerHTML = json.data.location
    document.getElementById("ev-org-pf").src = json.data.creator.avatar
    document.getElementById("ev-org-name").innerHTML = json.data.creator.full_name
    document.getElementById("ev-description").innerHTML = json.data.description
    
    document.getElementById("ev-org-name").setAttribute('data-orgID', json.data.creator.id);
    document.getElementById("btn-apply-now").onclick = ()=>{
      fetch(`${API_URL}/api/vendors/apply/${recruitId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then(res=>res.json())
      .then(json=>{
        console.log(json);
        
        showToast(json.message, json.result);
      })
    }

  });

  function viewOrgDetail(org){
 
  let id = org.dataset.id;
  sessionStorage.setItem("orgID", id);
  location.href = "/pages/authentication/view-profile.html";
}
