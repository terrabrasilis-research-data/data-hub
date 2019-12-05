import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
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
    {"group_id": 1, "name": "LabISA", "authors": ["Jairo Francisco","Cornils Astrid"], "year": 2019, "abstract": "O Laboratório de Instrumentação de Sistemas Aquáticos (LabISA) foi criado no final de 2013 por um grupo de pesquisadores das divisões de Sensoriamento Remoto (DSR) e de Processamento de Imagens (DPI) da Coordenação de Observação da Terra (OBT) do Instituto Nacional de Pesquisas Espaciais (INPE). Ele foi motivado pelo aumento no número de estudos voltados à aplicações de sensoriamento remoto para estimativa de propriedades físicas, biológicas e químicas de águas continentais, por ganhos tecnológicos recentes e pela demanda crescente do uso racional da água doce.", "image": "https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg"},
    {"group_id": 2, "name": "LiSS", "authors": ["Cornils Astrid"], "year": 2018, "abstract": "O Laboratório de Investigação Sistemas Socioambientais (LiSS) é um dos laboratórios que compõe a Coordenação-Geral de Observação da Terra OBT-INPE. Ele tem como objeto estudar a influencia das atividade antrópicas nas mudanças de uso e cobertura da Terra. A principal área de estudo do LiSS é a Amazônia Legal, porém pesquisas também vem sendo feitas na região do Vale Paraibano (SP) e no bioma do Pantanal.", "image": "https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg"},
    {"group_id": 3, "name": "LAF", "authors": ["Krahl Guilherme", "Jairo Francisco","Cornils Astrid"], "year": 2017, "abstract": "O LAF é um grupo de pesquisa formado por pessoas com conhecimento das áreas de sensoriamento remoto, computacão, geografia, estatística, agricultura, floresta e biologia, entre outras. O laboratório se envolve basicamente em atividades relacionadas com mapeamento e monitoramento ambiental. Desta forma, o Laboratório gera tanto dados matriciais, vetorias, tabulares e programas para manipular os dados.", "image": "https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg"},
    {"group_id": 4, "name": "TREES", "authors": ["Francisco Jairo ","Cornils Astrid"], "year": 2016, "abstract": "TREES laboratory is a research group led by Dr Luiz Aragão. The group was created in 2009 when Dr Aragão moved from the Environmental Change Institute, University of Oxford to the School of Life and Environmental Sciences, University of Exeter in UK. Dr Aragão is now based at the National Institute for Space Research in Brazil, the current headquarters of TREES.", "image": "https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg"},
    {"group_id": 5, "name": "LOA", "authors": ["Astrid Cornils"], "year": 2015, "abstract": "Laboratório de Estudos do Oceano e da Atmosfera (LOA) tem suas principais linhas de pesquisa voltadas ao estudo da física do oceano, física da atmosfera e da interação entre estes dois meios. O LOA integra várias projetos multi-institucionais de pesquisa. Realiza  e apoia campanhas de coletas de dados em cruzeiros oceanográficos no Atlântico Tropical, Atlântico Sul e Antártica (Oceano Austral). Associado a estas observações in situ, muitos estudos sobre as trocas de momentum, calor e CO2 na interface oceano-atmosfera são desenvolvidos.", "image": "https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg"} ,
    {"group_id": 6, "name": "MOceanS", "authors": ["Astrid Cornils"], "year": 2015, "abstract": "O laboratório multiusuário de Monitoramento Oceânico por Satélite (MOceanS) apoia a coleta de dados sobre propriedades bio-ópticas de sistemas aquáticos oceânicos, costeiros e continentais, gerando informações necessárias à caracterização espaço-temporal destes ecossistemas, ao monitoramento da qualidade da água e atividades de exploração de óleo, gás e recursos renováveis no oceano.", "image": "https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg"}]  
}

export interface Group {
  group_id: number;
  authors: Array < string >;
  name: string;
  year: number;
  abstract: string;
  image: string;
}