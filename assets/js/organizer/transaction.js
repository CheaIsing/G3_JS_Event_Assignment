const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem('authToken');



fetch(`${apiUrl}/api/tickets/request-buy?event=${sessionStorage.getItem('requestDetailId')}`, {
    headers: {Authorization: `Bearer ${token}`}
})
.then(res=>res.json())
.then(json=>{
    console.log(json.data);
    let transaction;
    for(let ele of json.data){
        if(ele.id == sessionStorage.getItem('transactionId')){
            transaction = ele;
            break;
        }
    }
    console.log(transaction);

    fetch(`${apiUrl}/api/profile/detail/${transaction.requester.id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
          }
    })
    .then(res=>res.json())
    .then(json=>{
        console.log(json.data.email);

        let status = ""
            switch(transaction.status){
                case 1: {
                    status = "Pending"
                    break;
                }
                case 2: {
                    status = "Approved"
                    break;
                }
                case 3 : {
                    status = "Rejected"
                }
            }

        
        document.querySelector('.transaction-row').innerHTML = `
        <div class="col-12">
                                <div
                                    class="mt-4 d-flex w-100 align-items-center justify-content-between">
                                    <div
                                        class="d-flex align-content-center">
                                        <div class="me-3">
                                            <img
                                                src="${transaction.requester.avatar}"
                                                alt
                                                class="object-fit-cover rounded-circle"
                                                width="75" height="75" id="requester-avarta">
                                        </div>
                                        <div
                                            class>
                                            <h5 class="mb-0" id="requester">${transaction.requester.full_name}</h5>
                                            <div
                                                class>
                                                <small id="request-date">${transaction.created_at}</small>
                                            </div>
                                            <div><small>
                                                    <a
                                                        href="mailto:${json.data.email}"
                                                        class="text-decoration-none"
                                                        style="color: inherit;" id="request-email">${json.data.email}</a>
                                                </small></div>

                                        </div>
                                    </div>
                                    <div>
                                        <button type="button"
                                            class="btn btn-brand me-2" data-id="" onclick="approveRequest(${transaction.id})">Approve</button>
                                        <!-- Button trigger modal -->
                                        <button type="button"
                                            class="btn btn-danger"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal">
                                            Disapprove
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <p>Status: ${status}</p>
                                <p>Ticket Request Quantity : <span id="amount">${transaction.amount} ticket${transaction.amount > 1 ? "s":''}</span></p>
                                <p>Price per tickets: <span id="price-unit">$${transaction.event.ticket_price}</span></p>
                                <p>Total: <span id="total">$${transaction.event.ticket_price * transaction.amount}</span></p>
                                <h5>Transaction File:</h5>
                                <img
                                    src="${transaction.transaction_file ? transaction.transaction_file :"../../assets/img/no-image.png"}"
                                    class="border border-2" alt="transaction-img" id="transaction-img" width="400">
                            </div>`

                            document.querySelector('.btn-disapprove').onclick = () => {
                                let reason = document.getElementById('reason-disapprove').value
                                
                                if(reason){
                                    document.getElementById('reason-disapprove').classList.remove('is-invalid')
                                    document.getElementById('textarea-err').style.display= "none"
                                    disapproveRequest(transaction.id);
                                }
                                else{
                                    document.getElementById('reason-disapprove').classList.add('is-invalid')
                                    document.getElementById('textarea-err').style.display= "block"
                                }
                            }
                            document.getElementById('reason-disapprove').oninput = () => {
                                document.getElementById('reason-disapprove').classList.remove('is-invalid')
                                    document.getElementById('textarea-err').style.display= "none"
                            }

    })
})

function approveRequest(id){
    fetch(`${apiUrl}/api/tickets/request-buy-approve/${id}`, {
        method: "PUT",
        headers: {Authorization: `Bearer ${token}`}
    })
    .then(res=>res.json())
    .then(json=>{
        showToast(json.message, json.result);
    })

}

function disapproveRequest(id) {
    fetch(`${apiUrl}/api/tickets/request-buy-reject/${id}`, {
        method: "PUT",
        headers: {Authorization: `Bearer ${token}`}
    })
    .then(res=>res.json())
    .then(json=>{
        showToast(json.message, json.result);
         // Close the modal after sending the request
         const disapproveModal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
         disapproveModal.hide();
    })
}