(function ($) {
    // Runs on DOM-ready rather than window-load: none of these functions
    // read image dimensions or other load-dependent state, they only
    // read/rewrite DOM structure, text and attributes that are already
    // present in the server-rendered HTML - waiting for every gallery and
    // addon-option image to finish downloading (window.load) before
    // running them just meant visitors sat looking at the raw, unstyled
    // WooCommerce/WPC markup for however long that took.
    $(function() {
        try {
            collapsibleMobileMenu('mobile_menu');
            buildHeaderUtilityBar();
            initNavActivePill();
            addProductAttributeIcons();
            initProductGallerySlider();
            simplifyMainProductSection();
            relocateAttributesIntoTabs();
            buildAddonCardTiles();
            initOrderSummaryAndFloatingBar();
            buildInsulationCompareSection();
            buildAddonCardsV2();
            buildCartPageLayout();
            // .it: buildCheckoutOrderReview(); not used (see build-it-theme.ts)
            // .it: addBankDetailsButton(); not used (see build-it-theme.ts)
            // .it: initCheckoutOrderSuccessPopup(); not used (see build-it-theme.ts)
            alignOrderDetailsAddonRows();
            // .it: initVatIdSync(); not used (see build-it-theme.ts)
        } finally {
            // Runs even if one of the calls above throws, so a bug in any
            // single enhancement can never leave the page permanently
            // hidden behind the CSS below - it just skips whatever didn't
            // get a chance to run.
            document.body.classList.add('lepton-ready');
        }
    });
    // Independent of the handler above - guarantees the page becomes
    // visible even in the (unexpected) case that the ready handler itself
    // never fires or hangs before reaching the try/finally.
    setTimeout(function () {
        document.body.classList.add('lepton-ready');
    }, 3000);

    // Several full-width sections (custom-cta, tabs, addons) all get spliced
    // in right after the same gallery/title row. Each call to this helper
    // inserts after whichever one landed there most recently (tracked on the
    // row itself), so the final page order always matches call order here -
    // instead of every section independently doing $row.after(...) and only
    // the LAST one to run actually ending up right after the row.
    function insertFullWidthSectionAfterRow($row, $section) {
        var $anchor = $row.data('lepton-last-section') || $row;
        $section.insertAfter($anchor);
        $row.data('lepton-last-section', $section);
    }

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

    // --- Lepton: global header utility bar (phone/hours, search, Contact
    // Us / Callback buttons, account + cart icons) - sits above the existing
    // category nav, which is restyled separately via CSS (teal background +
    // highlighted "New 2026" item). Runs on every page, not just products.
    function buildHeaderUtilityBar() {
        var $logoModule = $('.et_pb_fullwidth_image').first();
        if (!$logoModule.length || $logoModule.data('lepton-header-init')) {
            return;
        }
        $logoModule.data('lepton-header-init', true);

        // The Divi "Fullwidth Image" module used for the logo has no link
        // configured on it at all (confirmed: a bare <img>, no wrapping <a>
        // in the server-rendered markup) - clicking it does nothing, which
        // isn't a deliberate design choice, just a module that was never
        // given a destination URL.
        var $logoImg = $logoModule.find('img').first();
        if ($logoImg.length && !$logoImg.closest('a').length) {
            $logoImg.wrap('<a href="/" aria-label="Home page"></a>');
        }

        var svgAttrs = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
        var searchIcon = '<svg ' + svgAttrs + '><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
        var accountIcon = '<svg ' + svgAttrs + '><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6"/></svg>';
        var cartIcon = '<svg ' + svgAttrs + '><circle cx="9" cy="21" r="1.4" fill="currentColor" stroke="none"/><circle cx="18" cy="21" r="1.4" fill="currentColor" stroke="none"/><path d="M3 4h2l2.4 12.2a2 2 0 002 1.8h8.2a2 2 0 002-1.8L21 8H6"/></svg>';

        var $utility = $(
            '<div class="lepton-header-utility">' +
            '<div class="lepton-header-phone">' +
            '<a href="tel:+37064507954" class="lepton-header-phone-number">+370 645 07954</a>' +
            '<span class="lepton-header-hours"><span class="lepton-hours-dot"></span>Aperto 09:00-18:00, lun-ven</span>' +
            '</div>' +
            '<form class="lepton-header-search" role="search" method="get" action="/">' +
            '<input type="search" name="s" placeholder="Cerca prodotti" autocomplete="off">' +
            '<input type="hidden" name="post_type" value="product">' +
            '<button type="submit" aria-label="Cerca">' + searchIcon + '</button>' +
            '</form>' +
            '<div class="lepton-header-actions">' +
            '<a href="/contact-us/" class="lepton-header-btn lepton-header-btn-contact">Contattaci</a>' +
            '<a href="mailto:gianluca@ideaswood.eu?subject=Richiesta%20di%20richiamata" class="lepton-header-btn lepton-header-btn-callback">Richiamami</a>' +
            '<a href="/my-account/" class="lepton-header-icon" aria-label="Il mio account">' + accountIcon + '</a>' +
            '<a href="/cart/" class="lepton-header-icon lepton-header-cart" aria-label="Carrello">' + cartIcon +
            '<span class="lepton-header-cart-count">0</span></a>' +
            '</div>' +
            '</div>'
        );

        $logoModule.wrap('<div class="lepton-header-top"></div>');
        $logoModule.after($utility);

        function refreshHeaderCartCount() {
            // A plain GET to this endpoint gets served a stale cached
            // response (confirmed: same URL keeps returning an empty cart
            // long after items were added) - the cache-busting query param
            // plus cache: 'no-store' is required to actually reach a fresh
            // read of the real session cart.
            fetch('/wp-json/wc/store/v1/cart?_=' + Date.now(), { credentials: 'same-origin', cache: 'no-store' })
                .then(function (r) { return r.json(); })
                .then(function (cart) {
                    $utility.find('.lepton-header-cart-count').text(cart.items_count || 0);
                })
                .catch(function () {});
        }
        refreshHeaderCartCount();

        // Refetch after any AJAX add-to-cart (shop/category "Add to cart"
        // buttons, and cart/checkout quantity updates) - without this the
        // count freezes at whatever it was on page load, since it's never
        // otherwise re-read.
        $(document.body).on('added_to_cart wc_fragments_refreshed wc_fragments_loaded', refreshHeaderCartCount);

        $utility.find('.lepton-header-btn-callback').on('click', function () {
            // Opens the site's existing "Request a callback" popup (post ID
            // 5571, slug "request-a-callback") - a real, already-in-use
            // popup that used to embed the generic "Your Query" contact
            // form; its embedded form was swapped to the dedicated "Request
            // a Call Back" form instead. Uses the underlying jQuery plugin
            // method directly rather than window.PUM.open(id) - the latter
            // silently no-ops on a bare numeric ID in the installed Popup
            // Maker version (confirmed: PUM.open(5571) does nothing, while
            // $('#pum-5571').popmake('open') opens it correctly).
            // .it: plain mailto link, no popup
        });
    }

    // --- Lepton: the pill highlight on the category nav is not fixed to one
    // item - it starts on whichever page you're actually on (WordPress's own
    // current-menu-item/current-menu-ancestor classes, set server-side), and
    // immediately jumps to whichever item you click, for instant feedback
    // ahead of the page navigating there.
    function initNavActivePill() {
        var $items = $('#menu-pagrindinis > li, #mobile_menu1 li');

        // The pill is drawn around a wrapper span sized to just the link
        // text, not the <a> itself - Divi's own top-level menu links carry a
        // large reserved bottom padding (for a hover-underline effect) that
        // isn't visible normally, but turns into a misshapen blob once an
        // outline/border-radius gets drawn around the whole link box.
        // Wrapping the text keeps the <a>'s own box (and therefore every
        // other item's position) completely untouched.
        $items.find('> a').each(function () {
            var $a = $(this);
            if ($a.data('lepton-label-wrapped')) {
                return;
            }
            $a.data('lepton-label-wrapped', true);
            $a.wrapInner('<span class="lepton-nav-label"></span>');
        });

        $items.filter(
            '.current-menu-item, .current-menu-ancestor, .current_page_item, .current_page_ancestor'
        ).addClass('lepton-nav-active');

        $items.find('> a').on('click', function () {
            $items.removeClass('lepton-nav-active');
            $(this).closest('li').addClass('lepton-nav-active');
        });
    }

    // Product attribute icons - matches the "attribute_{slug}" class WooCommerce
    // adds to each row (e.g. "woocommerce-product-attributes-item--attribute_number-of-rooms")
    // so the same keyword works whether units are metric or imperial (only the
    // trailing unit suffix in the class differs). Icons are custom-built SVG line
    // icons (not a third-party icon set) using currentColor, so a single CSS rule
    // controls the color (matches the site's existing brand teal #4CB52D).
    const svgAttrs = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
    // Every key here is visually distinct - no two attributes share an icon.
    const wcpaIcons = {
        'footprint': '<rect x="4" y="4" width="16" height="16" rx="1" stroke-dasharray="3 2.5"/>',
        'width': '<path d="M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l4 4"/>',
        'area': '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M9 15l-3 3m0 0v-3m0 3h3"/><path d="M15 9l3-3m0 0v3m0-3h-3"/>',
        'height': '<path d="M12 3v18M12 3l-4 4M12 3l4 4M12 21l-4-4M12 21l4-4"/>',
        'roof_overhang': '<path d="M5 17l7-11 7 11"/><line x1="2" y1="17" x2="6.5" y2="17"/><line x1="17.5" y1="17" x2="22" y2="17"/>',
        'roof_area': '<path d="M4 15l8-9 8 9"/><rect x="9" y="15" width="6" height="6"/>',
        'roof_thickness': '<path d="M4 17l8-10 8 10"/><line x1="6.5" y1="14" x2="17.5" y2="14"/><line x1="8" y1="11" x2="16" y2="11"/>',
        'wall_height': '<line x1="6" y1="3" x2="6" y2="21"/><line x1="4" y1="3" x2="8" y2="3"/><line x1="4" y1="21" x2="8" y2="21"/><rect x="12" y="6" width="8" height="15"/>',
        'wall': '<rect x="3" y="4" width="8" height="4"/><rect x="13" y="4" width="8" height="4"/><rect x="3" y="10" width="4" height="4"/><rect x="9" y="10" width="8" height="4"/><rect x="19" y="10" width="2" height="4"/><rect x="3" y="16" width="8" height="4"/><rect x="13" y="16" width="8" height="4"/>',
        'layers': '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>',
        'doors_count': '<rect x="3" y="4" width="7" height="16" rx="1"/><rect x="14" y="4" width="7" height="16" rx="1"/><circle cx="8" cy="12" r="0.9" fill="currentColor"/><circle cx="19" cy="12" r="0.9" fill="currentColor"/>',
        'door_style': '<rect x="6" y="3" width="12" height="18" rx="1"/><line x1="6" y1="10" x2="18" y2="10"/><circle cx="15" cy="14.5" r="1" fill="currentColor"/>',
        'door_dims': '<rect x="8" y="5" width="9" height="15"/><path d="M3 5v15M3 5h2.5M3 20h2.5"/><path d="M8 2h9M8 2v2.5M17 2v2.5"/>',
        'windows_count': '<rect x="3" y="5" width="7" height="7"/><line x1="6.5" y1="5" x2="6.5" y2="12"/><line x1="3" y1="8.5" x2="10" y2="8.5"/><rect x="14" y="5" width="7" height="7"/><line x1="17.5" y1="5" x2="17.5" y2="12"/><line x1="14" y1="8.5" x2="21" y2="8.5"/>',
        'window_style': '<path d="M4 21V10a8 8 0 0116 0v11"/><line x1="4" y1="21" x2="20" y2="21"/><line x1="12" y1="4.5" x2="12" y2="21"/><line x1="4" y1="13" x2="20" y2="13"/>',
        'window_dims': '<rect x="7" y="5" width="10" height="14"/><line x1="12" y1="5" x2="12" y2="19"/><line x1="7" y1="12" x2="17" y2="12"/><path d="M3 5v14M3 5h2M3 19h2"/><path d="M7 2h10M7 2v2M17 2v2"/>',
        'glazing': '<rect x="4" y="4" width="16" height="16" rx="1"/><line x1="7" y1="17" x2="17" y2="7"/>',
        'bed': '<path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6"/><path d="M3 18v2M21 18v2"/><path d="M3 12V9a2 2 0 012-2h4a2 2 0 012 2v3"/>',
        'warranty': '<path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
        'balcony': '<rect x="3" y="14" width="18" height="7"/><line x1="6" y1="14" x2="6" y2="10"/><line x1="10" y1="14" x2="10" y2="10"/><line x1="14" y1="14" x2="14" y2="10"/><line x1="18" y1="14" x2="18" y2="10"/><line x1="3" y1="10" x2="21" y2="10"/>',
        'terrace': '<rect x="3" y="6" width="18" height="12" rx="1"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/>',
        'shutter': '<rect x="5" y="3" width="14" height="18" rx="1"/><line x1="5" y1="7.5" x2="19" y2="7.5"/><line x1="5" y1="12" x2="19" y2="12"/><line x1="5" y1="16.5" x2="19" y2="16.5"/>',
        'wall_thickness': '<rect x="10" y="3" width="4" height="18"/><path d="M2 12h6M8 12l-2.5-2.5M8 12l-2.5 2.5"/><path d="M22 12h-6M16 12l2.5-2.5M16 12l2.5 2.5"/>'
    };
    const wcpaIconMap = [
        ['base-footprint', 'footprint'],
        ['building-width-x-length', 'width'],
        ['internal-area', 'area'],
        ['building-height', 'height'],
        ['roof-overhang', 'roof_overhang'],
        ['roof-area', 'roof_area'],
        ['roof-boards-thickness', 'roof_thickness'],
        ['side-wall-height', 'wall_height'],
        ['external-wall-area', 'wall'],
        ['floor-boards-thickness', 'layers'],
        ['number-of-doors', 'doors_count'],
        ['doors-type', 'door_style'],
        ['doors-width-x-height', 'door_dims'],
        ['number-of-windows', 'windows_count'],
        ['windows-type', 'window_style'],
        ['windows-width-x-height', 'window_dims'],
        ['type-of-window-and-door-glazing', 'glazing'],
        ['number-of-rooms', 'bed'],
        ['warranty', 'warranty'],
        ['balconies-surface', 'balcony'],
        ['terraces-surface', 'terrace'],
        ['shutters', 'shutter']
    ];

    function addProductAttributeIcons() {
        $('.woocommerce-product-attributes-item').each(function () {
            const $row = $(this);
            const $label = $row.find('.woocommerce-product-attributes-item__label');
            if (!$label.length || $label.find('.wcpa-attr-icon').length) {
                return;
            }
            const classes = $row.attr('class') || '';
            let iconKey = 'footprint';
            for (let i = 0; i < wcpaIconMap.length; i++) {
                if (classes.indexOf('attribute_' + wcpaIconMap[i][0]) !== -1) {
                    iconKey = wcpaIconMap[i][1];
                    break;
                }
            }
            const svg = '<svg ' + svgAttrs + '>' + wcpaIcons[iconKey] + '</svg>';
            $label.prepend('<span class="wcpa-attr-icon" aria-hidden="true">' + svg + '</span>');
        });
    }

    // --- Lepton: a handful of key specs (with icons, reusing the same icon
    // set as the attributes table) shown in the center of the floating bar.
    // Values are read straight out of the real (already-relocated)
    // attributes table rather than duplicated/hardcoded, so they always
    // match whatever's actually on the page.
    const FLOATING_BAR_SPECS = [
        ['internal-area', 'area'],
        ['wall-thickness', 'wall_thickness'],
        ['number-of-rooms', 'bed'],
        ['side-wall-height', 'wall_height']
    ];

    function buildFloatingBarSpecs() {
        var $wrap = $('<div class="lepton-floating-specs"></div>');
        FLOATING_BAR_SPECS.forEach(function (spec) {
            var substr = spec[0], iconKey = spec[1];
            var $row = $('.woocommerce-product-attributes-item').filter(function () {
                var cls = $(this).attr('class') || '';
                // plain substring match (not "attribute_" + substr) - some
                // attribute slugs carry an extra unexpected prefix (e.g.
                // "attribute_pa_wall-thickness" instead of
                // "attribute_wall-thickness"), so anchoring right after
                // "attribute_" misses them.
                return cls.indexOf(substr) !== -1;
            }).first();
            if (!$row.length) {
                return;
            }
            var fullLabel = $row.find('.woocommerce-product-attributes-item__label').text().trim();
            var rawValue = $row.find('.woocommerce-product-attributes-item__value').text().trim();
            if (!rawValue) {
                return;
            }
            var shortLabel = fullLabel.replace(/\s*\([^)]*\)\s*$/, '').trim();
            var unitMatch = fullLabel.match(/\(([^)]+)\)\s*$/);
            var unit = unitMatch ? unitMatch[1] : '';
            var displayValue = (unit && rawValue.indexOf(unit) === -1) ? (rawValue + ' ' + unit) : rawValue;

            var svg = '<svg ' + svgAttrs + '>' + wcpaIcons[iconKey] + '</svg>';
            var $item = $('<div class="lepton-floating-spec"></div>').attr('title', shortLabel);
            $item.append($('<span class="lepton-floating-spec-icon"></span>').html(svg));
            var $text = $('<span class="lepton-floating-spec-text"></span>');
            $text.append($('<span class="lepton-floating-spec-label"></span>').text(shortLabel));
            $text.append($('<span class="lepton-floating-spec-value"></span>').text(displayValue));
            $item.append($text);
            $wrap.append($item);
        });
        return $wrap.children().length ? $wrap : null;
    }

    // --- Lepton: product gallery slider ---
    function initProductGallerySlider() {
        $('.woocommerce-product-gallery').each(function () {
            var $original = $(this);
            if ($original.data('lepton-slider-init')) {
                return;
            }
            $original.data('lepton-slider-init', true);

            var $images = $original.find('.woocommerce-product-gallery__image');
            if ($images.length < 2) {
                // Fewer than 2 photos isn't worth a slider, but the CSS
                // unconditionally hides the original gallery to make room
                // for the replacement - without this, a single-image (or
                // placeholder-only) product would show no image at all.
                $original.addClass('lepton-gallery-kept');
                return;
            }

            var $main = $('<div class="lepton-gallery-main"></div>');
            var $track = $('<div class="lepton-gallery-track"></div>');
            var $prevBtn = $('<button type="button" class="lepton-gallery-arrow lepton-gallery-prev" aria-label="Previous images">&#8249;</button>');
            var $nextBtn = $('<button type="button" class="lepton-gallery-arrow lepton-gallery-next" aria-label="Next images">&#8250;</button>');
            var $thumbsRow = $('<div class="lepton-gallery-thumbs"></div>');
            var $slider = $('<div class="lepton-gallery"></div>');

            $images.each(function (i) {
                var $img = $(this).find('img').first();
                var fullSrc = $img.attr('data-large_image') || $img.attr('src');
                var thumbSrc = $img.attr('src');
                var alt = $img.attr('alt') || '';

                if (i === 0) {
                    $main.append($('<img>').attr({ src: fullSrc, srcset: $img.attr('data-full-srcset') || null, sizes: $img.attr('data-full-srcset') ? '(max-width: 980px) 100vw, 980px' : null, alt: alt, width: $img.attr('data-large_image_width') || null, height: $img.attr('data-large_image_height') || null }));
                }

                var $thumb = $('<img>').addClass('lepton-gallery-thumb').attr({
                    src: thumbSrc,
                    width: $img.attr('width') || null,
                    height: $img.attr('height') || null,
                    'data-full': fullSrc,
                    'data-full-srcset': $img.attr('data-full-srcset') || null,
                    alt: alt
                });
                if (i === 0) {
                    $thumb.addClass('active');
                }
                $track.append($thumb);
            });

            $thumbsRow.append($prevBtn, $track, $nextBtn);
            $slider.append($main, $thumbsRow);
            $original.after($slider);

            $track.on('click', '.lepton-gallery-thumb', function () {
                $track.find('.lepton-gallery-thumb').removeClass('active');
                $(this).addClass('active');
                $main.find('img').attr({ src: $(this).attr('data-full'), srcset: $(this).attr('data-full-srcset') || null });
            });

            $prevBtn.on('click', function () {
                $track[0].scrollLeft -= 220;
            });
            $nextBtn.on('click', function () {
                $track[0].scrollLeft += 220;
            });
        });
    }


    // --- Lepton: addon card tiles, order summary header, floating bar ---
    // Placeholder used for every addon option image until real photos are
    // supplied - a plain neutral swatch, not a network request.
    var LEPTON_PLACEHOLDER_IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="70">' +
        '<rect width="100" height="70" fill="%23f0f0f0"/>' +
        '<text x="50" y="39" font-size="10" fill="%23aaaaaa" text-anchor="middle" font-family="sans-serif">nessuna immagine</text>' +
        '</svg>'
    );

    function parseAddonOptionText(text) {
        var m = text.match(/^(.*?)\s*\(\$\s*([\d,]+)\)\s*$/);
        if (m) {
            return { label: m[1].trim(), price: m[2] };
        }
        return { label: text.trim(), price: null };
    }

    function buildAddonCardTiles() {
        $('.wcpa_section').each(function () {
            var $section = $(this);
            var $select = $section.find('select.wcpa_field').first();
            if (!$select.length || $select.hasClass('lepton-tiled')) {
                return;
            }
            $select.addClass('lepton-tiled');

            var $title = $section.find('.wcpa_sec_title').first();
            if ($select.prop('required') && $title.length && !$title.find('.wcpa-required-mark').length) {
                $title.append('<span class="wcpa-required-mark">*</span>');
            }

            var $tiles = $('<div class="lepton-addon-tiles"></div>');
            $select.find('option').each(function () {
                var $opt = $(this);
                var parsed = parseAddonOptionText($opt.text());
                var $tile = $('<div class="lepton-addon-tile"></div>').attr('data-value', $opt.attr('value'));
                $tile.append($('<img>').attr({ src: LEPTON_PLACEHOLDER_IMG, alt: parsed.label }));
                $tile.append($('<div class="lepton-tile-label"></div>').text(parsed.label));
                $tile.append($('<div class="lepton-tile-price"></div>').text(parsed.price ? ('+$' + parsed.price) : ''));
                if ($opt.is(':selected')) {
                    $tile.addClass('selected');
                }
                $tiles.append($tile);
            });
            $select.after($tiles);

            $tiles.on('click', '.lepton-addon-tile', function () {
                var value = $(this).attr('data-value');
                $select.val(value).trigger('change');
            });

            $select.on('change', function () {
                var value = $select.val();
                $tiles.find('.lepton-addon-tile').removeClass('selected');
                $tiles.find('.lepton-addon-tile[data-value="' + value + '"]').addClass('selected');
            });
        });
    }

    function buildOrderSummary($container, isFloating) {
        var $realQty = $('form.cart input.qty').first();
        var $realSubmit = $('form.cart .single_add_to_cart_button').first();
        if (!$realQty.length || !$realSubmit.length) {
            return null;
        }

        var $price = $('<span class="lepton-order-price"></span>');
        var $stepper = $(
            '<div class="lepton-qty-stepper">' +
            '<button type="button" class="lepton-qty-minus" aria-label="Decrease quantity">&#8722;</button>' +
            '<input type="number" class="lepton-qty-input" min="1" step="1">' +
            '<button type="button" class="lepton-qty-plus" aria-label="Increase quantity">+</button>' +
            '</div>'
        );
        var $addToCartBtn = $('<button type="button" class="lepton-add-to-cart-btn">Aggiungi al carrello</button>');

        var $summary = $('<div class="lepton-order-summary"></div>');
        $summary.append($price, $stepper, $addToCartBtn);
        $container.append($summary);

        var $qtyInput = $stepper.find('.lepton-qty-input');
        $qtyInput.val($realQty.val() || 1);

        $stepper.find('.lepton-qty-minus').on('click', function () {
            var v = Math.max(1, (parseInt($qtyInput.val(), 10) || 1) - 1);
            $qtyInput.val(v);
            $realQty.val(v).trigger('change');
        });
        $stepper.find('.lepton-qty-plus').on('click', function () {
            var v = (parseInt($qtyInput.val(), 10) || 1) + 1;
            $qtyInput.val(v);
            $realQty.val(v).trigger('change');
        });
        $qtyInput.on('change', function () {
            var v = Math.max(1, parseInt($qtyInput.val(), 10) || 1);
            $qtyInput.val(v);
            $realQty.val(v).trigger('change');
        });
        $realQty.on('change', function () {
            $qtyInput.val($realQty.val());
        });

        $addToCartBtn.on('click', function () {
            $realSubmit.trigger('click');
        });

        return { $price: $price };
    }

    function watchLiveTotal(mirrors) {
        var $realTotal = $('.wcpa_total .wcpa_price_outer').first();
        if (!$realTotal.length) {
            return;
        }
        function sync() {
            var text = $realTotal.text().replace(/\s+/g, ' ').trim();
            mirrors.forEach(function (m) {
                if (m && m.$price) {
                    m.$price.text(text);
                }
            });
        }
        sync();
        var observer = new MutationObserver(sync);
        observer.observe($realTotal[0], { characterData: true, childList: true, subtree: true });
    }

    // --- Lepton: addon cards v2 - collapsible cards, plain-text radio
    // options on the left, one dynamic preview image on the right, and a
    // per-card lightbox modal (photo/description tabs + mirrored options +
    // live price). One modal DOM instance is shared across all cards; on
    // open, the card's real .wcpa_field_wrap (options + native price
    // display) is RELOCATED (not cloned) into it, then relocated back to
    // its original spot on close - the plugin's price recalculation only
    // reacts to genuine events on its own real radio inputs, so those
    // nodes must never be duplicated, only moved.
    var LEPTON_CHEVRON_SVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var LEPTON_ZOOM_SVG = '<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    var LEPTON_CLOSE_SVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

    // --- Lepton: addon "Product description" copy, sourced from the
    // Ideaswood catalog's Optional products / Windows and doors pages.
    // Keyed by the exact addon section title as rendered by the WPC
    // plugin. Sections with no matching key fall back to the "coming
    // soon" placeholder - a few addons (Installation kit, Construction
    // work, Metal window sills kit outside, Metal roof flashings kit for
    // bitumen shingles epdm) have no dedicated catalog page yet.
    var LEPTON_ADDON_DESCRIPTIONS = {
        'Bitumen roof shingles': 'Le tegole bituminose sono una soluzione di copertura versatile ed economica, che si adatta facilmente a diverse forme e pendenze del tetto. Questo materiale tradizionale resta molto diffuso per l\'ottimo rapporto qualità-prezzo e per una protezione duratura con poca manutenzione.',
        'Underlayer for bitumen shingles': 'Questo sottostrato è realizzato in bitume modificato con polimeri SBS e ha un\'anima di rinforzo in fibra di vetro, con superficie sabbiata o antracite. È consigliato sotto le tegole bituminose e offre una protezione affidabile durante e dopo la posa del tetto.',
        'Impregnation': 'Questo trattamento impregnante è un rivestimento per legno a base olio o acqua, pensato per il trattamento industriale degli elementi in legno, soprattutto per uso esterno. Protegge le parti in legno della casa, offre un\'ottima resistenza agli agenti atmosferici e regola l\'umidità riducendo il rigonfiamento e il ritiro del legno.',
        'Metal roofing tile vena': 'La copertura metallica Vena è una soluzione resistente e leggera che riproduce l\'aspetto delle tegole tradizionali. È compatibile con i sistemi di tetto isolato per ottime prestazioni termiche.',
        'Metal roofing seam panel phr revolution': 'La copertura metallica Revolution Seam Panel è una soluzione resistente, moderna e leggera, ispirata ai sistemi a giunto tradizionali. Le nervature a doppio trapezio aggiungono resistenza, rigidità e un aspetto senza tempo, adatto sia a edifici residenziali sia commerciali.',
        'Raingutters system': 'Il sistema di grondaie allontana l\'acqua piovana dal tetto, dalle pareti e dalle fondazioni, aiutando a prevenire danni, erosione e accumulo di umidità. È particolarmente consigliato nelle zone con piogge frequenti: protegge facciata, porte, finestre e fondazioni e migliora la durata dell\'edificio.',
        'Cladding boards painting for walls insulation': 'La verniciatura industriale delle perline utilizza attrezzature automatiche professionali per applicare vernici o impregnanti resistenti. Questo metodo riduce il rischio di difetti superficiali e aumenta la durata della finitura.',
        'External wooden doors and windows painting': 'La verniciatura in fabbrica per finestre e porte Premium e Premium Plus è un servizio che fa risparmiare tempo e denaro, eseguito con vernici industriali di alta qualità per elementi esterni. La verniciatura non è disponibile per finestre e porte di qualità Standard.',
        'Floor insulation kit pile foundation': 'Kit di isolamento adatto a fondazioni su pali. Per garantire la stabilità strutturale e proteggere il materiale isolante, il sistema comprende uno strato di truciolare e uno strato aggiuntivo di travetti del pavimento.',
        'Floor insulation kit slab foundation': 'Kit di isolamento adatto a fondazioni a platea: non servono travetti aggiuntivi né strati di truciolare.',
        'Roof insulation kit': 'Kit di isolamento posato sotto la copertura del tetto: aggiunge uno strato di lana di roccia sopra le travi, con membrana traspirante e intercapedine d\'aria, e un pannello di base adatto alla copertura scelta, per una posa stabile e ben ventilata.',
        'Wall insulation kit horizontal t g cladding': 'Isolamento delle pareti rifinito con perline orizzontali maschio-femmina, posate su membrana traspirante e listelli in legno, per un aspetto pulito e tradizionale.',
        'Wall insulation kit vertical t g cladding': 'Isolamento delle pareti rifinito con perline verticali maschio-femmina. Questa versione comprende un ulteriore strato di listelli orizzontali per una maggiore rigidità.',
        'Construction work': {
            image: null,
            sections: [
                {
                    heading: 'Cosa comprende il prezzo del servizio di montaggio',
                    text: 'Il prezzo del servizio di montaggio comprende l\'assemblaggio della casetta (pareti, pavimento, tavole del tetto, finestre, porte, serrature e relativa ferramenta) e la posa del materiale di copertura offerto sul nostro sito (o molto simile).'
                },
                {
                    heading: 'Servizio di alta qualità',
                    text: 'Collaboriamo con montatori professionisti molto esperti nell\'installazione di casette in legno, garage e posti auto coperti. Sono disponibili anche per servizi extra, come la realizzazione della base, grondaie, impianti idraulici ed elettrici, verniciatura e altri lavori edili, a un prezzo aggiuntivo competitivo.'
                },
                {
                    heading: 'Servizio immediato',
                    text: 'Dopo l\'ordine del servizio di montaggio, il nostro team vi contatterà per organizzare l\'installazione prima della consegna della casetta. Di solito la squadra arriva poco dopo la consegna.'
                }
            ]
        }
    };

    function ensureAddonModal() {
        if (window.LEPTON_ADDON_MODAL) {
            return window.LEPTON_ADDON_MODAL;
        }
        var $overlay = $(
            '<div class="lepton-addon-modal-overlay">' +
            '<div class="lepton-addon-modal">' +
            '<button type="button" class="lepton-addon-modal-close" aria-label="Chiudi">' + LEPTON_CLOSE_SVG + '</button>' +
            '<div class="lepton-addon-modal-photo">' +
            '<div class="lepton-addon-modal-tabs">' +
            '<button type="button" class="lepton-addon-modal-tab-btn lepton-tab-active" data-tab="photo">Foto del prodotto</button>' +
            '<button type="button" class="lepton-addon-modal-tab-btn" data-tab="description">Descrizione del prodotto</button>' +
            '</div>' +
            '<div class="lepton-addon-modal-tab-panel lepton-tab-active" data-panel="photo">' +
            '<div class="lepton-addon-modal-photo-img-wrap">' +
            '<span class="lepton-addon-modal-photo-empty">Nessuna immagine</span>' +
            '<img alt="">' +
            '</div>' +
            '</div>' +
            '<div class="lepton-addon-modal-tab-panel" data-panel="description">' +
            '<div class="lepton-addon-modal-description-content"></div>' +
            '</div>' +
            '</div>' +
            '<div class="lepton-addon-modal-options">' +
            '<h3 class="lepton-addon-modal-title"></h3>' +
            '<div class="lepton-addon-modal-options-slot"></div>' +
            '<button type="button" class="lepton-addon-modal-add-btn">+ Aggiungi al carrello</button>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        $('body').append($overlay);

        $overlay.on('click', function (e) {
            if (e.target === this) {
                closeAddonModal();
            }
        });
        $overlay.find('.lepton-addon-modal-close, .lepton-addon-modal-add-btn').on('click', function () {
            closeAddonModal();
        });
        $overlay.find('.lepton-addon-modal-tab-btn').on('click', function () {
            var tab = $(this).attr('data-tab');
            $overlay.find('.lepton-addon-modal-tab-btn').removeClass('lepton-tab-active');
            $(this).addClass('lepton-tab-active');
            $overlay.find('.lepton-addon-modal-tab-panel').removeClass('lepton-tab-active');
            $overlay.find('.lepton-addon-modal-tab-panel[data-panel="' + tab + '"]').addClass('lepton-tab-active');
        });

        window.LEPTON_ADDON_MODAL = {
            $overlay: $overlay,
            $wrap: null,
            $homeAnchor: null,
            syncPhoto: function (sel) {
                var $imgWrap = $overlay.find('.lepton-addon-modal-photo-img-wrap');
                var $img = $imgWrap.find('img');
                if (sel && sel.img) {
                    $img.attr('src', sel.img).attr('alt', sel.text);
                    $imgWrap.addClass('lepton-has-image');
                } else {
                    $img.attr('src', '');
                    $imgWrap.removeClass('lepton-has-image');
                }
            }
        };
        return window.LEPTON_ADDON_MODAL;
    }

    function openAddonModal(titleText, $wrap, getSelection) {
        var modal = ensureAddonModal();
        var $overlay = modal.$overlay;

        if (modal.$wrap && modal.$homeAnchor) {
            modal.$homeAnchor.after(modal.$wrap);
            modal.$homeAnchor.remove();
        }

        var $anchor = $('<span class="lepton-addon-home-anchor" style="display:none"></span>');
        $wrap.before($anchor);
        modal.$wrap = $wrap;
        modal.$homeAnchor = $anchor;

        $overlay.find('.lepton-addon-modal-title').text(titleText);
        $overlay.find('.lepton-addon-modal-options-slot').empty().append($wrap);
        modal.syncPhoto(getSelection());

        var description = LEPTON_ADDON_DESCRIPTIONS[titleText];
        var $descContent = $overlay.find('.lepton-addon-modal-description-content').empty();
        if (!description) {
            $descContent.append($('<p class="lepton-tab-panel-placeholder"></p>').text('Descrizione del prodotto in arrivo.'));
        } else if (typeof description === 'string') {
            $descContent.append($('<p></p>').text(description));
        } else {
            if (description.image) {
                $descContent.append($('<img class="lepton-addon-modal-description-img">').attr('src', description.image));
            }
            description.sections.forEach(function (sec) {
                $descContent.append(
                    $('<h4></h4>').text(sec.heading),
                    $('<p></p>').text(sec.text)
                );
            });
        }

        $overlay.find('.lepton-addon-modal-tab-btn[data-tab="photo"]').trigger('click');
        $overlay.addClass('lepton-modal-visible');
        $('body').addClass('lepton-modal-open');
    }

    function closeAddonModal() {
        var modal = window.LEPTON_ADDON_MODAL;
        if (!modal) {
            return;
        }
        modal.$overlay.removeClass('lepton-modal-visible');
        $('body').removeClass('lepton-modal-open');
        if (modal.$wrap && modal.$homeAnchor) {
            modal.$homeAnchor.after(modal.$wrap);
            modal.$homeAnchor.remove();
            modal.$wrap = null;
            modal.$homeAnchor = null;
        }
    }

    // A handful of addon forms carry leftover .wcpa_section entries with
    // zero fields at all inside them (confirmed directly - some stray
    // section shell from however the form was originally built/edited).
    // These have no .wcpa_section_head AND no field content, so they used
    // to just sit there as a bare, empty box with nothing to click - not
    // something buildAddonCardsV2 ever touches, since it only looks at
    // .wcpa_field_wrap elements, not bare sections. Removing any section
    // whose body has no field wraps at all before cards get built, so
    // stray empty ones never render as a blank line for any product.
    function removeEmptyAddonSections() {
        $('.wcpa_section').each(function () {
            var $section = $(this);
            if ($section.data('lepton-emptycheck-init')) {
                return;
            }
            $section.data('lepton-emptycheck-init', true);
            if (!$section.find('.wcpa_field_wrap').length) {
                $section.remove();
            }
        });
    }

    function buildAddonCardsV2() {
        removeEmptyAddonSections();
        $('.wcpa_field_wrap.wcpa_type_image-group').each(function () {
            var $wrap = $(this);
            if ($wrap.data('lepton-v2-init')) {
                return;
            }
            $wrap.data('lepton-v2-init', true);

            var $section = $wrap.closest('.wcpa_section');
            var $head = $section.find('.wcpa_section_head').first();
            var titleText;
            if ($head.length) {
                titleText = $head.find('.wcpa_sec_title').first().text().trim();
            } else {
                // WCPA only renders .wcpa_section_head when the field's own
                // "show_title" option is on - with it off, NOTHING exists to
                // click to open/close this section, so it stays permanently
                // collapsed behind .wcpa_section_body's default
                // display:none (CSS expects a click on the missing head to
                // add .lepton-card-open). Pull the title from the field's
                // own legend instead and build an equivalent header so the
                // section is still reachable.
                titleText = $wrap.find('.wcpa_field_label').first().text().trim();
                $head = $('<div class="wcpa_section_head"><span class="wcpa_sec_title"></span></div>');
                $head.find('.wcpa_sec_title').text(titleText);
                $section.prepend($head);
            }

            var $summary = $('<span class="lepton-card-summary"></span>');
            var $chevron = $('<span class="lepton-card-chevron">' + LEPTON_CHEVRON_SVG + '</span>');
            $head.append($summary, $chevron);
            $head.on('click', function () {
                $section.toggleClass('lepton-card-open');
            });

            var $preview = $(
                '<div class="lepton-card-preview">' +
                '<span class="lepton-card-preview-empty">Nessuna immagine</span>' +
                '<img alt="">' +
                '<button type="button" class="lepton-card-zoom" aria-label="Zoom photo">' + LEPTON_ZOOM_SVG + '</button>' +
                '</div>'
            );
            $wrap.after($preview);
            var $previewImg = $preview.find('img');

            function currentSelection() {
                var $checked = $wrap.find('input[type="radio"]:checked').first();
                if (!$checked.length) {
                    return null;
                }
                var $row = $checked.closest('.wcpa_image');
                var img = $row.find('.wcpa_img_wrap img').attr('src');
                var text = $row.find('.wcpa_image_label').text().replace(/\s+/g, ' ').trim();
                return { img: img, text: text, $row: $row };
            }

            function updateSelectionUI() {
                var sel = currentSelection();
                $wrap.find('.wcpa_image').removeClass('lepton-option-checked');
                if (!sel) {
                    $summary.text('');
                    $preview.removeClass('lepton-has-image');
                    $previewImg.attr('src', '');
                } else {
                    sel.$row.addClass('lepton-option-checked');
                    $summary.text(sel.text);
                    if (!sel.img) {
                        $preview.removeClass('lepton-has-image');
                        $previewImg.attr('src', '');
                    } else {
                        $previewImg.attr('src', sel.img).attr('alt', sel.text);
                        $preview.addClass('lepton-has-image');
                    }
                }
                var modal = window.LEPTON_ADDON_MODAL;
                if (modal && modal.$wrap && modal.$wrap[0] === $wrap[0]) {
                    modal.syncPhoto(sel);
                }
            }

            $wrap.on('change', 'input[type="radio"]', updateSelectionUI);
            updateSelectionUI();

            $preview.find('.lepton-card-zoom').on('click', function (e) {
                e.stopPropagation();
                openAddonModal(titleText, $wrap, currentSelection);
            });
        });
    }

    // --- Lepton: cart page redesign - each cart line item becomes a
    // centered card (300x300 product photo, title, price/qty, then an
    // "Articoli aggiuntivi" list with a 75x75 photo per chosen addon). Real
    // interactive elements (remove link, qty input) are RELOCATED into the
    // new card, never cloned, so WooCommerce's own AJAX update/remove
    // handlers (bound to these exact nodes) keep working unmodified. A "No"
    // selection is not a real add-on choice - those rows (and the whole
    // "Articoli aggiuntivi" heading, if nothing is left) are omitted entirely,
    // even for a field that's required on the product form.
    function formatCartCurrency(symbol, amount) {
        var rounded = Math.round(amount * 100) / 100;
        var isWhole = Math.abs(rounded - Math.round(rounded)) < 0.001;
        return symbol + ' ' + (isWhole
            ? Math.round(rounded).toLocaleString('it-IT')
            : rounded.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }

    function buildCartPageLayout() {
        var $table = $('table.shop_table.cart, .woocommerce-cart-form table.cart').first();
        if (!$table.length) {
            return;
        }
        if (!window.LEPTON_CART_REBUILD_BOUND) {
            window.LEPTON_CART_REBUILD_BOUND = true;
            // WooCommerce's own "Update cart" / remove-item AJAX replaces
            // the ENTIRE cart form content with fresh server HTML (verified
            // directly - not a partial patch of just the price cells), which
            // wipes out every card built so far. The fresh rows have none of
            // the "already built" markers, so simply re-running the builder
            // rebuilds cards for them correctly.
            $(document.body).on('updated_cart_totals', function () {
                buildCartPageLayout();
            });
            // No manual "Update cart" button in this design - a quantity
            // change auto-submits after a short debounce (so rapid clicks on
            // a number spinner don't fire a request per click) by triggering
            // the real button's own click, reusing WooCommerce's exact
            // existing AJAX submission logic rather than reimplementing it.
            var autoUpdateTimer = null;
            var autoUpdateSafetyTimer = null;
            $(document).on('change input', '.woocommerce-cart-form .cart_item input.qty', function () {
                clearTimeout(autoUpdateTimer);
                autoUpdateTimer = setTimeout(function () {
                    // The real update is a server round-trip (typically a
                    // couple of seconds on this host, not something a
                    // shorter debounce can fix) - this class dims the cards
                    // and shows a spinner for that stretch so it reads as
                    // "working", not frozen. It clears itself naturally: a
                    // successful update replaces the whole cart form (this
                    // element included) with fresh markup. The safety timer
                    // is only a fallback for a failed/hung request, so the
                    // UI can never get stuck dimmed forever.
                    $('.woocommerce-cart-form').addClass('lepton-cart-updating');
                    clearTimeout(autoUpdateSafetyTimer);
                    autoUpdateSafetyTimer = setTimeout(function () {
                        $('.woocommerce-cart-form').removeClass('lepton-cart-updating');
                    }, 10000);
                    $('button[name="update_cart"]').prop('disabled', false).trigger('click');
                }, 200);
            });
        }
        // The header row (Product/Price/Quantity/Subtotal) and the native
        // "Update cart" button's row are hidden, not removed - the button
        // and its nonce/referer hidden fields stay in the DOM and still
        // submit correctly via the auto-update trigger above.
        $table.find('thead').addClass('lepton-cart-hidden-row');
        var $actionsRow = $table.find('button[name="update_cart"]').closest('tr');
        $actionsRow.addClass('lepton-cart-hidden-row');

        // "Continua gli acquisti" link to the shop page, right below "Proceed
        // to checkout" - reuses that button's exact classes so it matches
        // its styling/size automatically instead of duplicating CSS.
        var $checkoutBtn = $('.wc-proceed-to-checkout a.checkout-button').first();
        if ($checkoutBtn.length && !$('.lepton-continue-shopping-btn').length) {
            $checkoutBtn.after(
                $('<a></a>')
                    .attr('href', '/shop/')
                    .addClass($checkoutBtn.attr('class') + ' lepton-continue-shopping-btn')
                    .text('Continua gli acquisti')
            );
        }

        if ($table.data('lepton-cart-init')) {
            return;
        }
        $table.data('lepton-cart-init', true);

        $table.find('tr.cart_item').each(function () {
            var $row = $(this);
            if ($row.data('lepton-card-built')) {
                return;
            }
            $row.data('lepton-card-built', true);

            var $thumbImg = $row.find('.product-thumbnail img').first();
            var $nameLink = $row.find('.product-name > a').first();
            var $removeLink = $row.find('.product-remove a.remove').first();
            var $qtyWrap = $row.find('.product-quantity .quantity').first();
            var $priceCell = $row.find('.product-price').first();
            var subtotalHtml = $row.find('.product-subtotal').first().html();

            // WooCommerce's own per-unit price cell for a line item with
            // paid addons is already addon-inclusive (base + every chosen
            // option) - showing that SAME number again next to the qty
            // stepper made the breakdown below look like it wasn't being
            // added anywhere. Subtracting the addon total back out gives the
            // bare per-unit product price; both it and every addon price
            // below are then scaled by the current quantity, so the card
            // reads as a real breakdown that sums to Totale articolo at any qty
            // (e.g. quantity doubled -> every price shown here doubles too).
            var qty = parseInt($qtyWrap.find('input.qty').val(), 10) || 1;
            var inclusiveUnitPrice = parseFloat($priceCell.text().replace(/[^\d.]/g, '')) || 0;
            var addonUnitTotal = 0;
            $row.find('.wcpa_cart_meta_item .price_value').each(function () {
                addonUnitTotal += parseFloat($(this).text().replace(/[^\d.]/g, '')) || 0;
            });
            var baseUnitPrice = inclusiveUnitPrice - addonUnitTotal;
            var currencySymbol = $priceCell.find('.woocommerce-Price-currencySymbol').first().text() || '€';
            var basePriceDisplay = formatCartCurrency(currencySymbol, baseUnitPrice * qty);

            var $addonsList = $('<div class="lepton-cart-addons-list"></div>');
            $row.find('.wcpa_cart_meta_item').each(function () {
                var $li = $(this);
                var label = $li.find('.wcpa_cart_meta_item-label').first().text().replace(/:\s*$/, '').trim();
                var $valueP = $li.find('.wcpa_cart_meta_item-value p').first();
                var selectionText = $valueP.find('span').first().text().trim();
                if (!selectionText || /^no$/i.test(selectionText)) {
                    return;
                }
                var img = $valueP.find('img').attr('data-src') || $valueP.find('img').attr('src') || '';
                var addonUnitPrice = parseFloat($valueP.find('.price_value').first().text().replace(/[^\d.]/g, '')) || 0;
                var $addonRow = $(
                    '<div class="lepton-cart-addon-row">' +
                    '<img class="lepton-cart-addon-img" alt="">' +
                    '<div class="lepton-cart-addon-text">' +
                    '<p class="lepton-cart-addon-label"></p>' +
                    '<p class="lepton-cart-addon-choice"></p>' +
                    '</div>' +
                    '<span class="lepton-cart-addon-price"></span>' +
                    '</div>'
                );
                $addonRow.find('.lepton-cart-addon-img').attr('src', img);
                $addonRow.find('.lepton-cart-addon-label').text(label);
                $addonRow.find('.lepton-cart-addon-choice').text(selectionText);
                $addonRow.find('.lepton-cart-addon-price').text(formatCartCurrency(currencySymbol, addonUnitPrice * qty));
                $addonsList.append($addonRow);
            });

            var $card = $(
                '<div class="lepton-cart-card">' +
                '<div class="lepton-cart-card-media"><img class="lepton-cart-card-img" alt=""></div>' +
                '<div class="lepton-cart-card-body">' +
                '<div class="lepton-cart-card-remove"></div>' +
                '<p class="lepton-cart-card-title"></p>' +
                '<div class="lepton-cart-card-price-row">' +
                '<span class="lepton-cart-card-price"></span>' +
                '<div class="lepton-cart-card-qty"></div>' +
                '</div>' +
                '<p class="lepton-cart-addons-heading">Articoli aggiuntivi</p>' +
                '<div class="lepton-cart-addons-slot"></div>' +
                '<div class="lepton-cart-card-total-row">' +
                '<span>Totale articolo</span>' +
                '<span class="lepton-cart-card-total"></span>' +
                '</div>' +
                '</div>' +
                '</div>'
            );

            $card.find('.lepton-cart-card-img').attr('src', $thumbImg.attr('src')).attr('alt', $thumbImg.attr('alt') || '');
            $card.find('.lepton-cart-card-title').text($nameLink.text());
            $card.find('.lepton-cart-card-price').text(basePriceDisplay);
            $card.find('.lepton-cart-card-total').html(subtotalHtml || '');

            if ($removeLink.length) {
                $card.find('.lepton-cart-card-remove').append($removeLink);
            }
            if ($qtyWrap.length) {
                $card.find('.lepton-cart-card-qty').append($qtyWrap);
            }
            if ($addonsList.children().length) {
                $card.find('.lepton-cart-addons-slot').append($addonsList);
            } else {
                $card.find('.lepton-cart-addons-heading').remove();
            }

            $row.addClass('lepton-cart-row-hidden');
            // "cart_item" is kept on this new row (in addition to its own
            // class) even though it's not a real cart-item row - WooCommerce's
            // own core cart.js enables the "Update cart" button via a
            // delegated listener scoped to ".woocommerce-cart-form .cart_item
            // :input" (change/input). The relocated qty input's nearest
            // .cart_item ancestor used to be the now-hidden original row;
            // once moved here, that delegated selector stops matching at all
            // unless this row carries the class too - confirmed by reading
            // cart.min.js directly, not a guess.
            var $cardRow = $('<tr class="lepton-cart-card-row cart_item"><td colspan="6"></td></tr>');
            $cardRow.find('td').append($card);
            $row.after($cardRow);
        });
    }

    // --- Lepton: checkout "Your Order" redesign. Only real addon
    // selections are shown (never "No"), each row (the product itself and
    // every chosen addon) gets its own name+image / qty / price columns,
    // and the main product photo (200x200) is added - the native template
    // never included one at all. Driven by the WooCommerce Store API cart
    // endpoint rather than scraping the classic wcpa_cart_meta markup,
    // since it already returns clean structured addon data (label/price/
    // image) per item - BUT a plain GET to that endpoint is served a stale
    // cached response on this host (confirmed directly: same URL kept
    // returning an empty cart long after real items were added), so every
    // call below is cache-busted.
    // The Store API's item_data.sectionName/key come back HTML-entity-
    // encoded (e.g. a section literally named "Windows & doors" arrives as
    // "Windows &amp; doors") - .text() sets textContent directly and never
    // decodes entities, so without this the raw "&amp;" showed up on the
    // page verbatim instead of a real "&".
    function decodeHtmlEntities(str) {
        var $tmp = $('<textarea></textarea>').html(str);
        return $tmp.text();
    }

    function parseAddonEntry(rawValue) {
        try {
            var parsed = JSON.parse(rawValue);
            var entry = Array.isArray(parsed) ? parsed[0] : Object.values(parsed)[0];
            return entry || null;
        } catch (e) {
            return null;
        }
    }

    function buildCheckoutOrderReview() {
        var $table = $('.woocommerce-checkout-review-order-table').first();
        if (!$table.length) {
            return;
        }
        if (!window.LEPTON_CHECKOUT_REBUILD_BOUND) {
            window.LEPTON_CHECKOUT_REBUILD_BOUND = true;
            // WooCommerce replaces #order_review's content wholesale after
            // any checkout AJAX update (shipping, coupon, payment method) -
            // same "rebuild from scratch" approach as the cart page's own
            // updated_cart_totals handling.
            $(document.body).on('updated_checkout', function () {
                buildCheckoutOrderReview();
                addBankDetailsButton();
            });
        }
        fetch('/wp-json/wc/store/v1/cart?_=' + Date.now(), { credentials: 'same-origin', cache: 'no-store' })
            .then(function (r) { return r.json(); })
            .then(function (cart) {
                renderCheckoutOrderReview($table, cart);
            })
            .catch(function () {});
    }

    function renderCheckoutOrderReview($table, cart) {
        var $rows = $table.find('tbody tr.cart_item');
        if ($rows.length !== cart.items.length) {
            // Data source and DOM are momentarily out of sync (e.g. an
            // in-flight AJAX update) - skip this pass rather than risk
            // mismatched pairing; the next rebuild will retry.
            return;
        }
        $table.find('thead').addClass('lepton-checkout-hidden-row');

        $rows.each(function (i) {
            var $row = $(this);
            var item = cart.items[i];
            var symbol = item.prices.currency_symbol || '€';
            var qty = item.quantity;

            var basePriceTotal = (parseFloat(item.prices.regular_price) || 0) * qty;
            var mainImg = (item.images && item.images[0])
                ? (item.images[0].thumbnail || item.images[0].src) : '';

            var $block = $('<div class="lepton-checkout-item"></div>');
            var $productRow = $(
                '<div class="lepton-checkout-product-row">' +
                '<div class="lepton-checkout-product-info">' +
                '<img class="lepton-checkout-product-img" alt="">' +
                '<span class="lepton-checkout-product-name"></span>' +
                '</div>' +
                '<div class="lepton-checkout-qty-col"></div>' +
                '<div class="lepton-checkout-price-col"></div>' +
                '</div>'
            );
            $productRow.find('.lepton-checkout-product-img').attr('src', mainImg);
            $productRow.find('.lepton-checkout-product-name').text(item.name);
            $productRow.find('.lepton-checkout-qty-col').text(qty);
            $productRow.find('.lepton-checkout-price-col').text(formatCartCurrency(symbol, basePriceTotal));
            $block.append($productRow);

            (item.item_data || []).forEach(function (data) {
                var label = null, price = 0, image = '';
                var entry = data.rawValue ? parseAddonEntry(data.rawValue) : null;
                if (entry) {
                    label = entry.label;
                    price = parseFloat(entry.price) || 0;
                    image = entry.image || '';
                } else if (data.value) {
                    // Fallback for an addon type with no rawValue - value
                    // looks like "Label (&#36; 1,234)" or "No (&#36; 0)".
                    var text = $('<div>').html(data.value).text();
                    // A currency symbol can sit after the digits too (e.g.
                    // "658 €" before the closing paren), not just before.
                    var m = text.match(/^(.*?)\s*\(\s*[^\d\-]*([\d,.]+)\s*[^\d\-)]*\)?\s*$/);
                    label = m ? m[1].trim() : text.trim();
                    price = m ? (parseFloat(m[2].replace(/,/g, '')) || 0) : 0;
                }
                if (!label || /^no$/i.test(label.trim())) {
                    return;
                }
                var addonPriceTotal = price * qty;
                var $addonRow = $(
                    '<div class="lepton-checkout-addon-row">' +
                    '<div class="lepton-checkout-addon-info">' +
                    '<span class="lepton-checkout-addon-label"></span>' +
                    '<img class="lepton-checkout-addon-img" alt="">' +
                    '</div>' +
                    '<div class="lepton-checkout-qty-col"></div>' +
                    '<div class="lepton-checkout-price-col"></div>' +
                    '</div>'
                );
                $addonRow.find('.lepton-checkout-addon-label').text(decodeHtmlEntities(data.sectionName || data.key || ''));
                if (image) {
                    $addonRow.find('.lepton-checkout-addon-img').attr('src', image);
                } else {
                    // Not every addon field type carries image data in the
                    // Store API's item_data (e.g. a plain dropdown/select
                    // field, unlike an image-group field) - an <img> with no
                    // real src just renders as a broken-image icon, so it's
                    // removed entirely rather than left pointing at nothing.
                    $addonRow.find('.lepton-checkout-addon-img').remove();
                }
                $addonRow.find('.lepton-checkout-qty-col').text(qty);
                $addonRow.find('.lepton-checkout-price-col').text(formatCartCurrency(symbol, addonPriceTotal));
                $block.append($addonRow);
            });

            var $nameCell = $row.find('td.product-name');
            // A table with auto layout keeps column 2's width consistent
            // across thead/tbody/tfoot even after td.product-total is
            // hidden here (tfoot's own Subtotal/Total cells still use that
            // column) - product-name never actually reclaims that space on
            // its own, so its content falls short of the table's true
            // right edge. colspan=2 merges it into column 2 directly,
            // confirmed to fix the misalignment.
            $nameCell.attr('colspan', 2);
            if (!$row.data('lepton-checkout-native-hidden')) {
                $row.data('lepton-checkout-native-hidden', true);
                $nameCell.wrapInner('<div class="lepton-checkout-native-hidden"></div>');
            }
            $nameCell.find('.lepton-checkout-item, .lepton-checkout-header-row').remove();
            if (i === 0) {
                // Column headers for the qty/price columns, once at the top -
                // same grid as every row below it, so they line up exactly.
                $nameCell.append(
                    '<div class="lepton-checkout-header-row">' +
                    '<div></div>' +
                    '<div class="lepton-checkout-qty-col">QTÀ</div>' +
                    '<div class="lepton-checkout-price-col">Prezzo</div>' +
                    '</div>'
                );
            }
            $nameCell.append($block);
            $row.addClass('lepton-checkout-row-processed');
        });

        insertVatRow($table, cart);
    }

    function insertVatRow($table, cart) {
        var $subtotalRow = $table.find('tfoot tr.cart-subtotal').first();
        if (!$subtotalRow.length) {
            return;
        }
        var symbol = (cart.totals && cart.totals.currency_symbol) || '$';
        $table.find('tfoot tr.lepton-vat-row').remove();
        var $vatRow = $(
            '<tr class="lepton-vat-row"><th>VAT included.</th><td></td></tr>'
        );
        $vatRow.find('td').text(formatCartCurrency(symbol, 0));
        $subtotalRow.after($vatRow);
    }

    // Placeholder values only - the user will supply the real Wise/bank
    // account details later, at which point these get replaced (structure
    // stays the same, so no further redesign is needed then).
    var LEPTON_BANK_DETAILS = {
        accountName: 'To be confirmed',
        bankName: 'To be confirmed',
        accountNumber: 'To be confirmed',
        swift: 'To be confirmed'
    };

    function ensureBankModal() {
        if (window.LEPTON_BANK_MODAL) {
            return window.LEPTON_BANK_MODAL;
        }
        var $overlay = $(
            '<div class="lepton-bank-modal-overlay">' +
            '<div class="lepton-bank-modal">' +
            '<button type="button" class="lepton-bank-modal-close" aria-label="Chiudi">' + LEPTON_CLOSE_SVG + '</button>' +
            '<h3 class="lepton-bank-modal-title">Bank Account Details</h3>' +
            '<dl class="lepton-bank-modal-list">' +
            '<dt>Account name</dt><dd data-field="accountName"></dd>' +
            '<dt>Bank name</dt><dd data-field="bankName"></dd>' +
            '<dt>Account number / IBAN</dt><dd data-field="accountNumber"></dd>' +
            '<dt>SWIFT / BIC</dt><dd data-field="swift"></dd>' +
            '</dl>' +
            '</div>' +
            '</div>'
        );
        $('body').append($overlay);
        Object.keys(LEPTON_BANK_DETAILS).forEach(function (key) {
            $overlay.find('[data-field="' + key + '"]').text(LEPTON_BANK_DETAILS[key]);
        });
        $overlay.on('click', function (e) {
            if (e.target === this) {
                closeBankModal();
            }
        });
        $overlay.find('.lepton-bank-modal-close').on('click', closeBankModal);
        window.LEPTON_BANK_MODAL = $overlay;
        return $overlay;
    }

    function openBankModal() {
        ensureBankModal().addClass('lepton-modal-open');
    }

    function closeBankModal() {
        if (window.LEPTON_BANK_MODAL) {
            window.LEPTON_BANK_MODAL.removeClass('lepton-modal-open');
        }
    }

    function addBankDetailsButton() {
        var $placeOrderBtn = $('#place_order').first();
        if (!$placeOrderBtn.length || $('.lepton-place-order-row').length) {
            return;
        }
        var $wrap = $('<div class="lepton-place-order-row"></div>');
        $placeOrderBtn.before($wrap);
        $wrap.append($placeOrderBtn);
        // Same classes as the real Place order button, so it picks up the
        // exact same theme styling automatically instead of duplicating it.
        var $bankBtn = $('<button type="button"></button>')
            .attr('class', $placeOrderBtn.attr('class') + ' lepton-bank-details-btn')
            .text('Seek Bank Account Details');
        $bankBtn.on('click', function (e) {
            e.preventDefault();
            openBankModal();
        });
        $wrap.append($bankBtn);
    }

    // --- Lepton: order-success popup instead of redirecting straight to
    // the native thank-you page. checkout_place_order_success is
    // WooCommerce core's own documented extension point for this - it
    // fires on document.body right before the post-order redirect, and
    // returning false from a handler bound to it (jQuery triggerHandler
    // semantics) tells checkout.js to skip that redirect entirely, no core
    // file changes needed. Only bank transfer is active today, so there's
    // no off-site payment step this could ever interrupt - when Stripe/
    // PayPal are added, whichever of those needs a real redirect (3D
    // Secure, PayPal approval, etc.) will need its own thank-you page
    // built and this handler scoped to skip it for those gateways.
    function ensureOrderSuccessModal() {
        if (window.LEPTON_ORDER_SUCCESS_MODAL) {
            return window.LEPTON_ORDER_SUCCESS_MODAL;
        }
        var $overlay = $(
            '<div class="lepton-order-success-overlay">' +
            '<div class="lepton-order-success-modal">' +
            '<p class="lepton-order-success-text"></p>' +
            '<button type="button" class="button alt lepton-order-success-close">OK</button>' +
            '</div>' +
            '</div>'
        );
        $('body').append($overlay);

        function goToDashboard() {
            window.location = '/my-account/';
        }
        $overlay.on('click', function (e) {
            if (e.target === this) {
                goToDashboard();
            }
        });
        $overlay.find('.lepton-order-success-close').on('click', goToDashboard);

        window.LEPTON_ORDER_SUCCESS_MODAL = $overlay;
        return $overlay;
    }

    function initCheckoutOrderSuccessPopup() {
        // WooCommerce core (checkout.js) fires this event on form.checkout
        // itself via $form.triggerHandler(...) - NOT on document.body.
        // triggerHandler(), unlike trigger(), never bubbles to ancestor
        // elements, so a handler bound to document.body is never actually
        // reached (confirmed directly by reading the live checkout.js on
        // this site - a real order placement never showed the popup until
        // this was fixed to bind on the same element WooCommerce uses).
        var $form = $('form.checkout');
        if (!$form.length || window.LEPTON_ORDER_SUCCESS_BOUND) {
            return;
        }
        window.LEPTON_ORDER_SUCCESS_BOUND = true;

        $form.on('checkout_place_order_success', function (e, result) {
            var orderId = '';
            if (result && result.redirect) {
                var m = String(result.redirect).match(/order-received\/(\d+)/);
                if (m) {
                    orderId = m[1];
                }
            }
            var $modal = ensureOrderSuccessModal();
            $modal.find('.lepton-order-success-text').text(
                'Thanks for Trusting in Ideaswood. Your order #' + orderId + ' is confirmed. ' +
                'Our correspondent will contact you after the confirmation of payment'
            );
            $modal.addClass('lepton-modal-open');
            return false;
        });
    }

    // --- Lepton: order-details addon rows (order-received/thank-you page,
    // My Account order view) - native WooCommerce markup packs title,
    // image and spec/price text into one plain <p> with no wrapper to
    // hook clean alignment onto (confirmed directly by reading
    // wc_display_item_meta() in WooCommerce core: <li><strong>Label:</strong>
    // <p>[img] Spec ($price)</p></li>, image and text as bare siblings).
    // Rebuilds each into the same image/text/price row style already used
    // on the cart page, rather than trying to force alignment via CSS
    // alone. This does NOT touch the PDF invoice at all - completely
    // separate template/rendering path.
    function alignOrderDetailsAddonRows() {
        var $table = $('.woocommerce-table--order-details').first();
        if (!$table.length || $table.data('lepton-addons-aligned')) {
            return;
        }
        $table.data('lepton-addons-aligned', true);

        $table.find('.wc-item-meta li').each(function () {
            var $li = $(this);
            var label = $li.find('.wc-item-meta-label').first().text().replace(/:\s*$/, '').trim();
            var $p = $li.find('p').first();
            if (!$p.length) {
                return;
            }
            var img = $p.find('img').first().attr('src') || '';
            var $textOnly = $p.clone();
            $textOnly.find('img').remove();
            var specPriceText = $textOnly.text().replace(/\s+/g, ' ').trim();

            // Same "Label (price)" split already used elsewhere in this
            // file (checkout/cart parsing) - spec text and price are one
            // string here too (e.g. "Black ($ 918)").
            var spec = specPriceText;
            var price = '';
            var m = specPriceText.match(/^(.*?)\s*(\([^)]*\))\s*$/);
            if (m) {
                spec = m[1].trim();
                price = m[2].trim();
            }

            var $row = $(
                '<div class="lepton-order-addon-row">' +
                '<img class="lepton-order-addon-img" alt="">' +
                '<div class="lepton-order-addon-text">' +
                '<p class="lepton-order-addon-label"></p>' +
                '<p class="lepton-order-addon-spec"></p>' +
                '</div>' +
                '<span class="lepton-order-addon-price"></span>' +
                '</div>'
            );
            $row.find('.lepton-order-addon-img').attr('src', img);
            $row.find('.lepton-order-addon-label').text(label);
            $row.find('.lepton-order-addon-spec').text(spec);
            $row.find('.lepton-order-addon-price').text(price);

            $li.empty().append($row);
        });
    }

    // --- Lepton: insulated-vs-non-insulated comparison section - full
    // width, spliced in right after the gallery row and before the
    // specs/tabs section. Data-driven, not a hardcoded product-id list:
    // shown only when the product's OWN addon form actually has a
    // floor/wall/roof insulation-kit section (every such column name
    // contains "insulation kit", per ADDON_ORDER in csv_import.py), so it
    // automatically applies to any current or future product with these
    // addons and never shows on one without them. Content/images are
    // generic marketing copy sourced from the Ideaswood catalog (Optional
    // products / Insulation kits pages) - the same 3 slides regardless of
    // which qualifying product is being viewed.
    function productHasInsulationKitAddons() {
        var found = false;
        $('.wcpa_sec_title').each(function () {
            if (/insulation kit/i.test($(this).text())) {
                found = true;
            }
        });
        return found;
    }

    function buildInsulationCompareSection() {
        if (!productHasInsulationKitAddons()) {
            return;
        }

        var $galleryModule = $('.et_pb_wc_images').first();
        if (!$galleryModule.length) {
            return;
        }
        var $row = $galleryModule.closest('.et_pb_row');
        if (!$row.length || $row.data('lepton-inscompare-init')) {
            return;
        }
        $row.data('lepton-inscompare-init', true);

        // A slide is either a single topic ({title, subtitle, caption, img})
        // or a multi-variant topic ({title, variants: [{label, caption, img}, ...]})
        // - e.g. floor insulation covers both pile and slab foundations on
        // one slide, each with its own image/caption, instead of splitting
        // across two separate slides.
        var slides = [
            {
                title: 'Isolamento del pavimento',
                variants: [
                    {
                        label: 'Fondazione su pali',
                        img: 'https://ideaswood.com/wp-content/uploads/crop_pile_test2.png',
                        caption: 'Kit di isolamento per fondazioni su pali. Per la stabilità strutturale e la protezione dell\'isolante, comprende uno strato di truciolare e uno strato aggiuntivo di travetti.'
                    },
                    {
                        label: 'Fondazione a platea',
                        img: 'https://ideaswood.com/wp-content/uploads/crop_slab_test.png',
                        caption: 'Kit di isolamento per fondazioni a platea: non servono travetti aggiuntivi né truciolare.'
                    }
                ]
            },
            {
                title: 'Isolamento delle pareti',
                variants: [
                    {
                        label: 'Perline orizzontali',
                        img: 'https://ideaswood.com/wp-content/uploads/crop_wallh_test2.png',
                        caption: 'Isolamento delle pareti rifinito con perline orizzontali maschio-femmina, su membrana traspirante e listelli in legno, per un aspetto pulito e tradizionale.'
                    },
                    {
                        label: 'Perline verticali',
                        img: 'https://ideaswood.com/wp-content/uploads/crop_wallv_test2.png',
                        caption: 'Isolamento delle pareti rifinito con perline verticali maschio-femmina, con un ulteriore strato di listelli orizzontali per una maggiore rigidità.'
                    }
                ]
            },
            {
                title: 'Isolamento del tetto',
                variants: [
                    {
                        label: 'Tegole bituminose / EPDM',
                        img: 'https://ideaswood.com/wp-content/uploads/crop_roofbit_test2.png',
                        caption: 'Per tegole bituminose o EPDM, uno strato di pannelli OSB offre una base solida e stabile per la corretta posa della copertura.'
                    },
                    {
                        label: 'Copertura metallica',
                        img: 'https://ideaswood.com/wp-content/uploads/crop_roofmetal_test.png',
                        caption: 'Per le coperture metalliche si usa un listellato al posto dell\'OSB, per garantire la ventilazione e la corretta posa.'
                    }
                ]
            }
        ];

        var $title = $('<h3 class="lepton-inscompare-title"></h3>');
        var $body = $('<div class="lepton-inscompare-body"></div>');
        var $textCol = $('<div class="lepton-inscompare-text"></div>')
            .append($title, $body);

        var $track = $('<div class="lepton-inscompare-track"></div>');
        slides.forEach(function (slide, i) {
            var $slide = $('<div class="lepton-inscompare-slide"></div>').toggleClass('active', i === 0);
            if (slide.variants) {
                var $subgrid = $('<div class="lepton-inscompare-subgrid"></div>');
                slide.variants.forEach(function (v) {
                    $subgrid.append(
                        $('<div class="lepton-inscompare-subitem"></div>')
                            .append($('<img>').attr({ src: v.img, alt: v.label }))
                            .append($('<span class="lepton-inscompare-sublabel"></span>').text(v.label))
                    );
                });
                $slide.append($subgrid);
            } else {
                $slide.append($('<img>').attr({ src: slide.img, alt: '' }));
            }
            $track.append($slide);
        });
        var $sliderCol = $('<div class="lepton-inscompare-slider"></div>').append($track);

        var $section = $('<div class="lepton-inscompare-fullwidth"></div>')
            .append($('<div class="lepton-inscompare-grid"></div>').append($textCol, $sliderCol));

        insertFullWidthSectionAfterRow($row, $section);

        var current = 0;
        var timer = null;

        function renderBody(slide) {
            $body.empty();
            if (slide.variants) {
                slide.variants.forEach(function (v) {
                    $body.append(
                        $('<div class="lepton-inscompare-variant"></div>').append(
                            $('<p class="lepton-inscompare-subtitle"></p>').text(v.label),
                            $('<p class="lepton-inscompare-caption"></p>').text(v.caption)
                        )
                    );
                });
            } else {
                $body.append(
                    $('<p class="lepton-inscompare-subtitle"></p>').text(slide.subtitle),
                    $('<p class="lepton-inscompare-caption"></p>').text(slide.caption)
                );
            }
        }

        function goTo(index) {
            current = (index + slides.length) % slides.length;
            $track.find('.lepton-inscompare-slide').removeClass('active').eq(current).addClass('active');
            $title.text(slides[current].title);
            renderBody(slides[current]);
        }
        function startAutoplay() {
            stopAutoplay();
            timer = setInterval(function () { goTo(current + 1); }, 5000);
        }
        function stopAutoplay() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        $sliderCol.on('mouseenter', stopAutoplay).on('mouseleave', startAutoplay);

        goTo(0);
        startAutoplay();
    }

    // --- Lepton: collapse the gallery/title 2-column row into a single
    // full-width gallery-only column. Title, price, the add-to-cart module,
    // the header order-summary widget, and the "Need customized product?"
    // button are all dropped here (the always-visible floating bar already
    // covers the order-summary job).
    function simplifyMainProductSection() {
        var $galleryModule = $('.et_pb_wc_images').first();
        if (!$galleryModule.length) {
            return;
        }
        var $col1 = $galleryModule.closest('.et_pb_column');
        var $row = $col1.closest('.et_pb_row');
        if (!$row.length || $row.data('lepton-simplified')) {
            return;
        }
        $row.data('lepton-simplified', true);

        var $col2 = $col1.siblings('.et_pb_column').first();

        $row.addClass('lepton-gallery-row-fullwidth');
        $col1.addClass('lepton-gallery-col-fullwidth');
        $col2.addClass('lepton-hidden-column');
        $col1.find('.et_pb_wc_additional_info').addClass('lepton-hidden-column');
        $col1.find('.et_pb_button_module_wrapper').addClass('lepton-hidden-column');
    }

    function relocateAttributesIntoTabs() {
        var $attrTable = $('table.woocommerce-product-attributes').first();
        if (!$attrTable.length || $attrTable.data('lepton-relocated')) {
            return;
        }
        $attrTable.data('lepton-relocated', true);

        var $row = $attrTable.closest('.et_pb_row');
        if (!$row.length) {
            return;
        }

        var description = '';
        document.querySelectorAll('script[type="application/ld+json"]').forEach(function (s) {
            if (description) {
                return;
            }
            try {
                var data = JSON.parse(s.textContent);
                var graph = data['@graph'] || [data];
                var product = graph.find(function (g) { return g['@type'] === 'Product'; });
                if (product && product.description) {
                    description = product.description;
                }
            } catch (e) {
                // not valid/relevant JSON-LD - skip
            }
        });
        var descriptionHtml = $('<div>').text(description).html();

        var $section = $(
            '<div class="lepton-tabs-fullwidth">' +
            '<div class="lepton-tabs-nav">' +
            '<button type="button" class="lepton-tab-btn lepton-tab-active" data-tab="specifications">Specifiche</button>' +
            '<button type="button" class="lepton-tab-btn" data-tab="description">Descrizione</button>' +
            '<button type="button" class="lepton-tab-btn" data-tab="documents">Documenti</button>' +
            '<button type="button" class="lepton-tab-btn" data-tab="faqs">Domande frequenti</button>' +
            '</div>' +
            '<div class="lepton-tabs-panels">' +
            '<div class="lepton-tab-panel lepton-tab-active" data-panel="specifications"></div>' +
            '<div class="lepton-tab-panel" data-panel="description"><p>' + descriptionHtml + '</p></div>' +
            '<div class="lepton-tab-panel" data-panel="documents"><p class="lepton-tab-panel-placeholder">Documenti in arrivo.</p></div>' +
            '<div class="lepton-tab-panel" data-panel="faqs"><p class="lepton-tab-panel-placeholder">Domande frequenti in arrivo.</p></div>' +
            '</div>' +
            '</div>'
        );

        insertFullWidthSectionAfterRow($row, $section);
        $section.find('[data-panel="specifications"]').append($attrTable);

        $section.on('click', '.lepton-tab-btn', function () {
            var tab = $(this).data('tab');
            $section.find('.lepton-tab-btn').removeClass('lepton-tab-active');
            $(this).addClass('lepton-tab-active');
            $section.find('.lepton-tab-panel').removeClass('lepton-tab-active');
            $section.find('[data-panel="' + tab + '"]').addClass('lepton-tab-active');
        });
    }

    function relocateAddonFormFullWidth() {
        var $form = $('form.cart').first();
        if (!$form.length || $form.data('lepton-relocated')) {
            return;
        }
        $form.data('lepton-relocated', true);

        var $row = $form.closest('.et_pb_row');
        if (!$row.length) {
            return;
        }

        var $section = $(
            '<div class="lepton-addons-fullwidth">' +
            '<h2 class="lepton-addons-heading">Articoli aggiuntivi</h2>' +
            '</div>'
        );
        insertFullWidthSectionAfterRow($row, $section);
        $section.append($form);
    }

    function initOrderSummaryAndFloatingBar() {
        // Product-page-only: form.cart's qty input + submit button only
        // exist on an actual single product page. Without this check, the
        // bar was being built and appended to <body> unconditionally on
        // EVERY page - buildOrderSummary() below did bail out on pages
        // without a real cart form, but only after the (now broken/empty)
        // bar element itself had already been created and shown.
        if (!$('form.cart input.qty').length || !$('form.cart .single_add_to_cart_button').length) {
            return;
        }

        relocateAddonFormFullWidth();

        if ($('.lepton-floating-bar').length) {
            return;
        }

        var $galleryMain = $('.lepton-gallery-main img').first();
        var thumbSrc = $galleryMain.length ? $galleryMain.attr('src') : '';
        var productTitle = $('.et_pb_wc_title').first().text().trim();

        var $bar = $(
            '<div class="lepton-floating-bar">' +
            '<img class="lepton-floating-thumb" alt="">' +
            '<div class="lepton-floating-title-wrap">' +
            '<span class="lepton-floating-title"></span>' +
            '<a href="#" class="lepton-back-to-top">Torna su</a>' +
            '</div>' +
            '</div>'
        );
        $bar.find('.lepton-floating-thumb').attr('src', thumbSrc);
        $bar.find('.lepton-floating-title').text(productTitle);
        $bar.find('.lepton-back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 300);
        });
        var $specs = buildFloatingBarSpecs();
        if ($specs) {
            $bar.append($specs);
        }
        $('body').append($bar);

        var floatingMirror = buildOrderSummary($bar, true);

        watchLiveTotal([floatingMirror]);

        // Bar is fixed to the bottom of the viewport and always visible, so
        // reserve that much space at the bottom of the page - otherwise it
        // permanently overlaps whatever content (e.g. the footer) happens to
        // be scrolled to the bottom. Measured (not guessed) since bar height
        // differs between desktop and the mobile breakpoint.
        function reserveSpaceForBar() {
            $('body').css('padding-bottom', $bar.outerHeight() + 'px');
        }
        reserveSpaceForBar();
        $(window).on('resize', reserveSpaceForBar);
    }

    // PERMANENT (QA report item #15, 2026-09-25): the new billing_vat_id
    // checkout field (added in functions.php) lives in #customer_details,
    // OUTSIDE form.checkout entirely - same known layout quirk already
    // fixed for the billing_terms_and_conditions field on ideaswood.eu. A
    // hidden mirror input of the same name exists INSIDE form.checkout for
    // actual submission, but only gets its value copied once on page load,
    // not live as the visible field changes. Without this, the VAT ID
    // would never actually reach the saved order - it would just silently
    // stay blank regardless of what the customer typed. This site doesn't
    // charge VAT (see functions.php), so unlike ideaswood.eu there's no
    // live totals recalculation to trigger here - just keeping the hidden
    // field in sync so the value is captured for the order/invoice.
    function initVatIdSync() {
        function syncHiddenVatId() {
            var $visible = $('#customer_details input[name="billing_vat_id"]').first();
            var $hidden = $('form.checkout input[type="hidden"][name="billing_vat_id"]');
            if ($visible.length && $hidden.length) {
                $hidden.val($visible.val());
            }
        }
        $(document).on('blur change input', '#customer_details input[name="billing_vat_id"]', syncHiddenVatId);
        $('form.checkout').on('checkout_place_order', function () {
            syncHiddenVatId();
            return true;
        });
        syncHiddenVatId();
    }

})(jQuery);
