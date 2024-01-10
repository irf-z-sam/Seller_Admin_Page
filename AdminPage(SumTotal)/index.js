let totalPrice = 0;

async function submitHandler(event) {
    event.preventDefault();
    let product = event.target.product.value;
    let price = event.target.price.value;
    let category = event.target.category.value;
    let obj = {
         product: product, 
         price: price, 
         category: category 
        };
try{
let response = await axios.post("https://crudcrud.com/api/87dfc0ff28ee408898338c6d3e5237ba/ProductDetails",obj);
showProductOnScreen(response.data);
updateTotalPrice(response.data.price)
console.log(response);
}
catch(err){
document.body.innerHTML+="<h4>Something went wrong....</h4>"
console.log(err);
}
}
window.addEventListener('DOMContentLoaded', async ()=>{
    try{
    let response = await axios.get("https://crudcrud.com/api/87dfc0ff28ee408898338c6d3e5237ba/ProductDetails");
        console.log(response)
        for(let i=0;i<response.data.length;i++){
            showProductOnScreen(response.data[i]);
            updateTotalPrice(response.data[i].price)
        }
    }
    catch(error){
      console.log(error);  
    }
});

function showProductOnScreen(obj){

document.getElementById('product').value='';
document.getElementById('price').value='';
document.getElementById('category').value='';

const parentNode = document.getElementById("listOfItems");
const childElement = document.createElement('li');
childElement.textContent = obj.product+':: Rs. '+ obj.price+'::'+obj.category;
parentNode.appendChild(childElement);

const categoryHeading = document.getElementById(obj.category.toLowerCase().replace(' ', '-'));
categoryHeading.insertAdjacentElement('afterend', childElement); 

const delButton = document.createElement('input');
delButton.type = "button";
delButton.value = "Delete Order";
childElement.append(delButton);

delButton.onclick = async ()=>{
    try{
    let response = await axios.delete(`https://crudcrud.com/api/87dfc0ff28ee408898338c6d3e5237ba/ProductDetails/${obj._id}`)
        console.log(response);
        childElement.remove();
        updateTotalPrice(-parseFloat(price));
    }
    catch(err){
        console.log(err);
    }
    }
}
function updateTotalPrice(price){
    totalPrice+=parseFloat(price);
    const totalElement=document.getElementById('totalPrice');
      
    totalElement.textContent = `Total Worth of the Products: Rs ${totalPrice.toFixed(2)}`
}    