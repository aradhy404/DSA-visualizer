function generateArray(){
    const container = document.getElementById('array-container');
    container.innerHTML = '';

    for(let i = 0;i<20;i++){
        let height = Math.floor(Math.random()*300) + 30;
        let bar = document.createElement('div');
        bar.style.height = height +'px';
        bar.style.backgroundColor = 'purple';
        bar.style.width = '30px';
        bar.style.display = 'block';
        bar.style.margin = '2px';
        container.appendChild(bar);
    }
}
async function bubbleSort() {
    let bars = document.getElementsByTagName('div');
    bars = Array.from(bars).filter(bar => bar.parentElement.id === 'array-container');
    
    for(let i = 0; i < bars.length; i++){
        for(let j = 0; j < bars.length - i - 1; j++){
            bars[j].style.backgroundColor = 'red';
            bars[j+1].style.backgroundColor = 'red';
            
            await new Promise(r => setTimeout(r, 100));
            
            let h1 = bars[j].style.height;
            let h2 = bars[j+1].style.height;
            
            if(parseInt(h1) > parseInt(h2)){
                bars[j].style.height = h2;
                bars[j+1].style.height = h1;
            }
            
            bars[j].style.backgroundColor = 'purple';
            bars[j+1].style.backgroundColor = 'purple';
        }
    }
}

async function SelectionSort(){
    let bars = Array.from(document.getElementById('array-container').children)
    for(let i = 0;i<bars.length;i++){
        let minIdx = i
        for(let j = i+1;j<bars.length;j++){
            if(parseInt(bars[minIdx].style.height)>parseInt(bars[j].style.height)){
                minIdx = j
            }
        }
        let temp = bars[minIdx].style.height
        bars[minIdx].style.height = bars[i].style.height
        bars[i].style.height = temp
        await new Promise(r => setTimeout(r, 100));
    }
}