const apiUrl = "https://mps2.chandalen.dev";
// const token = localStorage.getItem('authToken');

console.log(token);



fetch(`${apiUrl}/api/tickets/request-buy?event=${sessionStorage.getItem('requestDetailId')}`, {
    headers: {Authorization: `Bearer ${token}`}
})
.then(res=>res.json())
.then(json=>{
    console.log(json.data);

    if(json.data.length <= 0){
        document.getElementById('request-tbody').innerHTML = `
        <tr class="border-0"><td class="border-0" colspan=6><div class="text-center">
            <img src="../../assets/img/noFound.png" alt="..." height="220px;">
            <h4 class="text-center text-brand mt-2">No Request to Display...</h4>
          </div></td></tr>`
        return;
    }
    
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