let issorting = false

let stopRequested = false;
window.onload = function () {
    generateArray()
}
function generateArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';

    let size = document.getElementById('Size').value;
    let barwidth = Math.floor(1500 / size);
    for (let i = 0; i < size; i++) {
        let height = Math.floor(Math.random() * 500) + 30;
        let bar = document.createElement('div');
        bar.style.height = height + 'px';
        bar.style.backgroundColor = '#00B2FF';
        bar.style.width = barwidth + 'px'
        bar.style.display = 'block';
        bar.style.margin = '2px';
        bar.style.borderRadius = '10px 10px';
        container.appendChild(bar);
    }
}


document.getElementById('Size').oninput = function () {
    document.getElementById('sizevalue').innerText = this.value;
    generateArray();
}


function resetarray() {
    generateArray();
}

function stoprequest() {
    stopRequested = true


}



function startstop() {
    if (issorting) {
        stopRequested = true;
        document.getElementById('sortBtn').innerText = 'Sort';
        document.getElementById('sortBtn').style.backgroundColor = 'cyan';
        issorting = false;

    } else {
        StartSort();
        document.getElementById('sortBtn').innerText = 'Stop';
        document.getElementById('sortBtn').style.backgroundColor = 'red';
        issorting = true;
    }
}


function StartSort() {
    let algorithm = document.getElementById('algorithm').value;
    if (algorithm == 'bubbleSort') {
        bubbleSort();
    } else if (algorithm == 'SelectionSort') {
        SelectionSort();
    } else if (algorithm == 'insertionsort') {
        insertionsort();
    }
}


function resetsortbtn(){
    issorting = false;
    stopRequested = false;
    document.getElementById('sortBtn').innerText = "Sort";
    document.getElementById('sortBtn').style.backgroundColor = "cyan";
}

async function bubbleSort() {
    let bars = document.getElementsByTagName('div');
    bars = Array.from(bars).filter(bar => bar.parentElement.id === 'array-container');

    for (let i = 0; i < bars.length; i++) {
        if (stopRequested) return;
        for (let j = 0; j < bars.length - i - 1; j++) {
            if (stopRequested) return;
            bars[j].style.backgroundColor = '#FF1900';
            bars[j + 1].style.backgroundColor = '#FF1900';

            await new Promise(r => setTimeout(r,500- document.getElementById('speed').value));

            let h1 = bars[j].style.height;
            let h2 = bars[j + 1].style.height;

            if (parseInt(h1) > parseInt(h2)) {
                bars[j].style.height = h2;
                bars[j + 1].style.height = h1;
            }

            bars[j].style.backgroundColor = '#F7FF00';
            bars[j + 1].style.backgroundColor = '	#F7FF00';

        }
        bars[bars.length - 1 - i].style.backgroundColor = '#00FF6A'
        bars[i].style.backgroundColor = '#00FF6A'
    }
    resetsortbtn();
    if(stopRequested){
    resetsortbtn();
    return;}
    

}
    


async function SelectionSort() {


    let bars = Array.from(document.getElementById('array-container').children)
    for (let i = 0; i < bars.length; i++) {
        if (stopRequested) return;
        let minIdx = i
        for (let j = i + 1; j < bars.length; j++) {

            if (stopRequested) return;

            bars[j].style.backgroundColor = '#FF1900'
            await new Promise(r => setTimeout(r, 500-document.getElementById('speed').value / 2))

            if (parseInt(bars[minIdx].style.height) > parseInt(bars[j].style.height)) {
                minIdx = j
            }
            if (bars.length > j + 1)
                bars[j + 1].style.backgroundColor = '#FF1900'
            bars[j].style.backgroundColor = 'purple'
        }
        let temp = bars[minIdx].style.height
        bars[minIdx].style.height = bars[i].style.height
        bars[i].style.height = temp

        bars[bars.length - 1 - i].style.backgroundColor = '#00FF6A'
        bars[i].style.backgroundColor = '#00FF6A'
        await new Promise(r => setTimeout(r,500 - document.getElementById('speed').value));
    }

    resetsortbtn();
    if(stopRequested){
    resetsortbtn();
    return;}

}


async function insertionsort() {
    //let bars = document.getElementById('div')
    bars = Array.from(document.getElementById('array-container').children)
    for (let i = 1; i < bars.length; i++) {
        if (stopRequested) return;
        let key = parseInt(bars[i].style.height);
        let j = i - 1;

        bars[i].style.backgroundColor = '#FF1900';

        await new Promise(r => setTimeout(r, 500 -document.getElementById('speed').value));

        while (j > -1 && parseInt(bars[j].style.height) > key) {
            if (stopRequested) return;
            bars[j].style.backgroundColor = '#FF1900';
            await new Promise(r => setTimeout(r,500- document.getElementById('speed').value));

            bars[j + 1].style.height = bars[j].style.height
            bars[j].style.backgroundColor = '#F7FF00';
            await new Promise(r => setTimeout(r, 500-document.getElementById('speed').value));

            j--
        }
        bars[j + 1].style.height = key + 'px';
        bars[i].style.backgroundColor = '#F7FF00'

    }
    for (let bar of bars) {
        bar.style.backgroundColor = '#00FF33';
    }

    resetsortbtn();
    if(stopRequested){
    resetsortbtn();
    return;}

}