(function() {
    var fs            = require('fs')
      , rtfm          = require('./bin/rtfm')
      , colors        = require('colors');

    if(!process.argv[2]) {
        console.error('Please enter the file that you want to rtfm-ify'.red);
        process.exit(1);
    }

    fs.readFile(process.argv[2],'utf8',function(err,data){
        var out_file_data = '';

        if(err) {
            console.error("Could not open file: %s".red, err);
            process.exit(1);
        }

        try{
            out_file_data = 'var rtfm = ' + JSON.stringify(rtfm.rtfm(data));
        } catch(e) {
            console.error('Looks like there was an invalid object created.  Exiting.'.red)
            process.exit(1);
        }

        fs.writeFile("rtfm.js", out_file_data, function(err){
            if(err) {
                console.error("Error saving file %s".red, err);
                process.exit(1);
            }
                console.log('rtfm.js file saved!'.yellow);
        });
    });
}).call(this)