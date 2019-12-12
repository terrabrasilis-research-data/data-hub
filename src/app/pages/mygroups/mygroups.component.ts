import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mygroups',
  templateUrl: './mygroups.component.html',
  styleUrls: ['./mygroups.component.scss']
})
export class MygroupsComponent implements OnInit  {

  id_open: number;

  constructor(private snackBar: MatSnackBar) {
   }

  ngOnInit() {
  
  }

  favorites = [
  ];

  changeText(id: number, status: boolean){

    if (status == true){
      this.id_open = id;
    } else {
      this.id_open = null;
    }
    
  }

  check(id: number){
    if (id == this.id_open){
      return true
    } else {
      return false
    }
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
 
  groups: Group[] = [
    {"group_id": 1, "name": "LabISA", "authors": ["Jairo Francisco","Cornils Astrid"], "year": 2019, "abstract": "O Laboratório de Instrumentação de Sistemas Aquáticos (LabISA) foi criado no final de 2013 por um grupo de pesquisadores das divisões de Sensoriamento Remoto (DSR) e de Processamento de Imagens (DPI) da Coordenação de Observação da Terra (OBT) do Instituto Nacional de Pesquisas Espaciais (INPE). Ele foi motivado pelo aumento no número de estudos voltados à aplicações de sensoriamento remoto para estimativa de propriedades físicas, biológicas e químicas de águas continentais, por ganhos tecnológicos recentes e pela demanda crescente do uso racional da água doce.", "image": "/assets/images/labisa.png"},
    {"group_id": 2, "name": "LiSS", "authors": ["Cornils Astrid"], "year": 2018, "abstract": "O Laboratório de Investigação Sistemas Socioambientais (LiSS) é um dos laboratórios que compõe a Coordenação-Geral de Observação da Terra OBT-INPE. Ele tem como objeto estudar a influencia das atividade antrópicas nas mudanças de uso e cobertura da Terra. A principal área de estudo do LiSS é a Amazônia Legal, porém pesquisas também vem sendo feitas na região do Vale Paraibano (SP) e no bioma do Pantanal.", "image": "/assets/images/liss.png"},
    {"group_id": 3, "name": "LAF", "authors": ["Krahl Guilherme", "Jairo Francisco","Cornils Astrid"], "year": 2017, "abstract": "O LAF é um grupo de pesquisa formado por pessoas com conhecimento das áreas de sensoriamento remoto, computacão, geografia, estatística, agricultura, floresta e biologia, entre outras. O laboratório se envolve basicamente em atividades relacionadas com mapeamento e monitoramento ambiental. Desta forma, o Laboratório gera tanto dados matriciais, vetorias, tabulares e programas para manipular os dados.", "image": "/assets/images/laf.png"}]  
}

export interface Group {
  group_id: number;
  authors: Array < string >;
  name: string;
  year: number;
  abstract: string;
  image: string;
}