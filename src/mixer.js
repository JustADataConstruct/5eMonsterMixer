function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function generateName(name1,name2) 
{
    var w1 = name1.split("-");
    var w2 = name2.split("-");

    var words = w1.concat(w2)

    var count = rand(1,(w1.length + w2.length));
    var result = []

    while (count > 0) {
        result.push(words[rand(0,words.length)]);
        count --;
    }
    return result.join(" ");

}