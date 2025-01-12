var productModal = $("#productModal");
    $(function () {

        //JSON data by API call
        $.get(productListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, product) {
                    table += '<tr data-id="'+ product.product_id +'" data-name="'+ product.name +'" data-unit="'+ product.uom_id +'" data-price="'+ product.price_per_unit +'">' +
                        '<td>'+ product.name +'</td>'+
                        '<td>'+ product.uom_name +'</td>'+
                        '<td>'+ product.price_per_unit +'</td>'+
                        '<td><span class="btn btn-xs btn-danger delete-product">Delete</span>' + ' ' +' <span class="btn btn-xs btn-success edit-product">Edit</span></td></tr>';
                });
                $("table").find('tbody').empty().html(table);
            }
        });
    });

    $('#productModal').on('shown.bs.modal', function (e) {
    //alert('Yay, its displaying something!')
})
    // Save Product
    $("#saveProduct").on("click", function () {
        // If we found id value in form then update product detail
        var data = $("#productForm").serializeArray();
        var requestPayload = {
            product_name: null,
            uom_id: 2,
            price_per_unit: null
        };
        for (var i=0;i<data.length;++i) {
            var element = data[i];
            switch(element.name) {
                case 'name':
                    requestPayload.product_name = element.value;
                    break;
                case 'uoms':
                    requestPayload.uom_id = element.value;
                    break;
                case 'price':
                    requestPayload.price_per_unit = element.value;
                    break;
            }
        }
        callApi("POST", productSaveApiUrl, {
            'data': JSON.stringify(requestPayload)
        });
    });

    $(document).on("click", ".delete-product", function (){
        var tr = $(this).closest('tr');
        var data = {
            product_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete "+ tr.data('name') +" item?");
        if (isDelete) {
            callApi("POST", productDeleteApiUrl, data);
        }
    });

    function myFunction(){
        $("#idProduct").val('0');
        $("#nameProduct, #unitProduct, #priceProduct").val('');
        $('#editProductModal').hide()
    }

       $(document).on("click", ".edit-product", function (){
        var tr = $(this).closest('tr');
        var data = {
            product_id : tr.data('id'),
            product_name : tr.data('name'),
            product_unit : tr.data('unit'),
            product_price : tr.data('price')

        };
        $('#editProductModal').show()
        $('#idProduct').val(data.product_id)
        $('#nameProduct').val(data.product_name)
        $('#uomsProduct').val(data.uom_name)
        $('#priceProduct').val(data.product_price)

        $.get(uomListApiUrl, function (response) {
            if(response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, uom) {
                    options += '<option value="'+ uom.uom_id +'">'+ uom.uom_name +'</option>';
                });
                $("#uomsProduct").empty().html(options);
            }
        });

        //var isEdit = confirm("Are you sure to edit "+ tr.data('name') +" item?");
        /*if (isDelete) {
            callApi("POST", productDeleteApiUrl, data);
        }*/
    });

    $("#editProduct").on("click", function () {
        // If we found id value in form then update product detail
        var data = $("#editProductForm").serializeArray();
        var requestPayload = {
            product_id: 0,
            product_name: null,
            uom_id: 2,
            price_per_unit: null
        };
        for (var i=0;i<data.length;++i) {
            var element = data[i];
            switch(element.name) {
                case 'id':
                    requestPayload.product_id = element.value;
                case 'name':
                    requestPayload.product_name = element.value;
                    break;
                case 'uoms':
                    requestPayload.uom_id = element.value;
                    break;
                case 'price':
                    requestPayload.price_per_unit = element.value;
                    break;
            }
        }
        callApi("POST", productEditApiUrl, {
            'data': JSON.stringify(requestPayload)
        });
    });

    productModal.on('hide.bs.modal', function(){
        $("#id").val('0');
        $("#name, #unit, #price").val('');
        productModal.find('.modal-title').text('Add New Product');
    });

    productModal.on('show.bs.modal', function(){
        //JSON data by API call
        $.get(uomListApiUrl, function (response) {
            if(response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, uom) {
                    options += '<option value="'+ uom.uom_id +'">'+ uom.uom_name +'</option>';
                });
                $("#uoms").empty().html(options);
            }
        });
    });