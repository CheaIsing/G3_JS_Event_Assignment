

fetch(`${apiUrl}/api/tickets/request-buy?event=${sessionStorage.getItem('requestDetailId')}`, {
    headers: {Authorization: `Bearer ${token}`}
})
.then(res=>res.json())
.then(json=>{
    console.log(json.data);

    if(json.data.length <= 0){
        document.getElementById('request-tbody').innerHTML = `
        <tr class="border-0"><td class="border-0" colspan='7'><div class="text-center">
            <img src="../../assets/img/noFound.png" alt="..." height="220px;">
            <h4 class="text-center text-brand mt-2">No Request to Display...</h4>
          </div></td></tr>`
        return;
    }
    
    let rowsHTML = '';
    json.data.forEach((d,i)=>{
        let status = '';
        switch(d.status){
            case 1: {
                status = `<span class=" rounded-pill text-warning"><i class="fa-solid fa-hourglass-half me-1"></i>Pending</span>`;
                break;
              }
              case 2: {
                status = `<span class=" rounded-pill text-success"><i class="fa-solid fa-circle-check me-1"></i>Aproved</span>`;
                break;
              }
              case 3: {
                status = `<span class=" rounded-pill text-danger"><i class="fa-solid fa-circle-xmark me-1"></i>Rejected</span>`;
                break;
              }
        }
        rowsHTML+=`
        <tr>
                                    <td colspan="1">${i+1}</td>
                                    <td colspan="1">${d.requester.full_name}</td>
                                    <td colspan="1">${d.amount} ticket${d.amount > 1 ? 's':''}</td>
                                    <td colspan="1">$${parseFloat(d.event.ticket_price) > 0 ?(d.event.ticket_price * d.amount).toFixed(2) : "Free"}</td>
                                    <td colspan="1">${moment(
                                        d.created_at
                                      ).format(
                                        'llll'
                                      )}</td>
                                    <td colspan="1">${status}</td>
                                    <td style="width: 340px;">
                                        <div><button type="button" data-transaction-id="${d.id}" class="btn btn-brand views-transaction">View Transaction</button></div>
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