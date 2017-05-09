var map = new BMap.Map("map");   

map.addControl(new BMap.NavigationControl());   
map.addControl(new BMap.ScaleControl());    
map.addControl(new BMap.OverviewMapControl());    
map.addControl(new BMap.MapTypeControl());   
map.enableScrollWheelZoom(); 
map.enableContinuousZoom();

var myGeo = new BMap.Geocoder();    
myGeo.getPoint("西湖景区", function(point) {
  if (point) {
    map.centerAndZoom(point, 17);
    var local = new BMap.LocalSearch(map, {
		  renderOptions: {
		    map: map,
		    autoViewport: true,
		    panel: "result"
		  }
	});
	local.searchNearby("宾馆", point);     
    local.setMarkersSetCallback(function(pois){
    	var transit = new BMap.TransitRoute(map, {
		    renderOptions: {
		      map: map,
		      panel: "result"
		    }
		});
        for(var i=0;i<pois.length; i++){
            pois[i].marker.addEventListener("click", function(e){
			var myGeo = new BMap.Geocoder();
			myGeo.getLocation(new BMap.Point(e.point.lng,e.point.lat), function(point) {
			    if (point) {
					transit.search("杭州师范大学仓前新校区",point.address);
				}
			});
            })  
        }
    })
  }
}, "杭州市");


var schoolmap = new BMap.Map("schoolmap");   

schoolmap.addControl(new BMap.NavigationControl());   
schoolmap.addControl(new BMap.ScaleControl());    
schoolmap.addControl(new BMap.OverviewMapControl());    
schoolmap.addControl(new BMap.MapTypeControl());
schoolmap.enableScrollWheelZoom(); 
schoolmap.enableContinuousZoom();   

var school=[
  [120.014338, 30.2952, "体育场", "1.png"],
  [120.015272, 30.297695, "弘一大师·丰子恺研究中心", "2.png"],
  [120.015748, 30.29573, "小足球场", "3.png"],
  [120.022198, 30.298724, "图书馆", "4.png"],
  [120.018995, 30.295243, "彩色玻璃房", "5.png"],
  [120.019036, 30.296935, "小荷塘", "6.png"],
  [120.01913, 30.296463, "恕园13号楼", "7.png"],
  [120.015739, 30.296572, "学生事务服务中心", "8.png"],
  [120.020029,30.294879, "阿里巴巴商学院", "9.png"],
  [120.017621, 30.297589, "恕园33号楼", "10.png"],
];

var content =[];
for(var i=0;i<school.length;++i){
    content[i] = "<table>" + 
                   "<tr><td>" + "<img src='img/" + school[i][3] + "'>" + "</td></tr>" + 
                   "<tr><td>" + school[i][2] + "<tr><td>" + 
                "</table>";
}
var marker = [];
var mySchool = new BMap.Geocoder();    
mySchool.getPoint("杭州师范大学仓前新校区", function(point) {
  if (point) {
    schoolmap.centerAndZoom(point, 17);
    for( var i=0; i<school.length; ++i) {
    	var point= new BMap.Point(school[i][0],school[i][1]);
    	marker[i] = new BMap.Marker(point);   
	    schoolmap.addOverlay(marker[i]);
		marker[i].addEventListener("click", function(e){
			var now=0;
			for(var i=0;i<school.length;++i){
                if(this.getPosition().lng==school[i][0])
                    now=i;
			}
            var infoWindow = new BMap.InfoWindow(content[now]); // 创建信息窗口对象
			schoolmap.openInfoWindow(infoWindow, this.getPosition()); // 打开信息窗口
        });  
    }
    /*schoolmap.addEventListener("click", function(e){    
	 alert(e.point.lng + ", " + e.point.lat);    
	});*/
   }	
}, "杭州市");
