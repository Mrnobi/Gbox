//REPLACE SVG
$(window).on('load', function() {
    $('.svg').svgToInline();
})


//Toggle menu Mobile
$('.hamburgers').on('click', function(e) {
    e.stopPropagation();
    $('.navigators .navigators__mobile').toggleClass('active');
    $('.hamburgers').toggleClass('clicked');
    $('body').toggleClass('noScroll');
})
$('.navigators__mobile').on('click', function() {
    $('.navigators__mobile').removeClass('active');
    $('.hamburgers').removeClass('clicked');
    $('body').removeClass('noScroll');
})
$('header').on('click', function() {
    $('.hamburgers').removeClass('clicked');
    $('.navigators__mobile').removeClass('active');
    $('body').removeClass('noScroll');
})
//Fixed menu tablet => desktop
window.addEventListener('scroll', function(e) {
    let $scrollTop = window.pageYOffset;
    let $header = $('header').height();
    if($scrollTop > $header){
        $('.navigators').addClass('fixtop');
    }
    else{
        $('.navigators').removeClass('fixtop');
    }
})

//Back To Top
$('footer .backtotop').on('click', function() {
    $('html, body').animate({scrollTop : 0}, 1000);
})

//Validate form footer
function checkEmail(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email);
}
function ValidateForm() {
    let $name = $.trim($('#form-footer #name').val()),
        $phone = $.trim($('#form-footer #phone').val()),
        $email = $.trim($('#form-footer #email').val()),
        $subject = $.trim($('#form-footer #subject').val());
    let flag = false;
        if($name = '' || $name.length < 2){
            $('#form-footer .error-name').text('Vui lòng nhập tên của bạn');
            $('#form-footer #name').focus();
        }
        else{
            $('#form-footer .error-name').text(' ');
            flag = true;
        }
        if($phone == ''){
            $('#form-footer .error-phone').text('Vui lòng nhập số điện thoại của bạn');
            $('#form-footer #phone').focus();
        }
        else if($phone.length !== 10){
            $('#form-footer .error-phone').text('vui lòng nhập đúng số điện thoại');
            $('#form-footer #phone').focus();
        }
        else{
            $('#form-footer .error-phone').text(' ');
            flag = true;
        }
        if($email == ''){
            $('#form-footer .error-email').text('vui lòng nhập Email của bạn');
            $('#form-footer #email').focus();
        }
        else if(!checkEmail($email)){
            $('#form-footer .error-email').text('vui lòng nhập đúng Email của bạn');
            $('#form-footer #email').focus();
        }
        else{
            $('#form-footer .error-email').text(' ');
            flag = true;
        }
        if($subject == ''){
            $('#form-footer .error-subject').text('vui lòng nhập Quốc Tịch của bạn');
            $('#form-footer #subject').focus();
        }
        else{
            $('#form-footer .error-subject').text(' ');
            flag = true;
        }
}
let $Send = $('#form-footer .submit');
$Send.on('click', function() {
    ValidateForm();
})







































//Photo swipe
var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }
            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            showAnimationDuration : 0,
            hideAnimationDuration : 0
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

$(window).load(function () {
    initPhotoSwipeFromDOM('.gallery__list');
    initPhotoSwipeFromDOM('.project__details-image');
  
    $('.Cafe .btn-fullScreen .image').on('click', function() {
       $('.gallery__list-item').eq(0).trigger( "click");
    })
});
$('.project__details .btn-fullScreen .image').on('click', function() {
   console.log(1);
    $('.project__details-image').eq(0).trigger( "click")
  })
