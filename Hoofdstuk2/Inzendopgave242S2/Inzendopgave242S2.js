                var input1 = document.getElementById("input1");
                var input2 = document.getElementById("input2");                     
                              
                function reset(){
                if (input2 != null)
                 input1.value = null; 
                 input2.value = 0;
                 document.getElementById("totaalzonderbtw").innerHTML = "";
                 document.getElementById("btw").innerHTML = "";
                }
                
                reset();             
                                                     
                input1.addEventListener("keyup", function(event){
                event.preventDefault();                
                if (event.keyCode === 13) {
                if(isNaN(input1.value) || isNaN(input2.value)){
                alert("Je hebt geen correct getal ingevoerd!");}
                else{
                 var som = Number(input1.value) + Number(input2.value);
                 input2.value = som;
                }
                }
                });     
                
                var knop = document.getElementById("bereken");
                knop.onclick = MyFunction;
                
                function MyFunction(){                                     
                   if(isNaN(input1.value) || isNaN(input2.value)){
                   alert("Je hebt geen correct getal ingevoerd!");
                   } else{
                      var prijs = leesInvoer("input2");                       
                      var uitvoerZonderBtw = "Som van de ingevoerde bedragen van dit moment zonder BTW: " + berekenBedragZonderBtw(prijs).toFixed(2) + " euro";
                      var uitvoerBtw = "BTW: " + berekenBtw(prijs).toFixed(2) + " euro";
                      document.getElementById("totaalzonderbtw").innerHTML = uitvoerZonderBtw;
                      document.getElementById("btw").innerHTML = uitvoerBtw;
                      }
                    }                    
                                        
                    function berekenBedragZonderBtw(prijs){
                        var bedragZonderBtw = (prijs / 121)*100;
                        return bedragZonderBtw;
                    }
                    
                    function berekenBtw(prijs){
                        var Btw = prijs - berekenBedragZonderBtw(prijs);                         
                        return Btw;
                    }      
            
                    function leesInvoer(invoerId){
                        var invoer = document.getElementById(invoerId);
                        var getal = +invoer.value;
                        return getal;
                    }                   
