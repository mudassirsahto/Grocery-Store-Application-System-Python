$(function () {
    //Json data by api call for order table
    $.get(orderListApiUrl, function (response) {
        if(response) {
            var table = '';
            var totalCost = 0;
            $.each(response, function(index, order) {
                totalCost += parseFloat(order.total);
                table += '<tr data-date="'+ order.datetime +'" data-id="'+ order.order_id +'" data-name="'+ order.customer_name +'" data-total="'+ order.total.toFixed(2) +'">>' +
                    '<td>'+ order.datetime +'</td>'+
                    '<td>'+ order.order_id +'</td>'+
                    '<td>'+ order.customer_name +'</td>'+
                    '<td>'+ order.total.toFixed(2) +' Rs</td>'+
                    '<td><span class="btn btn-xs btn-info view-product">View</span></td></tr>';

            });
            table += '<tr><td colspan="3" style="text-align: end"><b>Total</b></td><td><b>'+ totalCost.toFixed(2) +' Rs</b></td></tr>';
            $("table").find('tbody').empty().html(table);
        }
    });

});

$(document).on("click", ".view-product", function (){
        var tr = $(this).closest('tr');
        var data = {
            id : tr.data('id'),
            date : tr.data('date'),
            customer_name : tr.data('name'),
            product_price : tr.data('total')

        };
        $('#productModal').show()
        $('#idProduct').val(data.id)
        $('#date').val(data.date)
        $('#cname').val(data.customer_name)
        $('#total').val(data.product_price)

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

       function myFunction(){
        $("#idProduct").val('0');
        $("#nameProduct, #unitProduct, #priceProduct").val('');
        $('#productModal').hide()
    }