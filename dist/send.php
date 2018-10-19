<?php
$domain = preg_replace("/www\./", "", $_SERVER["SERVER_NAME"]);
$headers = "From: =?UTF-8?B?".base64_encode("SQUAREX APPLICATION")."?=<info@$domain>\r\nContent-Transfer-Encoding: base64". "\r\n"."Content-type: text/plain; charset=\"UTF-8\""."\r\n";
$message = "";
foreach($_POST as $key=>$value){
		$message.= htmlentities($key).": ".htmlentities($value)."\n";
	}
mail("subscribe@squarex.io", "Application from SQUAREX ico. ".date('r'), base64_encode($message), $headers);
