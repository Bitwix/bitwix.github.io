const HACKMAN_VERSION = "v0.01 4/3/2025";

if( process.argv.length == 0 ) {
    console.log( `Hackman Version ${HACKMAN_VERSION}`);
} else {
    addToStringPrototype();
    const arg = process.argv[ process.argv.length - 1 ];
    const password = arg.separatePunctuation().split(" ").map( w => w.subtleReplace() ).join( "" );
    console.log( `${password} <- ${arg}` );
}