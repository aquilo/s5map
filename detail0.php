<?php

	$id = $_GET['id'];

    $csvFile = file('Beispielobjektsammlung.csv');
    $data = [];
    foreach ($csvFile as $line) {
        $data[] = str_getcsv($line);
  	}

  	$names = $data[0];

  	echo '<table border="0">';
	for ($i = 0, $num_obj = count($data); $i < $num_obj; $i++) {
		if ($data[$i][0] == $id) {
		    for ($m = 0, $num_vars = count($data[$i]); $m < $num_vars; $m++) {
		        echo '<tr><td>' . $names[$m] . "</td><td><b>" . $data[$i][$m] . "</b></td></tr>\n";
		    }
		}
	}
	echo '</table>';

	// echo '<pre>'; print_r($data); echo '</pre>';  
?>