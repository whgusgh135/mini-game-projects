var data = [
    {
        "name": "Dwight",
        "quote": "Who is Justice Beaver?"
    },
    {
        "name": "Michael",
        "quote": "I am running away from my responsibilities. And it feels good.."
    },
    {
        "name": "Michael",
        "quote": "I am Beyonce, always."
    },
    {
        "name": "Jim",
        "quote": "Bears. Beets. Battlestar Galactica."
    },
    {
        "name": "Michael",
        "quote": "How the turntables..."
    },
    {
        "name": "Dwight",
        "quote": "Through concentration, I can raise and lower my cholesterol at will."
    },
    {
        "name": "Jim",
        "quote": "Right now, this is just a job. If I advance any higher in this company, then this would be my career. And, well, if this were my career? I'd have to throw myself in front of a train."
    },
    {
        "name": "Michael",
        "quote": "Am I going to tell them? No, I am not going to tell them. I don't see the point of that. As a doctor, you would not tell a patient if they had cancer."
    },
    {
        "name": "Michael",
        "quote": "Wikipedia Is The Best Thing Ever. Anyone In The World Can Write Anything They Want About Any Subject, So You Know You Are Getting The Best Possible Information."
    },
    {
        "name": "Oscar",
        "quote": "Saddle Shoes With Denim? I Will Literally Call Protective Services."
    },
    {
        "name": "Michael",
        "quote": "Hate To See You Leave But Love To Watch You Go. 'Cause Of Your Butt."
    },
    {
        "name": "Michael",
        "quote": "Well, happy birthday, Jesus. Sorry your party's so lame."
    },
    {
        "name": "Kevin",
        "quote": "I have very little patience for stupidity."
    },
    {
        "name": "Michael",
        "quote": "I Love Inside Jokes. Love To Be A Part Of One Someday."
    },
    {
        "name": "Andy",
        "quote": "I Wish There Was A Way To Know You're In The Good Old Days, Before You’ve Actually Left Them."
    },
    {
        "name": "Michael",
        "quote": "Sometimes I'll Start A Sentence And I Don't Even Know Where It's Going. I Just Hope I Find It Along The Way."
    },
    {
        "name": "Dwight",
        "quote": "How Would I Describe Myself? Three Words. Hard-working. Alpha Male. Jackhammer. Merciless. Insatiable."
    },
    {
        "name": "Michael",
        "quote": "It's Never Too Early For Ice-Cream, Jim."
    },
    {
        "name": "Dwight",
        "quote": "Why Are All These People Here? There Are Too Many People On This Earth. We Need A New Plague."
    },
    {
        "name": "Jim",
        "quote": "I'm boring myself just talking about this."
    },
    {
        "name": "Dwight",
        "quote": "You Couldn't Handle My Undivided Attention."
    },
    {
        "name": "Michael",
        "quote": "Call me as ASAP as possible."
    },
    {
        "name": "Dwight",
        "quote": "Welcome to the Hotel Hell. Check-in time in now, check-out time is never."
    },
    {
        "name": "Dwight",
        "quote": "I'm the owner.. the co-owner. With Satan!"
    },
    {
        "name": "Kelly",
        "quote": "You guys, I'm like really smart now. You don't even know."
    },
    {
        "name": "Angela",
        "quote": "Poop is raining from the ceilings. Poop!"
    },
    {
        "name": "Pam",
        "quote": "I don't care what they say about me. I just want to eat. Which I realize is a lot to ask for… at a dinner party."
    },
    {
        "name": "Kevin",
        "quote": "I just want to lie on the beach and eat hot dogs. That's all I've ever wanted."
    },
    {
        "name": "Angela",
        "quote": "If you pray enough, you can change yourself into a cat person."
    },
    {
        "name": "Dwight",
        "quote": "The Japanese camp guards of World War II always chose one man to kill whenever a batch of new prisoners arrived. I always wondered how they chose the man who was to die. I think I would have been good at choosing the person."
    },
    {
        "name": "Michael",
        "quote": "Close your eyes. Picture a convict. What's he wearing? Nothing special, baseball cap on backwards, baggy pants... he says something ordinary like... 'yo, thats shizzle.' Okay. Now slowly open your eyes again. Who are you picturing? A black man? Wrong. That was a white woman. Surprised? Well, shame on you."
    },
    {
        "name": "Andy",
        "quote": "Sorry I annoyed you with my friendship."
    },
    {
        "name": "Michael",
        "quote": "Who do you think you are?"
    },
    {
        "name": "Pam",
        "quote": "I even hate thinking that Al-Qaeda hates me."
    },
    {
        "name": "Pam",
        "quote": "Don't call my mother your lover"
    },
    {
        "name": "Kevin",
        "quote": "I wanted to eat a pig in a blanket, in a blanket."
    },
    {
        "name": "Ryan",
        "quote": "I'd rather she be alone than with somebody. Is that love?"
    },
    {
        "name": "Ryan",
        "quote": "I'd like to make a toast. To the troops...all the troops...both sides."
    },
    {
        "name": "Ryan",
        "quote": "This reminds me, you owe me three bucks for gas."
    },
    {
        "name": "Ryan",
        "quote": "Let's me adults about this. Let's have sex one more time, and if you have any extra cash that would be amazing."
    },
    {
        "name": "Angela",
        "quote": "And apparently, jugding from her outfit, Jan aspires to be a whore."
    },
    {
        "name": "Angela",
        "quote": "I am having relationship problems, and since you're always having relationship problems I thought you'd be able to give me some advice."
    },
    {
        "name": "Kelly",
        "quote": "I am one of the few people who looks hot eating a cupcake"
    },
    {
        "name": "Kelly",
        "quote": "You wana call someone? That texted you? Do you wana drive them away?"
    },
    {
        "name": "Oscar",
        "quote": "I love a good quitting story. It makes me feel like I have control over my own life. Gives me hope. Maybe I will have one of own someday."
    },
    {
        "name": "Oscar",
        "quote": "Kids, sometimes it pays to be gay."
    },
];
var quoteChar = "";

function getQuote(quotes){
    var quoteIndex = Math.floor(Math.random() * quotes.length);
    $("#quote").text(quotes[quoteIndex].quote);
    quoteChar = quotes[quoteIndex].name;
    $("#displayAns").text("");
}

function checkAnswer(button){
    if(button.attr("id") == quoteChar){
        $("#displayAns").text("Correct!");
        setTimeout(function(){
            getQuote(data);
        },1000)
        
    } else {
        
        $("#displayAns").text("Wrong!");
    }
}

getQuote(data);

$("button").on("click", function(){
    checkAnswer($(this));
});