function BaseDomainFinder() {
    this.publicDomain = [];
    this.init();
}


BaseDomainFinder.prototype = {
    init: function() {
        this.publicDomain = new PublicDomain();
    },
    /**
     * [getPublicDomains description]
     * @return {[type]} [description]
     */
    getPublicDomains: function() {
        return this.publicDomain.getPublicDomains();
    },
    /**
     * [getBaseDomain description]
     * @param  {[type]} subDomain [description]
     * @return {[type]}           [description]
     */
    getBaseDomain: function(subDomain) {
        return this.domainSearch(this.getBaseDomainOfGivenSubDomain(subDomain), this.getPublicDomains());
    },
    getBaseDomainOfGivenSubDomain: function(subDomain) {
        var domainSplit = subDomain.split('.');
        domainSplit.shift();
        return domainSplit.join('.');
    },
    /**
     * search given domain in the publicDomain array and return domain if found, else return null
     * @private
     * @param  {string} domain
     * @param  {array} publicDomains
     * @return {string|null} matched domain   
     */
    domainSearch: function(domain, publicDomains) {
        while (true) {
            var mid = parseInt(publicDomains.length / 2, 10);
            if (domain === publicDomains[mid]) {
                return domain;
            } else if (domain > publicDomains[mid]) {
                publicDomains = publicDomains.slice(mid);
            } else if (domain < publicDomains[mid]) {
                publicDomains = publicDomains.slice(0, mid);
            }

            if (mid === 0) {
                if (domain === publicDomains[0]) {
                    return domain;
                }
                return null;
            }
        }
    },
    /**
     * add given domain into public domain
     * @param {[string} domainName
     */
    addDomain: function(domainName) {
        if (typeof domainName === 'string') {
            this.publicDomain.addDomain(domainName);
        }
    }
};
