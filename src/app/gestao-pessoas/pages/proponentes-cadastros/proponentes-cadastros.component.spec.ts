import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaDetalhesComponent } from './pessoa-detalhes.component';

describe('PessoaDetalhesComponent', () => {
  let component: PessoaDetalhesComponent;
  let fixture: ComponentFixture<PessoaDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaDetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
