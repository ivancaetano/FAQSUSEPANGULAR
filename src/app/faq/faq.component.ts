import { FaqService, DialogoDTO, RespostaDTO } from './../services/faq.service';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { timer } from 'rxjs';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  resposta: RespostaDTO = new RespostaDTO();
  selectedUserName: string;

  @Output() sendMessage = new EventEmitter<string>();

  @ViewChild('scrollMe', { static: false })
  respostaContainer: ElementRef<HTMLDivElement>;

  constructor(private service: FaqService) {
  }
  ngOnInit() {
    let dialogo: DialogoDTO = new DialogoDTO();
    dialogo.noUsuario = "user";
    dialogo.nuDialogo = 1;
    this.service.iniciaDialogo(dialogo).subscribe(
      (data: RespostaDTO) => {
        this.resposta = data;
      },
      error => {
        console.log(error);
      }
    );

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resposta) {
      timer(2).subscribe(() => this.scrollIntoView());
    }
  }

  responde(vrCartao: number) {
    let resposta: RespostaDTO= new RespostaDTO();
    resposta.nuSessao=this.resposta.nuSessao;
    resposta.deResposta=vrCartao.toString();
    this.service.respondeDialogo(resposta).subscribe(
      (data: RespostaDTO) => {
        data.conversas.forEach(c=>
          {
            this.resposta.conversas.push(c);
          });
        
      },
      error => {
        console.log(error);
      }
    );
  }
  private scrollIntoView() {
    if (this.respostaContainer) {
      const { nativeElement } = this.respostaContainer;
      nativeElement.scrollTop = nativeElement.scrollHeight;
    }
  }
}
