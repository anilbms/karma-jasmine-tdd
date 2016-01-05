describe('PublicDomain class', function() {
    var publicDomain = new PublicDomain();

    it('getPublicDomains method should return generated public domains', function() {
        expect(publicDomain.getPublicDomains()).toBeArray();
        expect(publicDomain.getPublicDomains().length).toBe(100001);
    });

    it('addDomain method should add given domain into publicDomains list', function() {
        publicDomain.addDomain('test123.com');
        expect(publicDomain.getPublicDomains()).toContain('test123.com');
        publicDomain.addDomain('test345.com');
        expect(publicDomain.getPublicDomains()).toContain('test345.com');
    });

    it('addDomain method should not add given domain into publicDomains if already exist', function() {
        var lengthOfPublicDomains = publicDomain.getPublicDomains().length,
            randomDomain = publicDomain.getPublicDomains()[2];
        publicDomain.addDomain(randomDomain);
        expect(publicDomain.getPublicDomains().length).toBe(lengthOfPublicDomains);
    });
});
