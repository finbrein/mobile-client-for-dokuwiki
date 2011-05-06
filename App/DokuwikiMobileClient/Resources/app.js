// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#F3F1E9');

//
// create base UI tab and root window
//
var win = Titanium.UI.createWindow({
    title:'Dokuwiki Mobile Client',
});

var appTitle = Titanium.UI.createLabel({
    height:40,
    top:0,
    left:0,
    width: '100%',
    backgroundColor: '#3F464F',
    color: '#F3F1E9',
    textAlign: 'center',
    text: 'Dokuwiki Mobile Client',
});

var view = Ti.UI.createImageView({
    image:"dokuwiki.png",
    width:50,
    height:50,
	top:50
});

var platformNamelbl = Titanium.UI.createLabel({
    height: 40,
    top:110,
    color: '#31363E',
    font: {fontSize:15},
    text: 'Device: ' + Titanium.Platform.model,
});

var memoryUsagelbl = Titanium.UI.createLabel({

    height:40,
    top:160,
    color: '#31363E',
    font: {fontSize:15},
    text: 'Free RAM: ' + Math.round(Titanium.Platform.availableMemory / 1024) + 'mb',

});

if(Titanium.Network.online)
{
    text_internet_status = 'Internet via ' + Titanium.Network.networkTypeName;
}
else
{
    text_internet_status = 'No Internet Access';
}

var internetStatuslbl = Titanium.UI.createLabel({
    height:40,
    top:210,
    color: '#31363E',
    font: {fontSize:15},
    text: text_internet_status,
});

var macAddresslbl = Titanium.UI.createLabel({
    height:40,
    top:260,
    color: '#31363E',
    font: {fontSize:15},
    text: 'MAC Address: ' + Titanium.Platform.macaddress
});

var cpuInfolbl = Titanium.UI.createLabel({
    height:40,
    top:310,
    color: '#31363E',
    font: {fontSize:15},
    text: Titanium.Platform.ostype + ' CPU',
});

var versionlbl = Titanium.UI.createLabel({
    height:40,
    top:360,
    color: '#31363E',
    font: {fontSize:15},
    text: 'Android: ' + Titanium.Platform.version,
});

// create getVersionBtn button
var getVersionBtn = Ti.UI.createButton({
    title:'Get DokuWiki version',
    width:160,
    height:35,
    top:405,
	left:65
});

// create label 
var traceMe = Titanium.UI.createLabel({
    text:'this text will be replaced with the version',
    top:440,
    left:10,
    color:'#31363E'
});

// add event listener to the getVersionBtn button
getVersionBtn.addEventListener('click', function(){
    var xhr = Ti.Network.createHTTPClient();

  	xhr.setTimeout(40000);
	
	xhr.onload = function() {
		Ti.API.info(this.responseText);       
        var doc = this.responseXML.documentElement;
        var items = doc.getElementsByTagName('value');
        var item = items.item(0);
        var dokuVersion = item.getElementsByTagName("string").item(0).text;
		traceMe.color = 'green';
		traceMe.text = 'Dokuwiki version: ' + dokuVersion;	
	};

	xhr.open('POST', 'http://10.0.2.2:8081/dokuwiki/lib/exe/xmlrpc.php');
	xhr.setRequestHeader('Content-Type', 'text/xml');
    xhr.send('<methodCall><methodName>dokuwiki.getVersion</methodName><params></params></methodCall>');	
	
	xhr.onerror = function ()
    {
        traceMe.color = 'red';
        traceMe.text = 'Check your service url ' + this.status;
    };

});


win.add(appTitle);
win.add(view);
win.add(platformNamelbl);
win.add(memoryUsagelbl);
win.add(internetStatuslbl);
win.add(macAddresslbl);
win.add(cpuInfolbl);
win.add(versionlbl);
win.add(getVersionBtn);
win.add(traceMe);

// open window
win.open();
