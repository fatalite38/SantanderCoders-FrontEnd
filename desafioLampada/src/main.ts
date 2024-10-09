function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const images: string[] = ['src/assets/img/Apagada.jpg', 'src/assets/img/Acessa.jpg', 'src/assets/img/Quebrada.jpg'];
  let count = 0;
  
  async function changeImg(): Promise<void> {
    const imgElement = document.getElementById('image') as HTMLImageElement;
  
    count++;
  
    if (count < 10) {
      imgElement.src = images[count % 2];
    } else {
      imgElement.src = images[2];
      await sleep(1000);
      alert('Lâmpada Quebrada, compre outra...');
    }
  }

document.getElementById('changeImg')?.addEventListener('click', changeImg);
  