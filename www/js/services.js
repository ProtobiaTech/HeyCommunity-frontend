HeyCommunity

.factory('Locales', function() {

    var locales = [{
        id: 0,
        name: '39º27N',
        tipo: 'Copas',
        direccion: 'Calle falsa 123, Valencia',
        logo: 'img/logo39.jpg'
    }, {
        id: 1,
        name: '48',
        tipo: 'Copas',
        direccion: 'Calle falsa 123, Valencia',
        logo: 'img/logo48.jpg'
    }, {
        id: 2,
        name: 'ANIMAS',
        tipo: 'Discoteca',
        direccion: 'Calle falsa 123, Valencia',
        logo: 'img/animas.jpg'
    }, {
        id: 3,
        name: 'BAGOAS',
        tipo: 'Copas',
        direccion: 'Calle falsa 123, Valencia',
        logo: 'img/48.jpg'
    }, {
        id: 4,
        name: 'BFORE CLUB',
        tipo: 'Copas',
        direccion: 'Calle falsa 123, Valencia',
        logo: 'img/bfore.jpg'
    }, {
        id: 5,
        name: 'CONDADO CLUB',
        tipo: 'Discoteca',
        direccion: 'Calle Marques de campo 12, Denia',
        logo: 'img/condado.jpg'
    }];

    return {
        all: function() {
            return locales;
        },
        remove: function(local) {
            locales.splice(locales.indexOf(local), 1);
        },
        get: function(id_local) {
            for (var i = 0; i < locales.length; i++) {
                if (locales[i].id === parseInt(id_local)) {
                    return locales[i];
                }
            }
        return null;
        }
    };
});
