var child = document.getElementById('ui-box3-container'),
    parent = document.getElementById('ui-box3');
    
    for(var i=0;i<5;++i){
    	var container = document.createElement("div");
    	container = child.cloneNode(true);
		parent.appendChild(container);
    }
   
    
