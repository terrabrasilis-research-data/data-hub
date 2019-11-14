import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ViewChild} from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Clipboard } from 'ts-clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BboxComponent } from 'src/app/ui/bbox/bbox.component';
import { TintervalComponent } from 'src/app/ui/tinterval/tinterval.component';


@Component({
  selector: 'app-mydatasets',
  templateUrl: './mydatasets.component.html',
  styleUrls: ['./mydatasets.component.scss']
})
export class MydatasetsComponent implements OnInit {

  displayedColumns = ['dataset'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  size = ELEMENT_DATA.length;
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
  
  Map() {
    const dialogRef = this.dialog.open(BboxComponent, {
        data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
    });
}

Time(){
    const dialogRef = this.dialog.open(TintervalComponent, {
        data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
    });
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
   
   favorites = [
   ];

   CopyBibTex(id: number){
    this.snackBar.open("Copied to Clipboard", "", {
      duration: 2000,
    });
    let data = ELEMENT_DATA[id-1];
    let BibTex = '@proceedings{'+ data.id +', \ntitle\t = {'+data.title+'}, \neditor\t = {'+data.author+'},   \nyear\t = {'+data.year+'}, \nDOI\t = {'+data.DOI+'} \n}';
    Clipboard.copy(BibTex);
   }

   isFavorite(id: number){
    return this.favorites.some(x => x.id === id)
   } 

   SaveDataset(id: number){
     this.snackBar.open("Saved to Bookmarks", "", {
      duration: 2000,
    });
    this.favorites.push({id: id});
   }
  
   RemoveDataset(ids: number){
    this.snackBar.open("Removed from Bookmarks", "", {
     duration: 2000,
   });
   this.favorites = this.favorites.filter(x => (x.id != ids));
  }

  
   PreviewAbstract(abstract: string){
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {abstract: abstract}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    console.log(abstract)
   }

   filterChange() {
    this.dataSource.data = ELEMENT_DATA;
    this.size = this.dataSource.data.length;
    for (let i = 0; i < this.years.length; i++) {
      if (this.filterYear[this.years[i].name] != false) {
        this.dataSource.data = this.dataSource.data.filter(x => (x.year == this.years[i].name) )
        this.size = this.dataSource.data.length;
      } else {
      }
    }
    for (let i = 0; i < this.categories.length; i++) {
        if (this.filterCategory[this.categories[i].name] != false) {
            this.dataSource.data = this.dataSource.data.filter(x => (x.categories.includes(this.categories[i].name)))
            this.size = this.dataSource.data.length;
        } else {

        }
      }
    for (let i = 0; i < this.repositories.length; i++) {
        if (this.filterRepository[this.repositories[i].name] != false) {
            this.dataSource.data = this.dataSource.data.filter(x => (x.repositorie == this.repositories[i].name) )
            this.size = this.dataSource.data.length;
        } else {

        }
      }
    for (let i = 0; i < this.filetypes.length; i++) {
        if (this.filterFiletypes[this.filetypes[i].name] != false) {
            this.dataSource.data = this.dataSource.data.filter(x => (x.filetypes.includes(this.filetypes[i].name)))
            this.size = this.dataSource.data.length;
        } else  {

        }
      }
}

   constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog) {
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

export interface DialogData {
  abstract: string;
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

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'msgBox.html',
})

export class DialogContentExampleDialog {
  
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

const ELEMENT_DATA: Element[] = [
  {id: 1, title: 'Current measurements at Langseth/Gakkel Arctic with Lowered ADCP during POLARSTERN cruise', year: '2015', author: ["Walter, M","Köhler, J"], abstract: "Morphometric measurements of Fragilariopsis kerguelensis valves from a two-year time series covering the period from November 2002 to October 2004 collected by a sediment trap at 800m below the ocean surface which was moored near 54° S 140° E in ca. 2300 m water depth, close to the top of the Australia-Antarctica mid-ocean ridge.", size: 4, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904373", categories: ['Chemistry ','Lakes & Rivers'], repositorie: "ODP", filetypes: ['TIF']},
  {id: 2, title: 'Sedimentology, geochemistry and winter se ice concentration from the western Amundsen Sea, Antarctica', year: '2018', author: ["Lamping, N","Müller, J","Esper, O et al."], abstract: "The Mar del Plata (MdP) Canyon at the Argentine continental margin is incorporated into a major contourite depositional system, built by the incursion of southern-sourced water masses affecting the seafloor at different waters depths. The new sedimentological, morphological and hydro acoustic data provide novel insights.", size: 3, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259 ", categories: ['Human Dimensions','Ecology'], repositorie: "AWI_Paleo", filetypes: ['CSV','SHP']},
  {id: 3, title: 'Long chain alkyl diol, GDGT, and XRF data from Amazon River suspended sediments, tropical Atlantic', year: '2018', author: ["Häggi, C","Schefuß, E","Sawakuchi, AO et al."], abstract: "ighly dynamic environments like estuaries are home to organisms accustomed to wide fluctuations in environmental conditions. However, estuarine temperature and salinity conditions are expected to shift with climate change, potentially altering plant and animal physiology and consequently their ecological interactions.", size: 5, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Atmosphere','Chemistry'], repositorie: "MARUM", filetypes: ['XLS']},
  {id: 4, title: 'Stable water isotope data of ice wedges at the Batagay megaslump and the Adycha River', year: '2019', author: ["Opel, T","Murton, JB","Wetterich, S et al."], abstract: "Emerald Basin on the Scotian Shelf off Nova Scotia, Canada, is home to a globally unique population of the glass sponge Vazella pourtalesi. Through the analysis of both in situ photographs and trawl catch data from annual multispecies bottom-trawl surveys, we examined community composition, species density, and abundance of epibenthos and fish associated.", size: 2, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Atmosphere','Ecology'], repositorie: "ODP", filetypes: ['XLS','TIF']},
  {id: 5, title: 'Stable carbon isotope ratios of archaeal glycerol dibiphytanyl glycerol tetraether', year: '2016', author: ["Hurley, SJ","Close, HG","Elling, FJ et al."], abstract: "Kelps, perennial brown seaweeds of the order Laminariales, are foundational species in Arctic coastal ecosystems. Presently, their ability to persist under polar night conditions might be significantly affected by increasing winter temperatures. We assessed physiological parameters (photosynthesis, pigment content", size: 8, DOI: "https://doi.pangaea.de/10.1594/PANGAEA.904259", categories: ['Atmosphere','Agriculture '], repositorie: "AWI_Paleo", filetypes: ['XLS']}, 
];