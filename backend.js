document.addEventListener('DOMContentLoaded', () => {

    function stutterString_Efficient(str) {
        return str
            .split('') 
            .map((char, i) => {
                return char.toUpperCase() + char.toLowerCase().repeat(i);
            })
            .join("-");
    }
    
    const inputString = "Rudianto";
    const stutterResult = stutterString_Efficient(inputString);
    const stutterEl = document.getElementById('result-stutter');
    if (stutterEl) {
        stutterEl.innerText = `${inputString} \nOutput: ${stutterResult}`;
    }

    function analyzeString_Impractical(str) {
        const lowerStr = str.toLowerCase();
        const keys = [];
        const values = [];

        for (const char of lowerStr) {
            if (/[a-z]/.test(char)) {
                const index = keys.indexOf(char);

                if (index === -1) {
                    keys.push(char);
                    values.push(1);
                } else {
                    values[index] += 1;
                }
            }
        }
        return keys
            .map((key, i) => `${key}: ${values[i]}`)
            .join(', ');
    }

    const testString = "Bakwan Goreng Cimahi";
    const analysis = analyzeString_Impractical(testString);
    
    const analyzeEl = document.getElementById('result-analyze');
    if (analyzeEl) {
        analyzeEl.innerText = `${testString}\nOutput: ${analysis}`;
    }
});