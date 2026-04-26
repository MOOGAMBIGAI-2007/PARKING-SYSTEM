let user = "admin";
let pass = "1234";

let parking = {
    left: [0,0,0,0,0],
    straight: [0,0,0,0,0],
    right: [0,0,0,0,0]
};

function login(){
    let u = document.getElementById("user").value;
    let p = document.getElementById("pass").value;

    if(u===user && p===pass){
        document.getElementById("login").style.display="none";
        document.getElementById("dashboard").style.display="block";
        updateCounts();
    } else {
        alert("Wrong login!");
    }
}

function countFree(arr){
    return arr.filter(x=>x===0).length;
}

function updateCounts(){
    document.getElementById("leftCount").innerText = countFree(parking.left)+" Free";
    document.getElementById("straightCount").innerText = countFree(parking.straight)+" Free";
    document.getElementById("rightCount").innerText = countFree(parking.right)+" Free";

    let best = "LEFT";
    let max = countFree(parking.left);

    if(countFree(parking.straight)>max){
        max = countFree(parking.straight);
        best = "STRAIGHT";
    }
    if(countFree(parking.right)>max){
        best = "RIGHT";
    }

    document.getElementById("best").innerText = "Best Direction: "+best;
}

function showSlots(direction){
    let slotsDiv = document.getElementById("slots");
    slotsDiv.innerHTML = "";

    parking[direction].forEach((s,i)=>{
        let div = document.createElement("div");
        div.className = "slot "+(s===0?"free":"occupied");
        div.innerText = direction[0].toUpperCase()+(i+1);
        slotsDiv.appendChild(div);
    });
}

function addVehicle(){
    for(let dir in parking){
        let index = parking[dir].indexOf(0);
        if(index !== -1){
            parking[dir][index]=1;
            alert("Vehicle parked at "+dir.toUpperCase()+" Slot "+(index+1));
            updateCounts();
            return;
        }
    }
    alert("Parking Full!");
}

function removeVehicle(){
    for(let dir in parking){
        let index = parking[dir].indexOf(1);
        if(index !== -1){
            parking[dir][index]=0;
            alert("Vehicle exited from "+dir.toUpperCase()+" Slot "+(index+1));
            updateCounts();
            return;
        }
    }
    alert("No vehicles!");
}
