//***MODEL***

//notable chateaux and churches in auvergne france
var locations = [
  {title: 'Château de Murol', catagory: 'Château', city: 'Murol', location: {lat: 45.5783787, lng: 2.9428723}},
  {title: 'Château de Saint-Saturnin', catagory: 'Château', city: 'Saint-Saturnin', location: {lat: 45.6587347, lng: 3.0903923}},
  {title: 'Château de Tournoël', catagory: 'Château', city: 'Volvic', location: {lat: 45.8849943, lng: 3.0362263}},
  {title: 'Château de Cordès', catagory: 'Château', city: 'Orcival', location: {lat: 45.7022487, lng: 2.8371433}},
  {title: 'Château de Randan', catagory: 'Château', city: 'Randan', location: {lat: 46.016588, lng: 3.354902}},
  {title: 'Château de Villemont', catagory: 'Château', city: 'Vensat', location: {lat: 46.053864, lng: 3.196539}},
  {title: 'Château de Domeyrat', catagory: 'Château', city: 'Domeyrat', location: {lat: 45.2512838, lng: 3.5011652}},
  {title: 'Chalencon', catagory: 'Château', city: 'Saint-André-de-Chalencon', location: {lat: 45.2832171, lng: 3.9843486}},
  {title: 'Château de Polignac', catagory: 'Château', city: 'Polignac', location: {lat: 45.0689418, lng: 3.8580513}},
  {title: 'Château d\'Anjony', catagory: 'Château', city: 'Tournemire', location: {lat: 45.0542228, lng: 2.4758393}},
  {title: 'Château de Pesteils', catagory: 'Château', city: 'Polminhac', location: {lat: 44.9534898, lng: 2.5733113}},
  {title: 'Château de Chavaniac', catagory: 'Château', city: 'Chavaniac-Lafayette', location: {lat: 45.1576066, lng: 3.5769556}},
  {title: 'Château de Ravel', catagory: 'Château', city: 'Ravel', location: {lat: 45.7827212, lng: 3.3981296}},
  {title: 'Basilica of Notre-Dame du Port', catagory: 'Eglise', city: 'Clermont-Ferrand', location: {lat: 45.7806396, lng: 3.0872662}},
  {title: 'Cathédrale Notre-Dame-de-l\'Assomption', catagory: 'Eglise', city: 'Clermont-Ferrand', location: {lat: 45.778733, lng: 3.0835545}},
  {title: 'Abbaye de la Chaise-Dieu', catagory: 'Eglise', city: 'La Chaise-Dieu', location: {lat: 45.3205729, lng: 3.6942269}},
  {title: 'Cathédrale Notre-Dame-du-Puy', catagory: 'Eglise', city: 'Le Puy-en-Velay', location: {lat: 45.0456095, lng: 3.8825804}},
  {title: 'Basilique Notre-Dame d\'Orcival', catagory: 'Eglise', city: 'Orcival', location: {lat: 45.6829342, lng: 2.8393071}},
  {title: 'Basilique Saint-Julien', catagory: 'Eglise', city: 'Brioude', location: {lat: 45.2936827, lng: 3.3822924}},
  {title: 'Église Notre-Dame de Mailhat', catagory: 'Eglise', city: 'Lamontgie', location: {lat: 45.4815338, lng: 3.3139751}},
  {title: 'Abbatiale Saint Austremoine', catagory: 'Eglise', city: 'Issoire', location: {lat: 45.5435793, lng: 3.2477734}},
  {title: 'Église Notre-Dame de Saint-Saturnin', catagory: 'Eglise', city: 'Saint-Saturnin', location: {lat: 45.6602481, lng: 3.0913185}},
  {title: 'Église de Saint-Nectaire', catagory: 'Eglise', city: 'Saint-Nectaire', location: {lat: 45.5882335, lng: 2.9902858}},
  {title: 'Chapelle Sainte-Madeleine', catagory: 'Eglise', city: 'Massiac', location: {lat: 45.2705424, lng: 3.1954172}}
];

//***VIEWMODEL***

//Non-Knockout.js functions. These just set/create the map and markers on init.

//Creates markers, pushes them to the Markers array and sets them on the map.
function setMarkers(map){
  for (var i = 0; i < locations.length; i++) {
    var loc = locations[i];
    var title = loc.title;
    var position = loc.location;
    var marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: position,
      title: title,
    })
    //console.log(marker.title);
    //console.log(marker.position);
    markers.push(marker);
  }
}

//Pulls geocode from markers array and sets frame of the map to include all points
function setBoundry() {
  var frame = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    frame.extend(markers[i].position);
  }
  map.fitBounds(frame);
}

//List button toggle functionality
document.getElementById("listButton").addEventListener("click", function (toggle){
  var getPane = document.getElementById("listPane").style;
  if(getPane.width === "0px"){
    getPane.width = "20%";
  }
  else{
    getPane.width = "0px";
  }
});

// Knockout.js functions

//creates ko viewmodel
function ViewModel(){
  var self =this;
  this.filter = ko.observable();
  //pushes js array into observable array
  this.koLocations = ko.observableArray(locations);
  //search function
  this.visibleList = ko.computed(function(){
       return this.koLocations().filter(function(result){
           if(!self.filter() || result.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1)
             return result;
       });
   },this);
}

ko.applyBindings(new ViewModel());
