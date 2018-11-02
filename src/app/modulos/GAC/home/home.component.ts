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
  metrics: any;
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
    this.http.get(`http://localhost:4200/assets/json_examples/gac/home/metricas.json`)
    .subscribe(data => {
      this.metrics = data;
    });
  }

  /**
  * changeView
  */
  public changeView(page: string) {
    this.changeMetrics();

    this.aguardando = 'gray';
    this.disponiveis = this.aguardando;
    this.analise = this.disponiveis;
    this.finalizado = this.analise;

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

    this.http.get(`http://localhost:4200/assets/json_examples/gac/home/${page}.json`)
    .subscribe(data => {
      this.pageData = data;
    });
  }

  ngOnInit() {
    this.changeView('disponiveis');
  }

}
