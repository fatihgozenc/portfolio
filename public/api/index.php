<?php 
  $request = parse_url($_SERVER['REQUEST_URI']);
  $path = explode("/", $request["path"]);
  // print_r($_SERVER);
  $query = isset($request["query"]) ? $request["query"] : null;
  $works = json_decode(file_get_contents('./works.json'), true);
  $category = isset($path[3]) ? $path[3] : null;
  $slug = isset($path[4]) ? $path[4] : null;
  
  function getJson($arr){
    return json_encode(array_values($arr));
  }

  // function filterByQuery($data, $filterQuery, $cat){
  //   if($cat === 'web'){
  //     return getJson(array_filter($data, function($item) use($filterQuery){
  //       if (preg_match("/{$filterQuery}/i", $item['tech'])) return $item;
  //     }));
  //   } else {
  //     return getJson(array_filter($data, function($item) use($filterQuery){
  //       if (preg_match("/{$filterQuery}/i", $item['role'])) return $item;
  //     }));
  //   }
  // };

  function filterByName($data, $filterSlug, $cat){
    return getJson(array_filter($data, function($item) use($filterSlug){
      if (preg_match("/{$filterSlug}/i", $item['slug'])) return $item;
    }));
  };

  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: http://localhost:3000');

  if ($category == null){
    echo json_encode($works);
  } elseif (isset($query)) {
    echo filterByQuery($works[$category], $query, $category);
  } elseif (isset($slug)) {
    echo filterByName($works[$category], $slug, $category);
  }else {
    echo json_encode($works[$category]);
  };

  die();
?>