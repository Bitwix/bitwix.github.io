var doneImport = false;
const eltInput = document.getElementById( "txtInput");
const eltOutput = document.getElementById( "txtOutput");
const eltLength = document.getElementById( "spnLength");
const eltBlobs = [ document.getElementById("Blob1"), document.getElementById("Blob2"), 
    document.getElementById("Blob3"), document.getElementById("Blob4") ];

function clearBoxes() {
    eltInput.value = "";
    encodeBoxes();
}

function encodeBoxes() {
    const input = eltInput.value;
    if( !doneImport ) {
        addToStringPrototype();
        doneImport = true;
    }
    const password = input.separatePunctuation().split(" ").filter( w => { return !!w; } ).map( w => w.subtleReplace() ).join( "" );
    eltOutput.value = password;
    eltLength.innerHTML = password.length.toString();
    const distinctCount = getTypeCounts(password).distinct;  
    eltBlobs.forEach( (elt,idx) => {
        elt.classList.remove( "BlobOff", "BlobOn" );
        elt.classList.add( distinctCount > idx ? "BlobOn" : "BlobOff" );
    });
    console.log( `encode ${distinctCount} types in ${password} <- ${input}`);
}

function getTypeCounts( input ) {
    const typeCount = { upper : 0, lower : 0, digit : 0, other : 0, distinct : 0 };
    Array.from(input).forEach( c => {
        if( c >= "A" && c <= "Z" ) {
            typeCount.upper += 1;
        } 
        else if( c >= "a" && c <= "z" ) {
            typeCount.lower += 1;
        } 
        else if( c >= "0" && c <= "9" ) {
            typeCount.digit += 1;
        } 
        else {
            typeCount.other += 1;
        } 
    });
    typeCount.distinct = ( typeCount.upper ? 1 : 0 ) + ( typeCount.lower ? 1 : 0 ) + ( typeCount.digit ? 1 : 0 ) + ( typeCount.other ? 1 : 0 );
    console.log( `getTypeCounts ${JSON.stringify(typeCount)} from ${input}`);
    return typeCount;
}

const examples = {
    britney : "Don't you know I still believe That you will be here, and give me a sign?",
    beatles : "she was just 17 if you know what I mean",
    elvis : "Why can't you see What you're doing to me When you don't believe a word I say?",
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

encodeBoxes();