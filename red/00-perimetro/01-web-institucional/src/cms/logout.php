<?php
require __DIR__ . '/cms.php';
cms_logout();
header('Location: /cms/index.php');
