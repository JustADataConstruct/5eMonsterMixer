import axios from 'axios';
import {median} from 'mathjs';

var monster1, monster2;

function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function throwCoin()
{
    return rand(0,100) > 50;
}

async function initMonster(name)
{
    const base = `http://www.dnd5eapi.co/api/monsters/`

    return axios.get(base+name).then((response) => {
        return response.data;
    })
}

function generateName(name1,name2) //TODO: Keep working on this.
{
    var w1 = name1.split("-");
    var w2 = name2.split("-");

    var words = w1.concat(w2)

    var count = rand(1,(w1.length+1 + w2.length+1));
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

function generateType() //TODO: Option to generate type outside of the monsters' own types.
{
    var type;
    if (throwCoin())
    {
        type = monster1.type;
    }
    else {
        type = monster2.type;
    }
    return type;
}

function generateAlignment()
{
    if (rand(0,100) < 25) {
        return "unaligned";
    }
    var a1 = ["lawful","neutral","chaotic"]
    var a2 = ["good","neutral","evil"]
    return a1[rand(0,a1.length)] + " " + a2[rand(0,a2.length)]
}

function generateAC()
{
    return median(monster1.armor_class,monster2.armor_class);
}

function generateHP()
{
    return median(monster1.hit_points,monster2.hit_points);
}


export async function mix(name1, name2)
{
    if ((!monster1 || !monster2) || (monster1.index != name1 || monster2.index != name2))
    {
        console.log("Reloading.");
        monster1 = await initMonster(name1);
        monster2 = await initMonster(name2);
    
    }
    var result = {
        name:generateName(name1,name2),
        size:generateSize(),
        type:generateType(),
        alignment:generateAlignment(),
        ac:generateAC(),
        hp:generateHP()
    };
    return result;
}