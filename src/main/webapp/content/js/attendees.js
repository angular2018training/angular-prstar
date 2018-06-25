(function ( $ ) {

    // Plugin definition.
    $.fn.attendees = function(options) {

        // Extend our default options with those provided.
        // Note that the first argument to extend is an empty
        // object – this is to keep from overriding our "defaults" object.
        var opts = $.extend( {}, $.fn.attendees.defaults, options );

        $(this).material_select();

        var that = this;
        var parent = $(that).parent();
        var grantParent = $(that).parent().parent();
        $(grantParent).prepend('<div class="' + opts.classHTML + '"></div>');

        var init = function() {

            var arrayValue = $(that).val();
            $.each(arrayValue, function(index, value ){
                var option = $(that).find('option[value= ' + value + ']');
                var text = $(option).text();
                var icon = $(option).data('icon');
                var val = $(option).val();

                var html = $.fn.attendees.format(val, text, icon);
                $('.' + opts.classHTML + '').append(html);
            })
        };

        var initStyle = function() {
            $(grantParent).css({
                'position': 'relative'
            });

            $(grantParent).find('.' + opts.classHTML + '').css({
                'min-height': '47px'
            });

            $(grantParent).find('.' + opts.classHTML + ' .chip-image').css({
                'margin-top': '8px',
                'margin-right': '3px',
                'margin-bottom': '0',
                'padding-left': '17px',
                'padding-top': '4px',
                'padding-bottom': '4px',
                'line-height': '23px',
            });

            $(grantParent).find('.' + opts.classHTML + ' .chip-image img').css({
                'height': '23px',
                'width': '23px',
            });

            $(parent).css({
                'position': 'absolute',
                'width': '100%',
                'height': '100%',
                'top': '0',
            });

            $(parent).find('.caret').css({
                'display': 'none'
            });

            $(parent).find('input.select-dropdown').css({
                'top': '0',
                'height': '100%',
                'color': 'transparent'
            });            
        };
        
        $('.select-dropdown.dropdown-content li').click(function(){
          
            // clear list
            $('.' + opts.classHTML + '').html('');

            var arrayValue = $(that).val();
            $.each(arrayValue, function(index, value ){
                var option = $(that).find('option[value= ' + value + ']');
                var text = $(option).text();
                var icon = $(option).data('icon');
                var val = $(option).val();

                var html = $.fn.attendees.format(val, text, icon);
                $('.' + opts.classHTML + '').append(html);
            })

            // style
            $(grantParent).find('.' + opts.classHTML + ' .chip-image').css({
                'margin-top': '8px',
                'margin-right': '3px',
                'margin-bottom': '0',
                'padding-left': '17px',
                'padding-top': '4px',
                'padding-bottom': '4px',
                'line-height': '23px',
            });

            $(grantParent).find('.' + opts.classHTML + ' .chip-image img').css({
                'height': '23px',
                'width': '23px',
            });
        })

        init();

        initStyle();
    };

    // Plugin defaults – added as a property on our plugin function.
    $.fn.attendees.format = function(val, text, icon) {
        return '<div class="chip chip-image" data-value="'+ val +'"> ' + text + '<img src="' + icon + '" class="img-fluid"></div></div>';
    };

    $.fn.attendees.defaults = {
        classHTML: "list-attendees",
    };

}( jQuery ));