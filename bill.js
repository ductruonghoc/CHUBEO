const bill = document.getElementById("QUA")
const form = document.getElementById("orderForm")

bill.addEventListener("change", (e)=>{
    bill.value = e.target.value;
    form.submit();
})