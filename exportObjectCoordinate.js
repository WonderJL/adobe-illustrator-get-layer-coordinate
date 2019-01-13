// start of - js JSON library: https://github.com/douglascrockford/JSON-js
"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();
// end of - js JSON library

function getAllObjects(target, targetPrefix) {
    var allObjects = []
    var pageItems = target.pageItems
    for (var i = 0; i < pageItems.length; i++) {
        var pageItem = pageItems[i]
        if (pageItem && pageItem.name.match(new RegExp(targetPrefix, "g"))) {
            allObjects.push(pageItem)
        }
    }
    return allObjects
}

function getMetaData(targets) {
    var allData = []
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i]
        var data = {
            name: target.name,
            url: '<resource_dir>' + target.name + '<resource_type>',
            x: target.left,
            y: target.top * -1,
            width: target.width,
            height: target.height,
            zIndex: target.zOrderPosition
        }
        allData.push(data)
    }
    return allData
}

function exportFile(context, filepath) {

    var randomname = Number(new Date());
    // get the text file
    var write_file = File(filepath);

    if (!write_file.exists) {
        // if the file does not exist create one
        write_file = new File(filepath);
    } else {
        // if it exists ask the user if it should be overwritten
        var res = confirm("The file already exists. Should I overwrite it", true, "titleWINonly");
        // if the user hits no stop the script
        if (res !== true) {
            return false;
        }
    }

    var out; // our output
    // we know already that the file exist
    // but to be sure
    if (write_file !== '') {
        //Open the file for writing.
        out = write_file.open('w', undefined, undefined);
        write_file.encoding = "UTF-8";
        write_file.lineFeed = "Unix"; //convert to UNIX lineFeed
        // txtFile.lineFeed = "Windows";
        // txtFile.lineFeed = "Macintosh";
    }
    // got an output?
    if (out !== false) {
        // loop the list and write each item to the file
        write_file.writeln(context);
        // always close files!
        write_file.close();
        return true;
    }

    return false
}

var activeDocument = app.activeDocument
if (activeDocument) {
    var targetPrefix = prompt("Search for layer with prefix of", "the_ptefix")
    var allObjects = getAllObjects(app.activeDocument, targetPrefix)
    var allObjectMetaData = getMetaData(allObjects)

    if (allObjectMetaData.length > 0) {
        var cropBox = app.activeDocument.cropBox
        var artboardWidth = cropBox[2]
        var artboardHeight = cropBox[3] * -1

        var exportData = {}
        exportData.artboardSize = {
            width: artboardWidth,
            height: artboardHeight,
        }
        exportData.metaData = allObjectMetaData

        var activeDocFilePath = (app.activeDocument.fullName + "").replace(app.activeDocument.name, "")
        var exportFileName = "metadata.json";
        var filepath = activeDocFilePath + "metadata.json";

        var exportResult = exportFile(JSON.stringify(exportData, null, 2), filepath)

        if (exportResult) {
            alert("Done, all metadata of layers with prefix `" + targetPrefix + "` exported to " + filepath)
        } else {
            alert("Export error, please try again")
        }
    } else {
        alert("Export error, no object found of `" + targetPrefix + "`, please try other layer prefix")
    }
} else {
    alert("No active document")
}
