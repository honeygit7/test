// Touch Prevent
function lockTouch(e){
    e.preventDefault();
}

function btnActiveLayer(){
    var el = $('.btn, .btnm, .btns, .btnr, .btnArr, .btnsx, .btnx, .btnsx, .js-layerActive');

    el.not('.layerPop .btn, .layerPop .btnm, .layerPop .btns, .layerPop .btnr').each(function(idx, obj){
        $(obj).on('click' , function(e){
            el.removeClass('layerActive');
            $(obj).addClass('layerActive')
        });
    });
}


function callbackFunc(){
    return;
}



function btnActive(){//2022-09-13 추가 : 펼침 닫힘 컨트롤
    var el;
    el = $('[data-js-active=btnActive]');

    if(el.length <= 0){ return; }

    el.each(function(idx, obj){
        var $activeTarget = $(obj).parents().find('[data-js-active=activeTarget]'); // 보여줄 컨텐츠
        $activeTarget.hide();
        $(this).on('click' , function(){
            if(!$(obj).hasClass('active')){
                $(obj).addClass('active');
                $activeTarget.stop().slideDown(150);
            }else{
                // 눌렀을때 닫혀야 하는 경우 close 추가
                if($activeTarget.hasClass('close')){
                    $(obj).removeClass('active');
                    $activeTarget.stop().slideUp(150);
                }
            }
        });
    });
}


// 레이어 팝업 : 속도개선 수정 : tweenMax 제거
var idxLayPop = 0;
function gfnOpenLayer(popupContent, _this){

    popupContent = $(popupContent); //개발팀 추가 부분
    idxLayPop = idxLayPop + 1;
    popupContent.show();
    popupContent.attr('tabIndex' , -1).focus();

    popupContent.css({ //2023-02-08 수정
        "position" : "fixed",
        "top" : 0, 
        "bottom" : 0,
        "z-index" : idxLayPop + 1000,
        "transform" : "initial",
        "width" : "100%",
        "min-height" : "100%"
    })

    $('body').addClass('openPop');
    popupContent.find('.layerWrap').attr('tabIndex' , -1).focus();
    popupContent.addClass('open').attr('aria-hidden', false);
    popupContent.scrollTop(0);

    // 안드로이드 레이어팝업 인풋박스 포커스 이슈
    if(/Android/.test(navigator.appVersion)) {
       window.addEventListener("resize", function() {
         if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
           document.activeElement.scrollIntoView();
         }
      })
    }

    // 레이어 닫기
    popupContent.find('.popClose, .js-PopClose').off('click.closeEvent').on('click.closeEvent', function(e){
        e.preventDefault();
        $(this).closest(popupContent).hide().removeAttr('style');
        $(this).closest(popupContent).removeClass('open');
        $(this).closest(popupContent).attr('aria-hidden' , true)

        if($('.layerDim').hasClass('open')){
            $('.layerDim').each(function(idx, obj){
                if($(obj).hasClass('open')){
                    if(idx >= 0){
                        $('body').addClass('openPop');
                    }else{
                        $('body').removeClass('openPop');
                    }
                }
            });
        }else{
            $('body').removeClass('openPop');
        }

        try {
            if(window.focusBtn){
                $(window).scrollTop($(window.focusBtn).offset().top - (window.innerHeight / 2));
                window.focusBtn.focus();
            }
        } catch(e) {}
        
        if($('.layerActive').length > 0){
            $(window).scrollTop($('.layerActive').offset().top - (window.innerHeight / 2));
            $('.layerActive').focus().removeClass('layerActive')
        }
    });
}

// 레이어 닫기 
function gfnCloseLayer(popupContent){  //2022-06-20 주석 삭제
    $(popupContent).hide().removeAttr('style');
    $(popupContent).removeClass('open');
    $(popupContent).attr('aria-hidden' , true);

    try{
        if(window.focusBtn){
            setTimeout(function(){
                $(window).scrollTop($(window.focusBtn).offset().top - (window.innerHeight / 2));
                        window.focusBtn.focus();
            }, 50)
        }
        if($('.layerActive').length > 0){
            setTimeout(function(){
                $(window).scrollTop($('.layerActive').offset().top - (window.innerHeight / 2));
                $('.layerActive').focus().removeClass('layerActive')
            }, 50)
        }
    }catch(e){}
    
    if($('.layerDim').hasClass('open')){
        $('.layerDim').each(function(idx, obj){
            if($(obj).hasClass('open')){
                if(idx >= 0){
                    $('body').addClass('openPop');
                }else{
                    $('body').removeClass('openPop');
                }
            }
        });
    }else{
        $('body').removeClass('openPop');
    }
}

// 탭 메뉴
function tabUI(){
    var el;

    el = $('.tabArea');

    if(el.length <= 0){ return; }
// div[class^=tab]
    el.each(function(idx, obj){
        if($(obj).find(' > .tab ul > li , > .tabs ul > li , > .tabm ul > li, > .tabState ul > li').hasClass('on')){
            $(obj).find(' > .tab ul > li , > .tabs ul > li , > .tabm ul > li, > .tabState ul > li').each(function(){
                var idx = $(this).filter('.on').index();
                if(idx >= 0){
                    $(obj).find(' > .tab ul > li , > .tabs ul > li , > .tabm ul > li, > .tabState ul > li').eq(idx).addClass('on').siblings().removeClass('on');
                    $(obj).find(' > .tab ul > li , > .tabs ul > li , > .tabm ul > li, > .tabState ul > li').find('>a, > button').find('.blind').remove();
                    $(obj).find(' > .tab ul > li.on , > .tabs ul > li.on , > .tabm ul > li.on, > .tabState ul > li.on').find('>a, > button').append('<span class="blind">현재 페이지</span>');
                    $(obj).find(' > .tabCont').attr('aria-hidden',true).eq(idx).attr('aria-hidden',false);
                    $(obj).find(' > .tabCont > .blind').attr('tabindex','0').eq(idx).attr('tabindex','0');
                }

                if( $(obj).closest('.tabDetail, .tabCont').length > 0 ){
                    $(obj).find(' > .tab ul > li , > .tabs ul > li , > .tabm ul > li, > .tabState ul > li').find('>a, > button').find('.blind').remove();
                    $(obj).find(' > .tab ul > li.on , > .tabs ul > li.on , > .tabm ul > li.on, > .tabState ul > li.on').find('>a, > button').append('<span class="blind">현재 선택</span>');
                }

            });
        }else{
            $(obj).find(' > .tab ul > li , > .tabs ul > li , > .tabm ul > li, > .tabState ul > li').eq(0).addClass('on').siblings().removeClass('on');
            $(obj).find(' > .tab ul > li , > .tabs ul > li , > .tabm ul > li, > .tabState ul > li').find('>a, > button').find('.blind').remove();
            $(obj).find(' > .tab ul > li.on , > .tabs ul > li.on , > .tabm ul > li.on, > .tabState ul > li.on').find('>a, > button').append('<span class="blind">현재 페이지</span>');
            $(obj).find(' > .tabCont').attr('aria-hidden',true).eq(0).attr('aria-hidden',false);
            $(obj).find(' > .tabCont > .blind').attr('tabindex','0').eq(0).attr('tabindex','0');
        }

        bindEvents(obj);
    });

    function bindEvents(obj){
        var $this = $(obj);

        $this.find('> .tab ul > li > button, > .tabs ul > li > button, > .tabm ul > li > button, > .tabState ul > li > button').off('click.tabActiveEvent').on('click.tabActiveEvent', function(e){
            e.preventDefault();
            var index = $(this).closest('li').index();

            if($this.find(' > .tabCont').eq(index).length <= 0){ return; }
            $(obj).find(' > .tab ul > li , > .tabs ul > li , > .tabm ul > li, > .tabState ul > li').find('>a, > button').find('.blind').remove();
            $(obj).find(' > .tab ul > li.on , > .tabs ul > li.on , > .tabm ul > li.on, > .tabState ul > li.on').find('>a, > button').append('<span class="blind">현재 페이지</span>');
            $(this).closest(el).find(' > .tab ul > li , > .tabs ul > li , > .tabm ul > li, > .tabState ul > li').eq(index).addClass('on').siblings().removeClass('on');
            $(this).closest(el).find(' > .tabCont').attr('aria-hidden',true).eq(index).attr('aria-hidden',false);
            $(this).closest(el).find(' > .tabCont > .blind').attr('tabindex','0').eq(index).attr('tabindex','0');
            if( $(obj).closest('.tabDetail, .tabCont').length > 0 ){
                $(obj).find(' > .tab ul > li , > .tabs ul > li , > .tabm ul > li, > .tabState ul > li').find('>a, > button').find('.blind').remove();
                $(obj).find(' > .tab ul > li.on , > .tabs ul > li.on , > .tabm ul > li.on, > .tabState ul > li.on').find('>a, > button').append('<span class="blind">현재 선택</span>');
            }else{
                $(obj).find(' > .tab ul > li , > .tabs ul > li , > .tabm ul > li, > .tabState ul > li').find('>a, > button').find('.blind').remove();
                $(obj).find(' > .tab ul > li.on , > .tabs ul > li.on , > .tabm ul > li.on, > .tabState ul > li.on').find('>a, > button').append('<span class="blind">현재 페이지</span>');
            }
			numberAnimate();    //2021-02-19 추가
        });
    }
}

// scrollTab(가로 스크롤 탭)
function scrollTab(){
    var el, el2;

    el = $('.tab.multi');
    el2 = $('.tabm');
    headerSub = $('.headerSub');

    if(el.length, el2.length, headerSub.length <= 0){ return; } //2024-02-08 수정

    el.each(function(idx , obj){
        var $multiWrap = $(obj).find('> div');
        var $multiUL = $multiWrap.find('> ul');
        var $multiItem = $multiUL.find('> li');

        $multiUL.find('> li.on > a, > li.on > button').append('<span class="blind">현재 페이지</span>');

        $(window).on('load' , function(){
            // li.on scroll Left
            var wrapPosLeft = $multiWrap.offset().left;
            var posLeft = $multiWrap.find('ul > li.on').position().left;
            var totalScrollLeft = posLeft - wrapPosLeft;
            $multiWrap.scrollLeft(
                posLeft
            );

            $multiUL.each(function(){
                var totalWidth = 0;
                $multiItem.each(function(){
                    var itemW = $(this).outerWidth();
                    totalWidth += itemW;
                    $multiUL.outerWidth(totalWidth);    // UL width 부여

                    // multi, auto 변환
                    if( $multiUL.outerWidth() <= $multiWrap.width() ){
                        $(obj).removeClass('multi start end');
                        $(obj).addClass('auto');
                        $(this).parent('ul').removeAttr('style');
                    }else{
                        $(obj).addClass('multi');
                        $(obj).removeClass('auto');
                    }
                });

                if(el.hasClass('multi')){
                    // 1번 li on class 인 경우 start 클래스 부여
                    if($(this).find('> li').eq(0).hasClass('on')){
                        $(this).closest('.multi').addClass('start');
                    }

                    $multiWrap.scroll(function(){
                        if($multiWrap[0].scrollWidth - $multiWrap.scrollLeft() == $multiWrap.outerWidth()){
                            $(this).parent().addClass('end');
                        }else{
                            $(this).parent().removeClass('end');
                        }
                        if($multiWrap.scrollLeft()){
                            $(this).parent().removeClass('start');
                        }else{
                            $(this).parent().addClass('start');
                        }
                    });
                }
            });
        });
    });

    el2.each(function(idx, obj){
        var $multiWrap = $(obj).find('> div');
        var $multiUL = $multiWrap.find('> ul');
        var $multiItem = $multiUL.find('> li');

        $(window).on('load' , function(){
            // li.on scroll Left
            var wrapPosLeft = $multiWrap.offset().left;
            var posLeft = $multiWrap.find('ul > li.on').position().left;
            var totalScrollLeft = posLeft - wrapPosLeft;
            $multiWrap.scrollLeft(
                posLeft
            );

            $multiUL.each(function(){
                if(el2.hasClass('multi')){
                    // 1번 li on class 인 경우 start 클래스 부여
                    if($(this).find('> li').eq(0).hasClass('on')){
                        $(this).closest('.multi').addClass('start');
                    }

                    $multiWrap.scroll(function(){
                        if($multiWrap[0].scrollWidth - $multiWrap.scrollLeft() == $multiWrap.outerWidth()){
                            $(this).parent().addClass('end');
                        }else{
                            $(this).parent().removeClass('end');
                        }
                        if($multiWrap.scrollLeft()){
                            $(this).parent().removeClass('start');
                        }else{
                            $(this).parent().addClass('start');
                        }
                    });
                }
            });
        });
    });

    headerSub.each(function(idx, obj){
        var $gnbWrap = $(obj);
        var $gnbUL = $gnbWrap.find('.headerIn > ul');
        var $gnbItem = $gnbUL.find('> li');

        $(window).on('load' , function(){

            $gnbUL.each(function(){
                    // 1번 li on class 인 경우 start 클래스 부여
                    if($(this).find('> li').eq(0).hasClass('on')){
                        $(this).addClass('start');
                    }

                    if($(this).find('> li').filter('on')){
                        $(this).addClass('start');
                    }

                    $gnbUL.scroll(function(){
                        if($gnbUL[0].scrollWidth - $gnbUL.scrollLeft() == $gnbUL.outerWidth()){
                            $(this).addClass('end');
                        }else{
                            $(this).removeClass('end');
                        }
                        if($gnbUL.scrollLeft()){
                            $(this).removeClass('start');
                        }else{
                            $(this).addClass('start');
                        }
                    });
            });

            if( $gnbUL.find(' > li').hasClass('on') ){
                var wrapPosLeft = $gnbUL.offset().left;
                var posLeft = $gnbUL.find('> li.on').position().left;
                var totalScrollLeft = posLeft - wrapPosLeft;
                $gnbUL.scrollLeft( posLeft - 18 );
            }
        });
    });
}

// 앵커 탭 (포커스 이동)
function focusTabScrolling(){
    var el;
    el = $('[data-js-type=focus]');

    if(el.length <= 0){ return; }

    el.each(function(){
        var focusAnchor = $(this).find('> div > ul > li > a, > div > ul > li > button');

        focusAnchor.off('click.anchorTabEvent').on('click.anchorTabEvent', function(e){
            e.preventDefault();
            var anchorId = $(this).attr('href'),
                  headerFixH = $('.sub header').outerHeight(),
                  tabH = $(this).closest('ul').outerHeight();

            //$(anchorId).attr('tabindex', 0).focus().siblings().removeAttr('tabindex')
            $(anchorId).children().first().attr('tabindex', 0).focus().siblings().removeAttr('tabindex');
            $(window).scrollTop($(anchorId).offset().top - headerFixH - (tabH + 30));
        });
    });
}

// accodianUI(아코디언)
function accodianUI(){
    var el;
    el = $('[data-js-type=accd]');

    if(el.length <= 0){ return; }

    el.each(function(idx, obj){
        $(obj).find('> ul > li , > dl, > .checkTab').removeClass('on').find('> .accdCont , > dd, > .answer').attr('aria-hidden' , true);
        $(obj).find('.accdBtn').find('span.blind').remove();
        $(obj).find('.accdBtn').append('<span class="blind">해당 내용 열기</span>');
        $(obj).find('> ul > li:first-child , > dl:first-child').addClass('on').find('> .accdCont , > dd, > .answer').eq(idx).attr({
            'aria-hidden' : false,
            'tabindex' : 0
        });
        $(obj).find('> ul > li:first-child , > dl:first-child').find('.accdBtn').find('span.blind').remove();
        $(obj).find('> ul > li:first-child , > dl:first-child').find('.accdBtn').append('<span class="blind">해당 내용 닫기</span>');


        //모두 열림의 경우
        if( $(obj).hasClass('allOpen') ){
            $(obj).find('.accdBtn').find('span.blind').remove();
            $(obj).find('.accdBtn').append('<span class="blind">해당 내용 닫기</span>');
            $(obj).find('>ul > li , > dl').siblings().addClass('on').find(' > .accdCont , > dd, > .answer').attr('aria-hidden' , false);
        }
        //모두 닫힘의 경우
        if( $(obj).hasClass('close') ){
            $(obj).find('.accdBtn').find('span.blind').remove();
            $(obj).find('.accdBtn').append('<span class="blind">해당 내용 열기</span>');
            $(obj).find('>ul > li , > dl').removeClass('on').find(' > .accdCont , > dd, > .answer').attr('aria-hidden' , true);
        }

        bindEvents();

        function bindEvents(){
            $(obj).find('.accdBtn').off('click.accodianEvt').on('click.accodianEvt', function(e){
                e.preventDefault();

                var index = $(this).closest('li , dl, .checkTab').index();

                $(obj).find('> ul > li , > dl, > .checkTab').each(function(idx, obj){
                    if(idx == index){
                        if($(obj).hasClass('on')){
                            $(obj).removeClass('on');
                            $(obj).find('.accdBtn').find('span.blind').remove();
                            $(obj).find('.accdBtn').append('<span class="blind">해당 내용 열기</span>');
                            $(obj).find('> .accdCont , > dd, > .answer').attr('aria-hidden' , true).removeAttr('tabindex');
                        }else{
                            $(obj).addClass('on');
                            $(obj).find('.accdBtn').find('span.blind').remove();
                            $(obj).find('.accdBtn').append('<span class="blind">해당 내용 닫기</span>');
                            $(obj).find('> .accdCont , > dd, > .answer').attr({
                                'aria-hidden' : false,
                                'tabindex' : 0
                            });
                        }

                        // 이전 li 닫힘의 경우 .desc 로 생성
                        if($(obj).closest(el).hasClass('desc')){
                            $(obj).siblings().removeClass('on').find(' > .accdCont , > dd, > .answer').attr('aria-hidden' , true);/* 2022-02-14 마이데이터 자산 점수 수정 */
                        }

                        // 2024-09-25 아코디언 내용 넘침으로 인해 선택 영역 포커스 추가
                        if($(obj).closest(el).hasClass('fca')){
                            headerFixH = $('.sub header').outerHeight(),
                                $(window).scrollTop($(obj).offset().top - headerFixH);
                            console.log('a')
                        }
                    }
                });
            });
        }
    });
}


// 스크롤 탑버튼
function quickTop(){
    var el = $('.ftTop');
    if(el.length <= 0){ return; }

    el.hide();

    $(document).on('scroll', function(){
        var sct = $(this).scrollTop();
        var wSct = $(window).scrollTop();

        if(sct > 250){
            el.show().stop().animate({
                'opacity' : '1'
            }, 300);
        }else{
            el.stop().animate({
                'opacity' : '0'
            },{
                duration : 100,
                complete : function(){
                    $(this).hide();
                }
            });
        }

        /* 2020-03-27 삭제 : 접근성 마크 영역 추가로 인해 삭제
        if( $('footer').length > 0 ){
            if( el.offset().top > $('footer').offset().top ){
                if( !$('.wrap').hasClass('btm') ){
                    el.parent().css({ "bottom" : "72px" });
                }
            }else{
                el.parent().css({ "bottom" : "72px" });
            }
        } */

        if( $('.btnWrap.btm').length > 0 ){    // 2022-05-23 수정 : 하단 플로팅 버튼 있는 경우 추가
            el.parent().css({ "bottom" : "72px" });
        }

    });

    el.off('click.topScrollEvent').on('click.topScrollEvent' , function(e){
        e.preventDefault();
        $('body, html').stop().animate({
            scrollTop : 0
        });
    });
}

// 툴팁
function tooltipUI(){
    var el  = $('.tooltipWrap');
    if(el.length <= 0){ return; }

    el.each(function(){
        $(this).find(' > button').off('click.tooltipEvent').on({
            'click.tooltipEvent' : function(e){

                window.tooltipFun = e.currentTarget;
                el.removeClass('on');
                if($(this).closest(el).hasClass('on')){
                    $(this).closest(el).removeClass('on').find('.layerTooltip').removeAttr('tabindex');
                }else{
                    $(this).closest(el).addClass('on').find('.layerTooltip').attr('tabindex' , 0).focus();
                    $(this).closest(el).find('.layerTooltip').css({
                        'top' : $(this).parent().height() + 2
                    });

                    if(el.hasClass('on')){
                        var layerBox = $(this).closest(el).find('.layerTooltip');
                        var winW = $(window).width();
                        var winW2 = winW /2;
                        var btnLeft = $(this).offset().left;
                        var tooltipWidth = layerBox.outerWidth() + layerBox.offset().left;
                        var tooltipWidthRight = layerBox.offset().left - layerBox.outerWidth();

                        if(winW2 < btnLeft){
                            $(this).closest(el).addClass('right');

                            if(layerBox.offset().left < 0){   // 2023-11-20 추가 : 툴팁 넘치는 현상 수정
                                el.removeClass('right').addClass('left');
                            }
                        }else{
                            $(this).closest(el).addClass('left');
                            if(winW < tooltipWidth || winW < layerBox.offset().left){
                                    $(this).closest(el).removeClass('left right');
                                    $(this).closest(el).addClass('center').find('.layerTooltip').css({
                                        "margin-left": - (tooltipWidth - winW + 15)
                                    });
                            }
                        }
                        if(winW <= 370){
                            if(winW < tooltipWidth || winW > layerBox.offset().left){
                                if(layerBox.offset().left < 0){
                                    $(this).closest(el).addClass('center').find('.layerTooltip').css({
                                        "margin-right": "-130px"
                                    });
                                }
                            }
                        }
                    }
                }
            }
        });
        el.find('.layerTooltip > button').on({
            'focusout' : function(){
                $(this).closest(el).removeClass('on');
                $(this).parent('.layerTooltip').removeAttr('tabindex style');
            }
        });
        $(this).on({
            'mouseleave' : function(){
                $(this).closest(el).removeClass('on').find('.layerTooltip').removeAttr('tabindex style');
            }
        });
        el.find('.tooltipClose').off('click.tooltipCloseEvent').on('click.tooltipCloseEvent' , function(e){
            e.preventDefault();
            $(this).closest(el).removeClass('on').find('.layerTooltip').removeAttr('tabindex style');
            if(window.tooltipFun){
                window.tooltipFun.focus();
            }
        });
    });
}

// formUI
function formUI(){
    var chkWrap = $('.checkWrap');
    var inputWrap = $('.inputBox');
    var inputDel = inputWrap.find('.del');
    var inputChkIn = inputWrap.find('.checkbox');
    var inputRadioIn = $('input:radio.etc');
    var radioSelect = $('.radioWrap.hpType');
    var inputChkAnonym = $('.chkInputControll label');
    var requiredItem = $('.required');
    var agreeAllCheck = $('.checkTab.whole');
    var radioTab = $('[data-js-type=radioTab]');
    var radioChoice = $('.radioSelect .radio input:radio');
    //var selectTxtArea = $('.inpJs');

    // Input Delete
    if(inputDel.length > 0 ){
        inputDel.each(function(){
            var _this = $(this).parent('.inputBox');

            if(_this.find('input').val() !== ''){
                _this.addClass('on');
            }
            else{
                _this.removeClass('on');
            }

            _this.find('input').on('keydown keyup keypress', function(){
                if($(this).val() !== ''){
                    $(this).parent().addClass('on');
                }else{
                    $(this).parent().removeClass('on');
                }
            });

            inputDel.off('click.inputDelEvent').on('click.inputDelEvent' , function(e){
                e.preventDefault();

                $(this).parent().find('input').val('').focus();
                $(this).parent().removeClass('on');
            });
        });
    }

    // input 과  체크박스 연결 시 - 예) /academy/qna/qna_write.html
    if(inputChkIn.length > 0){
        inputChkIn.each(function(){
            $(this).on('change' , function(e){
                e.stopPropagation();
                if($(this).find('input:checkbox').is(':checked')){
                    $(this).parent().find('input:text').removeAttr('disabled');
                }else{
                    $(this).parent().find('input:text').attr('disabled' , 'disabled');
                }
            });
        });
    }

    if(inputChkAnonym.length > 0){
        inputChkAnonym.each(function(){
            $(this).parent().parent().prev().find('input:text').prop('disabled', false);

            $(this).parent().find('input:checkbox').on('change' , function(e){
                e.stopPropagation();
                if($(this).parent().find('input:checkbox').is(':checked')){
                    $(this).parent().parent().prev().find('input:text').prop('disabled', true).val(' ');
                }else{
                    $(this).parent().parent().prev().find('input:text').prop('disabled', false).val('');
                }
            });
        });
    }

    //필수입력사항
    if(requiredItem.length > 0){
        requiredItem.closest('.formItem').each(function(){
            $(this).find('.required').attr('aria-label' , '필수입력사항');
            $(this).find('input , select , textarea').attr('required' , true);
        });
    }

    // input 과  라디오 연결 시 - 예) /academy/qna/qna_write.html
    if(inputRadioIn.length > 0){
        inputRadioIn.each(function(){
            $(this).on('change' , function(e){
                e.stopPropagation();
                if($(this).is(':checked')){
                    $(this).closest('li').find('.inputBox > input:text').prop('disabled', false);
                }
            });
            $(this).closest('ul').find(' > li > .radio > input:radio').not('.etc').each(function(){
                $(this).on('change' , function(){
                    if($(this).is(':checked')){
                        $(this).closest('ul').find('.inputBox > input:text').prop('disabled' , true);
                    }
                });
            });
        });
    }

    // radio + select = 휴대폰번호
    if(radioSelect.length > 0){
        radioSelect.each(function(){
            $(this).find('.selectBox > select').off('click.inpSlectEvent').on('click.inpSlectEvent' , function(){
                if(!$(this).parent('.selectBox').hasClass('on')){
                    $(this).parent('.selectBox').addClass('on');
                    $(this).closest(radioSelect).find('.radioBox > .radio > input:radio').prop('checked', false);
                }
            });
            $(this).on('change' , function(e){
                e.stopPropagation();
                $(this).find('.radioBox > .radio > input:radio').each(function(){
                    if($(this).is(':checked')){
                        $(this).closest(radioSelect).find('.selectBox').removeClass('on').find(' > select > option').prop('selected' , false);
                    }
                });
            });
        });
    }

    // 약관 전체 동의 체크박스
    if(agreeAllCheck.length > 0){
        agreeAllCheck.each(function(){
            var _this = $(this),
                  checkAll = _this.find('.checkbox > input:checkbox'),
                  checkList = _this.next('.checkTab.full, .js-allChk'); //2022-11-03 추가 

            checkAll.on('change' , function(e){
                e.stopPropagation();
                if(checkAll.is(':checked')){
                    checkList.stop().slideUp(150);
                    checkList.find('input:checkbox').prop('checked', true);

                    //2022-11-03 추가 : 안닫히는 경우
                    if(_this.hasClass('not')){
                        checkList.stop().slideDown(150); 
                    }

                }else{
                    checkList.stop().slideDown(150);
                    checkList.find('input:checkbox').prop('checked', false);
                }
            });
        });
    }

    // select + textarea : set/mypage/leave.html
    /* 셀렉트 기타 옵션 삭제로 인해 주석 처리
    if(selectTxtArea.length > 0){
        selectTxtArea.each(function(){
            $(this).find('.txtArea').hide();
            $(this).on('change' , function(){
                if($(this).find('.selectBox > .select option:contains("기타")').is(':selected')){
                    $(this).find('.txtArea').show();
                }else{
                    $(this).find('.txtArea').hide();
                }
            });
        });
    } */

    // radioTab
    if(inputRadioIn.length > 0){
        inputRadioIn.each(function(){
            $(this).on('change' , function(e){
                e.stopPropagation();
                if($(this).is(':checked')){
                    $(this).closest('li').find('.inputBox > input:text').prop('disabled', false);
                }
            });
            $(this).closest('ul').find(' > li > .radio > input:radio').not('.etc').each(function(){
                $(this).on('change' , function(){
                    if($(this).is(':checked')){
                        $(this).closest('ul').find('.inputBox > input:text').prop('disabled' , true);
                    }
                });
            });
        });
    }

    // radio group input:text Disabled : pop_receive.html
    if(radioChoice.length > 0){
        radioChoice.each(function(){
            if($(this).is(':checked')){
                $(this).closest('.formItem').addClass('active');
            }else{
                $(this).closest('.formItem').find('.com').addClass('disabled');
                $(this).closest('.formItem').find('.inputBox input').prop('disabled', true);
            }
            $(this).closest('.formItem').on('change' , function(){
                if($(this).closest('.formItem').hasClass('active')){
                    $(this).find('.inputBox input').prop('disabled', false);
                    $(this).siblings().find('.inputBox input').prop('disabled', true);
                    $(this).siblings().find('.com').addClass('disabled');
                }
            });
            $(this).on('change' , function(e){
                e.stopPropagation();
                $(this).closest('.formItem').each(function(){
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');
                    if( $(this).hasClass('active') ){
                        $(this).find('.com').removeClass('disabled');
                    }else{
                        $(this).find('.com').addClass('disabled');
                    }
                });
            });
        });
    }
}

//내 댓글 수정 버튼 수정 영역 활성화 : preuser/apply.html
function myReplyModify(){
    var el  = $('.reList > ul > li');

    if(el.length <= 0){ return; }

    el.each(function(){
        var myModify = $(this).find('.viewCont').find('.modify');

        if( myModify ){
            myModify.off('click.modifyBtnEvent').on('click.modifyBtnEvent' , function(){
                if( $(this).closest('li').hasClass('modifyActive') ){
                    $(this).closest('li').removeClass('modifyActive');
                }else{
                    $(this).closest('li').addClass('modifyActive');
                }
            });
            $('.modifyClose').on('click.modifyCloseEvent', function(){
                myModify.trigger('click')
            });
        }
    });
}

function theSwitch(){
    var el;
    el = $('.switchBox');

    if(el.length <= 0){ return; }

    el.each(function(idx , obj){
        // switch 경우
        $(this).find('button.switch').each(function(){
            $(this).find('span.blind').remove();

            if( $(this).hasClass('on') ){
                $(this).attr('aria-checked', true);
                $(this).append('<span class="blind">ON</span>');
            }else{
                $(this).attr('aria-checked', false);
                $(this).append('<span class="blind">OFF</span>');
            }

            $(this).off('click.switchEvent').on('click.switchEvent' , function(){
                if( $(this).hasClass('on')){
                    $(this).removeClass('on');
                    $(this).attr('aria-checked', false);
                    $(this).find('span.blind').text('OFF');
                }else{
                    $(this).addClass('on');
                    $(this).attr('aria-checked', true);
                    $(this).find('span.blind').text('ON');
                }
            });
        });

        // alarm 경우
        $(this).find('button.alarm').each(function(){
            if( $(this).hasClass('on')){
                $(this).attr('aria-checked', true);
                $(this).find('span').text('알람 ON');
            }else{
                $(this).attr('aria-checked', false);
                $(this).find('span').text('알람 OFF');
            }

            $(this).off('click.alarmSwitchEvt').on('click.alarmSwitchEvt' , function(){
                if( $(this).hasClass('on')){
                    $(this).removeClass('on');
                    $(this).attr('aria-checked', false);
                    $(this).find('span').text('알람 OFF');
                }else{
                    $(this).addClass('on');
                    $(this).attr('aria-checked', true);
                    $(this).find('span').text('알람 ON');
                }
            });
        });


    });
}


function moreCont(){
    var el;
    el = $('.moreWrap');

    if(el.length <= 0){ return; }

    el.each(function(idx, obj){
        $(this).find('.btnMore').off('click.moreCtrEvent').on('click.moreCtrEvent' , function(e){
            e.preventDefault();
            if($(obj).hasClass('on')){
                $(obj).removeClass('on');
                $(this).find('.blind').text('더보기');
                $(obj).find('.detail').removeAttr('tabindex');
            }else{
                $(obj).addClass('on');
                $(this).find('.blind').text('닫기');
                $(obj).find('.detail').attr('tabindex' , 0).focus();
            }
        });
    });
}


function foldingStep(){
    var el;
    el = $('.stepLink');

    if(el.length <= 0){ return; }

    el.each(function(idx , obj){
        var current = $(obj).find('.tit > a');

        if($(obj).hasClass('on')){
            current.find('span.blind').remove();
            current.append('<span class="blind">다른 단계 목록접기</span>');
        }else{
            current.find('span.blind').remove();
            current.append('<span class="blind">다른 단계 목록보기</span>');
        }

        current.off('click.foldingStepEvent').on('click.foldingStepEvent' , function(e){
            e.preventDefault();
            if($(obj).hasClass('on')){
                $(obj).removeClass('on');
                current.find('span.blind').remove();
                current.append('<span class="blind">다른 단계 목록보기</span>');
            }else{
                $(obj).addClass('on');
                current.find('span.blind').remove();
                current.append('<span class="blind">다른 단계 목록접기</span>');
            }
        });
    });
}

//답변/댓글 버튼 이벤트
function reply(){
    var el;
    el = $('.reWrite');

    if(el.length <= 0){ return; }

    el.each(function(){
        var _this = $(this);

        el.find('.formItem').hide();

        _this.find(' > .btnWrap > button').off('click.replyClickEvent').on('click.replyClickEvent' , function(){
            $(this).closest(el).find('.formItem').show().attr('tabindex' , 0).find('textarea').focus();
            $(this).hide();
        });

    });
}

// commonSlide
function commonSlide(){
    if($('.slideWrap').length <= 0){ return; }
    var slideWrap = {};
    var swiperInstances = {};
    $('.slideWrap').each(function(idx, obj){
        var _this = $(this).find('.slide');
        var ctrlBtn = _this.parent().find('.ctrl');

        slideWrap[idx] = new Swiper(_this, {
            loop : true,
            paginationClickable : true,
            spaceBetween : 0,
            slidesPerView : 'auto',
            //centeredSlides : true,
            pagination : {
                el : $(this).find('.pagination > .bullet'),
                bulletElement : 'a span',
                bulletActiveClass : 'on',
                renderBullet : function(idx, obj, e){
                    return '<a href="#" class="' + obj + '"><span>' + (idx + 1) + '번째 슬라이드' + '</span></a>';
                },
                clickable : true,
            },
            autoplay : {
                delay : 4000,
            },
            speed : 600,
            observer : true,
            observeParents : true,
        });


        $('.swiper-slide').attr('tabindex' , 0);

        // 재생 정지 컨트롤
        $(this).find('.ctrl > a').off('click.moveBtnEvent').on('click.moveBtnEvent', function(e){
            e.preventDefault();
            if($(this).hasClass('on')){
                $(this).removeClass('on').find('span').text('정지');
                slideWrap[idx].autoplay.start();
            }else{
                $(this).addClass('on').find('span').text('재생');
                slideWrap[idx].autoplay.stop();
            }
        });

        function ctrlPlay() {
            if(!_this.parent().find('.ctrl > a').hasClass('on')) {
                _this.parent().find('.ctrl > a').addClass('on').find('span').text('정지');
                slideWrap[idx].autoplay.stop();
            }
        }

        slideWrap[idx].on('slideChange touchEnd', function(e) {
            if(slideWrap[idx].autoplay.running === false) {
                ctrlPlay();
            }
        });

        _this.find('.swiper-slide').on('focusin', function(e) {
            ctrlPlay();
        });

        _this.parent().find('.pagination > .bullet > .swiper-pagination-bullet').off('click.slideBulletEvent').on('click.slideBulletEvent' , function(e){
            e.preventDefault();
            ctrlPlay();
        });

        //2020-08-10 추가
        if($(this).hasClass('stop')){
            ctrlPlay()
        }

        //2021-07-22 수정 "추천 금융상품" 슬라이드 자동롤링 삭제
        /* if( $(this).hasClass('adSlideBox') ){    2022-07-12 수정 : 주석처리
            ctrlPlay()
            $(this).find('.ctrl').remove();
        } */

    });
}

//imgSlide : common_view.html
function imgSlide(){
    if($('.numberSlide').length <= 0){ return; }
    var imgSlideWrap;
    $('.numberSlide').each(function(){
        var _this = $(this).find('.slide');
        imgSlideWrap = new Swiper(_this, {
            pagination : {
                el : _this.parent().find('.pagination > .num > div'),
                type : 'fraction'
            },
            navigation : {
                nextEl : '.pagination > .num > .next',
                prevEl : '.pagination > .num > .prev',
            },
            spaceBetween : 8,
            slidesPerView : 1,
            centerdSlides : true,
            on : {
                init : function(){
                    _this.parent().find('.pagination > .num > .next , .pagination > .num > .prev').removeAttr('href');
                    _this.parent().find('.pagination > .num > .next , .pagination > .num > .prev').on('click' , function(e){
                        e.preventDefault();
                        $(this).focus();
                    });

                }
                
            }
        });
    });
}

//passSlide : smart_card.html
function passSlide(){
    if($('.passSlide').length <= 0){ return; }
    var passSlideWrap;
    $('.passSlide').each(function(){
        var _this = $(this).find('.slide');
        passSlideWrap = new Swiper(_this, {
            spaceBetween : 8,
            slidesPerView : 1,
            centerdSlides : true,
        });
    });
}

// main, sub main 전문가 pick Slide
function expertSlide(){
    if($('.expertPick').length <= 0){ return; }
    var expertSlideWrap;
    $('.expertPick').each(function(){
        var _this = $(this).find('.expertSlide');
        expertSlideWrap = new Swiper(_this, {
            loop : true,
            direction : 'vertical',
            autoplay : {
                delay : 3000,  // 2020-06-17 수정 : 2 > 3 으로 딜레이 변경
            },
            speed : 1000,
        });
    });
}

// 2023-04-18 추가 : 풀배너 슬라이드
function bnrNumCtrlSlide(){
    if($('.bnrNumFullSlide').length <= 0){ return; }



//    $('.bnrNumFullSlide').each(function(){
//        var slideItem = $(this).find('li');
//        slideItem.sort(function(){
//            var itemRandom = parseInt( Math.random() * slideItem.length );
//            var itemRandom2 = parseInt( Math.random() * slideItem.length );
//
//            return itemRandom - itemRandom2;
//        }).appendTo($(this).find('.swiper-wrapper'));
//    });


    var bnrNumFullSlide = {};
    $('.bnrNumFullSlide').each(function(idx, obj){
        var _this = $(this).find('.slide');
        var ctrlBtn = _this.parent().find('.ctrl');

        bnrNumFullSlide[idx] = new Swiper(_this, {
            loop : true,
            paginationClickable : true,
            spaceBetween : 0,
            slidesPerView : 'auto',
            pagination : {
                el : _this.parent().find('.pagination > .num > div'),
                type : 'fraction'
            },
            autoplay : {
                delay : 4000,
            },
            speed : 600,
            observer : true,
            observeParents : true,
        });

        // 재생 정지 컨트롤
        $(this).find('.ctrl > a').off('click.moveBtnEvent').on('click.moveBtnEvent', function(e){
            e.preventDefault();
            if($(this).hasClass('on')){
                $(this).removeClass('on').find('span').text('정지');
                bnrNumFullSlide[idx].autoplay.start();
            }else{
                $(this).addClass('on').find('span').text('재생');
                bnrNumFullSlide[idx].autoplay.stop();
            }
        });

        function ctrlPlay() {
            if(!_this.parent().find('.ctrl > a').hasClass('on')) {
                _this.parent().find('.ctrl > a').addClass('on').find('span').text('정지');
                bnrNumFullSlide[idx].autoplay.stop();
            }
        }

        bnrNumFullSlide[idx].on('slideChange touchEnd', function(e) {
            if(bnrNumFullSlide[idx].autoplay.running === false) {
                ctrlPlay();
            }
        });

        _this.find('.swiper-slide').on('focusin', function(e) {
            ctrlPlay();
        });

        //2020-08-10 추가
        if($(this).hasClass('stop')){
            ctrlPlay();
        }

    });
}

// 본인 외 구성원,수량 Plus / Minus
function quantityFn(){
    var el = $('.quantityWrap').not('.nochk');

    if(el.length <= 0){ return; }

    bindEvents();
    function bindEvents(){
        el.each(function(idx, obj){
            $(obj).find('button').off('click.quantityEvent').on('click.quantityEvent' , function(e){
                e.preventDefault();
                var $this = $(this);
                if($this.hasClass('decrease')){
                    minus(); // 감소
                }else if($this.hasClass('increase')){
                    plus(); // 증가
                }
            });

            // 증가
            function plus() {
                var orderCnt = parseInt($(obj).find('input').val());
                $(obj).find('input').val(orderCnt + 1);
            }

            // 감소
            function minus() {
                var orderCnt = parseInt($(obj).find('input').val());
                if(orderCnt - 1 < 1) { return; }
                $(obj).find('input').val(orderCnt - 1);
            }
        });
    }
}

function bxEllips(){
    var el = $('.bxEllips');

    if(el.length <= 0){ return; }

    el.each(function(idx, obj){
        $(obj).find('button').off('click.bxEllipsEvent').on('click.bxEllipsEvent' , function(e){
            if($(obj).hasClass('on')){
                $(obj).removeClass('on');
            }else{
                $(obj).addClass('on');
            }
        });
    });
}


//  /myservice/identity/shutoff_set.html
function moveTab(){
    var el = $('.setBox');

    if(el.length <= 0){ return; }

    el.each(function(){
        var $item = el.find('.set');
        var $itemRadio = $item.find('.radio > input');

        $itemRadio.on('change' , function(){
            if($(this).is(':checked')){

                var idx = $(this).closest($item).index() +1;
                var itemLength = $item.length;
                var active = "set" + idx + "on";

                for(var i = 1; i < itemLength; i++){
                    $(this).closest(el).attr('class' , active);
                    $(this).closest(el).addClass('setBox');
                }
            }
        });

    });
}

function subMenu(){
    var el;
    el = $('.subMenu');
    if(el.length <= 0){ return; }
    if(el.attr('aria-hidden') == 'true'){ return; }

    if(el.hasClass('notFix')){  // .subMenu를 컨텐츠에 쓰는 경우 notFix  2022-11-30
        if($('header').length <= 0){
            $('.container').css({"padding-top":"0"});
        }else{
            $('.container').removeAttr('style');
        }
        return;
    }

    el.each(function(idx, obj){
        var $subMenuUL = $(obj).find('div > ul');
        var $sub1depth  = $(obj).find('> div > ul');
        var $sub2depth  = $(obj).find('> div > ul > li > div > ul');
        var elH             = el.outerHeight();
        var depthH        = el.find('> div > ul > li > .depth').outerHeight();
        var totalH         = elH + depthH;

        //서브 메뉴 있을때 header fixed -> absolute 변경
        if(el.length >= 0){
            $('header').css({"position":"relative"});
            if( el.find('div > ul > li.on > .depth').length > 0  ){
                $('.container').css({"padding-top" : totalH});
            }else{
                $('.container').css({"padding-top" : elH});
            }
        }else{
            $('.container').removeAttr('style');
            $('header').removeAttr('style');
        }

        // scroll fixed
        $(window).off('scroll.scrollHeader').on('scroll.scrollHeader', function(){
            var wSct = $(window).scrollTop();

            if( $('header').length === 0 ){
                // 헤더가 없는 경우(APP)

                $(obj).css({"top":"0"});
                if(!el.hasClass('fixed')){
                    contentH = $('#content')[0].offsetTop;
                }
                if(wSct >= contentH){
                    $(obj).addClass('fixed');
                    $(obj).find('.depth').hide();
                }else{
                    $(obj).removeClass('fixed');
                    $(obj).find('.depth').removeAttr('style');
                }
            }else{
                // 헤더가 있는 경우(MO)
                if(!el.hasClass('fixed')){
                    headerH = $('header')[0].offsetHeight;
                }
                if(wSct >= headerH){
                    $(obj).addClass('fixed');
                    $(obj).find('.depth').hide();
                }else{
                    $(obj).removeClass('fixed');
                    $(obj).find('.depth').removeAttr('style');
                }
            }

            // 2020-07-03 추가 : IOS overflow-scrolling auto - touch 대응
            if( $('header').length === 0 && $('footer').length === 0 ){// header, footer 가 없는 APP의 경우
                $sub1depth.addClass('chgScroll');
                if(el.find('> div > ul > li > .depth').is(':visible')){
                    $('.subMenuArea > ul').css({"height" : totalH});
                }else{
                    $('.subMenuArea > ul').css({"height" : elH});
                }
            }

        }).trigger('scroll.scrollHeader');

        //clone
        $(obj).find('> div > ul').clone().appendTo('.subMenuAll').removeAttr('style').find('li.on > a').attr('title' , '선택됨');    //2020-06-05 추가 선택됨
        $('.subMenuAll').find('.depth').remove();
        $sub1depth.find(' > li.on > a, .depth > ul > li.on > a').attr('title' , '선택됨')    //2020-06-05 추가 선택됨

        // btn click
        $('.btnSubMenuAll').off('click.subMenuAllEvent').on('click.subMenuAllEvent' , function(e){
            e.preventDefault();
            if($(this).hasClass('on')){
                $(this).removeClass('on');
                $('.subMenuAll').stop().slideUp(250);
            }else{
                $(this).addClass('on');
                $('.subMenuAll').stop().slideDown(250);
            }
        });

        // 로드시 활성화 메뉴 스크롤 이동
        $(window).on('load' , function(){

            //1depth
            var objPosLeft = $sub1depth.offset().left;
            var subPosLeft = $sub1depth.find('li.on').position().left;
            $sub1depth.scrollLeft( subPosLeft - 15 );

            //2depth - 2depth li.on 의 경우
            if($sub2depth.find('>li.on').length >= 1){
                var objPosLeft2 = $sub2depth.offset().left;
                var subPosLeft2 = $sub2depth.find('li.on').position().left;
                $sub2depth.scrollLeft( subPosLeft2 - 15 );
            }

        });

        // shadow = start : left none, end : right none
        $subMenuUL.each(function(idx, obj){
            if($(obj).find('> li').eq(0).hasClass('on')){
                $(obj).parent().addClass('start');
            }
            $subMenuUL.scroll(function(){
                if($(obj)[0].scrollWidth - $(obj).scrollLeft() == $(obj).outerWidth()){
                    $(obj).parent().addClass('end');
                }else{
                    $(obj).parent().removeClass('end');
                }
                if($(obj).scrollLeft()){
                    $(obj).parent().removeClass('start');
                }else{
                    $(obj).parent().addClass('start');
                }
            });
        });
    });
}

// comp_plus.html
function selectOpt(){
    var el;
     el = $('.selectOpt');

    if(el.length <= 0){ return; }

    el.each(function(idx, obj){
        var $selectBtn = el.find('.btn');

        $selectBtn.off('click.selectOptEvent').on('click.selectOptEvent', function(){
            if($(this).hasClass('on')){
                $(this).removeClass('on');
                $(this).closest(el).find('.options').stop().slideUp(350);
                el.parent().removeClass('dimm');
                $('body').removeAttr('style')
            }else{
                $(this).addClass('on');
                $(this).closest(el).find('.options').stop().slideDown(350);
                el.parent().addClass('dimm');
                $('body').css("overflow" , "hidden")
            }
        });
        $(obj).find('.close').off('click.selectOptCloseEvt').on('click.selectOptCloseEvt', function(){
            $selectBtn.trigger('click');
        });
    });
}

// 신용Lab List 정렬,랜덤 : 2023-01-11 수정 : masonry 삭제
function labListRandom(){
    var el;
    el = $('.labList .inner');

    if(el.length <= 0){ return; }

    el.each(function(){
        var labItem = $(this).children('span');

        labItem.sort(function(){
            var itemRandom = parseInt( Math.random() * labItem.length );
            var itemRandom2 = parseInt( Math.random() * labItem.length );

            return itemRandom - itemRandom2;
        }).appendTo($(this));
    });
}

//allMenu , navigation
function allMenuOpen(){
    var el;
    el = $('#allMenu');
    if(el.length <= 0){ return; }

    el.each(function(idx, obj){
        bindEvents();

        $(document).off('click.allMenuEvent').on('click.allMenuEvent' , '.hdMenu' , function(e){
            if( $(obj).hasClass('on') ){
                $(obj).removeClass('on');
                $('body').removeClass('openPop');

                $(obj).stop().removeClass('dimm').animate({
                    "right":"-100%"
                }, 300, function(){
                    $(obj).attr('aria-hidden' , true);
                });
            }else{
                $(obj).addClass('on');
                $('body').addClass('openPop');
                $(obj).attr('aria-hidden' , false);
                $(window).on('resize' , function(){
                    var winH = $(window).height();
                    
                    $(obj).outerHeight( winH );
                }).resize();
                $(obj).stop().addClass('dimm').animate({
                    "right":"0"
                }, 300 , function(){
                    bindEvents();  // 애니메이트 후 전체메뉴 스크롤 이벤트
                    $('.userInfo > .user > strong, .userInfo > .user > a').attr('tabindex',0).focus();
                });
            }
        });
    });

    function bindEvents(){
        el.find('.popClose, .js-PopClose').off('click.AllMenuCloseEvt').on('click.AllMenuCloseEvt' , function(){
            $('.hdMenu').trigger('click');
        });

        $('.navigation').each(function(idx, obj){
            $(window).on('resize' , function(){
                var winH = $(window).height();
                var allTopH = $('.allMenuTop').outerHeight();
                var allBnrH = $('.allMenuBnr').outerHeight();

                $(obj).outerHeight( winH - allTopH );
                
            }).resize();
            setTimeout(function(){
            $(obj).find('.dep01 > ul > li.on').find('> a').attr('title' , '현재 메뉴');  //클릭 전 초기 메뉴 title 추가
            $(obj).find('.dep01 > ul > li > a').off('click.allMenu1DepEvent').on('click.allMenu1DepEvent' , function(){
                var index = $(this).parent().index();

                if( !$(this).parent().hasClass('on') ){
                    $(this).parent().addClass('on').find('> a').attr('title' , '현재 메뉴');
                    $(this).parent().siblings().removeClass('on').find('> a').removeAttr('title');
                    $(this).closest(el).find('.dep02 > ul > li').eq(index).addClass('on').siblings().removeClass('on');
                }
            });
            },500);
        });
    }
}

function headerGnbFix(){
    var el ;
    el = $('.headerSub');
    if(el.length <= 0){ return; }

    el.each(function(idx, obj){
        //서브 메뉴 있을때 header fixed -> absolute 변경
        if(el.length >= 0){
            $('header').css({"position":"relative"});
        }else{
            $('.container').removeAttr('style');
            $('header').removeAttr('style');
        }

        // scroll fixed  //2020-05-14 메이 탑 배너 추가 건으로 인해 수정
        $(window).off('scroll.scrollHeader').on('scroll.scrollHeader', function(){
            var wSct = $(window).scrollTop();
            if(!el.hasClass('fixed')){
                headerH = $('header')[0].offsetHeight;
                if($('.topBnrWrap').length > 0){
                    topBnrH = $('.topBnrWrap')[0].offsetHeight;
                }
            }
            if($('.topBnrWrap').length > 0){
                if(wSct >= headerH + topBnrH){
                    $(obj).addClass('fixed');
                }else{
                    $(obj).removeClass('fixed');
                }
            }else{
                if(wSct >= headerH){
                    $(obj).addClass('fixed');
                }else{
                    $(obj).removeClass('fixed');
                }
            }
        }).trigger('scroll.scrollHeader');

    });
}


function addrListSct(){
    var el;
    el = $('.addrList');
    if(el.length <= 0){ return; }

    el.each(function(){
        var $addrSctbtn = el.find('> ul > li > .btnx');

        $addrSctbtn.removeClass('on');

        $addrSctbtn.off('click.addrListEvent').on('click.addrListEvent' , function(){
            if( $(this).hasClass('on') ){
                $(this).removeClass('on');
                $(this).addClass('on');
            }else{
                $(this).addClass('on');
                $(this).parent().siblings().find('> .btnx').removeClass('on');
            }
        });
    });
}


function keyword(){
    var el;
    el = $('.rankWrap');
    if(el.length <= 0){ return; }

    var $rankLi = el.find('.rankList > ol > li');
    var $rankLen = $rankLi.length;

    el.each(function(idx, obj){
        el.find('.rankTop > .btnIco').off('click.keywordEvent').on('click.keywordEvent' , function(e){
            e.preventDefault();
            if( $(this).closest(obj).hasClass('on') ){
                $(this).closest(obj).removeClass('on');
                $(this).find('span').text('추천 키워드 내용 열기');
            }else{
                $(this).closest(obj).addClass('on');
                $(this).find('span').text('추천 키워드 내용 닫기');
            }
        });
        bindEvent();
    });

    function bindEvent(){
        var i = 0;
        setRoll = setInterval(function(){
            if(i++ < $rankLen){
                $('.rankRolling').find('a').remove();
                $rankLi.eq(i-1).find('> a').clone().appendTo('.rankRolling');
            }else{
                clearInterval(setRoll);
                bindEvent();
            }
        }, 2500);
    }
}

function topBnr(){    // 메인 탑 배너 추가, 2022-03-08 메인배너관련추가
    var el, el2, el3;
    el = $('.topBnrWrap');
	el2 = $('.mainContBannerArea');
	el3 = $('.bnrPr.typeClose');

    //2022-11-29 document ready 삭제
    el.each(function(idx, obj){
        $(obj).closest('.wrap').addClass('topBnr');
        $(obj).find('.topBnrClose').on('click' , function(e){
            e.preventDefault();
            $(this).closest($(el)).hide();
            $(this).closest('.wrap').removeClass('topBnr');
        });
    });

	el2.each(function(idx, obj){
		$('.bannerBtn .close').on('click' , function(e){
			e.preventDefault();
			$(this).closest($(el2)).hide();
		});
	});

	el3.each(function(idx, obj){    //2022-11-29 추가
		$(obj).find('.bnrPrClose').on('click' , function(e){
            e.preventDefault();
			$(this).closest($(el3)).hide();
		});
	});
}


// 2020-11-10 추가 : 전문가 칼럼 width 850px로 수정으로 인한 이미지 width 100%
function expertViewImgSize(){
	var el;
	el = $('.brdView.expView');


	$(window).on('load' , function(){
		el.find('img').each(function(){
			if($(this).outerWidth() > el.outerWidth()){
				$(this).css({
					'width' : '100%',
					'height' : 'auto'
				})
			}
		});
	});
}

// 2021-02-19 추가 : 숫자 롤링 애니메이션 | 2023-09-20 수정 : notFixed 소수점 두번째 자리 추가
function numberAnimate(){
	var el;
	el = $('.numAni');	//클래스 부여시 롤링

	if(el.length <= 0){ return; }

	el.closest('.tabArea').find('.tab li button').attr('disabled' , 'disabled');

	setTimeout(function(){
		el.closest('.tabArea').find('.tab li button').removeAttr('disabled');
	},900)

	el.each(function(idx, obj){
		var $thisNumber = $(obj).text();
		var commaDel = $thisNumber.replace(/,/g,'');
		$(obj).text(commaDel);

		var countTxt = $(obj).text();

		$({val : 0}).animate({val : countTxt},{
			duration : 800,
			step : function(){
				if($(obj).text().indexOf('.') != -1){
					var num = this.val;
					//$(obj).text(num.toFixed(1));
					if(el.hasClass('notFixed')){
						$(obj).text(num.toFixed(2));
					}else{
						$(obj).text(num.toFixed(1));
					}
				}else{
					var num = numberWithCommas(Math.floor(this.val));
					$(obj).text(num);
				}
			},
			complete : function(){
				if($(obj).text().indexOf('.') != -1){
					var num = this.val;
					//$(obj).text(num.toFixed(1));
					if(el.hasClass('notFixed')){
						$(obj).text(num);
					}else{
						$(obj).text(num.toFixed(1));
					}

				}else{
					var num = numberWithCommas(Math.floor(this.val));
					$(obj).text(num);
				}
			}
		});
		function numberWithCommas(x){
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}
	});
}

//2021-04-30 추가 : soho_info.html
function optionBoxDimmOpen(){
    var el;
    el = $('.optionBox');
    if(el.find('.optionListWrap').length <= 0){ return; }

    el.find('.optionListWrap').each(function(idx, obj){
        $(obj).closest(el).find('.optionBtn').on('click' , function(e){
            e.preventDefault();

            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $(obj).closest(el).removeAttr('style');
            }else{
                $(this).addClass('active');
                $(obj).closest(el).css({"z-index":"100"});
                $('body, html').stop().animate({
                    scrollTop : $(obj).closest(el).offset().top - 50
                });
            }
        });
    });
}

function loanInfoChk(){

    var el = $('.loanAList');

    if(el.length <= 0){ return; }

    el.find('> ul > li').each(function(){
        var $this = $(this).find('.loanListInfo');

        $this.each(function(idx, obj){
            var $loanInfoTxt = $(obj).find('li span').text();

            if(!$loanInfoTxt.replace(/[^0-9]/g, '')){
                if($this.closest('.recomBox').length > 0){
                    $(obj).closest('.recomBox').remove();
                }
                $(obj).remove();
            }
        });
        
        //2023-05-09 추가 : 심의필 없는 경우 태그 remove
        if(!$(this).find('.lawNum').text().length){
            $(this).find('.lawNum').remove();
        }
    });
}

function btnSctFix(){   //2023-07-11 추가 : 버튼 위치에 스크롤 오면 fix 변환
    const $target = $('.btnWrap.scrollEvt');
    const $targetH = $('.btnWrap.scrollEvt').outerHeight(true);

    if($target.length <= 0){ return; }
    
    const $btnTop = $target.offset().top

    $(window).on('scroll', function(){
        let wSct = $(window).scrollTop();

        if(wSct >= $btnTop ){
            $target.addClass('btm');
            $('.wrap').addClass('btm');
        }else{
            $target.removeClass('btm');
            $('.wrap').removeClass('btm');
            
        }
        if($target.hasClass('btm')){
            $target.next().css({
                "padding-top": $targetH
            });
        }else{
            $target.next().removeAttr('style');
        }
    });
}


function anchorScroll(){// 2024-01-08 추가 : 통계 2.0
    // 앵커 (포커스 이동)
    el = $('[data-js-type=anchorMove]');

    if(el.length <= 0){ return; }

    $(el).off('click.anchorScroll').on('click.anchorScroll', function(e){
        e.preventDefault();
        var anchorId = $(this).attr('href'),
          headerFixH = $('.subMenu').outerHeight();

        $('body, html').stop().animate({
            scrollTop : $(anchorId).offset().top - headerFixH
        }, 500);
        $(anchorId).attr('tabindex', 0).focus();
    });
}


function ajaxUICall(){
    tabUI();
    quickTop();
    tooltipUI();
    subMenu();
    formUI();
    accodianUI();
    scrollTab();
    moreCont();
    foldingStep();
    commonSlide();
    imgSlide();
    passSlide();
    reply();
    quantityFn();
    myReplyModify();
    bxEllips();
    focusTabScrolling();
    moveTab();
    selectOpt();
    labListRandom();
    headerGnbFix();
    allMenuOpen();
    addrListSct();
    keyword();
    btnActiveLayer();
	expertViewImgSize();
	numberAnimate();
	optionBoxDimmOpen();
    topBnr();
    btnActive();
    //theSwitch();     개발 요청으로 인해 주석 처리
    //expertSlide();
    loanInfoChk() //2023-04-11 추가
    bnrNumCtrlSlide(); //2023-04-18 추가
    btnSctFix(); //2023-07-11 추가
    anchorScroll() // 2024-01-08 추가 : 통계 2.0
}

$(function(){
    ajaxUICall();
});


$(document).ready(function(){
    if( $("#calendar").length > 0 ){
        // datepicker calendarArea = 오늘 기준 다음날 선택 불가
        $('.calendarArea').datepicker({
            dateFormat: "yy.mm.dd",
            yearSuffix : "년",
            //hideIfNoPrevNext : false,
            prevText: "이전 달",
            nextText: "다음 달",
            maxDate: 0,
            monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
            dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
            showMonthAfterYear: true,
            onChangeMonthYear : function(){
                $(document).off('click').on('click' , '.ui-datepicker-prev, .ui-datepicker-next',function(){
                    var _this = $(this);
                    if(_this.is('.ui-datepicker-prev')){
                        setTimeout(function(){
                            $('.ui-datepicker-prev').focus();
                        })
                    }
                    if(_this.is('.ui-datepicker-next')){
                        setTimeout(function(){
                            $('.ui-datepicker-next').focus();
                        })
                    }
                });
            },
            onSelect : function(){
                setTimeout(function(){
                    $('.ui-state-active').focus();
                });
            },
        });

        // datepicker calendarArea = 오늘 기준 전날 선택 불가
        $('.calendarArea3').datepicker({
            dateFormat: "yy.mm.dd",
            yearSuffix : "년",
            //hideIfNoPrevNext : false,
            prevText: "이전 달",
            nextText: "다음 달",
            minDate: 0,
            monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
            dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
            showMonthAfterYear: true,
            onChangeMonthYear : function(){
                $(document).off('click').on('click' , '.ui-datepicker-prev, .ui-datepicker-next',function(){
                    var _this = $(this);
                    if(_this.is('.ui-datepicker-prev')){
                        setTimeout(function(){
                            $('.ui-datepicker-prev').focus();
                        })
                    }
                    if(_this.is('.ui-datepicker-next')){
                        setTimeout(function(){
                            $('.ui-datepicker-next').focus();
                        })
                    }
                });
            },
            onSelect : function(){
                setTimeout(function(){
                    $('.ui-state-active').focus();
                });
            },
        });
    
        // datepicker calendarArea = 오늘 기준 다음날 선택 가능
        $('.calendarArea2').datepicker({
            dateFormat: "yy.mm.dd",
            //hideIfNoPrevNext : false,
            prevText: "이전 달",
            nextText: "다음 달",
            yearSuffix : "년",
            monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
            dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
            showMonthAfterYear: true,
            onChangeMonthYear : function(){
                $(document).off('click').on('click' , '.ui-datepicker-prev, .ui-datepicker-next',function(){
                    var _this = $(this);
                    if(_this.is('.ui-datepicker-prev')){
                        setTimeout(function(){
                            $('.ui-datepicker-prev').focus();
                        })
                    }
                    if(_this.is('.ui-datepicker-next')){
                        setTimeout(function(){
                            $('.ui-datepicker-next').focus();
                        })
                    }
                });
            },
            onSelect : function(){
                setTimeout(function(){
                    $('.ui-state-active').focus();
                });
            },
        });

        // 앱접근성 관련 이전,다음버튼 focus
        $(".calendarArea, .calendarArea2, .calendarArea3").on("touchend", ".ui-datepicker-prev", function(e){
            if (e.which == 13) {
                $(this).trigger("click");
                $(".ui-datepicker-prev").focus();
            }
        });
        $(".calendarArea, .calendarArea2, .calendarArea3").on("touchend", ".ui-datepicker-next", function(e){
            if (e.which == 13) {
                $(this).trigger("click");
                $(".ui-datepicker-next").focus();
            }
        });
    }
});


// loading
var loadFrame = 0,
      loadTotalFrame = 4;

function loadAni(){
    ( loadFrame == loadTotalFrame ) ? loadFrame = 0 : loadFrame++;
    $(".loading").css({"background-position" : "-" + ( loadFrame * 100 ) + "px"});
    if( true ){
        setTimeout( loadAni, 350 );
    }
}

$(function(){
    setTimeout( loadAni, 350 );
});

// 2024-11-25 추가 s
// 대출관리 - 추가한도 확인
document.addEventListener('DOMContentLoaded', function() {
    const limitGraphBar = document.querySelector('.limitGraph .graph');
    if(limitGraphBar) {
        obServerAnimation(limitGraphBar);
    } else {
        return;
    }
});

function obServerAnimation(obj) {
    const options = {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 1.0, // within view 50%
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active')
            } else {
                entry.target.classList.remove('active')
            }
        });
    }, options);

    observer.observe(obj);
}
// 2024-11-25 추가 e
