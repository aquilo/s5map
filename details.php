<?php

  $id = $_GET['id'];

    $csvFile = file('Beispielobjektsammlung.csv');
    $data = [];
    foreach ($csvFile as $line) {
        $data[] = str_getcsv($line);
    }

    $names = $data[0];

    for ($i = 0, $num_obj = count($data); $i < $num_obj; $i++) {
    if ($data[$i][0] == $id) {
            $datai =  $data[$i];
    }
  }

function random_lipsum($amount = 1, $what = ‘paras’, $start = 0) {

return simplexml_load_file("http://www.lipsum.com/feed/xml?amount=$amount&what=$what&start=$start")->lipsum;

}



  // echo '<pre>'; print_r($data); echo '</pre>';  
?>
<!doctype html> 

<div id="punkt">.</div>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="de" class="no-js"> <!--<![endif]-->
<head>
<meta charset="utf-8">

<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

 <title>Stadtregion S5 - Region S5</title>

<meta name="keywords" content="Verein Stadtregion S5, Region S5, Uster, Wetzikon, Veranstaltungen">
<meta name="author" content="ergo communication asw">

<meta name="description" content="Der Verein Stadtregion S5 – Die AgglOase zwischen Zürich und Rapperswil fördert die Qualitäten und Stärken der Stadtregion zwischen Zürich und Rapperswil. Beteiligen Sie sich aktiv an dieser aussergewöhnlichen Diskussionsplattform.">
<meta name="author" content="ergo communication asw">

<meta name="abstract" content="Der Verein Stadtregion S5 – Die AgglOase zwischen Zürich und Rapperswil fördert die Qualitäten und Stärken der Stadtregion zwischen Zürich und Rapperswil.">
<meta name="robots" content="all, follow">
<meta name="revisit-after" content="3 days">

<!-- Favicons
================================================== -->

<link rel="shortcut icon" href="fav/favicon.ico">
<link rel="apple-touch-icon" href="fav/KA_57.png">
<link rel="apple-touch-icon" sizes="72x72" href="fav/KA_72.png">
<link rel="apple-touch-icon" sizes="114x114" href="fav/KA_114.png">

<link rel="stylesheet" href="http://stadtregion-s5.ch/css/style.css">
	

<link href='http://fonts.googleapis.com/css?family=EB+Garamond|Oswald:700' rel='stylesheet' type='text/css'>

<meta name="viewport" content="width=device-width,target-densitydpi=device-dpi,intial-scale=1">
    
    <link rel="stylesheet" href="http://stadtregion-s5.ch/css/style.css" media="all">
    <link rel="stylesheet" href="http://stadtregion-s5.ch/css/smartphone.css" media="only screen and (min-device-width:320px) and (max-device-width:399px)">
    <link rel="stylesheet" href="http://stadtregion-s5.ch/css/smartphone2.css" media="only screen and (min-device-width:400px) and (max-device-width:480px)">
     <link rel="stylesheet" href="http://stadtregion-s5.ch/css/ipad-portrait.css" media="only screen and (min-device-width:768px) and (max-device-width:1024px) and (orientation:portrait)">
     <link rel="stylesheet" href="http://stadtregion-s5.ch/css/iphone4.css" media="only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-device-pixel-ratio: 1.5)">
<script type="text/javascript" src="http://stadtregion-s5.ch/imagemanager/js/mcimagemanager.js"></script>
    <script src="js/libs/webfontloadenhancer.min.js"></script> 
	<script src="http://stadtregion-s5.ch/js/libs/modernizr.min.js"></script>
	<script src="http://stadtregion-s5.ch/js/libs/respond.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

</head>
<body>
<div id="wrapper">
  <div id="header"><div class="unify"><img src="http://stadtregion-s5.ch/img/Bild_Oben.jpg" alt="Bild Stadtregion S5" name="Bildoben" width="940" height="216" class="Bild"></div></div>
  <div id="logo"><img src="http://stadtregion-s5.ch/img/Logo_S5.png" width="297" height="165" alt="Logo S5"></div>
  <div id="navigation">
<!doctype html> 

<head>
<meta charset="utf-8">

</head>
<body>
<ul>
	<li><div class="unify"><a href="http://stadtregion-s5.ch/index.php" target="_parent">HOME</a></div></li>
			<li><div class="unifyRepeat"><a href="http://stadtregion-s5.ch/region.php" target="_parent">STADTREGION S5</a></div>
            	<ul class="level2"><div class="unifyRepeatArea">
<li><div class="unifyRepeat"><a href="http://stadtregion-s5.ch/ort.php" target="_parent">Region S5</a></div></li>
      				<li><div class="unifyRepeat"><a href="http://stadtregion-s5.ch/archiv.php" target="_parent">Archiv</a></div></li>
                    <li><div class="unifyRepeat"><a href="http://stadtregion-s5.ch/infos.php" target="_parent">Informationen</a></div></li>
</div></ul></li>
          <li><div class="unify"><a href="http://stadtregion-s5.ch/veranstaltungen.php" target="_parent">VERANSTALTUNGEN</a></div></li>
			
            <li><div class="unifyRepeat"><a href="http://stadtregion-s5.ch/verein.php" target="_parent">Über uns</a></div>
            	<ul class="level2"><div class="unifyRepeatArea">
      				<li><div class="unifyRepeat"><a href="http://stadtregion-s5.ch/vorstand.php" target="_parent">Vorstand</a></div></li>
      				<li><div class="unifyRepeat"><a href="http://stadtregion-s5.ch/partner.php" target="_parent">Partner</a></div></li>
      				<li><div class="unifyRepeat"><a href="http://stadtregion-s5.ch/news2.php" target="_parent">News</a></div></li>
			  </div></ul></li>
            <li>
              <div class="unifyRepeat"><a href="http://stadtregion-s5.ch/kontakt.php" target="_parent">Kontakt</a></div>
              <ul class="level2"><div class="unifyRepeatArea">
              <li><div class="unifyRepeat"><a href="http://stadtregion-s5.ch/kontakt.php" target="_parent">Kontakt</a></div></li>
              <li><div class="unifyRepeat"><a href="http://stadtregion-s5.ch/newsletter.php" target="_parent">Newsletter</a></div></li>
                    <li><div class="unifyRepeat"><a href="http://stadtregion-s5.ch/mitglied.php" target="_parent">Mitglied werden</a></div></li>
        </div></ul></li>
              </li>
               <div class="unifyRepeat"><a href="http://s5.mapresso.com" target="_parent">Karte</a></div>
              <ul class="level2"><div class="unifyRepeatArea">
              <li><div class="unifyRepeat"><a href="http://stadtregion-s5.ch/kontakt.php" target="_parent">Kontakt</a></div></li>
              <li><div class="unifyRepeat"><a href="http://stadtregion-s5.ch/newsletter.php" target="_parent">Newsletter</a></div></li>
                    <li><div class="unifyRepeat"><a href="http://stadtregion-s5.ch/mitglied.php" target="_parent">Mitglied werden</a></div></li>
        </div></ul>
              </li>
  
    </ul>
      
</body>
</html>  </div>
   <div class="strich"></div>
  <div id="content">
   <aside> 
    
   </aside>
   <article> 
      <div class="unify"><h2>Sammlung von Bauprojekten und Brennpunkten</h2></div><br>
      <div class="unify"><h3>Objekt-Informationen zu:</h3></div><br>
      <div class="unify"><h2 style="margin-bottom: 4px"><? echo $datai[1]; ?></h2></div>
      <p><? echo $datai[6]; ?> <? echo $datai[7]; ?>, <? echo $datai[5]; ?> <? echo $datai[4]; ?>  </p>
     <div class="unify">
     <? if ($datai[18]) { ?>
     <h3>Funktion</h3>
     <p><? echo $datai[9]; ?></p>
     <? } ?>
     <h3>Besondere Qualität</h3>
     <p><? echo $datai[13]; ?>, <? echo $datai[15]; ?> <? echo $datai[17]; ?>  </p>     
     <? if ($datai[18]) { ?>
     <h3>Kommentar</h3>
     <p><? echo $datai[18]; ?></p>
     <? } ?>

     <? if ($datai[11]) { ?>
     <img src="/Bilder630/<? echo $datai[11]; ?>"><br> <br>
     <? } ?>
     <? if ($datai[10]) { ?>
    <p><? echo $datai[10]; ?></p>
     <? } else { ?>
<p><? echo random_lipsum(); ?></p>
      <? } ?>

     <p><a href="<? echo $datai[20]; ?>" target="_blank" style="color: #AABB1D;">Link zu weiteren Informationen</a>  </p>

     <p>Erfasst am <? echo date("d.m.Y", 60*60*24*($datai[29] - 25569)); ?></p>



     <br><br><br><hr>
<a href="details.php?id=<? echo ($id - 1) ?>">prev</a> &nbsp;
<a href="details.php?id=<? echo ($id + 1) ?>">next</a>
     <hr>
<?

    echo '<table border="0">';
        for ($m = 0, $num_vars = count($datai); $m < $num_vars; $m++) {
            echo '<tr><td>' . $m . "&nbsp;</td><td>" . $names[$m] . "</td><td><b>" . $datai[$m] . "</b></td></tr>\n";
        }
  
  echo '</table>';

  ?>
</div>
   </article></div>
  <div class="strich"></div>
     <div id="footer"> 
<!doctype html> 

<head>
<meta charset="utf-8">



</head>
<body>
<a href="http://stadtregion-s5.ch/impressum.php" target="_parent">Impressum</a>
<a href="http://stadtregion-s5.ch/disclaimer.php" target="_parent">Disclaimer</a>
<a href="http://stadtregion-s5.ch/kontakt.php" target="_parent">Kontakt</a>
<a href="http://stadtregion-s5.ch/medien.php" target="_parent">Medien</a>
<a href="http://stadtregion-s5.ch/newsletter.php" target="_parent">Newsletter</a>
<a href="http://stadtregion-s5.ch/mitglied.php" target="_parent">Mitgliedschaft</a>
<a href="http://stadtregion-s5.ch/javascript:mcImageManager.browse({extensions:'jpg', exclude_file_pattern:'/^dog/'});" class="Login">Image</a>
<a href="http://stadtregion-s5.ch/unify/" target="_blank" class="Login2">Login</a>
 
</body>
</html>   </div>
</div>

</body>
</html>