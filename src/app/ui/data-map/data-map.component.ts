import { Component, OnInit, Input } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { layerGroup, tileLayer, Layer, geoJSON } from 'leaflet';
import { DatasetsService } from 'src/app/pages/datasets/datasets.service';

@Component({
  selector: 'app-data-map',
  templateUrl: './data-map.component.html',
  styleUrls: ['./data-map.component.scss']
})
export class DataMapComponent implements OnInit, LeafletModule {
  
  public layersControl: any;
  resources = [];
  resources_url = "";
  resources_name = "";

  @Input() id: string;

  constructor(
    private ds: DatasetsService
  ) { }
	options = {
  };

  ngOnInit() {
    
    
    this.getDataset(this.id)

    this.layersControl = {
      baseLayers: {
        'Google Hybrid':  tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}' , { enebled: true, maxZoom: 18, attribution: '...', subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }),
        'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      },

      overlays: { 
        'Geo JSON Polygon': geoJSON(
          ({
            type: 'Polygon',
    
            coordinates: [[
              [
                -67.92626,
                6.656333333333333
              ],
              [
                -49.38799999999998,
                6.656333333333333
              ],
              [
                -49.38799999999998,
                -3.89446
              ],
              [
                -67.92626,
                -3.89446
              ],
              [
                -67.92626,
                6.656333333333333
              ]]
            ]}) as any, { style: () => ({ color: '#ff7800' })})
      }
    }
    
    this.options = 	{ 
      zoom: 4,
      center: this.layersControl.overlays['Geo JSON Polygon'].getBounds().getCenter(),
      layers: [ this.layersControl.baseLayers['Google Hybrid'], this.layersControl.overlays['Geo JSON Polygon'] ]
    }

  }

  async getDataset(id: string){

    const response = await this.ds.get_ckan_dataset(id);
    this.DATASETS = response['result'];
    this.resources = this.DATASETS['resources'];
    this.resources_url = this.resources[0]['url'].replace("SHAPE-ZIP", "JSON");
    this.resources_name = this.resources[0]['name'];

  }

  DATASETS: RootObject[] = [];
}

export interface Resource {
  mimetype: any;
  cache_url: any;
  hash: string;
  description: string;
  name: string;
  format: string;
  url: string;
  cache_last_updated: any;
  package_id: string;
  created: Date;
  state: string;
  mimetype_inner: any;
  last_modified: any;
  position: number;
  url_type: any;
  id: string;
  resource_type: any;
  size: any;
}

export interface Tag {
  vocabulary_id: any;
  state: string;
  display_name: string;
  id: string;
  name: string;
}

export interface Group {
  display_name: string;
  description: string;
  image_display_url: string;
  title: string;
  id: string;
  name: string;
}

export interface Organization {
  description: string;
  created: Date;
  title: string;
  name: string;
  is_organization: boolean;
  state: string;
  image_url: string;
  type: string;
  id: string;
  approval_status: string;
}

export interface Extra {
  key: string;
  value: string;
}

export interface RootObject {
  license_title: string;
  maintainer: string;
  relationships_as_object: any[];
  private: boolean;
  maintainer_email: any;
  num_tags: number;
  id: string;
  metadata_created: Date;
  metadata_modified: Date;
  author: string;
  author_email: string;
  state: string;
  version: any;
  creator_user_id: string;
  type: string;
  resources: Resource[];
  num_resources: number;
  tags: Tag[];
  groups: Group[];
  license_id: string;
  relationships_as_subject: any[];
  organization: Organization;
  name: string;
  isopen: boolean;
  url: any;
  notes: string;
  owner_org: string;
  extras: Extra[];
  license_url: string;
  title: string;
}
