//allMenu
function allMenuOpen(){
    var el;
    el = $('#pishingAllMenu');
    if(el.length <= 0){ return; }

    el.each(function(idx, obj){
        bindEvents();

        $(document).off('click.allMenuEvent').on('click.allMenuEvent' , '.pishingBtnAllMenu' , function(e){
            if( $(obj).hasClass('on') ){
                $(obj).removeClass('on');
                $('body').removeClass('openPop');

                $(obj).stop().removeClass('dimm').animate({
                    "right":"-100%"
                }, 300);
            }else{
                $(obj).addClass('on');
                $('body').addClass('openPop');
                $(window).on('resize' , function(){
                    var winH = $(window).height();
                    
                    $(obj).outerHeight( winH );
                }).resize();
                $(obj).stop().addClass('dimm').animate({
                    "right":"0"
                }, 300 , function(){
                    bindEvents();  // 애니메이트 후 전체메뉴 스크롤 이벤트
                });
            }
        });
    });

    function bindEvents(){
        el.find('.pishingPopClose, .js-PopClose').off('click.AllMenuCloseEvt').on('click.AllMenuCloseEvt' , function(){
            $('.pishingBtnAllMenu').trigger('click');
        });

        $('.pishingNavigation').each(function(idx, obj){
            $(window).on('resize' , function(){
                var winH = $(window).height();
                var allTopH = $('.pishingAllMenuTop').outerHeight();

                $(obj).outerHeight( winH - allTopH );
            }).resize();
        });
    }
}

$(function(){
    allMenuOpen();
});