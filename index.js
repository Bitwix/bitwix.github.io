var doneImport = false;

function clearBoxes() {
    console.log( `clear`);
    document.getElementById( "txtInput").value = "";
    document.getElementById( "txtOutput").value = "";
}

function encodeBoxes() {
    const input = document.getElementById( "txtInput").value;
    if( !doneImport ) {
        addToStringPrototype();
        doneImport = true;
    }
    const password = input.separatePunctuation().split(" ").map( w => w.subtleReplace() ).join( "" );
    document.getElementById( "txtOutput").value = password;
    console.log( `encode ${password} <- ${input}`);
}

const examples = {
    britney : "Don't you know I still believe That you will be here, and give me a sign?",
    beatles : "she was just 17 if you know what I mean",
    tracey_chapman : "You've got a fast car I want a ticket to anywhere",
    frozen : "Let it go, let it go, I'm one with the wind and the sky",
    wham : "wake me up before you gogo I'm not planning on going solo",
    taylor_swift : "you go talk to your friends, talk to my friends, talk to me"
}

function doExample( x ) {
    if( examples[x] ) {
        document.getElementById( "txtInput").value = examples[x];
        encodeBoxes();
    }
}