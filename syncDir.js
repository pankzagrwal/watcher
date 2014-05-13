var fs = require('fs');
var dirName = 'Directory path to Watch',
	folderToSyn1 = '1st Directory path to keep sync with',
	folderToSyn2 = '2nd Directory path to keep sync with';


attach(dirName);


function attach(dirName) {
	watcher(dirName);
	var filenames = fs.readdirSync(dirName);
	filenames.forEach(function (name) {
	    if (fs.lstatSync(dirName + "/" + name).isDirectory()) {
	        
	        attach(dirName + "/" + name);
	        
	    }
	    else
	    	return;

	});
}

function watcher(node){

	fs.watch(node, function(ev , fileName) {
		// Watcher Function
		syncFolders(node + "/" + fileName);
	});
}

function syncFolders(node) { 
	var buff,
		fsStatNode,
		fsStatFolder1,
		subPath = node.replace(dirName , "");

	

	try {
		fsStatNode = fs.statSync(node);
		fsStatFolder1 = fs.statSync(folderToSyn1 + "/" + subPath);

		if(fsStatNode.mtime > fsStatFolder1.mtime){
		buff = fs.readFileSync(node); 

		fs.writeFileSync(folderToSyn1 + "/" + subPath, buff);
		fs.writeFileSync(folderToSyn2 + "/" + subPath, buff);
		
		console.log("Updated....  " + subPath)
	}
	}
	
	catch (e) {
		//console.log(e);
		console.log(subPath + "  ....File not Found..... Ignoring...");
	}



	};


console.log("Watching.....");
