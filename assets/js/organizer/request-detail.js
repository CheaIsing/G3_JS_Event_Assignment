const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem('authToken');

console.log(token);



fetch(`${apiUrl}/api/tickets/request-buy?event=${sessionStorage.getItem('requestDetailId')}`, {
    headers: {Authorization: `Bearer ${token}`}
})
.then(res=>res.json())
.then(json=>{
    console.log(json.data);
    
    let rowsHTML = '';
    json.data.forEach((d,i)=>{
        rowsHTML+=`
        <tr>
                                    <td>${i+1}</td>
                                    <td>${d.requester.full_name}</td>
                                    <td>${d.amount}</td>
                                    <td>$${d.event.ticket_price * d.amount}</td>
                                    <td>${d.created_at}</td>
                                    <td>
                                        <a href="javascript:void(0);" data-transaction-id="${d.id}" class="btn btn-brand views-transaction">View Transaction</a>
                                    </td>
                                </tr>`
    })

    document.getElementById('request-tbody').innerHTML = rowsHTML

    document.querySelectorAll('.views-transaction').forEach(link=>{
        link.onclick = () =>{
            let id = link.dataset.transactionId;
            console.log(id);
            sessionStorage.setItem('transactionId', id);
            location.href = "transaction.html";
            
        }
    })
    
})