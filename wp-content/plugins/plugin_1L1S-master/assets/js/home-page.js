//permet d'afficher les valeurs calculée dans hom_page.php
//pour afficher ces valeurs dans elementor element compteur d'id css correspondant au nombre voulu 


jQuery(document).ready(function() {
    jQuery('#week_letters span.elementor-counter-number').attr('data-to-value', weekLetters);
});

jQuery(document).ready(function() {
    jQuery('#last_week_letters span.elementor-counter-number').attr('data-to-value', lastweekLetters);
});

jQuery(document).ready(function() {
    jQuery('#all_Sent_Letters span.elementor-counter-number').attr('data-to-value', allSentLetters);

});