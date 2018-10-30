jQuery(document).ready(function( $ ) {
    
    $('#nav-icon').on('click', function(){
        $(this).toggleClass('open');

        let margin = parseInt($('#main-navbar').css('marginLeft'), 10);
        y = 220 - margin;

        if($(this).hasClass('open')){
            $(this).css('left', y + 'px');
            $("body").css('overflow', 'hidden');
        } else {
            $(this).css('left', 0);
            $("body").css('overflow', 'unset');
        }
       
        $('#navbar-content').toggleClass('show');
    })
      
    $(document).click( function(e) {
        let menu = document.getElementById('navbar-content');

        if (e.target == menu) {

            $("#nav-icon").removeClass("open");

            $('#nav-icon').css('left', 0);
            $("body").css('overflow', 'unset');
            $('#navbar-content').removeClass('show');
        }
    })
});