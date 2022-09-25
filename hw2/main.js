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
let t1 = document.getElementsByClassName("quit");
let mainButton = document.getElementById("main-button");
let subButtons = document.getElementsByClassName("sub-button");
var subButtonsNum = subButtons.length;
var before =[0,1,2,3,4]
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
        if(Main != subButtons.length - 1)
        {
            var insertedNode = right.insertBefore(subButtons[0].parentNode, subButtons[Main+1].parentNode);
        }
        else
        {
            var appendedNode = right.insertBefore(subButtons[0].parentNode, mainButton.parentNode);
        }
        subButtons[Main].parentNode.className = "block sub-block";
        Main = -1;
        var appendedNode = left.appendChild(mainButton.parentNode);
        mainButton.parentNode.className = "block main-block";
    }
    }
);
subButtons[0].addEventListener(
    "click", 
    function() {
    // ..做一些事，任何事，你希望按鈕按了要幹嘛?
    if(Main === -1)
    {
        Main = before[0];
        var appendedNode = left.appendChild(subButtons[before[0]].parentNode);
        subButtons[0].parentNode.className = "block main-block";
        var replacedNode = right.appendChild(mainButton.parentNode);
        mainButton.parentNode.className = "block sub-block";
    }
    else if(Main === before[0])
    {
        Main = -2;
        subButtons[0].parentNode.className = "block sub-block";
        var appendedNode = right.appendChild(subButtons[0].parentNode);
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
        Main = before[0];
        subButtons[before[0]].parentNode.className = "block main-block";
        var appendedNode = left.appendChild(subButtons[before[0]].parentNode);
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
        if(Main != subButtons.length - 1)
        {
            var insertedNode = right.insertBefore(subButtons[0].parentNode, subButtons[Main+1].parentNode);
        }
        else
        {
            var appendedNode = right.insertBefore(subButtons[0].parentNode, mainButton.parentNode);
        }
        subButtons[Main].parentNode.className = "block sub-block";
        var appendedNode = left.appendChild(subButtons[before[0]].parentNode);
        subButtons[0].parentNode.className = "block main-block";
        Main = before[0];

    }
    }
);
subButtons[1].addEventListener(
    "click", 
    function() {
    // ..做一些事，任何事，你希望按鈕按了要幹嘛?
    if(Main === -1)
    {
        Main = before[1];
        var appendedNode = left.appendChild(subButtons[before[1]].parentNode);
        subButtons[0].parentNode.className = "block main-block";
        var replacedNode = right.appendChild(mainButton.parentNode);
        mainButton.parentNode.className = "block sub-block";
    }
    else if(Main === before[1])
    {
        Main = -2;
        subButtons[0].parentNode.className = "block sub-block";
        var appendedNode = right.appendChild(subButtons[0].parentNode);
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
        Main = before[1];
        subButtons[before[1]].parentNode.className = "block main-block";
        var appendedNode = left.appendChild(subButtons[before[1]].parentNode);
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
        if(Main != subButtons.length - 1)
        {
            var insertedNode = right.insertBefore(subButtons[0].parentNode, subButtons[Main+1].parentNode);
        }
        else
        {
            var appendedNode = right.insertBefore(subButtons[0].parentNode, mainButton.parentNode);
        }
        subButtons[Main].parentNode.className = "block sub-block";
        var appendedNode = left.appendChild(subButtons[before[1]].parentNode);
        subButtons[0].parentNode.className = "block main-block";
        Main = before[1];

    }
    }
);
subButtons[2].addEventListener(
    "click", 
    function() {
    // ..做一些事，任何事，你希望按鈕按了要幹嘛?
    if(Main === -1)
    {
        Main = before[2];
        var appendedNode = left.appendChild(subButtons[before[2]].parentNode);
        subButtons[0].parentNode.className = "block main-block";
        var replacedNode = right.appendChild(mainButton.parentNode);
        mainButton.parentNode.className = "block sub-block";
    }
    else if(Main === before[2])
    {
        Main = -2;
        subButtons[0].parentNode.className = "block sub-block";
        var appendedNode = right.appendChild(subButtons[0].parentNode);
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
        Main = before[2];
        subButtons[before[2]].parentNode.className = "block main-block";
        var appendedNode = left.appendChild(subButtons[before[2]].parentNode);
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
        if(Main != subButtons.length - 1)
        {
            var insertedNode = right.insertBefore(subButtons[0].parentNode, subButtons[Main+1].parentNode);
        }
        else
        {
            var appendedNode = right.insertBefore(subButtons[0].parentNode, mainButton.parentNode);
        }
        subButtons[Main].parentNode.className = "block sub-block";
        var appendedNode = left.appendChild(subButtons[before[2]].parentNode);
        subButtons[0].parentNode.className = "block main-block";
        Main = before[2];

    }
    }
);
subButtons[3].addEventListener(
    "click", 
    function() {
    // ..做一些事，任何事，你希望按鈕按了要幹嘛?
    if(Main === -1)
    {
        Main = before[3];
        var appendedNode = left.appendChild(subButtons[before[3]].parentNode);
        subButtons[0].parentNode.className = "block main-block";
        var replacedNode = right.appendChild(mainButton.parentNode);
        mainButton.parentNode.className = "block sub-block";
    }
    else if(Main === before[3])
    {
        Main = -2;
        subButtons[0].parentNode.className = "block sub-block";
        var appendedNode = right.appendChild(subButtons[0].parentNode);
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
        Main = before[3];
        subButtons[before[3]].parentNode.className = "block main-block";
        var appendedNode = left.appendChild(subButtons[before[3]].parentNode);
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
        if(Main != subButtons.length - 1)
        {
            var insertedNode = right.insertBefore(subButtons[0].parentNode, subButtons[Main+1].parentNode);
        }
        else
        {
            var appendedNode = right.insertBefore(subButtons[0].parentNode, mainButton.parentNode);
        }
        subButtons[Main].parentNode.className = "block sub-block";
        var appendedNode = left.appendChild(subButtons[before[3]].parentNode);
        subButtons[0].parentNode.className = "block main-block";
        Main = before[3];

    }
    }
);
subButtons[4].addEventListener(
    "click", 
    function() {
    // ..做一些事，任何事，你希望按鈕按了要幹嘛?
    if(Main === -1)
    {
        Main = before[4];
        var appendedNode = left.appendChild(subButtons[before[4]].parentNode);
        subButtons[0].parentNode.className = "block main-block";
        var replacedNode = right.appendChild(mainButton.parentNode);
        mainButton.parentNode.className = "block sub-block";
    }
    else if(Main === before[4])
    {
        Main = -2;
        subButtons[0].parentNode.className = "block sub-block";
        var appendedNode = right.appendChild(subButtons[0].parentNode);
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
        Main = before[4];
        subButtons[before[4]].parentNode.className = "block main-block";
        var appendedNode = left.appendChild(subButtons[before[4]].parentNode);
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
        if(Main != subButtons.length - 1)
        {
            var insertedNode = right.insertBefore(subButtons[0].parentNode, subButtons[Main+1].parentNode);
        }
        else
        {
            var appendedNode = right.insertBefore(subButtons[0].parentNode, mainButton.parentNode);
        }
        subButtons[Main].parentNode.className = "block sub-block";
        var appendedNode = left.appendChild(subButtons[before[4]].parentNode);
        subButtons[0].parentNode.className = "block main-block";
        Main = before[4];

    }
    }
);
t1[0].addEventListener(
    "click", 
    function() {
    // ..做一些事，任何事，你希望按鈕按了要幹嘛?
        let target = t1[0];
        if(Main === before[0])
        {
            target = t1[0];
        }
        else if(Main >= before[0])
        {
            target = t1[before[0]+1];
        }
        if(target === t1[0] && Main >=0 )
        {
            Main = -2;
            target.parentNode.className = "block sub-block";
            var appendedNode = right.appendChild(t1[0].parentNode);
            right.style.width = "100%";
            left.style.display = "none";
            var removedNode = right.removeChild(t1[t1.length -1].parentNode);
            for(var j = 1;j < 5;j++)
            {
                before[j] = before[j] - 1;
            }
            if(Main > before[0])
            {
                Main = Main - 1
            }
            for(var j = 0; j < right.children.length;j++)
            {
                var tar = right.children[j];
                tar.classList.add("extend");
            }
        }
        else
        {
            var removedNode = target.parentNode.parentNode.removeChild(target.parentNode);
            for(var j = 1;j < 5;j++)
            {
                before[j] = before[j] - 1;
            }
            if(Main > before[0])
            {
                Main = Main - 1
            }
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
t1[1].addEventListener(
    "click", 
    function() {
    // ..做一些事，任何事，你希望按鈕按了要幹嘛?
        let target = t1[before[1]];
        if(Main === before[1])
        {
            target = t1[0];
        }
        else if(Main >= before[1])
        {
            target = t1[before[1]+1];
        }
        if(target === t1[0] && Main >=0 )
        {
            Main = -2;
            target.parentNode.className = "block sub-block";
            var appendedNode = right.appendChild(t1[0].parentNode);
            right.style.width = "100%";
            left.style.display = "none";
            var removedNode = right.removeChild(t1[t1.length -1].parentNode);
            for(var j = 2;j < 5;j++)
            {
                before[j] = before[j] - 1;
            }
            if(Main > before[1])
            {
                Main = Main - 1
            }
            for(var j = 0; j < right.children.length;j++)
            {
                var tar = right.children[j];
                tar.classList.add("extend");
            }
        }
        else
        {
            var removedNode = target.parentNode.parentNode.removeChild(target.parentNode);
            for(var j = 2;j < 5;j++)
            {
                before[j] = before[j] - 1;
            }
            if(Main > before[1])
            {
                Main = Main - 1
            }
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
t1[2].addEventListener(
    "click", 
    function() {
    // ..做一些事，任何事，你希望按鈕按了要幹嘛?
        let target = t1[before[2]];
        if(Main === before[2])
        {
            target = t1[0];
        }
        else if(Main >= before[2])
        {
            target = t1[before[2]+1];
        }
        if(target === t1[0] && Main >=0 )
        {
            Main = -2;
            target.parentNode.className = "block sub-block";
            var appendedNode = right.appendChild(t1[0].parentNode);
            right.style.width = "100%";
            left.style.display = "none";
            var removedNode = right.removeChild(t1[t1.length -1].parentNode);
            for(var j = 3;j < 5;j++)
            {
                before[j] = before[j] - 1;
            }
            if(Main > before[2])
            {
                Main = Main - 1
            }
            for(var j = 0; j < right.children.length;j++)
            {
                var tar = right.children[j];
                tar.classList.add("extend");
            }
        }
        else
        {
            var removedNode = target.parentNode.parentNode.removeChild(target.parentNode);
            for(var j = 3;j < 5;j++)
            {
                before[j] = before[j] - 1;
            }
            if(Main > before[2])
            {
                Main = Main - 1
            }
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
t1[3].addEventListener(
    "click", 
    function() {
    // ..做一些事，任何事，你希望按鈕按了要幹嘛?
        let target = t1[before[3]];
        if(Main === before[3])
        {
            target = t1[0];
        }
        else if(Main >= before[3])
        {
            target = t1[before[3]+1];
        }
        if(target === t1[0] && Main >=0 )
        {
            Main = -2;
            target.parentNode.className = "block sub-block";
            var appendedNode = right.appendChild(t1[0].parentNode);
            right.style.width = "100%";
            left.style.display = "none";
            var removedNode = right.removeChild(t1[t1.length -1].parentNode);
            for(var j = 4;j < 5;j++)
            {
                before[j] = before[j] - 1;
            }
            if(Main > before[3])
            {
                Main = Main - 1
            }
            for(var j = 0; j < right.children.length;j++)
            {
                var tar = right.children[j];
                tar.classList.add("extend");
            }
        }
        else
        {
            var removedNode = target.parentNode.parentNode.removeChild(target.parentNode);
            for(var j = 4;j < 5;j++)
            {
                before[j] = before[j] - 1;
            }
            if(Main > before[3])
            {
                Main = Main - 1
            }
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
t1[4].addEventListener(
    "click", 
    function() {
    // ..做一些事，任何事，你希望按鈕按了要幹嘛?
        let target = t1[before[4]];
        if(Main === before[4])
        {
            target = t1[0];
        }
        else if(Main >= before[4])
        {
            target = t1[before[4]+1];
        }
        if(target === t1[0] && Main >=0 )
        {
            Main = -2;
            target.parentNode.className = "block sub-block";
            var appendedNode = right.appendChild(t1[0].parentNode);
            right.style.width = "100%";
            left.style.display = "none";
            var removedNode = right.removeChild(t1[t1.length -1].parentNode);
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




