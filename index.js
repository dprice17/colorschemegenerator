const colorList = document.getElementById('color-list');

const colorBars = [
    document.getElementById('color-bar-1'), 
    document.getElementById('color-bar-2'),
    document.getElementById('color-bar-3'),
    document.getElementById('color-bar-4'),
    document.getElementById('color-bar-5')
];

const hexCodes = [
    document.getElementById('hex-1'),
    document.getElementById('hex-2'),
    document.getElementById('hex-3'),
    document.getElementById('hex-4'),
    document.getElementById('hex-5')  
];

const modal = document.getElementById('copyAlert-modal');
const modalContent = document.getElementById('modal-content');

const options = {method: 'GET'};

const btn = document.getElementById('btn').addEventListener('click', function(){
    
    const colorBarContainer = document.getElementById('color-bar-container');
    let colorInput = document.getElementById('current-color').value;
    let colorMode = document.getElementById('color-mode');
    let selectedValue = colorMode.options[colorMode.selectedIndex].value;
    let colorHex = colorInput.substr(1);
    let url = 'https://www.thecolorapi.com/scheme?hex=' + colorHex + '&mode=' + selectedValue;
    
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            colorBarContainer.style.display = 'flex';
            
            for(let i = 0; i < 5; i++){
                colorBars[i].style.backgroundColor = data.colors[i].hex.value;
                hexCodes[i].textContent = data.colors[i].hex.value;
            }
            

            function copyHex(hex){
                const textarea = document.createElement('textarea');
                textarea.value = hex;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                textarea.remove();
            }

            document.addEventListener('click', function(e){
                for (let i = 0; i < 5; i++){
                    
                    if(e.target.id === `hex-${i + 1}` || e.target.id === `color-bar-${i + 1}`){
                        
                        copyHex(data.colors[i].hex.value);
                        
                        modal.style.display = 'block';
                        modalContent.textContent = 'Copied: ' + data.colors[i].hex.value
                        
                        setTimeout(function(){
                            modal.style.display = 'none';
                        }, 1500);
                       
                      }
                    }
                });
            });
        })



  





