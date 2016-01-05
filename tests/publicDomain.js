/**
 * @constructor
 */
function PublicDomain() {
    this.publicDomains = [];
    // sample domain suffixes 
    this.domainSuffixArray = ['com', 'in', 'de', 'nl', 'me', 'io', 'org', 'edu', 'ae', 'au'];
    this.init();
}

PublicDomain.prototype = {
    /**
     * Initialize PubicDomain class
     * @private
     * @return {[type]} [description]
     */
    init: function() {
        this.generateDomains();
    },
    /**
     * generate 100000 random domains and sort
     * @private
     */
    generateDomains: function() {
        var publicDomains = this.getPublicDomains();
        for (var i = 100000; i >= 0; i--) {
            publicDomains.push(this.getRandomDomain());
        }
        this.setPublicDomains(publicDomains);
        this.sortDomains();
    },
    /**
     * get random domain of length 3 to 10 character with domain suffix
     * @private
     * @return {string} random domain
     */
    getRandomDomain: function() {
        var randomNumber = this.getRandomNumberbetween3to10(),
            randomDomain = '';


        for (var i = randomNumber; i >= 0; i--) {
            randomDomain += this.getRandomAplhaCharater();
        }

        randomDomain += '.' + this.getRandomDomainSuffix();
        return randomDomain;
    },
    /**
     * sort domain. used for binary search.
     * @private
     */
    sortDomains: function() {
        this.publicDomains.sort();
    },
    /**
     * get random number between 0 and maxNumber
     * @private
     * @param {number} maxNumber - optional maximum number to get from this method
     * by default max number is 10
     * @return {number}
     */
    getRandomNumber: function(maxNumber) {
        if (!maxNumber) {
            maxNumber = 10;
        }
        return parseInt(Math.random() * maxNumber);
    },
    /**
     * get random number between 3 and 10
     * @private
     * @return {number}
     */
    getRandomNumberbetween3to10: function() {
        var randomNumber = this.getRandomNumber(11);
        return randomNumber < 4 ? 3 : randomNumber;
    },
    /**
     *  get random alphabetical character
     * @private
     * @return {string} an alphabetical character
     */
    getRandomAplhaCharater: function() {
        var randomNumber = this.getRandomNumber(26);
        return 'abcdefghijklmnopqrstuvwxyz'.charAt(randomNumber);
    },
    /**
     * get random domain suffix from domainSuffixArray
     * @private
     * @return {string}
     */
    getRandomDomainSuffix: function() {
        return this.domainSuffixArray[this.getRandomNumber()];
    },
    /**
     * get public domains list
     * @public
     * @return {array} publicDomains
     */
    getPublicDomains: function() {
        return this.publicDomains;
    },
    /**
     * update public domains 
     * @public
     * @param {array} publicDomains
     */
    setPublicDomains: function(publicDomains) {
        this.publicDomains = publicDomains;
    },
    /**
     * add given domain to public domain
     * @public
     * @param {string} domainName
     */
    addDomain: function(domainName) {
        this.addDomainToNearestDomain(domainName, this.findNearestDomain(domainName)[0]);
    },
    /**
     * find nearest domain for given domain
     * @private
     * @param  {string} baseDomain 
     * @return {string}  nearest domain
     */
    findNearestDomain: function(baseDomain) {
        var publicDomains = this.getPublicDomains();
        // find nearest domain
        while (publicDomains.length > 1) {
            var mid = parseInt(publicDomains.length / 2, 10);
            if (baseDomain < publicDomains[mid]) {
                publicDomains = publicDomains.slice(0, mid);
            } else {
                publicDomains = publicDomains.slice(mid);
            }
        }
        return publicDomains;
    },
    /**
     * add given domain before or after nearest domain
     * @private
     * @param {string} domainName    
     * @param {string} nearestDomain
     */
    addDomainToNearestDomain: function(domainName, nearestDomain) {
        var publicDomains = this.getPublicDomains();
        // add only if given domain not already exist in publicDomains
        if (domainName !== nearestDomain) {
            var index = publicDomains.indexOf(nearestDomain);

            if (domainName < nearestDomain) {
                publicDomains.splice(index - 1, 0, domainName);
            } else {
                publicDomains.splice(index + 1, 0, domainName);
            }
        }
        this.setPublicDomains(publicDomains);
    }

};
