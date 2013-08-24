var fs = require('fs');


exports.rtfm = function(text){
  var file_content = text.toString();
  return build_json_object(file_content.match(/\/\*\*\s*\@(\w*):\s*(\w*)(?:(?!\*\/)[\s\S])*/g))

  /**
   @name: read_file_data
   @parameters:
    <string> err - Error in string form.
    <string> data - Contents of the file.
   @description: Read in the file.

  */
  // function read_file_data(err, data) {
  //   if(!!err) {
  //     console.log(err.toString());
  //   }
  //   else {
  //     var file_content = data.toString();
  //     build_json_object(file_content.match(/\/\*\*\s*\@(\w*):\s*(\w*)(?:(?!\*\/)[\s\S])*/g))
  //   }
  // }

  /**
   @name: build_json_object
   @parameters:
    <array> file_content_array: array of documentation blocks
   @description: Builds an object, based off of the array.

  */
  function build_json_object(file_content_array) {
    var document_object = {}
      , temp_object     = {}
      , name            = void 0
      , temp_elements   = {};

    if(!!file_content_array) {
      for (var i = file_content_array.length - 1; i >= 0; i--) {
        temp_elements = build_json_element(file_content_array[i].split(/\n\s*@/));

        if(!!temp_elements) {
          if(temp_elements.hasOwnProperty('name')) {
            name = temp_elements['name'];
          }
          for(var index in temp_elements) {
            temp_object[index] = temp_elements[index];
          } 
        }
      }
    }
    if(!!name) {
      // TODO: What should I do if there's a collision?
      document_object[name] = temp_object;
    }
    //
    return document_object;
  }

  /**
   @name: build_json_element
   @parameters:
    <array> document_elements: 
   @description: Builds an object, based off of the array.

  */
  function build_json_element(document_elements) {
    var obj                    = {}
      , document_element_array = [];

    for (var i = document_elements.length - 1; i >= 0; i--) {
      document_element_array = document_elements[i].split(':');

      if( document_element_array.length < 2 ) {
        continue;
      }
      else {
        obj[ document_element_array.shift() ] = document_element_array.join(':').trim();
      }
    };
    return obj;
  }
}
