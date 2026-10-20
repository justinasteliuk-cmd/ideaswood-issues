<?php
/**
 * Plugin Name: IdeasWood SEO basics
 * Description: Meta description + Organization/WebSite schema for sites without an SEO plugin. Added 2026-10-19 by Astra (SEO). Steps aside automatically if Rank Math, Yoast, AIOSEO or SEOPress is active. Delete this file to revert.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Home page descriptions, written only from facts already on each site's home page. */
const IW_SEO_HOME = array(
	'logcabinsfactory.com'  => 'Log cabins, grill cabins and other wooden garden buildings, supplied as kits. Browse models, sizes and prices online.',
	'timberescapes.com.au'  => 'Eco-living timber cabins. Browse cabins by category and customise your own cabin design online with Ideasplanner.',
	'abitazionidilegno.it'  => 'Casette da giardino, garage, case e chalet in legno. La nostra fabbrica partner produce più di 3200 m³ di cabine al mese.',
	'ideaswood.com'         => 'Wooden log cabins with customisable sizes, layouts and finishes, from compact corner cabins to fully insulated all-season homes and A-frame houses.',
);

function iw_seo_has_plugin() {
	return defined( 'RANK_MATH_VERSION' ) || defined( 'WPSEO_VERSION' ) || defined( 'AIOSEO_VERSION' ) || defined( 'SEOPRESS_VERSION' );
}

function iw_seo_clean( $text ) {
	$text = wp_strip_all_tags( strip_shortcodes( (string) $text ), true );
	$text = trim( preg_replace( '/\s+/', ' ', html_entity_decode( $text, ENT_QUOTES, 'UTF-8' ) ) );
	// Builder placeholder text must never become a search snippet.
	if ( '' === $text || preg_match( '/your (title|content) goes here|lorem ipsum/i', $text ) ) {
		return '';
	}
	if ( mb_strlen( $text ) > 158 ) {
		$cut  = mb_substr( $text, 0, 155 );
		$text = rtrim( mb_substr( $cut, 0, (int) mb_strrpos( $cut, ' ' ) ), " ,.;:-" ) . '…';
	}
	return $text;
}

/**
 * Products without a short description (ideaswood.com, timberescapes, most of abitazionidilegno):
 * build the snippet only from the product's own attributes — no invented claims. 2026-10-20.
 */
function iw_seo_product_from_attributes( $id ) {
	if ( ! function_exists( 'wc_get_product' ) ) {
		return '';
	}
	$p = wc_get_product( $id );
	if ( ! $p ) {
		return '';
	}
	$it    = 0 === strpos( get_locale(), 'it' );
	$attrs = array();
	foreach ( $p->get_attributes() as $a ) {
		$label = wc_attribute_label( $a->get_name() );
		$vals  = $a->is_taxonomy() ? wc_get_product_terms( $id, $a->get_name(), array( 'fields' => 'names' ) ) : $a->get_options();
		$attrs[ $label ] = implode( ' / ', array_map( 'wp_strip_all_tags', (array) $vals ) );
	}
	$pick = function ( $re ) use ( $attrs ) {
		foreach ( $attrs as $k => $v ) {
			if ( '' !== $v && preg_match( $re, $k ) ) {
				return $v;
			}
		}
		return '';
	};
	$size  = $pick( '/width x length|size wxl|building size|misurare|dimensioni/i' );
	$area  = $pick( '/inside area|internal area|area interna|superficie interna/i' );
	$wall  = $pick( '/wall thickness|log thickness|spessore (delle )?pareti/i' );
	$cats  = wp_get_post_terms( $id, 'product_cat', array( 'fields' => 'names' ) );
	$cat   = '';
	foreach ( (array) $cats as $c ) {
		if ( ! preg_match( '/featured|uncategor|default/i', $c ) ) {
			$cat = $c;
			break;
		}
	}
	$name  = wp_strip_all_tags( $p->get_name() );
	$bits  = array();
	if ( $size ) {
		$bits[] = ( $it ? 'dimensioni ' : 'size ' ) . $size;
	}
	if ( $area ) {
		$bits[] = ( $it ? 'superficie interna ' : 'internal area ' ) . $area;
	}
	if ( $wall ) {
		$bits[] = ( $it ? 'pareti ' : 'walls ' ) . $wall;
	}
	$text = $name . ( $cat ? ' – ' . $cat : '' ) . ( $bits ? ': ' . implode( ', ', $bits ) . '.' : '.' );
	$text .= $it ? ' Scopri specifiche e opzioni.' : ' See full specifications and options.';
	return iw_seo_clean( $text );
}

function iw_seo_description() {
	$host = preg_replace( '/^www\./', '', (string) wp_parse_url( home_url(), PHP_URL_HOST ) );
	if ( is_front_page() ) {
		return IW_SEO_HOME[ $host ] ?? '';
	}
	if ( is_singular() ) {
		$post = get_queried_object();
		if ( 'product' === get_post_type( $post ) && '' !== trim( (string) $post->post_excerpt ) ) {
			return iw_seo_clean( $post->post_excerpt );
		}
		if ( 'product' === get_post_type( $post ) ) {
			return iw_seo_product_from_attributes( $post->ID );
		}
		if ( has_excerpt( $post ) ) {
			return iw_seo_clean( get_the_excerpt( $post ) );
		}
		return '';
	}
	if ( is_category() || is_tag() || is_tax() ) {
		return iw_seo_clean( term_description() );
	}
	return '';
}

add_action( 'wp_head', function () {
	if ( iw_seo_has_plugin() || is_admin() ) {
		return;
	}
	$desc = iw_seo_description();
	if ( '' !== $desc ) {
		echo '<meta name="description" content="' . esc_attr( $desc ) . '">' . "\n";
	}
	if ( is_front_page() ) {
		$url  = trailingslashit( home_url() );
		$logo = '';
		$id   = (int) get_theme_mod( 'custom_logo' );
		if ( $id ) {
			$logo = (string) wp_get_attachment_image_url( $id, 'full' );
		}
		$org = array(
			'@type' => 'Organization',
			'@id'   => $url . '#organization',
			'name'  => get_bloginfo( 'name' ),
			'url'   => $url,
			// Justinas 2026-10-19: the company was founded in 2007 (one year on every site).
			'foundingDate' => '2007',
		);
		if ( $logo ) {
			$org['logo'] = $logo;
		}
		$graph = array(
			'@context' => 'https://schema.org',
			'@graph'   => array(
				$org,
				array(
					'@type'     => 'WebSite',
					'@id'       => $url . '#website',
					'url'       => $url,
					'name'      => get_bloginfo( 'name' ),
					'publisher' => array( '@id' => $url . '#organization' ),
					'inLanguage' => get_bloginfo( 'language' ),
				),
			),
		);
		echo '<script type="application/ld+json">' . wp_json_encode( $graph, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
	}
}, 1 );
