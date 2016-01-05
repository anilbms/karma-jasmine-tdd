describe('baseDomainFinder class', function() {
    var baseDomainFinder = new BaseDomainFinder(),
        publicDomains = baseDomainFinder.getPublicDomains(); // random generated public domains

    it('getBaseDomain method should return public domain for given subdomain', function() {
        var randomDomain = publicDomains[1];
        expect(baseDomainFinder.getBaseDomain('abc.' + randomDomain)).toBe(randomDomain);
        randomDomain = publicDomains[34];
        expect(baseDomainFinder.getBaseDomain('xyz.' + randomDomain)).toBe(randomDomain);
        expect(baseDomainFinder.getBaseDomain('abc.yahoo1.com')).toBe(null);
        expect(baseDomainFinder.getBaseDomain('abc.twitter2.com')).toBe(null);
    });
    it('getBaseDomain method should return null if given subdomain\'s domain not in the  public domain', function() {
        expect(baseDomainFinder.getBaseDomain('abc.yahoo1.com')).toBe(null);
        expect(baseDomainFinder.getBaseDomain('abc.twitter2.com')).toBe(null);
    });

    it('addDomain method should add given domain into publicDomains list', function() {
        baseDomainFinder.addDomain('test123.com');
        expect(baseDomainFinder.getPublicDomains()).toContain('test123.com');
        baseDomainFinder.addDomain('test345.com');
        expect(baseDomainFinder.getPublicDomains()).toContain('test345.com');
    });
    it('addDomain method should not add given domain into publicDomains if already exist', function() {
        var lengthOfPublicDomains = baseDomainFinder.getPublicDomains().length,
            randomDomain = baseDomainFinder.getPublicDomains()[2];
        baseDomainFinder.addDomain(randomDomain);
        expect(baseDomainFinder.getPublicDomains().length).toBe(lengthOfPublicDomains);
    });
});
