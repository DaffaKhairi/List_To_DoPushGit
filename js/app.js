// Select Element Atau Memilih Element Yang Akan Di Manipulasi
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");   // langkah pertama untuk menghubungkan ke html gunanya agar mudah di manipulasi 
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes Name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
let LIST, id;

// get item from local storage
let data = localStorage.getItem("TODO")


// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // LOAD The list to the user interface
}else {
    //if data isn't impty
    LIST = [];
    id = 0;
}

// load item to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage 
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


// Show Todays Date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
 
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Add To Do Function

function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend"; //letakan di bagian sebelum tag tutup
    
    list.insertAdjacentHTML(position, item);
}

//add an item to the list user the enter key 
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){  // kalau ingin mencari di ASCII jika kita mencet enter 
        const toDo = input.value;;
        
        //if input isn'empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,  // guanaya untuk mendorong ke atas
                id : id,
                done : false,
                trash : false
            });

            // add item to localstorage ( this code must be added where the LIST array si update)
            localStorage.setItem("TODO", JSON.stringify(LIST));  // menyimpan sementara ketika di refresh tidak hilang

            id++;  
        }
        input.value = "";
    }
});

// complete to do = jika sudah mengklik akan menampilkan LINE_THROUGH
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do = jika sudah mengklik akan menghapus
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamically = ketika ingin mengkilik 

list.addEventListener("click", function(event){
    const element = event.target; //return the clickedelement inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    } else if(elementJob == "delete"){
        removeToDo(element);
    }

    //add item to localstorage (this code must be added where the LIST array is update) 
    localStorage.setItem("TODO", JSON.stringify(LIST));
});