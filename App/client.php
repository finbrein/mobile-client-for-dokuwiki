<!---------------------------------------------------------------------------
Example client script for JQUERY:AJAX -> WIKIRPC:Demo
---------------------------------------------------------------------------->

<html>
  <head>
    <script language="javascript" type="text/javascript" src="jquery-1.5.1.js"></script>
  </head>
  <body>

  <!-------------------------------------------------------------------------
  1) Create some html content that can be accessed by jquery
  -------------------------------------------------------------------------->
  <h2> Client example </h2>
  <h3>Output: </h3>  
  <div id="output">this element will be accessed by jquery and this text replaced</div>
  
  <script id="source" language="javascript" type="text/javascript">

  sendAjax = function()
  {
    //-----------------------------------------------------------------------
    // 2) Send an http request with AJAX http://api.jquery.com/jQuery.ajax/
    //-----------------------------------------------------------------------	
    var xml='<methodCall><methodName>dokuwiki.getVersion</methodName><params></params></methodCall>';

	$.ajax({
		type:'POST',
		url: 'http://localhost:8081/dokuwiki/lib/exe/xmlrpc.php',
		data: xml,
		contentType: 'text/xml',
		dataType:'text',
		success: function(xml) {
			$(xml).find('value').each(function(){
				dokuVersion = $(this).find("string").text();
				//--------------------------------------------------------------------
				// 3) Update html content
				//--------------------------------------------------------------------
				$('#output').html("<b>Dokuwiki version: </b>" + dokuVersion); //Set output element html	
            });
		},
		error: function(request, status, error){ alert(request.responseText);}
	   });
    } 
	
  </script>
  <br><br>  
  <input type="button" style="width: 90px; height: 30px" value="send AJAX" onclick="sendAjax();" />
  </body>
</html>