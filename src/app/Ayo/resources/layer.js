var vectorLayer = new ol.layer.Vector({
  source: new ol.source.Vector()
});
var basemap = new ol.layer.Tile({
    source: new ol.source.OSM(),
    name: 'Basemap'
});

var selectproperty = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#0000FF',
            width: 3
        })
      });

      var defaultproperty = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#339933',
            width: 1,
            opacity: 1
        })
      });

// Parcel layer

var parcel = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: 'https://wms.qgiscloud.com/Uyi/Ijapoqgiscloud/wms',
        params: {'LAYERS':'IJAPO'},
        serverType: 'qgis',
        crossOrigin: 'anonymous'
        }),
    name: 'Property'
    });
parcel.setVisible(true);

// proprietor layer

var proprietor = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: 'https://wms.qgiscloud.com/Uyi/Ijapoqgiscloud/wms',
        params: {'LAYERS':'IJAPO'},
        serverType: 'qgis',
        crossOrigin: 'anonymous'
				        }),
    name: 'Proprietor'
    });
proprietor.setVisible(false);

var ol3_vector = new ol.layer.Vector({
	id: 'propertygeo',
    source: new ol.source.Vector({
    url: 'IJAPO.geojson',
    format: new ol.format.GeoJSON()	
}),
    style: defaultproperty,
	name: 'Ijapo'
});

ol3_vector.setVisible(true);

var selectInteraction = new ol.interaction.Select({
        layers: function (layer) {
          return layer.get('id') == 'propertygeo';
        },
        style: selectproperty
      });


var layers = [basemap, proprietor, parcel];
// ----- center -----
var center = [580009.06, 811491.03];

// ----- view -----
var view = new ol.View({
    center: center,
    zoom: 17
});

// ----- map -----
var map = new ol.Map({
    layers: layers,
    view: view,
    target: 'map'
    });
// --- adding the vector layer separate from layer = layers above
// --- this is to enable get info for only those layers in below
map.addLayer(ol3_vector);


	// ----- Layer visibilty option-----
$(document).ready(function(){
    function showprop()  
          {if (proprietor.getVisible() == true) 
         {proprietor.setVisible(false);}  
         else  
          {proprietor.setVisible(true);}}
    function showparcel()  
          {if (parcel.getVisible() == true) 
         {parcel.setVisible(false);}  
         else  
          {parcel.setVisible(true);}}
$("#displayprop").on("change", showprop);
$("#disparcel").on("change", showparcel);
});

// this will help when geting feature info for vector layers (not being used now)

map.getInteractions().extend([selectInteraction]);
 var displayFeatureInfo = function(pixel) {
        var features = [];
        map.forEachFeatureAtPixel(pixel, function(feature, layer) {
          features.push(feature);
        });
		
 var container = document.getElementById('info');
        if (features.length > 0) {
          var info = [];
          for (var i = 0, ii = features.length; i < ii; ++i) {
            info.push(features[i].get('address'));
          }
          container.innerHTML = info.join(', ') || '(unknown)';
        } else {
          container.innerHTML = '&nbsp;';
        }
      };
//if only vector feature
  /*    map.on('click', function(evt) {
        var pixel = evt.pixel;
        displayFeatureInfo(pixel);
      }); */
/*
// if vector and raster (wms)
	var viewProjection = view.getProjection();
    var viewResolution = view.getResolution();	  
 map.on('click', function(evt) {
      var url = '';
	  document.getElementById('info').innerHTML ='';
	  if (parcel.getVisible(true)){
	  url = parcel.getSource().getGetFeatureInfoUrl(evt.coordinate, viewResolution, view.getProjection(), {
                'INFO_FORMAT': 'text/html',
                    'FEATURE_COUNT': '300'
		            });
      if (url) {
        document.getElementById('info').innerHTML +=
                    '<iframe src="' + url + '" style="height: 375px; width: 100%" frameborder="no"></iframe>';
            }
	  }
	  else{
	// for the vector feature
		 var pixel = evt.pixel;
        displayFeatureInfo(pixel); 
	  }
    });*/

// WMS feature info only
	
map.on('singleclick', function (evt1) {
    document.getElementById('info').innerHTML = '';
    var viewResolution = /** @type {number} */
    (view.getResolution());
    var url = '';
    document.getElementById('info').innerHTML ='';
    layers.forEach(function (layer, i, layers) {
        if (layer.getVisible() && layer.get('name')!='Basemap') {
            url = layer.getSource().getGetFeatureInfoUrl(evt1.coordinate, viewResolution, view.getProjection(), {
                'INFO_FORMAT': 'text/html',
                    'FEATURE_COUNT': '300'
		            });
            if (url) {
                document.getElementById('info').innerHTML +=
                    '<iframe src="' + url + '" style="height: 500px; width: 100%" frameborder="no" id="iframee"></iframe>';
            }
        }
    });

});
	
// To measure

var measurementRadios = $('[type=radio]');
var resultElement = $('#js-result');
var measuringTool;

var enableMeasuringTool = function() {
  map.removeInteraction(measuringTool);

  var geometryType = measurementRadios.filter(':checked').val();
  var html = geometryType === 'Polygon' ? '<sup>2</sup>' : '';

  measuringTool = new ol.interaction.Draw({
    type: geometryType,
    source: vectorLayer.getSource()
  });

  measuringTool.on('drawstart', function(event) {
    vectorLayer.getSource().clear();

    event.feature.on('change', function(event) {
      var measurement = geometryType === 'Polygon' ? event.target.getGeometry().getArea() : event.target.getGeometry().getLength();

      var measurementFormatted = measurement > 1000000 ? (measurement / 1000).toFixed(2) + 'km' : measurement.toFixed(2) + 'm';

      resultElement.html(measurementFormatted + html);
    });
  });

  map.addInteraction(measuringTool);
};

measurementRadios.on('change', enableMeasuringTool);

function start(){
enableMeasuringTool();
map.removeInteraction(selectInteraction);
}
function end(){
map.removeInteraction(measuringTool);
map.addInteraction(selectInteraction);
selectInteraction.getFeatures().clear();
vectorLayer.getSource().clear();}

// adding ScaleLine

var scaleline = new ol.control.ScaleLine();
map.addControl(scaleline);

// Adding mouse position

 var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        // comment the following two lines to have the mouse position
        // be placed within the map.
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
        undefinedHTML: 'Coordinate &nbsp;'
      });
	  map.addControl(mousePositionControl);
	  
// zoom to extent

var extents = map.getView().calculateExtent(map.getSize());
var zoomToExtentControl = new ol.control.ZoomToExtent({
        extent: extents,
      });
map.addControl(zoomToExtentControl);
	  
//search for plot


// does plot exist?

$(document).ready(function() {

    var names = ['AK/308/309790' ,'AK/378/548699', 'AK/198/867568','AK/143/059837' ,'AK/119/423870' ,'AK/387/358404' ,'AK/738/013490' ,'AK/120/703422' ,'AK/371/548604' ,'AK/374/268458' ,'AK/373/546354' ,'AK/375/647549' ,'AK/388/357798' ,'AK/897/356085' ,'AK/896/356085' ,'AK/394/558754' ,'AK/395/087934' ,'AK/390/435796' ,'AK/391/548040' ,'AK/377/536786' ,'AK/376/386709' ,'AK/393/433657' ,'AK/389/598644' ,'AK/386/650899' ,'AK/387/548905' ,'AK/384/438765' ,'AK/385/679402' ,'AK/388/385966' ,'AK/897/356085' ,'AK/366/596084' ,'AK/381/589544' ,'AK/385/548995' ,'AK/386/348500' ,'AK/383/458993' ,'AK/384/547904' ,'AK/382/058494' ,'AK/379/547994' ,'AK/380/579490' ,'AK/368/547273' ,'AK/364/386375' ,'AK/365/345864' ,'AK/363/435874' ,'AK/367/356085' ,'AK/543/569873' ,'AK/372/893344' ,'AK/714/554875' ,'AK/713/474774' ,'AK/712/374873' ,'AK/703/674876' ,'AK/701/338765' ,'AK/700/438765' ,'AK/702/674876' ,'AK/707/374879' ,'AK/706/474878' ,'AK/705/574877' ,'AK/704/674876' ,'AK/827/284090' ,'AK/826/284090' ,'AK/825/484090' ,'AK/824/484090' ,'AK/831/284090' ,'AK/467/947335' ,'AK/463/068477' ,'AK/278/094307' ,'AK/965/847400' ,'AK/468/583523' ,'AK/235/587904' ,'AK/467/589430' ,'AK/456/468399' ,'AK/859/697009' ,'AK/279/597305' ,'AK/978/755679' ,'AK/696/489956'];

    $('#check-and-search').click(function() {
        var name = $('#plotselect').val();
        if (jQuery.inArray(name, names)!='-1') {
            selectplot();
			clearhtml();
			validid();
        } else {
			clearvalid();
            notvalid();
			selectInteraction.getFeatures().clear();
        }
    });
});
	  
function selectplot(){ 
            var divisionUser = document.getElementById('plotselect').value;
//
            var selectedFeatures = selectInteraction.getFeatures();                                
            selectedFeatures.clear();
//	identify the layer we want to get features in this case it is ol3_vector 
            var features = ol3_vector.getSource().getFeatures();

            if(features){
                  for(i=0;i<features.length;i++){
                                            if(features[i].get('C of O No.')==divisionUser){                                              

                                                        feature= features[i];                                                                                                                   
                                                        selectedFeatures.push(feature);                                                             
                                                                                                                                                                                //map.zoomToExtent(features[i].getDataExtent());

                                                        var polygon = selectedFeatures.getArray();
                                                        var extent = polygon[0].getGeometry().getExtent();

                                                        var size = (map.getSize());
                                                        view.fit(
                                                        extent,
                                                        size
                                                        );

                                                        map.getView().fit(extent, map.getSize());                                                                                                               
                                                         }
                                                    }                                                                           
                            }                                                                                                                                           
                        }                                                                             
function notvalid(){
	var divisionUser = document.getElementById('plotselect').value;
	alert("You typed in an invalid Plot Id");
	document.getElementById("alertbo").style.display = "";
	document.getElementById("wrongid").innerHTML = divisionUser;	
	
}

function clearhtml(){
	document.getElementById("alertbo").style.display = "none";
}


function validid(){
	var divisionUser = document.getElementById('plotselect').value;
	document.getElementById("alerteds").style.display = "";
	document.getElementById("rightid").innerHTML = divisionUser;	
	
}
function clearvalid(){
	document.getElementById("alerteds").style.display = "none";
}