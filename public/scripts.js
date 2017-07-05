$(function () {
  var ww = window.screen.availWidth;
  $('#note1').hide();
  $('#note2').hide();
  $('#note3').hide();
  $('#note4').hide();
  $('#note5').hide();
  $('#note6').hide();
  $('#note7').hide();
  $('#note8').hide();
  $('#note9').hide();


  $('#dropbtn').click(function () {
    myFunction();
  });

  $('#sell-control').click(function () {
    $('#buy-control .title').removeClass('active');
    $('#sell-control .title').addClass('active');
    $('#sell-order').show();
    $('#buy-order').hide();
  });

  $('#buy-control').click(function () {
    $('#sell-control .title').removeClass('active');
    $('#buy-control .title').addClass('active');
    $('#buy-order').show();
    $('#sell-order').hide();
  });

  if (ww > 450) {
    $('#sell-order').show();
    $('#buy-order').show();
  };


})

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
