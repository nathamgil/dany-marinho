/* =====================================================================
   Dany Marinho · Nails Designer — configuração
   Único arquivo que precisa ser editado para o site sair do modo de
   demonstração e entrar no ar de verdade.
   ===================================================================== */

window.TV = {

  /* ---- Negócio ---------------------------------------------------- */
  nome:       'Dany Marinho',
  slogan:     'Nails Designer',
  instagram:  'dany_.marinho',

  // WhatsApp em formato internacional, só dígitos. É o link wa.me da bio
  // do Instagram, conferido em 26/09/2026.
  whatsapp:        '5571993105246',
  whatsappVisivel: '(71) 99310-5246',

  // A CONFIRMAR: a bio só diz "Cajazeiras". Falta rua, número e ponto de referência.
  endereco: {
    linha1: 'Cajazeiras · Salvador, BA',
    linha2: 'Endereço completo enviado na confirmação',
    maps:   'https://www.google.com/maps/search/?api=1&query=Cajazeiras+Salvador+BA',
    busca:  'Cajazeiras, Salvador - BA'
  },

  /* ---- Supabase ---------------------------------------------------
     Enquanto estes dois campos estiverem vazios, o site roda em MODO
     DEMONSTRAÇÃO: a agenda funciona de verdade na tela, mas os horários
     ficam guardados só no navegador de quem está olhando.

     Para ligar de verdade:
       1. supabase.com  ->  New project (região: South America / São Paulo)
       2. SQL Editor    ->  cole e rode db/schema.sql inteiro
       3. Settings > API -> copie "Project URL" e a chave "anon public"
       4. cole abaixo e publique de novo

     A chave anon é pública por natureza — ela aparece no código do site.
     Quem protege os dados é o RLS + as funções do schema.sql, não ela.
  ------------------------------------------------------------------ */
  supabaseUrl: '',
  supabaseKey: '',

  /* ---- Regras da agenda (espelham o db/schema.sql) ----------------
     Mudou aqui? Mude no banco também — o banco é quem manda de verdade.
  ------------------------------------------------------------------ */
  regras: {
    passoMin:        30,   // grade de meia em meia hora
    antecedenciaMin: 60,   // não dá para marcar para daqui a 20 min
    janelaDias:      30,   // até 30 dias à frente
    cancelamentoH:   2,    // cancela sozinha até 2h antes
    manutencaoDias:  21    // painel avisa quando a cliente passa disso sem voltar
  },

  /* ---- Expediente (0 = domingo) ------------------------------------
     A CONFIRMAR: hoje a agenda é só pelo WhatsApp e o horário não aparece
     em lugar nenhum. Seg a sáb, 9h às 19h é provisório.
  ------------------------------------------------------------------ */
  expediente: {
    0: { aberto: false },
    1: { aberto: true, abre: '09:00', fecha: '19:00' },
    2: { aberto: true, abre: '09:00', fecha: '19:00' },
    3: { aberto: true, abre: '09:00', fecha: '19:00' },
    4: { aberto: true, abre: '09:00', fecha: '19:00' },
    5: { aberto: true, abre: '09:00', fecha: '19:00' },
    6: { aberto: true, abre: '09:00', fecha: '19:00' }
  },

  /* ---- Dados usados no modo demonstração --------------------------
     No ar de verdade, profissional e serviços vêm do banco, não daqui.
     Profissional única: com uma pessoa só, o passo "com quem" some
     sozinho e a agenda já começa no serviço.
     (O nome "barbeirosDemo" é interno do motor da agenda e ficou assim.)
  ------------------------------------------------------------------ */
  barbeirosDemo: [
    { id:'dany', slug:'dany', nome:'Dany Marinho', cargo:'Nails designer', foto:'fotos/dany.jpg', instagram:'dany_.marinho' }
  ],

  // A CONFIRMAR: a Dany não publica tabela de preços (atende pelo WhatsApp).
  // Serviços tirados dos posts dela (fibra, molde F1, francesinha, magnética,
  // cromada), sem preço (preco_centavos 0 = "sob consulta") e com duração
  // estimada. Ela mesma ajusta preço e tempo na aba "Serviços" do painel.
  servicosDemo: [
    { id:'fibra',      nome:'Alongamento em fibra de vidro', descricao:'A especialidade da casa. Unha fina, resistente e com cara de unha natural: formato simétrico, com estrutura e equilíbrio.', preco_centavos:0, a_partir_de:false, duracao_min:150, categoria:'Assinatura' },
    { id:'molde-f1',   nome:'Alongamento no molde F1',       descricao:'Alongamento em gel moldado, ideal para formatos mais longos.', preco_centavos:0, a_partir_de:false, duracao_min:150, categoria:'Alongamento' },
    { id:'manutencao', nome:'Manutenção',                    descricao:'Para quem já tem alongamento. O ideal é voltar a cada 3 semanas.', preco_centavos:0, a_partir_de:false, duracao_min:90,  categoria:'Alongamento' },
    { id:'gel',        nome:'Esmaltação em gel',             descricao:'Lisa, francesinha, magnética ou cromada.', preco_centavos:0, a_partir_de:false, duracao_min:60,  categoria:'Esmaltação' },
    { id:'remocao',    nome:'Remoção do alongamento',        descricao:'Retirada cuidadosa, sem agredir a unha natural.', preco_centavos:0, a_partir_de:false, duracao_min:30,  categoria:'Esmaltação' }
  ]
};

/* O que a Dany ajusta na aba "Serviços" do painel fica guardado neste
   aparelho enquanto o site está em demonstração, e vale aqui também. */
(function () {
  var T = window.TV, ajustes = {};
  try { ajustes = JSON.parse(localStorage.getItem('dm_servicos_demo') || '{}') || {}; } catch (e) {}
  T.servicosDemoTodos = T.servicosDemo.map(function (s) {
    var a = ajustes[s.id] || {}, n = {};
    for (var k in s) n[k] = s[k];
    if (a.preco_centavos != null) n.preco_centavos = a.preco_centavos;
    if (a.duracao_min) n.duracao_min = a.duracao_min;
    if (a.a_partir_de != null) n.a_partir_de = a.a_partir_de;
    n.ativo = a.ativo !== false;
    return n;
  });
  T.servicosDemo = T.servicosDemoTodos.filter(function (s) { return s.ativo; });
})();

window.TV.modoDemo = !(window.TV.supabaseUrl && window.TV.supabaseKey);
