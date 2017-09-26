import $ from "jquery";
import "bootstrap";
import "bootstrap-switch";
import 'bootstrap/js/dist/dropdown';
import Popper from "popper.js";

$('.panel__row-description')
  .on('show.bs.collapse', function() {
    let id = $(this).attr('id');
    $('[data-target="#' + id + '"]').parents('.panel__row').addClass('panel__row--expanded show');
  })
  .on('hide.bs.collapse', function() {
    let id = $(this).attr('id');
    $('[data-target="#' + id + '"]').parents('.panel__row').removeClass('panel__row--expanded show');
  })
