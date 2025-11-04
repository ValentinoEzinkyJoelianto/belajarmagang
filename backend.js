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

    function analyzeString_Efficient(str) {
        const lowerStr = str.toLowerCase();
        const counts = {};
        for (const char of lowerStr) {
            if (/[a-z]/.test(char)) {
                counts[char] = (counts[char] || 0) + 1;
            }
        }
        return Object.entries(counts)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
    }

    const testString = "Bakwan Goreng Cimahi";
    const analysis = analyzeString_Efficient(testString);
    
    const analyzeEl = document.getElementById('result-analyze');
    if (analyzeEl) {
        analyzeEl.innerText = `${testString}\nOutput: ${analysis}`;
    }
});