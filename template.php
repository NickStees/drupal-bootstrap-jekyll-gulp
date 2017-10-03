<?php
/**
 * @file
 * template.php
 */
function rapido_preprocess_html(&$variables) {

  // Add Google font for theme
  drupal_add_css('https://fonts.googleapis.com/css?family=Roboto', array('type' => 'external'));

  // Add Font Awesome
  drupal_add_css('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', array('type' => 'external'));


}

// function rapido_menu_link($variables) {
//
// }


// function rapido_preprocess_page(&$variables) {
//
// }


/**
 * Returns HTML for a menu link and submenu.
 *
 * @param $variables
 *   An associative array containing:
 *   - element: Structured array data for a menu link.
 *
 * @ingroup themeable
 */
function rapido_menu_link(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  $options = !empty($element['#localized_options']) ? $element['#localized_options'] : array();

  // Check plain title if "html" is not set, otherwise, filter for XSS attacks.
  $title = empty($options['html']) ? check_plain($element['#title']) : filter_xss_admin($element['#title']);

  // Ensure "html" is now enabled so l() doesn't double encode. This is now
  // safe to do since both check_plain() and filter_xss_admin() encode HTML
  // entities. See: https://www.drupal.org/node/2854978
  $options['html'] = TRUE;

  $href = $element['#href'];
  $attributes = !empty($element['#attributes']) ? $element['#attributes'] : array();

  if ($element['#below']) {
    // Prevent dropdown functions from being added to management menu so it
    // does not affect the navbar module.
    if (($element['#original_link']['menu_name'] == 'management') && (module_exists('navbar'))) {
      $sub_menu = drupal_render($element['#below']);
    }
    elseif ((!empty($element['#original_link']['depth'])) && ($element['#original_link']['depth'] == 1)) {
      // Add our own wrapper.
      unset($element['#below']['#theme_wrappers']);
      $sub_menu = '<ul>' . drupal_render($element['#below']) . '</ul>';

      // Generate as standard dropdown.
      // $title .= ' <span class="caret"></span>';
      // $attributes['class'][] = 'dropdown';

      // Set dropdown trigger element to # to prevent inadvertant page loading
      // when a submenu link is clicked.
      // $options['attributes']['data-target'] = '#';
      // $options['attributes']['class'][] = 'dropdown-toggle';
      // $options['attributes']['data-toggle'] = 'dropdown';
    }
  }

  return '<li' . drupal_attributes($attributes) . '>' . l($title, $href, $options) . $sub_menu . "</li>\n";
}


?>
