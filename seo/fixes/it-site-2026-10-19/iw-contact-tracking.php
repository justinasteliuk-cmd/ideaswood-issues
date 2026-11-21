<?php
/**
 * Plugin Name: IdeasWood contact tracking
 * Description: Sends phone/email/WhatsApp clicks, copies of contact details and lead form submits to GA4 as key events (phone_click, email_click, whatsapp_click, generate_lead). Undo = delete this file.
 * Version: 1.0 (2026-10-19)
 *
 * Why a mu-plugin: Wordfence WAF returns 403 on any wp-admin POST that contains <script>,
 * so Header Footer Code Manager cannot hold it.
 * GA4 property 480137917 (G-B6WMG4JNMP, loaded by Site Kit) has these as key events,
 * with event-scoped custom dimensions contact_target and contact_owner.
 */

if (!defined('ABSPATH')) exit;

add_action('wp_footer', function () {
	if (is_admin()) return;
	$owner = defined('IW_CONTACT_OWNER') ? IW_CONTACT_OWNER : 'gianluca';
	?>
<script id="iw-contact-tracking">
(function(){
  var owner=<?php echo wp_json_encode($owner); ?>;
  function send(name,target){
    var p={contact_target:target,contact_owner:owner,link_url:target,page_location:location.href};
    if(typeof window.gtag==='function'){window.gtag('event',name,p);}
    else{(window.dataLayer=window.dataLayer||[]).push(Object.assign({event:name},p));}
  }
  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null; if(!a)return;
    var h=a.getAttribute('href')||'';
    if(/^tel:/i.test(h))send('phone_click',h.slice(4).replace(/\s/g,''));
    else if(/^mailto:/i.test(h))send('email_click',h.slice(7).split('?')[0]);
    else if(/wa\.me\/|api\.whatsapp\.com|^whatsapp:/i.test(h))send('whatsapp_click',h);
  },true);
  document.addEventListener('copy',function(){
    var s=String(window.getSelection()||'').trim(); if(!s||s.length>80)return;
    if(/@/.test(s))send('email_copy',s); else if(/^\+?[\d\s().-]{8,}$/.test(s))send('phone_copy',s);
  });
  document.addEventListener('submit',function(e){
    var f=e.target; if(!f||!f.tagName)return;
    var sig=(f.className+' '+f.id+' '+(f.getAttribute('action')||'')+' '+(f.getAttribute('role')||'')).toLowerCase();
    if(/search|cart|checkout|login|register|lost|comment|filter/.test(sig))return;
    send('generate_lead',f.id||f.getAttribute('action')||'form');
  },true);
})();
</script>
	<?php
}, 99);
