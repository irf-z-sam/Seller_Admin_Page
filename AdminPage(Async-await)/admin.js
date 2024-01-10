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
let response = await axios.post("https://crudcrud.com/api/dad2ce8c1fd342919c0e95fd502d0ebb/ProductDetails",obj);
showProductOnScreen(response.data);
console.log(response);
}
catch(err){
document.body.innerHTML+="<h4>Something went wrong....</h4>"
console.log(err);
}
}
window.addEventListener('DOMContentLoaded', async ()=>{
    try{
    let response = await axios.get("https://crudcrud.com/api/dad2ce8c1fd342919c0e95fd502d0ebb/ProductDetails");
        console.log(response)
        for(let i=0;i<response.data.length;i++){
            showProductOnScreen(response.data[i]);
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
    let response = await axios.delete(`https://crudcrud.com/api/dad2ce8c1fd342919c0e95fd502d0ebb/ProductDetails/${obj._id}`)
        console.log(response);
        childElement.remove();
    }
    catch(err){
        console.log(err);
    }
    }
}