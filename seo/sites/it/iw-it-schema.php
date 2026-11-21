<?php
/**
 * Plugin Name: IdeasWood IT – Organization schema + hreflang x-default (abitazionidilegno.it only)
 * Description: Adds address, phone and founding year to the Organization node and an x-default hreflang that points to the Italian version. Works with Rank Math (filter rank_math/json_ld) or, without it, prints its own node that merges by @id with the one from iw-seo-basics. Upload to wp-content/mu-plugins/ on abitazionidilegno.it only. Delete the file to revert. Draft 2026-11-21 (cloud SEO session), not yet applied.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function iw_it_org_extra() {
	return array(
		'@type'         => 'Organization',
		'@id'           => trailingslashit( home_url( '/' ) ) . '#organization',
		'name'          => 'IdeasWood',
		'alternateName' => 'abitazionidilegno.it',
		'url'           => trailingslashit( home_url( '/' ) ),
		'description'   => 'Fornitore ed esportatore di costruzioni in legno in kit dal 2007.',
		'foundingDate'  => '2007',
		'telephone'     => '+370 678 22055',
		'address'       => array(
			'@type'           => 'PostalAddress',
			'streetAddress'   => 'Kaštonų g. 8',
			'addressLocality' => 'Didžiosios Riešės k.',
			'addressRegion'   => 'Vilniaus r. sav.',
			'addressCountry'  => 'LT',
		),
		'areaServed'    => 'IT',
		// [CHECK] add 'email' and a 'contactPoint' for the Italy contact (Gian Luca, +370 645 07954) once Justinas confirms it may appear in schema.
	);
}

// Rank Math active: merge into its Organization entity.
add_filter( 'rank_math/json_ld', function ( $data ) {
	foreach ( $data as $key => $entity ) {
		if ( is_array( $entity ) && isset( $entity['@type'] ) && in_array( $entity['@type'], array( 'Organization', array( 'Organization' ) ), true ) ) {
			$data[ $key ] = array_merge( $entity, array_diff_key( iw_it_org_extra(), array( '@id' => 1 ) ) );
		}
	}
	return $data;
}, 99 );

// No Rank Math: print the extended node on the home page (same @id as iw-seo-basics, so Google merges them).
add_action( 'wp_head', function () {
	if ( defined( 'RANK_MATH_VERSION' ) || ! is_front_page() ) {
		return;
	}
	$graph = array( '@context' => 'https://schema.org', '@graph' => array( iw_it_org_extra() ) );
	echo '<script type="application/ld+json">' . wp_json_encode( $graph, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}, 2 );

// Polylang: add x-default (= Italian URL) wherever Polylang prints hreflang.
add_filter( 'pll_rel_hreflang_attributes', function ( $hreflangs ) {
	if ( isset( $hreflangs['it'] ) && ! isset( $hreflangs['x-default'] ) ) {
		$hreflangs['x-default'] = $hreflangs['it'];
	}
	return $hreflangs;
} );
