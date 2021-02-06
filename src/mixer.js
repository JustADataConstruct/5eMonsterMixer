import axios from 'axios';

var monster1, monster2;

function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function initMonsters(name1,name2)
{
    const base = `http://www.dnd5eapi.co/api/monsters/`

    axios.get(base+name1).then((response) => {
        monster1 = response.data;
    })

    axios.get(base+name2).then((response) => {
        monster2 = response.data;
    })
}

function generateName(name1,name2) 
{
    var w1 = name1.split("-");
    var w2 = name2.split("-");

    var words = w1.concat(w2)

    var count = rand(1,(w1.length + w2.length));
    var result = []

    while (count > 0) {
        var coin = rand(0,100)
        var word = '';
        if (coin > 50)
        {
            word = w1[rand(0,w1.length)];
        }
        else {
            word = w2[rand(0,w2.length)];
        }
        if (result[result.length-1] != word)
        {
            result.push(word)
            count --;
        }        
    }
    return result.join(" ");
}

function generateSize()
{
    var sizes = ["tiny","small","medium","large","huge","gargantuan"];
    return sizes[rand(0,sizes.length)];
}

export function mix(name1, name2)
{
    if (monster1 && monster2)
    {
        if (name1 != monster1.index || name2 != monster2.index)
        {
            console.log("Init");
            initMonsters(name1,name2);
        }
    }
    else {
        initMonsters(name1,name2);
    }  
    var result = {
        name:generateName(name1,name2),
        size:generateSize()
    };
    return result;
}