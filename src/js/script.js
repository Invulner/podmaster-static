// import $ from "l";
//
// import "bootstrap";
// // import "bootstrap-switch";
// import 'bootstrap/js/dist/dropdown';
// import 'bootstrap/js/dist/tooltip';

$('.panel__row-description')
  .on('show.bs.collapse', function() {
    let id = $(this).attr('id');
    $('[data-target="#' + id + '"]').parents('.panel__row').addClass('panel__row--expanded show');
  })
  .on('hide.bs.collapse', function() {
    let id = $(this).attr('id');
    $('[data-target="#' + id + '"]').parents('.panel__row').removeClass('panel__row--expanded show');
  })

$('.panel--collapse .collapse')
  .on('show.bs.collapse', function() {
    $(this).parents('.panel--collapse').addClass('panel--collapse-in');
  })
  .on('hide.bs.collapse', function() {
    $(this).parents('.panel--collapse').removeClass('panel--collapse-in');
  })

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})



function getScrollbar() {
  let doc = $(document);

  $('.scroll-wrap').each(function () {
    let hasClass = $(this).hasClass('scroll-wrap--horizontal'),
        attr = hasClass ? 'width' : 'height',
        course = hasClass ? 'left' : 'top',
        box = $(this).children('.scroll-box'),
        view = $(this).children('.scroll-view'),
        bar = box.children('.scroll-bar'),
        content = view.children('.scroll-content'),
        sizes = {
          content: {
            height: content[0].scrollHeight,
            width: content[0].scrollWidth,
          },
          box: {
            height: box.height(),
            width: box.width(),
          }
        },
        index = sizes.box[attr] / sizes.content[attr],
        sizeBar = sizes.box[attr] * index < 20 ? 20 : sizes.box[attr] * index,
        scrollDistance = sizes.box[attr] - sizeBar;

    bar[attr](sizes.box[attr] > sizeBar ? sizeBar : 0);

    view.scroll(e => bar.css(course, e.target[hasClass ? 'scrollLeft' : 'scrollTop'] * index));

    bar.mousedown(e => {
      let start = e[hasClass ? 'clientX' : 'clientY'],
          positionOld = parceFloat(bar[0].style[course]),
          scrollOld = view[hasClass ? 'scrollLeft' : 'scrollTop']();

      doc.on('selectstart', false)
          .mousemove(e => {

            let distance = e[hasClass ? 'clientX' : 'clientY'] - start,
                positionNew = positionOld + distance;

            bar.css('top', positionNew < 0 ? 0 : positionNew > scrollDistance ? scrollDistance : positionNew);

            view.scrollTop(scrollOld + distance / index)
                .off('scroll', false);
          });
    });

    doc.mouseup(() => doc.off('mousemove').off('selectstart'));
  });
}

getScrollbar();

$(window).resize(getScrollbar)