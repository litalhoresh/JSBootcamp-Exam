//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////   Lital Siksik   /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//#region - Requires
const fs = require('fs');
var path = require('path');
//#endregion

//#region globals
//boolean that indicate if there are results for the search
var thereAreResults = false;
//#endregion

function search() 
{
    //validate args
    if(process.argv.length != 4 )
    {
      console.log("Usage: node search [EXT] [TEXT]");
      process.exit(-1);
    }

    //Get specified string and format for search
    var args = process.argv.slice(2);
    var format = args[0];
    var searchString = args[1];

    let filelist;
    
    //search files recursivly and then print the required files by required format and string
    searchAndPrintRequiredFiles(__dirname, filelist, format, searchString);

    //if there are no results, print a message
    if(!thereAreResults)
    {
      console.log("No file was found");
    }
 }

function searchAndPrintRequiredFiles(dir,filelist,format,searchString) 
{
  try{
    //get all files in the directory
    fs.readdirSync(dir).forEach((file) => 
    {
      //if the current path is directory
      if (fs.statSync(path.join(dir,file)).isDirectory())
      {
        //get the file list and send it again (recursive)
        filelist = searchAndPrintRequiredFiles(path.join(dir,file), filelist,format,searchString);
      }
      //if the current path is a file
      else 
      {
        //validate the format and the specified String
        if((file.split('.').pop().toLowerCase() == format.toLowerCase()) && fs.readFileSync(path.join(dir,file)).toString().indexOf(searchString)>=0)
        {
          //print the file name
          console.log(path.join(dir , file)); 
          thereAreResults = true;
        }
      }
    });
  return filelist;
  }
catch(err)
{
  console.log(err.message);
}
};

 search();