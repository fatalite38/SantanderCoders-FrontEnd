const campoNome = document.querySelector<HTMLInputElement>('#campoNome');
const campoEmail = document.querySelector<HTMLInputElement>('#campoEmail');
const campoId = document.querySelector<HTMLInputElement>('#campoId');
const campoSenha = document.querySelector<HTMLInputElement>('#campoSenha');
const paragrafo = document.querySelector('form p')

if (campoNome && paragrafo) {
    campoNome.onblur  = () => {
        const valorDigitado = campoNome.value;
        console.log(`Nome: ${valorDigitado}`)

        paragrafo.textContent = `Olá, ${valorDigitado}!`;
    } 
}

if (campoEmail && paragrafo) {
    campoEmail.onblur = () => {
        const valorDigitado = campoEmail.value;
        if (!valorDigitado.includes('@') || !valorDigitado.includes('.com')) {
            alert('E-mail incorreto! O email deve conter "@" e terminar com ".com".');
        } else {
            console.log(`E-mail: ${valorDigitado}`);
        }

        paragrafo.textContent = `Email: ${valorDigitado}`;
        
    }
}

if (campoId && paragrafo) {
    campoId.onblur = () => {
        const valorDigitado = campoId.value;
        const idNumerico = Number(valorDigitado);
        if (Number.isNaN(idNumerico) || idNumerico <= 0) {
            alert('Id inválido!');
        } else {
            console.log(`ID: ${valorDigitado}`)
        }

        paragrafo.textContent = `Id: ${valorDigitado}`;
    }        
}

if (campoSenha && paragrafo) {
    campoSenha.onblur = () => {
        const valorDigitado = campoSenha.value;
        if (valorDigitado.length < 8) {
            alert('Senha inválida! A senha deve ter pelo menos 8 caracteres.');
        } else if (valorDigitado.length > 16) {
            alert('Senha inválida! A senha não pode ter mais de 16 caracteres.');
        } else {
            console.log(`Senha: ${valorDigitado}`);
        }

        paragrafo.textContent = `Senha: ${valorDigitado}`;
    }
}