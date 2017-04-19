$(document).ready(function() {
	$(".ui-item").click(function(){
		var img=$(this).find("img").attr("src");
		$("#ui-show").hide();
		$("#ui-hide-img").attr("src",img);
		$("#ui-hide").fadeIn(800);
    });
    $("#ui-hide").click(function(){
		$(this).fadeOut(800,function(){
			$("#ui-show").show();
        });
    });
    $("#ui-container2").find("li").click(function(){
		$(this).css("background-color","#808080");
		$("#ui-container2").find("li").not(this).css("background-color","#FFFFFF");
        $("#ui-content").html($(this).val());
    }); 

    var child = document.getElementById('ui-list-item'),
        $item=$(child.cloneNode(true));

    var num = $(".ui-list").length;

    $("button").click(addData);
    $(".ui-list-delete").click(deleteData);

    function addData(){
        
    	var $newItem=$item.clone();
        $newItem.children("div.ui-list-index").text(num+1);
        $newItem.children("div.ui-list-delete").bind("click",deleteData);
        if(num==0){
	        $("#ui-nolist").hide(function(){
	        	$("#ui-data").append($newItem);
	        });
	    }
	    $("#ui-data").append($newItem);
        num++;
        console.log(num);
    }

     function deleteData(){
        /*num--;
        $(this).parent().remove();
        if(num<1){
            $("#ui-nolist").show();
        }
        console.log(num);
        for (var i=0;i<num;i++) {
            $(".ui-list").eq(i).children("div.ui-list-index").text(i+1);
        }
        $("#ui-data").children("div .ui-list").unbind("click",deleteData);*/
        
        //修改源代码为动态的可视删除效果
        num--;
        $("#ui-data").css("margin-top","15px");
        $(this).parent().hide(function(){
            $(this).remove();
            if(num==0){
                $("#ui-nolist").show();
            }
            console.log(num);
            for (var i=0;i<num;i++) {
                $(".ui-list-index").eq(i).text(i+1);
            }
        });
    }
});
    
   