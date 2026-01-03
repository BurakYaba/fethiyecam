(function($) {
    "use strict";

    $(document).ready(function () {
        $('div.bt_bb_dropdown').each(function(index, item) {
            var $dropdown = $(item);
            var $select = $dropdown.find('.btDropdownSelect');

            $select.on('change', function(e) {
                var $option = $(this).find(':selected');

                // CHANGE ICON
                var iconHtml = $option.data('icon');
                var $newIcon = $($.parseHTML(iconHtml));

                $dropdown.find('.bt_bb_icon_dropdown .bt_bb_icon_holder').replaceWith($newIcon);

                // CHANGE LINK IN ARROW ICON
                var link = $option.data('link');
                var target = $option.data('target');

                var $linkArrow = $dropdown.find('.bt_bb_arrow_dropdown_inner');
                $linkArrow.attr('href', link);
                $linkArrow.attr('target', target);
            });

            $select.trigger('change');
        });

        $('.bt_bb_dropdown_inner.btNoLink').parents('.bt_bb_dropdown')
            .addClass("bt_bb_no_link")
            .find('.bt_bb_arrow_dropdown_inner').remove();
    });

})(jQuery);
