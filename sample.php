<?php
//sleep(500000000000000);
//header("HTTP/1.0 404 Not Found");
header("Content-type:application/json");
echo json_encode(["name" => "Shakti", "gender" => "Male"]);