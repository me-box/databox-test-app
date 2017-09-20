const NETSTRING_DELIMITER = ',';
const NETSTRING_SEPARATOR = ':';
const NETSTRING_SEPARATOR_CODE = 58;


module.exports = {

    
    netstringify : function(string, { encoding = 'utf-8', response = 'string' } = {}){

        let result = [];
        let input = [];

        if (!input) {
            return;
        }

        if (!Array.isArray(string)) {
            input.push(string);
        } else {
            input = string;
        }

        input.forEach((text) => {
            let netstring = [];
            netstring.push(new Buffer(`${text.length}${NETSTRING_SEPARATOR}`, encoding));
            netstring.push(new Buffer(text, encoding));
            netstring.push(new Buffer(NETSTRING_DELIMITER, encoding));
            netstring = Buffer.concat(netstring);
            result.push(netstring);
        });
        //For string result
        if (result.length > 0 && response === 'string') {
            result = result.map(netstring => netstring.toString(encoding));
            return result.join('');
        }
        //Return as buffer for all the other types.
        return Buffer.concat(result);
    },

    
}