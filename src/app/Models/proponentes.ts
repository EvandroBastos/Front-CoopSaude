import { GrauInstrucao } from "../enums/grau-instrucao.enum";
import { TipoEndereco } from "../enums/tipo-endereco.enum";
import { TipoSanguineo } from "../enums/tipo-sanguineo.enum";

export interface Telefone {
  tipoTelefone: string;
  ddd?: string | null;
  numero?: string | null;
  id: string;
}

export interface Email {
  tipoEmail: string;
  endereco: string; // Deve existir essa propriedade
  id: string;
}

export interface Filiacao {
  nomePai: string | null;
  nomeMae: string | null;
  pessoaId?: string;
}

export interface Documentos {
  tipoDocumento: string;
  numero: string;
  orgExpedidor?: string;
  ufOrgExpedidor?: string;
  dataExpedicao?: string | null;
  serie?: string;
  pessoaId?: string;
}

export interface Anexo {
  id?: string;              // ID único do arquivo (vindo do backend)
  nome: string;             // Nome do arquivo no backend
  nomeDocumento: string;    // Nome personalizado do documento
  pessoaId?: string;        // ID da pessoa associada ao arquivo
  caminho?: string;         // Caminho do arquivo no servidor
  download?: string;        // URL para baixar o arquivo
  itemArquivo?: File;       // Arquivo físico
  responsavel?: string;
  tipoAnexo?: string;
  dataRegistro?: Date;         // Data de criação (Novo Campo)
  dataAtualizacao?: Date;      // Data de atualização (Novo Campo)
}



export interface Proponentes {
  id?: string;
  nome: string;
  sexo: string;
  estadoCivil: string;
  dataNascimento?: Date | null;
  dataFalecimento?: Date | null;
  tipoSanguineo?: string;
  naturalidade?: string;
  nacionalidade?: string;
  cidadeNaturalidade?: string;
  grauInstrucao?: string;
  comunhaoDeBens?: string;
  filiacao?: {
    nomePai: string;
    nomeMae: string;
  };
  endereco?: {
    cep: string;
    tipoEndereco: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  documentos?: Documentos[];
  telefones?: Telefone[];
  emails?: Email[];
  arquivos?: Anexo[]; // Incluído para anexos

  /** Adicionado para controle de seleção na lista */
  selecionado?: boolean;
}
