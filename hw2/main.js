let root = document.getElementById("root");
let main = root.children[0];
let footer = root.children[1];
let left = main.children[0];
let right = main.children[1];
let target = left.children[0];
let user = left.children[0];
var Main = -1;
var participants = 6;
var i;
let t1 = Array.from(document.getElementsByClassName("quit"));
let mainButton = document.getElementById("main-button");
let subButtons = Array.from(document.getElementsByClassName("sub-button"));
function getDate()
{
    var date = new Date();
    var date1 = date.toLocaleTimeString();
    var div1 = document.getElementById("time");
    div1.innerHTML = "帥哥的會議室&emsp;|&emsp;" + date1;
}
setInterval("getDate()",1000);
mainButton.addEventListener(
    "click", 
    function() {
    // ..做一些事，任何事，你希望按鈕按了要幹嘛?
    if(participants === 1)
    {

    }
    else if(Main === -1)
    {   
        Main = -2;
        var appendedNode = right.appendChild(mainButton.parentNode);
        mainButton.parentNode.className = "block sub-block";
        left.style.display = "none";
        right.style.width = "100%";
        var i;
        for(i = 0; i< right.children.length;i++)
        {
            target = right.children[i];
            target.classList.add("extend");
        }
    }
    else if(Main === -2)
    {
        Main = -1;
        mainButton.parentNode.className = "block main-block";
        var appendedNode = left.appendChild(mainButton.parentNode);
        left.style.display = "flex";
        right.style.width = "30%";
        var i;
        for(i = 0; i< right.children.length;i++)
        {
            target = right.children[i];
            target.classList.remove("extend");
        }
    }
    else
    {
        var insertedNode = right.appendChild(subButtons[Main].parentNode);
        subButtons[Main].parentNode.className = "block sub-block";
        Main = -1;
        var appendedNode = left.appendChild(mainButton.parentNode);
        mainButton.parentNode.className = "block main-block";
    }
    }
);

subButtons.forEach(function(i){
    i.addEventListener(
        "click", 
        function() 
        {
        // ..做一些事，任何事，你希望按鈕按了要幹嘛?
            if(Main === -1)
            {
                Main = subButtons.indexOf(i);
                var appendedNode = left.appendChild(subButtons[subButtons.indexOf(i)].parentNode);
                subButtons[subButtons.indexOf(i)].parentNode.className = "block main-block";
                var replacedNode = right.appendChild(mainButton.parentNode);
                mainButton.parentNode.className = "block sub-block";
            }
            else if(Main === subButtons.indexOf(i))
            {
                Main = -2;
                subButtons[subButtons.indexOf(i)].parentNode.className = "block sub-block";
                var appendedNode = right.appendChild(subButtons[subButtons.indexOf(i)].parentNode);
                left.style.display = "none";
                right.style.width = "100%";
                for(var j = 0; j< right.children.length;j++)
                {
                    target = right.children[j];
                    target.classList.add("extend");
                }
            }
            else if(Main === -2)
            {
                Main = subButtons.indexOf(i);
                subButtons[subButtons.indexOf(i)].parentNode.className = "block main-block";
                var appendedNode = left.appendChild(subButtons[subButtons.indexOf(i)].parentNode);
                left.style.display = "flex";
                right.style.width = "30%";
                for(var j = 0; j< right.children.length;j++)
                {
                    target = right.children[j];
                    target.classList.remove("extend");
                }
            }
            else
            {
                var insertedNode = right.appendChild(subButtons[Main].parentNode);
                subButtons[Main].parentNode.className = "block sub-block";
                var appendedNode = left.appendChild(subButtons[subButtons.indexOf(i)].parentNode);
                subButtons[subButtons.indexOf(i)].parentNode.className = "block main-block";
                Main = subButtons.indexOf(i);
    
            }
        }
    );
});
t1.forEach(function(i){
    i.addEventListener(
        "click", 
        function() {
        // ..做一些事，任何事，你希望按鈕按了要幹嘛?
            let target = t1[t1.indexOf(i)];

            if(t1.indexOf(i) === Main)
            {
                Main = -2;
                target.parentNode.className = "block sub-block";
                var appendedNode = right.appendChild(t1[t1.indexOf(i)].parentNode);
                right.style.width = "100%";
                left.style.display = "none";
                var removedNode = right.removeChild(t1[t1.indexOf(i)].parentNode);
                for(var j = 0; j < right.children.length;j++)
                {
                    var tar = right.children[j];
                    tar.classList.add("extend");
                }
            }
            else
            {
                var removedNode = target.parentNode.parentNode.removeChild(target.parentNode);

            }  
            participants = participants-1;
            if(participants === 1)
            {           
                mainButton.parentNode.className = "block main-block";
                left.style.display = "flex";
                right.style.width = "30%";
                if(Main !== -1)
                {           
                    Main = -1;
                    var appendedNode = left.appendChild(mainButton.parentNode);
                }
                right.style.display = "none";
                left.style.width = "100%";
            }
    
        }
    );
});





