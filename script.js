document.addEventListener('DOMContentLoaded', () => {
    const bigbtn = document.getElementById('big-btn');
    const cashOutBtn = document.getElementById('cashOutBtn');
    const multiplierDisplay = document.getElementById('multiplier');
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    let multiplier = 1.0;
    let multiplierr = 1.0;
    let crashPoint = 0;
    let gameInterval = null;
    let gameRunning = false;
    let cashedOut = 1;
    let t = 0; // Time variable for swinging effect
    let direction = 1; // Direction of the oscillation
    let running = 0;
    let placed = 0;
    let waitround = 0;
    let userCashedOut = 0;
    let cashedOutAmount = 0;
    let countercashedout = 0;
    let actuallycashedout = 0;
    let betAmount = 0;

    // Image for the plane
    const planeImage = new Image();
    planeImage.src = 'assets/plane.png';

    function generateCrashPoint(min, max) {
        //return parseFloat((Math.random() * (100.0 - 1.0) + 1.0).toFixed(2));
        return Math.random() * (max - min) + min;
        //let randomFloat = generateCrashPoint
    }

    function generateOscillatePoint(min,max) {
        //return parseFloat((Math.random() * (100.0 - 1.0) + 1.0).toFixed(2));
        return Math.random() * (max - min) + min;
    }

    function startGame() {
        crashPoint = generateCrashPoint(1.1, 3.0);
        if (placed ==  1) {
            crashPoint = generateCrashPoint(1.1,2.5)
        }
        multiplier = 1.0;
        multiplierr = 1.0;
        t = 0;
        gameRunning = true;
        //bigbtn.disabled = true;
        cashOutBtn.disabled = false;

        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

        let oscillationpoint = generateOscillatePoint(4.5, 8.2);
        gameInterval = setInterval(() => {
            if (multiplier >= crashPoint) {
                clearInterval(gameInterval);
                gameRunning = false;                
                //alert(`Crashed at ${parseFloat(multiplier).toFixed(2)}x!`);
                //resetGame();
                //startGame();
            } else {
                if (direction === 1 && multiplierr >= 8.3) {
                    direction = -1; // Reverse direction when reaching the top
                } else if (direction === -1 && multiplierr <= oscillationpoint) {
                    direction = 1; // Reverse direction when reaching the bottom
                }
                running = 1;
                waitround = 1;
                multiplierr = parseFloat((multiplierr + 0.1 * direction).toFixed(2));
            if (multiplier <= 2){
                multiplier = parseFloat((multiplier + 0.014).toFixed(2));
            }else if (multiplier >=2 ){
                multiplier = parseFloat((multiplier + 0.038).toFixed(2));
            }else if (multiplier >=5 ){
                multiplier = parseFloat((multiplier + 0.047).toFixed(2));
            }else if (multiplier >=7 ){
                multiplier = parseFloat((multiplier + 0.068).toFixed(2));
            }else if (multiplier >=8 ){
                multiplier = parseFloat((multiplier + 0.079).toFixed(2));
            }else if (multiplier >=10 ){
                multiplier = parseFloat((multiplier + 0.089).toFixed(2));
            }else if (multiplier >=13 ){
                multiplier = parseFloat((multiplier + 0.099).toFixed(2));
            }else if (multiplier >=15 ){
                multiplier = parseFloat((multiplier + 0.1).toFixed(2));
            }else if (multiplier >=19 ){
                multiplier = parseFloat((multiplier + 0.12).toFixed(2));
            }else if (multiplier >=26 ){
                multiplier = parseFloat((multiplier + 0.13).toFixed(2));
            }else if (multiplier >=33 ){
                multiplier = parseFloat((multiplier + 0.15).toFixed(2));
            }else if (multiplier >=38 ){
                multiplier = parseFloat((multiplier + 0.17).toFixed(2));
            }else if (multiplier >=43 ){
                multiplier = parseFloat((multiplier + 0.19).toFixed(2));
            }else if (multiplier >=49 ){
                multiplier = parseFloat((multiplier + 0.2).toFixed(2));
            }else if (multiplier >=53 ){
                multiplier = parseFloat((multiplier + 0.23).toFixed(2));
            }else if (multiplier >=58 ){
                multiplier = parseFloat((multiplier + 0.26).toFixed(2));
            }else if (multiplier >=64 ){
                multiplier = parseFloat((multiplier + 0.28).toFixed(2));
            }else if (multiplier >=71 ){
                multiplier = parseFloat((multiplier + 0.31).toFixed(2));
            }else if (multiplier >=76 ){
                multiplier = parseFloat((multiplier + 0.35).toFixed(2));
            }else if (multiplier >=82 ){
                multiplier = parseFloat((multiplier + 0.48).toFixed(2));
            }
            
                if(running == 1 && placed == 1 && actuallycashedout == 0){
                let amount = `KSh  ${parseFloat(multiplier*betAmount).toFixed(2)}`;
                bigbtn.innerText = 'Cashout ' + amount
                } 

        if (actuallycashedout == 1) {
            countercashedout +=1;
            actuallycashedout +=1;
            if (countercashedout == 1) {
                cashedOutAmount = `${parseFloat(multiplier*betAmount).toFixed(2)}`;
            }

         if(running == 1 && placed == 1){
            let amount = `KSh  ${parseFloat(multiplier*betAmount).toFixed(2)}`;
            bigbtn.innerText = 'CashedOut KSh ' + cashedOutAmount
        }
        }
                // Calculate swinging and curving effect
                t += 0.2; // Increase time for oscillation
                let swing = Math.sin(t) * 30; // Swinging amplitude
                let curve = Math.cos(t / 4) * 55; // Increase curving effect
                let x = (multiplierr / 19) * canvas.width;  // Scale the x-coordinate
                let y = canvas.height - (multiplierr / 23) * canvas.height + swing + curve;  // Scale the y-coordinate

                // Calculate the x and y coordinates, ensuring they don't go past 90% of the canvas dimensions
                    let maxWidth = canvas.width * 0.4;
                    let maxHeight = canvas.height * 0.4;
                 //   let x = (multiplier / 10) * maxWidth;
                 // let y = canvas.height - (multiplier / 10) * maxHeight;

                // Draw the area under the curve
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas to redraw

                ctx.beginPath();
                ctx.moveTo(0, canvas.height);

                // Adjust control point to create a curve that bends towards the x-axis initially
                let controlX = x / 2; // Position control point closer to the start
                let controlY = canvas.height; // Place control point at the bottom of the canvas to create a dip
                ctx.quadraticCurveTo(controlX, controlY, x, y);

                // Draw the curve to the bottom of the canvas
                ctx.lineTo(x, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();
                ctx.fillStyle = '#730715';//'#a30606'; // Fill color
                ctx.fill();

                // Draw the smooth curving line graph
                ctx.beginPath();
                ctx.moveTo(0, canvas.height);
                ctx.quadraticCurveTo(controlX, controlY, x, y); // Create a quadratic curve
                ctx.strokeStyle = '#E4063A'//'#ef3535';
                ctx.lineWidth = 8;
                ctx.stroke();

                // Draw the plane image
                ctx.drawImage(planeImage, x - 85, y - 80, 168, 83);

                // Draw the counter in the center of the canvas
                drawCounter(ctx, multiplier);
            }
        }, 100);
    }

    function resetbets() {
        //updatewinners();
        running = 0;
        placed = 0;
        actuallycashedout = 0;
        countercashedout = 0;
        if (placed == 0 && running == 0){
            bigbtn.style.backgroundColor = 'green'
            bigbtn.style.color = 'white'
            bigbtn.innerText = 'BET'
        }
    }

    function drawCounter(ctx, multiplier) {
        if (multiplier >= crashPoint){
            if (userCashedOut == 0 || userCashedOut == 3 || userCashedOut == 5 || userCashedOut == 7 || userCashedOut == 9 || placed == 0){
            ctx.font = 'normal 14px Arial';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillText(`Bursted @ ${multiplier.toFixed(2)}x`, canvas.width / 2, canvas.height / 2);
            resetbets();
            setTimeout(() => {
                resetGame();
                //updateLabelValues();
                ctx.font = 'normal 14px Arial';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`Waiting For Next Round!`, canvas.width / 2, canvas.height / 2);
            }, 5000);
        } else {
            ctx.font = 'normal 14px Arial';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillText(`Bursted @ ${(multiplier-0.04).toFixed(2)}x`, canvas.width / 2, canvas.height / 2);
            resetbets();
            setTimeout(() => {
                resetGame();
                //updateLabelValues();
                ctx.font = 'normal 14px Arial';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`Waiting For Next Round!`, canvas.width / 2, canvas.height / 2);
            }, 5000);
        }
        }else{
            ctx.font = 'bolder 64px Arial';
            //ctx.font = '24px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${multiplier.toFixed(2)}x`, canvas.width / 2, canvas.height / 2);
        }

    }

    function showToast(message) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
        }, 100); // Delay to trigger CSS transition
    
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 500); // Match this duration with the CSS transition
        }, 3000); // Display time for the toast message
    }

    function cashOut() {
        
        if (userCashedOut == 0 || userCashedOut == 3 || userCashedOut == 5 || userCashedOut == 7 || userCashedOut == 9) {
            actuallycashedout = 1;
        } else {
        if (gameRunning) {
            clearInterval(gameInterval);
            gameRunning = false;
            crashPoint = multiplier;
            drawCounter(ctx, multiplier);
            //alert(`You cashed out at ${multiplier.toFixed(2)}x!`);
            //-------
            //resetGame();
           // startGame();
        }
    }
    userCashedOut +=1;
    }

    function resetGame() {
        //bigbtn.disabled = false;
        cashOutBtn.disabled = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
        //if (determinant > 0 && multiplier >= crashPoint) {
            //running = 0;
            //placed = 0;
            //if (placed == 0 && running == 0){
            //   bigbtn.style.backgroundColor = 'green'
            //    bigbtn.style.color = 'white'
            //    bigbtn.innerText = 'BET'
            //}
            // Delay startGame by 20 seconds (5000 milliseconds)
            
    setTimeout(() => {
        startGame();
        //updateLabelValues();
    }, 5000);
    }

    // Function to update label values
function updateLabelValues(labelId, leftText, centerText, rightText) {
    const label = document.getElementById(labelId);
    if (label) {
        label.querySelector('.left').innerText = leftText;
        label.querySelector('.center').innerText = centerText;
        label.querySelector('.right').innerText = rightText;
    }

    function generateFirstWinnerNumbers(min,max) {
        //return parseFloat((Math.random() * (100.0 - 1.0) + 1.0).toFixed(2));
        return Math.random() * (max - min) + min;
    }

    function generateLastWinnerNumbers(min,max) {
        //return parseFloat((Math.random() * (100.0 - 1.0) + 1.0).toFixed(2));
        return Math.random() * (max - min) + min;
    }

    function generateBetAmount(min,max) {
        //return parseFloat((Math.random() * (100.0 - 1.0) + 1.0).toFixed(2));
        return Math.random() * (max - min) + min;
    }


    //setTimeout(() => {
        //startGame();
        //updateLabelValues();
    //}, 5000);
    // Example usage
    for (i = 1; i<=30; i++){

        let Fnum = generateFirstWinnerNumbers(1,9);
        let Lnum = generateLastWinnerNumbers(10,50);
        let DemoBetAmount = generateBetAmount(5,12)
        let Bamount = ((DemoBetAmount).toFixed(0)*1000).toFixed(0);
        let WinAmount = (Bamount*multiplier).toFixed(0);
        let fNo = (Fnum*10).toFixed(0);
        let lNo = (Lnum*10).toFixed(0)
        let LefText = '07'+fNo+'***'+lNo;
        let Centext = Bamount;
        let Rightext = 0;
        if (multiplier == 1.0){
        Rightext = '-';
    }else{
        Rightext = WinAmount;
    }

        if (i == 1){
updateLabelValues('label1', LefText, Centext, Rightext);
    } else if (i == 2){
updateLabelValues('label2', LefText, Centext, Rightext);
    } else if (i == 3){
updateLabelValues('label3', LefText, Centext, Rightext);
    } else if (i == 4){
updateLabelValues('label4', LefText, Centext, Rightext);
    } else if (i == 5){
updateLabelValues('label5', LefText, Centext, Rightext);
    } else if (i == 6){
updateLabelValues('label6', LefText, Centext, Rightext);
    } else if (i == 7){
updateLabelValues('label7', LefText, Centext, Rightext);
    } else if (i == 8){
updateLabelValues('label8', LefText, Centext, Rightext);
    } else if (i == 9){
updateLabelValues('label9', LefText, Centext, Rightext);
    } else if (i == 10){
updateLabelValues('label10', LefText, Centext, Rightext);
    } else if (i == 11){
updateLabelValues('label11', LefText, Centext, Rightext);
    } else if (i == 12){
updateLabelValues('label12', LefText, Centext, Rightext);
    } else if (i == 13){
updateLabelValues('label13', LefText, Centext, Rightext);
    } else if (i == 14){
updateLabelValues('label14', LefText, Centext, Rightext);
    } else if (i == 15){
updateLabelValues('label15', LefText, Centext, Rightext);
    } else if (i == 16){
updateLabelValues('label16', LefText, Centext, Rightext);
    } else if (i == 17){
updateLabelValues('label17', LefText, Centext, Rightext);
    } else if (i == 18){
updateLabelValues('label18', LefText, Centext, Rightext);
    } else if (i == 19){
updateLabelValues('label19', LefText, Centext, Rightext);
    } else if (i == 20){
updateLabelValues('label20', LefText, Centext, Rightext);
    } else if (i == 21){
updateLabelValues('label21', LefText, Centext, Rightext);
    } else if (i == 22){
updateLabelValues('label22', LefText, Centext, Rightext);
    } else if (i == 23){
updateLabelValues('label23', LefText, Centext, Rightext);
    } else if (i == 24){
updateLabelValues('label24', LefText, Centext, Rightext);
    } else if (i == 25){
updateLabelValues('label25', LefText, Centext, Rightext);
    } else if (i == 26){
updateLabelValues('label26', LefText, Centext, Rightext);
    } else if (i == 27){
updateLabelValues('label27', LefText, Centext, Rightext);
    } else if (i == 28){
updateLabelValues('label28', LefText, Centext, Rightext);
    } else if (i == 29){
updateLabelValues('label29', LefText, Centext, Rightext);
    } else if (i == 30){
updateLabelValues('label30', LefText, Centext, Rightext);
    }
}
//updateLabelValues('label2', '0723***777', '7000', '40,000');
//updateLabelValues('label3', '0723***888', '8000', '45,000');
}



    
    //}

    let number = 100.0;
    const numberEdit = document.getElementById('number-edit');
    numberEdit.value = number.toFixed(1);
    document.getElementById('increment').addEventListener('click', () => {
        if (number <= 200){
            number += 10;
        } else if (number >= 1000){
            number += 500;
        } else if (number >= 500){
            number += 50;
        } else if (number >= 200){
            number += 20;
        }
        numberEdit.value = number.toFixed(1);
    });
    
    document.getElementById('decrement').addEventListener('click', () => {
        if (number <= 200){
        number -= 10;
    } else if (number >= 1000){
        number -= 500;
    } else if (number >= 500){
        number -= 50;
    } else if (number >= 200){
        number -= 20;
    }
        numberEdit.value = number.toFixed(1);
    });
    
    numberEdit.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            number = value;
        }
    });
    
    document.getElementById('left1-btn').addEventListener('click', () => {
        number = 100;
        numberEdit.value = number.toFixed(1);
    });

    document.getElementById('right1-btn').addEventListener('click', () => {
        number = 200;
        numberEdit.value = number.toFixed(1);
    });

    document.getElementById('left2-btn').addEventListener('click', () => {
        number = 500;
        numberEdit.value = number.toFixed(1);
    });

    document.getElementById('right2-btn').addEventListener('click', () => {
        number = 5000;
        numberEdit.value = number.toFixed(1);
    });

    document.getElementById('big-btn').addEventListener('click', () => {
        if (running == 0 && placed == 0){
            if (waitround == 0){ 
            startGame();
        }else if (waitround ==1){
            bigbtn.style.backgroundColor = 'yellow'
            bigbtn.style.color = 'black'
            bigbtn.innerText = 'Bet Placed!'
            placed = 1;
            betAmount = number.toFixed(2)
        }
        }else if(running == 1 && placed == 1){
            if (actuallycashedout == 0) {
            cashOut();
        }
       //cashout code here
    }else if(placed == 0 && running == 1){
        //wait for another round toast
        showToast();
    }else if(placed == 1 && running == 0){
        //already placed bet toast
        showToast();
    }
    });

    //bigbtn.addEventListener('click', startGame);
    cashOutBtn.addEventListener('click', cashOut);
});
