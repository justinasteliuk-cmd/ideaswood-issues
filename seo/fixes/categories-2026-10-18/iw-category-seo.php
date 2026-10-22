<?php
/**
 * Plugin Name: IdeasWood category SEO text
 * Description: Splits a product category description at <!--iw-below--> : the first part shows above the product grid, the rest under it. Added 2026-10-18 by the SEO session. Delete this file to revert (descriptions then show in full above the grid).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const IW_CAT_BELOW_MARK = '<!--iw-below-->';

function iw_cat_seo_parts() {
	if ( ! function_exists( 'is_product_category' ) || ! is_product_category() || absint( get_query_var( 'paged' ) ) > 1 ) {
		return null;
	}
	$term = get_queried_object();
	if ( ! $term || empty( $term->description ) ) {
		return null;
	}
	$pos = strpos( $term->description, IW_CAT_BELOW_MARK );
	if ( false === $pos ) {
		return array( $term->description, '' );
	}
	return array( substr( $term->description, 0, $pos ), substr( $term->description, $pos + strlen( IW_CAT_BELOW_MARK ) ) );
}

add_action( 'init', function () {
	if ( has_action( 'woocommerce_archive_description', 'woocommerce_taxonomy_archive_description' ) ) {
		remove_action( 'woocommerce_archive_description', 'woocommerce_taxonomy_archive_description', 10 );
		add_action( 'woocommerce_archive_description', 'iw_cat_seo_above', 10 );
	}
} );

function iw_cat_seo_above() {
	if ( ! function_exists( 'is_product_category' ) || ! is_product_category() ) {
		woocommerce_taxonomy_archive_description();
		return;
	}
	$parts = iw_cat_seo_parts();
	if ( $parts && '' !== trim( $parts[0] ) ) {
		echo '<div class="term-description">' . wc_format_content( wp_kses_post( $parts[0] ) ) . '</div>';
	}
}

add_action( 'woocommerce_after_shop_loop', function () {
	$parts = iw_cat_seo_parts();
	if ( $parts && '' !== trim( $parts[1] ) ) {
		echo '<div class="term-description iw-cat-below">' . wc_format_content( wp_kses_post( $parts[1] ) ) . '</div>';
	}
}, 20 );

// Rank Math falls back to the term description for meta and OG text; keep it to the intro only.
add_filter( 'rank_math/frontend/description', function ( $desc ) {
	return is_string( $desc ) ? str_replace( IW_CAT_BELOW_MARK, ' ', $desc ) : $desc;
} );
