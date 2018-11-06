import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Data {
  cooperativa: string;
  conta: string;
  cliente: string;
  proposta: string;
  data: string;
}

export interface Metrics {
  aguardando: string;
  disponiveis: string;
  analise: string;
  finalizado: string;
}


@Component({
  selector: 'app-gac-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class GacHomeComponent implements OnInit {

  pageData: any;
  headerData: any;
  metrics: any;
  qtdDisponiveis: number;
  showAnalysis = false;

  aguardando = 'orange';
  disponiveis = 'blue';
  analise = 'yellow';
  finalizado = 'green';

  constructor(private http: HttpClient) { }

  /**
  * changeMetrics
  */
  public changeMetrics() {
    this.http.get(`http://localhost:8000/gac/json/disponiveis/count`)
    .subscribe(data => {
      this.qtdDisponiveis = data.qtd;
    });
    setTimeout(() => {
      this.changeMetrics();
    }, 5000);
  }

  /**
  * changeView
  */
  public changeView(page: string) {
    this.aguardando = 'gray';
    this.disponiveis = this.aguardando;
    this.analise = this.disponiveis;
    this.finalizado = this.analise;

    this.http.get(`http://localhost:8000/gac/json/disponiveis/header`)
    .subscribe(data => {
      this.headerData = data;
    });

    this.http.get(`http://localhost:8000/gac/json/disponiveis/body`)
    .subscribe(data => {
      this.pageData = data;
    });

    if (page === 'aguardando') {
      this.showAnalysis = false;
      this.aguardando = 'orange';
    }
    if (page === 'disponiveis') {
      this.showAnalysis = true;
      this.disponiveis = 'blue';
    }
    if (page === 'analise') {
      this.showAnalysis = false;
      this.analise = 'yellow';
    }
    if (page === 'finalizado') {
      this.showAnalysis = false;
      this.finalizado = 'green';
    }
  }

  ngOnInit() {
    this.qtdDisponiveis = 0;
    this.changeMetrics();
    this.changeView('disponiveis');
  }

}
