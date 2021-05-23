import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import { fromLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';
import { WFSService } from './services/wfs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tech-ol-ng';

  // Define variable to hold map component
  map: Map | undefined;
  public footer: any;
  public lyrNames: any;
  public featureCountDP: string | undefined;
  public featureCountLVOHC: string | undefined;
  public featureCountLVODBFP: string | undefined;
  public featureCountPole: string | undefined;
  public featureCountSL: string | undefined;

  constructor(private _service: WFSService) {}

  ngOnInit(): void {
    var view = new View({
      center: fromLonLat([101.49587, 3.51264]),
      zoom: 14,
    });

    /**
     * Elements that make up the popup.
     */
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
    /**
     * Create an overlay to anchor the popup to the map.
     */
    var overlay = new Overlay({
      element: container!,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    /**
     * Add a click handler to hide the popup.
     * @return {boolean} Don't follow the href.
     */
    if (closer)
      closer.onclick = function () {
        overlay.setPosition(undefined);
        if (closer) closer.blur();
        return false;
      };

    // Create a map component
    this.map = new Map({
      view: view,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      overlays: [overlay],

      target: 'ol-map',
    });

    // Define Layers from Geoserver using WMS
    var wmsSource = new TileWMS({
      url: 'http://183.82.99.134:8086/geoserver/cite/wms',
      params: {
        LAYERS:
          'cite:demand_point-Tech, cite:lv_oh_conductor-Tech, cite:lvdb_fp-Tech, cite:pole-Tech, cite:street_light-Tech',
      },
      serverType: 'geoserver',
    });

    var wmsLayer = new TileLayer({
      source: wmsSource,
    });

    // Add above defined layers to map component
    this.map.addLayer(wmsLayer);

    // Show Attribute Details using WFS
    this.map.on('click', function (event) {
      console.log('Clicked');
      var coordinate = event.coordinate;
      var viewResolution: number = /** @type {number} */ view.getResolution()!;

      var url = wmsSource.getFeatureInfoUrl(
        event.coordinate,
        viewResolution,
        'EPSG:3857',
        { INFO_FORMAT: 'text/html' }
      );
      if (url) {
        fetch(url)
          .then(function (response) {
            return response.text();
          })
          .then(function (html) {
            if (content) content.innerHTML = html;
            overlay.setPosition(coordinate);
          });
      }
    });
  }

  showFeature() {
    var footStatus = document.getElementById('foot-status');
    if(footStatus)
      footStatus.style.display = "block";

    var lyrArray = this.map?.getLayers().getArray();
    if (lyrArray) var strLayers = lyrArray[1].getProperties().source;
    this.lyrNames = [
      'demand_point',
      'lv_oh_conductor',
      'lvdb_fp',
      'pole',
      'street_light',
    ];

      this._service.getFeatureCount(this.lyrNames[0]).subscribe((res: any) => {
        var lyrProperties = res.split(' ');
        for (var lyrPrp in lyrProperties) {
          if (lyrProperties[lyrPrp].includes('numberOfFeatures')) {
            this.featureCountDP = lyrProperties[lyrPrp].split('=')[1];
            if(this.featureCountDP){
              this.featureCountDP = this.featureCountDP.replace(/"/g, '');
            }
          }
        }
      });

      this._service.getFeatureCount(this.lyrNames[1]).subscribe((res: any) => {
        var lyrProperties = res.split(' ');
        for (var lyrPrp in lyrProperties) {
          if (lyrProperties[lyrPrp].includes('numberOfFeatures')) {
            this.featureCountLVOHC = lyrProperties[lyrPrp].split('=')[1];
            if(this.featureCountLVOHC){
              this.featureCountLVOHC = this.featureCountLVOHC.replace(/"/g, '');
            }
          }
        }
      });

      this._service.getFeatureCount(this.lyrNames[2]).subscribe((res: any) => {
        var lyrProperties = res.split(' ');
        for (var lyrPrp in lyrProperties) {
          if (lyrProperties[lyrPrp].includes('numberOfFeatures')) {
            this.featureCountLVODBFP = lyrProperties[lyrPrp].split('=')[1];
            if(this.featureCountLVODBFP){
              this.featureCountLVODBFP = this.featureCountLVODBFP.replace(/"/g, '');
            }
          }
        }
      });

      this._service.getFeatureCount(this.lyrNames[3]).subscribe((res: any) => {
        var lyrProperties = res.split(' ');
        for (var lyrPrp in lyrProperties) {
          if (lyrProperties[lyrPrp].includes('numberOfFeatures')) {
            this.featureCountPole = lyrProperties[lyrPrp].split('=')[1];
            if(this.featureCountPole){
              this.featureCountPole = this.featureCountPole.replace(/"/g, '');
            }
          }
        }
      });

      this._service.getFeatureCount(this.lyrNames[4]).subscribe((res: any) => {
        var lyrProperties = res.split(' ');
        for (var lyrPrp in lyrProperties) {
          if (lyrProperties[lyrPrp].includes('numberOfFeatures')) {
            this.featureCountSL = lyrProperties[lyrPrp].split('=')[1];
            if(this.featureCountSL){
              this.featureCountSL = this.featureCountSL.replace(/"/g, '');
            }
          }
        }
      });

  }
}
