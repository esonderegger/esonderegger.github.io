
  $('.photoModal').each(function (i) { 
    var photoWidth = parseInt($(this).children('img').attr('width'));
    var photoHeight = parseInt($(this).children('img').attr('height'));
    var modalWidth = photoWidth + 40;
    var modalHeight = photoHeight + 50;
    var marginHo = modalWidth/-2;
    var marginVert = modalHeight/-2;
    $(this).css('width', modalWidth);
    $(this).css('height', modalHeight);
    $(this).css('margin-left', marginHo);
    $(this).css('margin-top', marginVert);
  });
