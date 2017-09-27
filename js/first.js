import $ from "jquery";
import Popper from "popper.js";

import "bootstrap";
import "bootstrap-switch";
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';

$('.panel__row-description')
  .on('show.bs.collapse', function() {
    let id = $(this).attr('id');
    $('[data-target="#' + id + '"]').parents('.panel__row').addClass('panel__row--expanded show');
  })
  .on('hide.bs.collapse', function() {
    let id = $(this).attr('id');
    $('[data-target="#' + id + '"]').parents('.panel__row').removeClass('panel__row--expanded show');
  })

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
