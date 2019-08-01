import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.scss']
})

export class DatasetsComponent implements OnInit {

  displayedColumns = ['dataset'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  filterYear = {}
  filterCategory = {}
  filterRepository = {}
  filterFiletypes = {}
 
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  form: FormGroup;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  years = [
    { id: 1, name: '2019' },
    { id: 2, name: '2018' },
    { id: 3, name: '2017' },
    { id: 4, name: '2016' },
    { id: 5, name: '2015' }
  ];

  categories = [
    { id: 1, name: 'Chemistry' },
    { id: 2, name: 'Oceans' },
    { id: 3, name: 'Atmosphere' },
    { id: 4, name: 'Ecology' },
    { id: 5, name: 'Land Surface' },
    { id: 6, name: 'Geophysics' },
    { id: 7, name: 'Lakes & Rivers' },
    { id: 8, name: 'Human Dimensions' },
    { id: 9, name: 'Agriculture' }
   ];
   
   repositories = [
    { id: 1, name: 'ODP' },
    { id: 2, name: 'AWI_Paleo' },
    { id: 3, name: 'MARUM' }
   ];

   filetypes = [
    { id: 1, name: 'XLS' },
    { id: 2, name: 'CSV' },
    { id: 3, name: 'SHP' },
    { id: 4, name: 'TIF' }
   ];
   
   ELEMENT_DATA = this.ELEMENT_DATA;

   filterChange() {
       for (let i = 0; i < this.years.length; i++) {
           if (this.filterYear[this.years[i].name] != false) {
   
               //let FILTERED_ELEMENT_DATA = ELEMENT_DATA.filter(x =>
               //    (x.years.includes(this.years[i].name))
               //);
   
               console.log('Years ' + this.years[i].name + ": TRUE") // debbug
               //console.log(FILTERED_ELEMENT_DATA.length) // debbug
   
           } else {
   
               console.log('Years ' + this.years[i].name + ": FALSE") // debbug
   
           }
   
       }

       for (let i = 0; i < this.categories.length; i++) {
           if (this.filterCategory[this.categories[i].name] != false) {
   
               //let FILTERED_ELEMENT_DATA = ELEMENT_DATA.filter(x =>
               //    (x.categories.includes(this.categories[i].name))
               //);
   
               console.log('Categories ' + this.categories[i].name + ": TRUE") // debbug
               //console.log(FILTERED_ELEMENT_DATA.length) // debbug
   
           } else {
   
               console.log('Categories ' + this.categories[i].name + ": FALSE") // debbug
   
           }
   
       }

       for (let i = 0; i < this.repositories.length; i++) {
           if (this.filterRepository[this.repositories[i].name] != false) {
   
               //let FILTERED_ELEMENT_DATA = ELEMENT_DATA.filter(x =>
               //    (x.repositories.includes(this.repositories[i].name))
               //);
   
               console.log('Repositories ' + this.repositories[i].name + ": TRUE") // debbug
               //console.log(FILTERED_ELEMENT_DATA.length) // debbug
   
           } else {
   
               console.log('Repositories ' + this.repositories[i].name + ": FALSE") // debbug
   
           }
   
       }

       for (let i = 0; i < this.filetypes.length; i++) {
           if (this.filterFiletypes[this.filetypes[i].name] != false) {
   
               //let FILTERED_ELEMENT_DATA = ELEMENT_DATA.filter(x =>
               //    (x.filetypes.includes(this.filetypes[i].name))
               //);
   
               console.log('Filetypes ' + this.filetypes[i].name + ": TRUE") // debbug
               //console.log(FILTERED_ELEMENT_DATA.length) // debbug
   
           } else {
   
               console.log('Filetypes ' + this.filetypes[i].name + ": FALSE") // debbug
   
           }
   
       }
   }

   constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      years: new FormArray([]),
      categories: new FormArray([]),
      repositories: new FormArray([]),
      filetypes: new FormArray([]),
    });

    this.addCheckboxes();
  }

  private addCheckboxes() {

    this.categories.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.categories as FormArray).push(control);
    });

    this.years.map((o, k) => {
      const control = new FormControl(k === 0); // if first item set to true, else false
      (this.form.controls.years as FormArray).push(control);
    });

    this.repositories.map((o, l) => {
      const control = new FormControl(l === 0); // if first item set to true, else false
      (this.form.controls.repositories as FormArray).push(control);
    });

    this.filetypes.map((o, m) => {
      const control = new FormControl(m === 0); // if first item set to true, else false
      (this.form.controls.filetypes as FormArray).push(control);
    });
  }

  ngOnInit() {
      
    this.years.forEach(obj => {
      this.filterYear[obj.name] = false
    })
    this.categories.forEach(obj => {
      this.filterCategory[obj.name] = false
    })
    this.repositories.forEach(obj => {
      this.filterRepository[obj.name] = false
    })
    this.filetypes.forEach(obj => {
      this.filterFiletypes[obj.name] = false
    })

    }
}

export interface Order {
  value: string;
  viewName: string;
}

export interface Element {
  title: string;
  year: number;
  author: Array < string > ;
  abstract: string;
  categories: Array < string > ;
  size: number;
  repositorie: string;
  DOI: string;
  filetypes:  Array < string > 
}

const ELEMENT_DATA: Element[] = [
  {title: 'Current measurements at Langseth/Gakkel Ridge in the central Arctic with Lowered ADCP during POLARSTERN cruise PS101 ARK-XXX/3 in 2016', year: 2015, author: ["Walter, M","Köhler, J"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904373 ", categories: ['Atmosphere','Geophysics'], repositorie: "ODP", filetypes: ['TIF']},
  {title: 'Sedimentology, geochemistry and winter se ice concentration reconstruction for sediment core PS69/2741-1 from the western Amundsen Sea, Antarctica', year: 2018, author: ["Lamping, N","Müller, J","Esper, O et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "AWI_Paleo", filetypes: ['CSV','SHP']},
  {title: 'Long chain alkyl diol, GDGT, and XRF data from Amazon River suspended sediments, tropical Atlantic marine sediments and gravity core GeoB16224-1', year: 2018, author: ["Häggi, C","Schefuß, E","Sawakuchi, AO et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "MARUM", filetypes: ['XLS']},
  {title: 'Stable water isotope data of ice wedges at the Batagay megaslump and the Adycha River, including other Siberian ice-wedge sites for regional comparison', year: 2019, author: ["Opel, T","Murton, JB","Wetterich, S et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "ODP", filetypes: ['XLS','TIF']},
  {title: 'Stable carbon isotope ratios of archaeal glycerol dibiphytanyl glycerol tetraether (GDGT) lipids from KN210-04 Cruise in spring 2013', year: 2016, author: ["Hurley, SJ","Close, HG","Elling, FJ et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "AWI_Paleo", filetypes: ['XLS']},
  {title: 'Depth-related differences in archaeal populations impact the isoprenoid tetraether lipid composition of the Mediterranean Sea water column', year: 2016, author: ["Besseling, M","Hopmans, EC","Koenen, M et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "ODP", filetypes: ['CSV','SHP']},
  {title: 'Peat parameters, age model, elemental concentrations and grain size data from the Laphroaig Peat Bog, Islay, Southwestern Scotland', year: 2017, author: ["Kylander, M","Söderlindh, J","Schenk, F et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "MARUM", filetypes: ['XLS']},
  {title: 'Geochemical data from the Ebberston 87 Core Cleveland Basin, Yorkshire, UK', year: 2017, author: ["Atar, E; März, C","Aplin, AC et al. "], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "AWI_Paleo", filetypes: ['XLS','TIF']},
  {title: 'ODP 763A pollen and leaf wax n-alkane compound distributions and isotopes', year: 2018, author: ["Andrae, JW","McInerney, FA","Polissar, PJ et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "MARUM", filetypes: ['XLS','SHP']},
  {title: 'Abundance, primary production rates and net calcification rates of Tridacna maxima giant clams at two reefs in the Central Red Sea', year: 2018, author: ["Rossbach, S","Saderne, V","Anton, A et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "ODP", filetypes: ['SHP']},
  {title: 'Time series of basal melt rates of the Roi Baudouin Ice Shelf, Antarctica', year: 2015, author: ["Sun, S", "Hattermann, T","Pattyn, F et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "AWI_Paleo", filetypes: ['TIF']},
  {title: 'Biomarkers (TEX86), planktic isotopes and XRF records of IODP Site 356-U1459 Gerth Basin', year: 2015, author: ["De Vleeschouwer, D", "Petrick, BF","Martínez‐García, A"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "ODP", filetypes: ['XLS','SHP','SHP']},
  {title: 'Age determination, stable carbon, and hydrogen isotope composition of n-alkanes from Mfabeni peatland', year: 2019, author: ["Miller, C", "Finch, JM", "Hill, T et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "ODP", filetypes: ['XLS']},
  {title: 'Trace metal geochemistry from gravity corers of SONNE cruise SO242/1 at the DISCOL area, Peru Basin', year: 2017, author: ["Paul, SAL", "Koschinsky, A"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "AWI_Paleo", filetypes: ['CSV']},
  {title: 'Calcareous nannofossils absolute abundance and accumulation rates', year: 2017, author: ["Suchéras-Marx, B", "Mattioli, E", "Allemand, P et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "MARUM", filetypes: ['XLS','SHP']},
  {title: 'Profile of vertical fish echo sounding with Simrad EK60 during Jan Mayen/Helmer Hanssen and James Clark Ross cruises from 2008-2014 with links to raw data ', year: 2016, author: ["Veloso-Alarcón, ME", "Jansson, P", " De Batist M et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Atmosphere','Geophysics'], repositorie: "AWI_Paleo", filetypes: ['CSV','SHP']},
  {title: 'Interaction of a deep-sea current with a blind submarine canyon Mar del Plata Canyon, Argentina', year: 2019, author: ["Warratz, G"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Atmosphere','Geophysics'], repositorie: "ODP", filetypes: ['XLS']},
  
];