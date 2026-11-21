(function ($) {
    $(window).load(function() {
        collapsibleMobileMenu('mobile_menu');
    });

    // Mobile Menu Collapse
    function collapsibleMobileMenu(mobileMenuID) {
        // selectors
        const itemHasChildren = '#' + mobileMenuID + ' .menu-item-has-children';
        const itemLink = ' > a';
        const itemCurrent = '.current-menu-item';
        const itemParent = '.current-menu-parent';
        const itemAncestor = '.current-menu-ancestor';

        $(itemHasChildren).each(function () {
            if ($(this).is(itemParent) || $(this).is(itemAncestor) || $(this).is(itemCurrent)) {
                $(this).find(itemLink).after('<a href="#" class="menu-closed menu-open"></a>');
            } else {
                $(this).find(itemLink).after('<a href="#" class="menu-closed"></a>');
                $(this).find(itemLink).next().next('.sub-menu').attr('style', 'display: none !important');
            }
        });

        $(itemHasChildren + itemLink + ' + a').on('click', function (e) {
            e.preventDefault();
            const submenu = $(this).next('.sub-menu');

            $(this).toggleClass('menu-open');

            if (submenu.is(':hidden')) {
                submenu.slideDown(300, function () {
                    submenu.attr('style', 'display: block !important');
                });
            } else {
                submenu.slideUp(300, function () {
                    submenu.attr('style', 'display: none !important');
                });
            }
        });
    }
})(jQuery);