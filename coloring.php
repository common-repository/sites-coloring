<?php
/*
Plugin Name: WebSites Coloring
Plugin URI: https://runza.ru/index.php?topic=205.0
Description: Color any WP site, you don't need to know CSS. Very simple: click with the left mouse button - paint, right click - cancel.
Version: 1.0
Author: Alexander Zhernovkov
Author URI: https://runza.ru
License: GPL2 or later
*/

function websites_coloring_html() {
	echo '
	<style type="text/css">body {opacity: 0;}</style>
	<div class="zh_comm">
		<div id="zh_modal_form">
		CSS reset?<br><br>
			<button class="zh_CSSok">OK</button>
			<button class="zh_no">NO</button>
		</div>
		<div id="zh_overlay"></div>
		<div id="zh_modal_formm">
		All reset?<br><br>
			<button class="zh_Allok">OK</button>
			<button class="zh_no">NO</button>
		</div>
		<div id="zh_overlayy"></div>
		<div class="zh_in">
			<div><input id="zh_head_1" value=" background" readonly="readonly"><input id="zh_head_2" value="   color" readonly="readonly"></div>
			<div class="zh_p"><input value="B" class="zh_prob"><input class="jscolor {hash:true,container:document.querySelector(\'#zh_cont\'),zIndex: 10000} zh_bgr"><input class="jscolor {hash:true,container:document.querySelector(\'#zh_cont\'),zIndex: 10000} zh_col"></div>
			<div class="zh_p"><input value="L" class="zh_prob"><input class="jscolor {hash:true,container:document.querySelector(\'#zh_cont\'),zIndex: 10000} zh_bgr"><input class="jscolor {hash:true,container:document.querySelector(\'#zh_cont\'),zIndex: 10000} zh_col"></div>
	';

	$zh_str = '			<div class="zh_p"><input value="S" class="zh_prob"><input class="jscolor {hash:true,container:document.querySelector(\'#zh_cont\'),zIndex: 10000} zh_bgr"><input class="jscolor {hash:true,container:document.querySelector(\'#zh_cont\'),zIndex: 10000} zh_col"></div>
	';
	for($i=1;$i<=18;$i++){
		echo $zh_str;
	}
		
	echo '
		</div>
		<div id="zh_cont"></div>
		<div class="zh_knop">
			<button class="zh_but" id="zh_Allreset">ALL RESET</button>
			<button class="zh_but" id="zh_CSSreset">CSS RESET</button>
			<button class="zh_but" id="zh_but">NOLINK</button>
		</div>
	</div>
	<div id="zh_tooltip"></div>
	<div id="zh_cssbox">
	';
}

function websites_coloring_html_end() {
	echo '	</div> <!-- #cssbox -->' . "\n";
}

function websites_coloring_scripts() {
	wp_enqueue_script( 'coloring', plugins_url('js/coloring.js', __FILE__ ), array('jquery') );
	wp_localize_script( 'coloring', 'ajaxurl', admin_url( 'admin-ajax.php' ) );
	wp_enqueue_script( 'jscolor', plugins_url('js/jscolor.js', __FILE__ ) );
	wp_enqueue_style( 'coloring', plugins_url('css/coloring.css', __FILE__ ) );
}

function websites_coloring_zh_keeper() {
	if ($_POST['zh_keeper'] == 'delete') {
		delete_option( 'zh_keeper' );
	} else if ($_POST['zh_keeper']) {
		update_option('zh_keeper', wp_kses_post($_POST['zh_keeper']), 'no');
	} else {
		echo get_option('zh_keeper');
	}
	wp_die();
}

function websites_coloring_all_html() {
	echo '	<style type="text/css">body {opacity: 0;}</style>';
}
	
function websites_coloring_all_scripts() {
	wp_enqueue_script( 'all_coloring', plugins_url('js/all_coloring.js', __FILE__ ), array('jquery') );
	wp_localize_script( 'all_coloring', 'ajaxurl', admin_url( 'admin-ajax.php' ) );
}

function websites_coloring_all_zh_keeper() {
	echo get_option('zh_keeper');
	wp_die();
}

include_once(ABSPATH . 'wp-includes/pluggable.php');

global $user_ID;
if( is_super_admin( $user_ID ) ) {
	add_action('wp_body_open', 'websites_coloring_html');
	add_action('wp_footer', 'websites_coloring_html_end');
	add_action('wp_enqueue_scripts', 'websites_coloring_scripts');
	add_action('wp_ajax_zh_keeper', 'websites_coloring_zh_keeper');
	add_action('wp_ajax_nopriv_zh_keeper', 'websites_coloring_zh_keeper');
} else {
	add_action('wp_body_open', 'websites_coloring_all_html');
	add_action('wp_enqueue_scripts', 'websites_coloring_all_scripts');
	add_action('wp_ajax_zh_keeper', 'websites_coloring_all_zh_keeper');
	add_action('wp_ajax_nopriv_zh_keeper', 'websites_coloring_all_zh_keeper');
}

?>