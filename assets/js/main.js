(function($) {

$(document).ready(function() {

  // if (Modernizr.video && !jQuery.browser.mobile) {
  //   var $vidHtml = '';
  //     $vidHtml += '<video poster="/sites/all/themes/tcc/img/bk-video-still.jpg" id="bgvid" playsinline autoplay muted loop>';
  //     $vidHtml += '<source src="/sites/all/themes/tcc/img/bk-video-trimmed_1.mp4" type="video/mp4">';
  //     $vidHtml += '</video>';
  //     $('#hero').css('background-image', 'none').prepend($vidHtml);
  //   }
  //
    $('#dynamic-title').text('This title is set by javascript');

  // google map
  var map;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 8
    });
  }



  // ##########################################
  // ######### Overlay Mobile Menu Logic ######
  // ##########################################
  $('.btn-toggle-overlay-menu').click(function(e) {
    $('body').toggleClass('overlay-menu-active');
  });

});
})(jQuery);
