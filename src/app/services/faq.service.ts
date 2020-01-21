import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) { }
  iniciaDialogo(dialogo: DialogoDTO) {
    
    return this.http.post(environment.endpoint + "conversa",dialogo);
  }
  respondeDialogo(resposta: RespostaDTO) {
    
    return this.http.put(environment.endpoint + "conversa",resposta);
  }
}
export class DialogoDTO {
  nuDialogo: number;
  noUsuario: string;
 
}

export interface LsCarto {
  vrCartao: string;
  deCartao: string;
}

export interface Conversa {
  deConversa: string;
  noTipoConversa: string;
  lsCartoes: LsCarto[];
}

export class RespostaDTO {
  conversas: Conversa[];
  nuSessao: number;
  deResposta:string;
}
