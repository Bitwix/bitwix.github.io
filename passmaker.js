const addToStringPrototype = () => {
    String.prototype.separatePunctuation = function() {
        var retval = "";
        const punctuation = ",?!";
        Array.from(this).forEach( c => {
            if( punctuation.includes( c ) ) {
                retval += " ";
            }
            retval += c;
        });
        return retval;
    }
    
    String.prototype.subtleReplace = function() {
        const justNumbersRegex = /\d+/;
        const substitutes = [
            [ "1", "one", "won" ],
            [ "2", "to", "too" ],
            [ "4", "for", "four" ],
            [ "8", "ate" ],
            [ "B", "be" ],
            [ "C", "see" ],
            [ "D", "day*" ],
            [ "I", "i", "i'*" ],
            [ "M", "month*"],
            [ "O", "oh" ],
            [ "P", "please" ],
            [ "R", "are" ],
            [ "T", "the", "tea", "tee" ],
            [ "U", "you*" ],
            [ "X", "cross" ],
            [ "Y", "why", "year*" ],
            [ "&", "and" ],
            [ "^", "up" ],
            [ "$", "money" ],
            [ "0", "no", "know", "love" ]
        ];
        if( !this ) {
            return "";
        }
        const input = this.toLowerCase();
        if( input.match( justNumbersRegex ) ) {
            return input;
        }
        var result = null;
        substitutes.forEach( s => {
            var c = matchesSubstitute( s, input );
            result = result || c;
        });
        if( result ) {
            return result;
        }
        return input[0].toString();
    }
    
    function matchesSubstitute( substitute, input ) {
        const len = substitute.length;
        for( var i = 0; i < len; i++ ) {
            if( substitute[i] == input ) {
                return substitute[0];
            }
            const pos = substitute[i].indexOf( "*");
            if( pos > 0 ) {
                if( substitute[i].substring( 0, pos ) == input.substring(0, pos ) ) {
                    return substitute[0];
                }
            }
        }
        return null;
    }


}


