interface Endereco {
  logradouro: string;
  localidade: string;
  uf: string;
}

function buscarEndereco(cep: string): Promise<Endereco> {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar o endereço.');
      }
      return response.json();
    })
    .then(data => {
      if (data.erro) {
          throw new Error('CEP não encontrado.');
      }
      return {
        logradouro: data.logradouro,
        localidade: data.localidade,
        uf: data.uf
    };
  });
}

function validarFormulario(): boolean {
    const nome = (document.getElementById('nome') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const nascimento = (document.getElementById('nascimento') as HTMLInputElement).value;
    const cep = (document.getElementById('cep') as HTMLInputElement).value;
    const rua = (document.getElementById('rua') as HTMLInputElement).value;
    const cidade = (document.getElementById('cidade') as HTMLInputElement).value;
    const estado = (document.getElementById('estado') as HTMLInputElement).value;
    const numero = (document.getElementById('numero') as HTMLInputElement).value;

    if (!nome || !email || !nascimento || !cep || !rua || !cidade || !estado || !numero) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um email válido.');
      return false;
    }

    if (cep.length !== 9 || !/^\d{5}-\d{3}$/.test(cep)) {
      alert('O CEP deve estar no formato 12345-678.');
      return false;
    }
    
  return true;
}

document.getElementById('cep')?.addEventListener('input', (event) => {
  let cep = (event.target as HTMLInputElement).value;

  cep = cep.replace(/\D/g, '');

  if (cep.length > 5) {
    cep = `${cep.slice(0, 5)}-${cep.slice(5, 8)}`;
  }

  (event.target as HTMLInputElement).value = cep;

    if (cep.length === 9) {
      buscarEndereco(cep)
        .then(endereco => {
          (document.getElementById('rua') as HTMLInputElement).value = endereco.logradouro;
          (document.getElementById('cidade') as HTMLInputElement).value = endereco.localidade;
          (document.getElementById('estado') as HTMLInputElement).value = endereco.uf;
        })
        .catch(error => {
          alert(error.message);
        });
    }
});

function salvarNoLocalStorage() {
  if (validarFormulario()) {
    const nome = (document.getElementById('nome') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const nascimento = (document.getElementById('nascimento') as HTMLInputElement).value;
    const cep = (document.getElementById('cep') as HTMLInputElement).value;
    const rua = (document.getElementById('rua') as HTMLInputElement).value;
    const cidade = (document.getElementById('cidade') as HTMLInputElement).value;
    const estado = (document.getElementById('estado') as HTMLInputElement).value;
    const numero = (document.getElementById('numero') as HTMLInputElement).value;

    const dadosCadastro = {
        nome,
        email,
        nascimento,
        cep,
        rua,
        cidade,
        estado,
        numero
    };

  localStorage.setItem('dadosCadastro', JSON.stringify(dadosCadastro));
  alert('Dados salvos no LocalStorage com sucesso!');
  }
}

document.getElementById('salvarLocalStorage')?.addEventListener('click', salvarNoLocalStorage);