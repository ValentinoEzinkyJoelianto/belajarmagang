document.addEventListener('DOMContentLoaded', () => {
    function removeDuplicates_Manual(arr) {
        let uniqueArr = [];

        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (!uniqueArr.includes(item)) {
                uniqueArr.push(item);
            }
        }
        return uniqueArr;
    }

    const arrWithDuplicates = [1, 2, 'a', 2, 'b', 'a', 3, 1, 'c'];
    let uniqueArr = removeDuplicates_Manual(arrWithDuplicates);
    uniqueArr.sort(); 

    console.log(`3.1 Remove Duplicates [Manual] dari [${arrWithDuplicates}]:`, uniqueArr);

    const duplicateEl = document.getElementById('result-duplicates');
    if (duplicateEl) {
        duplicateEl.innerText = `[${arrWithDuplicates}] \nOutput: [${uniqueArr}]`;
    }

    const timeEl = document.getElementById('mobile-time');
    if (timeEl) {
        const now = new Date();
        const hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeEl.innerText = hours + ':' + minutes;
    }

    const currentOperandDisplay = document.getElementById('current-operand');
    const previousOperandDisplay = document.getElementById('previous-operand');
    const calcGrid = document.querySelector('.calculator-grid');

    let currentOperand = '0';
    
    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        if (currentOperand === '0' && number !== '.') {
            currentOperand = number; 
        } else {
            currentOperand = currentOperand + number; 
        }
    }

    function clear() {
        currentOperand = '0';
    }

    function deleteNumber() {
        if (currentOperand.length === 1 || currentOperand === '0') {
            currentOperand = '0';
        } else {
            currentOperand = currentOperand.substring(0, currentOperand.length - 1);
        }
    }

    function updateDisplay() {
        currentOperandDisplay.innerText = currentOperand;
        previousOperandDisplay.innerText = '';
    }

    if (calcGrid) {
        calcGrid.addEventListener('click', (e) => {
            const targetButton = e.target.closest('.calc-btn');
            if (!targetButton) return;
            const key = targetButton.dataset.key;

            if (key === 'C') {
                clear();
            } else if (key === 'Del') {
                deleteNumber();
            } else {
                appendNumber(key);
            }
            updateDisplay();
        });
    }

    const jsonFetchResultEl = document.getElementById('json-fetch-result');
    if (jsonFetchResultEl) {
        jsonFetchResultEl.innerText = "Memuat data JSON dari API..."; 

        fetch('https://fakestoreapi.com/products?limit=5') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); 
            })
            .then(data => {
                    jsonFetchResultEl.innerHTML = '';
                    data.forEach(produk => {
                        const p = document.createElement('p');
                        p.innerText = `Produk: "${produk.title}" (Kategori: ${produk.category}) (Harga: $${produk.price})`;
                        jsonFetchResultEl.appendChild(p);
                    });
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
                jsonFetchResultEl.innerText = "Gagal memuat data JSON dari API.";
            });
    }
});