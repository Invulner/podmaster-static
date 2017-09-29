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


$('.selectpicker').selectpicker({
  style: 'btn--white',
  size: 4
});
