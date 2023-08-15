<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['tabel/maak'] = 'tabel/maak';

$route['voorraad'] = 'voorraad/index';
$route['voorraad/maak'] = 'voorraad/maak';
$route['voorraad/update'] = 'voorraad/update';
$route['voorraad/(:any)'] = 'voorraad/view/$1';

$route['producten'] = 'producten/index';
$route['producten/maak'] = 'producten/maak';
$route['producten/toevoegen'] = 'producten/toevoegen';
$route['producten/update'] = 'producten/update';
$route['producten/(:any)'] = 'producten/view/$1';

$route['tabel/(:any)'] = 'tabel/maak/$1';
$route['onderdelen'] = 'onderdelen/index';

$route['voorraadlijst'] = 'voorraadlijst/index';
$route['voorraadlijst/maak'] = 'voorraadlijst/maak';
$route['voorraadlijst/posts/(:any)'] = 'voorraadlijst/posts/$1';

$route['default_controller'] = 'pages/view';
$route['(:any)'] = 'pages/view/$1';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
