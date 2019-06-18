function fetchProducts(done){
    $.get('/api/products', function (data){
        done(data)
    })
}

function createProductCard(product){
    return $(`
    <h4 class="product-name">${product.name}</h4>
    <div class="col-4 card mx-2 p-2">
    <img src="img/apple_juice.jpg">
    <b>$ ${product.price}</b>
    <input type="number" value="1">
    <button class="btn btn-primary">add to chart</button>
</div>`)
}

$(function () {
    let productList = $('#product-list')
    fetchProducts(function(products) {
        productList.empty()
        for(let product of products){
            productList.append(createProductCard(product))
        }
    })
})