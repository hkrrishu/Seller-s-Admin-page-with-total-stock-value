const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const totalValue = document.getElementById("totalValue");
productForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const sellingPrice = event.target.sellingPrice.value;
  const productName = event.target.productName.value;

  axios
    .post(
      "https://crudcrud.com/api/f735b96a1f46485fb0a3e8822644c94c/products",
      {
        sellingPrice: sellingPrice,
        productName: productName,
      },
    )
    .then((res) => {
      console.log(res);
      getProducts();
      event.target.reset();
    })
    .catch((err) => console.log(err));
}

function getProducts() {
  axios
    .get("https://crudcrud.com/api/f735b96a1f46485fb0a3e8822644c94c/products")
    .then((res) => {
      let total = 0;
      res.data.forEach((product) => {
        const li = document.createElement("li");

        li.textContent = product.sellingPrice + " - " + product.productName;
        //delete button
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete Product";

        deleteBtn.addEventListener("click", function () {
          deleteProduct(product._id);
        });

        li.appendChild(deleteBtn);

        productList.appendChild(li);

        total = total + Number(product.sellingPrice);
      });
      totalValue.textContent = total;
    })
    .catch((err) => console.log(err));
}

getProducts();

function deleteProduct(productId) {
  axios
    .delete(
      "https://crudcrud.com/api/f735b96a1f46485fb0a3e8822644c94c/products/" +
        productId,
    )
    .then((res) => {
      console.log(res);
      getProducts();
    })
    .catch((err) => console.log(err));
}
