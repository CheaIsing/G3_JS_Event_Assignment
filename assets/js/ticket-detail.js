const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");


function getTicketDetail() {
    let idTicket = sessionStorage.getItem('ticket-detail-id')
    fetch(`${apiUrl}/api/profile/requested-tickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(json=>{
            const {data} = json;
            console.log(data);

            let ticketDetail;

            for(let ele of data){
                if(ele.id == idTicket){
                    ticketDetail = ele;
                    break;
                }
            }

            console.log(ticketDetail);
            

            let status = ""
            switch(ticketDetail.status){
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

            // console.log(ticketDetail);

            document.getElementById('amount').innerHTML = ticketDetail.amount
            document.getElementById('status').innerHTML = status
            document.getElementById('transaction-file').src = ticketDetail.transaction_file;
            

            
            
        })
}

getTicketDetail()