import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Clipboard} from 'ts-clipboard';

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
   
   CopyBibTex(id: number){
    let  data = ELEMENT_DATA[id-1];
    let BibTex = '@proceedings{'+ data.id +', \ntitle\t = {'+data.title+'}, \neditor\t = {'+data.author+'},   \nyear\t = {'+data.year+'}, \nDOI\t = {'+data.DOI+'} \n}';
    Clipboard.copy(BibTex);
   }
   
   SaveDataset(id: number){
     console.log(id)
   }

   PreviewAbstract(abstract: string){
    console.log(abstract)
   }

   filterChange() {
    this.dataSource.data = ELEMENT_DATA;
    for (let i = 0; i < this.years.length; i++) {
      if (this.filterYear[this.years[i].name] != false) {
        this.dataSource.data = this.dataSource.data.filter(x => (x.year == this.years[i].name) )
      } else {
      }
    }
    for (let i = 0; i < this.categories.length; i++) {
        if (this.filterCategory[this.categories[i].name] != false) {
            this.dataSource.data = this.dataSource.data.filter(x => (x.categories.includes(this.categories[i].name)))
        } else {

        }
      }
    for (let i = 0; i < this.repositories.length; i++) {
        if (this.filterRepository[this.repositories[i].name] != false) {
            this.dataSource.data = this.dataSource.data.filter(x => (x.repositorie == this.repositories[i].name) )
        } else {

        }
      }
    for (let i = 0; i < this.filetypes.length; i++) {
        if (this.filterFiletypes[this.filetypes[i].name] != false) {
            this.dataSource.data = this.dataSource.data.filter(x => (x.filetypes.includes(this.filetypes[i].name)))
        } else  {

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
  id: number;
  title: string;
  year: string;
  author: Array < string > ;
  abstract: string;
  categories: Array < string > ;
  size: number;
  repositorie: string;
  DOI: string;
  filetypes:  Array < string > 
}

const ELEMENT_DATA: Element[] = [
  {id: 1, title: 'Current measurements at Langseth/Gakkel Ridge in the central Arctic with Lowered ADCP during POLARSTERN cruise', year: '2015', author: ["Walter, M","Köhler, J"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 4, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904373", categories: ['Chemistry ','Lakes & Rivers'], repositorie: "ODP", filetypes: ['TIF']},
  {id: 2, title: 'Sedimentology, geochemistry and winter se ice concentration from the western Amundsen Sea, Antarctica', year: '2018', author: ["Lamping, N","Müller, J","Esper, O et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 3, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Human Dimensions','Ecology'], repositorie: "AWI_Paleo", filetypes: ['CSV','SHP']},
  {id: 3, title: 'Long chain alkyl diol, GDGT, and XRF data from Amazon River suspended sediments, tropical Atlantic', year: '2018', author: ["Häggi, C","Schefuß, E","Sawakuchi, AO et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Atmosphere','Chemistry'], repositorie: "MARUM", filetypes: ['XLS']},
  {id: 4, title: 'Stable water isotope data of ice wedges at the Batagay megaslump and the Adycha River', year: '2019', author: ["Opel, T","Murton, JB","Wetterich, S et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 2, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Atmosphere','Ecology'], repositorie: "ODP", filetypes: ['XLS','TIF']},
  {id: 5, title: 'Stable carbon isotope ratios of archaeal glycerol dibiphytanyl glycerol tetraether', year: '2016', author: ["Hurley, SJ","Close, HG","Elling, FJ et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 8, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Atmosphere','Agriculture '], repositorie: "AWI_Paleo", filetypes: ['XLS']},
  {id: 6, title: 'Depth-related differences in archaeal populations impact the isoprenoid tetraether', year: '2016', author: ["Besseling, M","Hopmans, EC","Koenen, M et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 9, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Lakes & Rivers','Oceans'], repositorie: "ODP", filetypes: ['CSV','SHP']},
  {id: 7, title: 'Peat parameters, age model, elemental concentrations and grain size data from the Laphroaig', year: '2017', author: ["Kylander, M","Söderlindh, J","Schenk, F et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 1, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Human Dimensions ','Geophysics'], repositorie: "MARUM", filetypes: ['XLS']},
  {id: 8, title: 'Geochemical data from the Ebberston 87 Core Cleveland Basin, Yorkshire, UK', year: '2017', author: ["Atar, E; März, C","Aplin, AC et al. "], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 2, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Land Surface','Ecology'], repositorie: "AWI_Paleo", filetypes: ['XLS','TIF']},
  {id: 9, title: 'ODP 763A pollen and leaf wax n-alkane compound distributions and isotopes', year: '2018', author: ["Andrae, JW","McInerney, FA","Polissar, PJ et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 3, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Agriculture ','Lakes & Rivers'], repositorie: "MARUM", filetypes: ['XLS','SHP']},
  {id: 10, title: 'Abundance, primary production rates and net calcification rates of Tridacna maxima giant clams', year: '2018', author: ["Rossbach, S","Saderne, V","Anton, A et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Chemistry','Oceans'], repositorie: "ODP", filetypes: ['SHP']},
  {id: 11, title: 'Time series of basal melt rates of the Roi Baudouin Ice Shelf, Antarctica', year: '2015', author: ["Sun, S", "Hattermann, T","Pattyn, F et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Atmosphere','Geophysics'], repositorie: "AWI_Paleo", filetypes: ['TIF']},
  {id: 12, title: 'Biomarkers (TEX86), planktic isotopes and XRF records of IODP Site', year: '2015', author: ["De Vleeschouwer, D", "Petrick, BF","Martínez‐García, A"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Agriculture ','Lakes & Rivers'], repositorie: "ODP", filetypes: ['XLS','SHP','SHP']},
  {id: 13, title: 'Age determination, stable carbon, and hydrogen isotope composition', year: '2019', author: ["Miller, C", "Finch, JM", "Hill, T et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 10, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Land Surface','Geophysics'], repositorie: "ODP", filetypes: ['XLS']},
  {id: 14, title: 'Trace metal geochemistry from gravity corers of SONNE cruise SO242/1 at the DISCOL area, Peru Basin', year: '2017', author: ["Paul, SAL", "Koschinsky, A"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 7, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Land Surface','Ecology'], repositorie: "AWI_Paleo", filetypes: ['CSV']},
  {id: 15, title: 'Calcareous nannofossils absolute abundance and accumulation rates', year: '2017', author: ["Suchéras-Marx, B", "Mattioli, E", "Allemand, P et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Human Dimensions','Oceans'], repositorie: "MARUM", filetypes: ['XLS','SHP']},
  {id: 16, title: 'Profile of vertical fish echo sounding with Simrad EK60', year: '2016', author: ["Veloso-Alarcón, ME", "Jansson, P", " De Batist M et al."], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 1, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Lakes & Rivers','Geophysics'], repositorie: "AWI_Paleo", filetypes: ['CSV','SHP']},
  {id: 17, title: 'Interaction of a deep-sea current with a blind submarine canyon Mar del Plata Canyon, Argentina', year: '2019', author: ["Warratz, G"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.", size: 4, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Human Dimensions','Chemistry '], repositorie: "ODP", filetypes: ['XLS']},
  
];