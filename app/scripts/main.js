'use strict';
$(document).ready(function(){
    $('.close').on('click',function(event){
        event.stopPropagation();
        event.preventDefault();
        var parent = $(event.currentTarget).parent();
        parent.fadeOut();
    });
});
