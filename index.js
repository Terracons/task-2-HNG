import express from "express"
import cors from "cors"

const app =express();

app.use(cors);

// Funtion to check for perfect number 
const isPerfectNum = (num)=>{
    let sum = 1
    for(let i = 2; i*i <= num; i++){
        if (num % i === 0){
            sum +=i;
            if (i !== num / i) sum += num / i;
        }

    }
    return sum === num && num !== 1;
    

}

const isPrimeNum = (num) => {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const isArmstrongNum = (num) => {
    const digits = num.toString().split("").map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === num;
}

const getFunFact = async (num) => {
    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math`);
        return response.data;
    } catch (error) {
        return "No fun fact available.";
    }
};


app.get("/api/classify-number", (req, res)=>{
    const {number} = req.query;
    if (!number || isNaN(number)){
        return res.status(400).json({ number, error: true });
    }
    const num = parseInt(number);
    const properties = [];

    if (isArmstrongNum(num)) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    const result =  {
        number: num,
        is_prime: isPrimeNum(num),
        is_perfect: isPerfectNum(num),
        properties,
        digit_sum: num.toString().split("").map(Number).reduce((a, b) => a + b, 0),
        fun_fact: getFunFact(num),
    };

    res.json(result);

});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));