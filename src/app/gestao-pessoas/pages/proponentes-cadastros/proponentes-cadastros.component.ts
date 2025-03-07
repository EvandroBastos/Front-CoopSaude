import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Anexo, Proponentes } from '../../../Models/proponentes';
import { TipoSanguineo } from '../../../enums/tipo-sanguineo.enum';
import { TipoEndereco } from '../../../enums/tipo-endereco.enum';
import { TipoContato } from '../../../enums/tipo-contato.enum';
import { TipoComunhao } from '../../../enums/tipo-comunhao.enum';
import { UsuarioService } from '../../../services/usuario.service';
import { ArquivoService } from '../../../services/arquivo.service';
import { GrauInstrucao } from '../../../enums/grau-instrucao.enum';
import { TipoDocumento } from '../../../enums/tipo-documento.enum';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// Caminho correto para a interface
import { ActivatedRoute } from '@angular/router';



declare var bootstrap: any;

@Component({
  selector: 'app-proponente-cadastros',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // ✅ Importação corrigida
    FormsModule // ✅ Adicione esta importação para corrigir o erro do ngModel
  ],
  templateUrl: './proponentes-cadastros.component.html',
  styleUrls: ['./proponentes-cadastros.component.css']
})

export class ProponenteCadastrosComponent implements OnInit, AfterViewInit {
  proponentes: Proponentes[] = [];
  formProponente!: FormGroup;
  modalProponenteInstance: any;
  contatoSelecionado: Proponentes | null = null;
  tipoContatoSelecionado: 'telefone' | 'email' | '' = '';
  private modalInstance: any;
  // Lista para o combo de grau de instrução
  grausInstrucao: { key: string, value: string }[] = [];
  tiposSanguineo = Object.values(TipoSanguineo);
  tiposEndereco = Object.values(TipoEndereco);
  tiposDocumento: { key: string, value: number }[] = [];
  tiposContato = Object.values(TipoContato);
  TipoComunhao = TipoComunhao;
  arquivosSelecionados: Anexo[] = []; // ✅ Lista de anexos inicializada corretamente



  constructor(private usuarioService: UsuarioService, private fb: FormBuilder,private arquivoService: ArquivoService,  private route: ActivatedRoute, public dialogRef: MatDialogRef<ProponenteCadastrosComponent> ) {}

  ngOnInit(): void {
    this.carregarProponentes();
    this.inicializarFormularioProponente(); // <-- Inicializa o formulário corretamente
    this.carregarGrausInstrucao(); // <-- Carrega os valores do enum
    this.carregarTiposDocumento();
  }

    /**
 * Método chamado quando um arquivo é selecionado
 */

   // Método para selecionar arquivos antes do envio
   selecionarArquivo(event: any): void {
    const arquivos = event.target.files;
    if (arquivos.length > 0) {
      for (let i = 0; i < arquivos.length; i++) {
        const anexoForm = this.fb.group({
          nomeDocumento: ['', Validators.required], // Nome do documento digitável
          nome: [arquivos[i].name, Validators.required], // Nome real do arquivo
          itemArquivo: [arquivos[i], Validators.required] // O próprio arquivo
        });

        this.arquivos.push(anexoForm); // Adiciona ao FormArray
      }
    }
  }






  adicionarArquivos(): void {
    if (this.arquivosSelecionados.length === 0) {
      alert("Nenhum arquivo foi selecionado.");
      return;
    }
    alert(`${this.arquivosSelecionados.length} arquivo(s) adicionado(s).`);
  }

   // Método para remover arquivo da lista temporária
   removerArquivo(index: number): void {
    this.arquivos.removeAt(index);
  }







  carregarProponentes(): void {
    this.usuarioService.getProponentes().subscribe({
      next: (response) => {
        if (response && response.objetosRetorno) {
          this.proponentes = response.objetosRetorno?.flat() ?? [];
        } else {
          this.proponentes = [];
        }
      },
      error: (error) => {
        console.error('Erro ao carregar pessoas:', error);
        alert('Erro ao carregar dados das pessoas.');
      }
    });
  }

  ngAfterViewInit(): void {
    // Inicializa o modal corretamente após a view ser carregada
    const modalElement = document.getElementById('modalContatos');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }


  inicializarFormularioProponente(): void {
    this.formProponente = this.fb.group({
      nome: ['', Validators.required],
      sexo: ['', Validators.required],
      dataNascimento: [null],
      estadoCivil: ['', Validators.required],
      tipoSanguineo: [''],
      dataFalecimento: [null],
      naturalidade: [''],
      nacionalidade: [''],
      cidadeNaturalidade: [''],
      grauInstrucao: [''],
      comunhaoDeBens: [TipoComunhao.NaoInformado, Validators.required],
      filiacao: this.fb.group({
        nomePai: [''],
        nomeMae: ['']
      }),
      endereco: this.fb.group({
        cep: [''],
        tipoEndereco: [TipoEndereco.Rua, Validators.required],
        logradouro: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        cidade: [''],
        estado: ['']
      }),
      documentos: this.fb.array([]),
      telefones: this.fb.array([]),
      emails: this.fb.array([]),
      arquivos: this.fb.array([]) // ✅ Adicionando como FormArray
    });
  }
  get documentos(): FormArray {
    return this.formProponente.get('documentos') as FormArray;
  }
  // Método auxiliar para obter os anexos como um FormArray
  get arquivos(): FormArray {
    return this.formProponente.get('arquivos') as FormArray;
  }




carregarTiposDocumento(): void {
  this.tiposDocumento = Object.keys(TipoDocumento)
    .filter(key => isNaN(Number(key))) // Filtra somente as chaves (nomes) do enum
    .map(key => {
      return { key: key, value: TipoDocumento[key as keyof typeof TipoDocumento] };
    });
}

adicionarDocumento(): void {
  this.documentos.push(this.fb.group({
    tipoDocumento: ['', Validators.required],
    numero: ['', Validators.required],
    orgExpedidor: [''],
    ufOrgExpedidor: [''],
    dataExpedicao: [''],
    serie: ['']
  }));
}

removerDocumento(index: number) {
  this.documentos.removeAt(index);
}

// Métodos para manipular Telefones
get telefones() {
  return this.formProponente.get('telefones') as FormArray;
}

adicionarTelefone() {
  const telefoneForm = this.fb.group({
    tipoTelefone: ['', Validators.required],
    ddd: ['', Validators.required],
    numero: ['', Validators.required]
  });
  this.telefones.push(telefoneForm);
}

removerTelefone(index: number) {
  this.telefones.removeAt(index);
}

// Métodos para manipular E-mails
get emails() {
  return this.formProponente.get('emails') as FormArray;
}

adicionarEmail() {
  const emailForm = this.fb.group({
    tipoEmail: ['', Validators.required],
    endereco: ['', [Validators.required, Validators.email]]
  });
  this.emails.push(emailForm);
}

removerEmail(index: number) {
  this.emails.removeAt(index);
}
  // Método para selecionar um arquivo



carregarGrausInstrucao(): void {
  this.grausInstrucao = Object.keys(GrauInstrucao)
    .filter(key => isNaN(Number(key))) // Filtra somente as chaves (nomes) do enum
    .map(key => {
      return { key: key, value: GrauInstrucao[key as keyof typeof GrauInstrucao] };
    });
}
fecharModalCadastro(): void {
  if (this.modalProponenteInstance) {
    this.modalProponenteInstance.hide();
  }
}

// Método para salvar o proponente junto com os arquivos
salvarProponente(): void {
  if (this.formProponente.valid) {
    const formData = new FormData();
    const proponente = this.formProponente.value;
    formData.append("proponente", JSON.stringify(proponente));

    const arquivosArray = this.formProponente.get('arquivos') as FormArray;

    arquivosArray.controls.forEach((arquivo: any) => {
      formData.append("ItemsArquivos", arquivo.value.itemArquivo);
      formData.append("NomesDocumentos", arquivo.value.nomeDocumento); // ✅ Nome personalizado
    });

    this.usuarioService.cadastrarProponente(formData).subscribe({
      next: (response) => {
        if (response && response.objetosRetorno) {
          alert("✅ Proponente cadastrado com sucesso!");
          this.formProponente.reset();
        }
      },
      error: (error) => {
        console.error("❌ Erro ao cadastrar proponente:", error);
        alert("Erro ao cadastrar proponente.");
      }
    });
  } else {
    alert("Preencha todos os campos obrigatórios.");
  }
}


// Método para realizar o upload dos arquivos após o cadastro do proponente
uploadArquivos(pessoaId: string): void {
  if (!pessoaId) {
    console.error("❌ pessoaId está indefinido. Abortando upload.");
    return;
  }

  this.arquivosSelecionados.forEach(arquivo => {
    if (!arquivo.itemArquivo) {
      console.error(`❌ Erro: Arquivo físico ausente para ${arquivo.nome}`);
      return;
    }

    const formData = new FormData();
    formData.append("ItemArquivo", arquivo.itemArquivo);  // 🔹 Envia o arquivo real
    formData.append("NomeDocumento", arquivo.nomeDocumento); // 🔹 Nome personalizado do documento
    formData.append("PessoaId", pessoaId); // 🔹 ID do proponente

    console.log(`📤 Enviando arquivo: ${arquivo.nomeDocumento} (${arquivo.nome})`);

    this.arquivoService.uploadArquivo(formData, pessoaId).subscribe({
      next: () => {
        console.log(`✅ Arquivo ${arquivo.nomeDocumento} enviado com sucesso!`);
      },
      error: (error) => {
        console.error(`❌ Erro ao enviar arquivo ${arquivo.nomeDocumento}:`, error);
      }
    });
  });

  alert("✅ Arquivos enviados com sucesso!");
  this.arquivosSelecionados = []; // 🔹 Limpa a lista após o upload
}



}




