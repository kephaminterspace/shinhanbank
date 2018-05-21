var main = {};


main.openForm = function() {
  $(".popup").addClass("active");
};

main.closeForm = function() {
  $(".popup").removeClass("active");
};

main.callApi = function() {
  var data = $('form').serializeArray();
        $.ajax({
            url: "/callApi",
            method: "POST",
            data: data,
            dataType: 'json',
            success: function (resp) {
                if (resp.status == 'true'){
                    var url = '/thankyou';
                    $(location).attr('href',url);
                }else{
                    if(resp.data == 'user exits')
                        $('.show-block-error').html( resp.message );
                    else
                        $('.show-block-error').html( 'Có lỗi xảy ra, mời bạn đăng ký lại' );

                    console.log(resp.data);
                }
            }
        });
};

main.scrollToDiv = function() {
    $('html, body').animate({
        scrollTop: $("#dieukiendangky").offset().top
    }, 500);
};


// Validate
$(document).ready(function() {
  $("#button-submit").click(function(){
    var name = $("input[name='fullName']").val();
    var phone = $("input[name='phone']").val();
    var email = $("input[name='email']").val();
    var address = $("select[name='address']").val();
    var money = $("select[name='money']").val();
    var check = $("input[name='check']:checked");
    var card_shinhanbank = $("input[name='card_shinhanbank']:checked");
    var agree = $("input[name='agree']:checked");


    if (check.length <= 0) {
      $(".box-0").addClass("active-box");
      return false;
    }

    if (card_shinhanbank.length <= 0) {
      $(".box-1").addClass("active-box");
      return false;
    }

    if (name.length == 0) {
      $(".box-2").addClass("active-box");
      return false;
    }

    if (phone.length == 0) {
      $(".box-3").addClass("active-box");
      return false;
    }
    else if (!phone.match(/^[\+\(\)\.\d]+$/)) {
      $(".box-3-2").addClass("active-box");
      return false;
    }

    if (email.length == 0) {
      $(".box-4").addClass("active-box");
      return false;
    }
    else if (email.indexOf('@') < 0) {
      $(".box-4-2").addClass("active-box");
      return false;
    }

    if (address == null) {
      $(".box-5").addClass("active-box");
      return false;
    }

    if (money == null) {
      $(".box-6").addClass("active-box");
      return false;
    }

    if (agree.length <= 0) {
      $(".box-8").addClass("active-box");
      return false;
    }
  });
});

$(document).click(function (e) {
  $('.alert-box').removeClass('active-box')
});

$(".condition").click(function(){
    $("#check-box").trigger("click");
  });