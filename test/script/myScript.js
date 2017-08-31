{
// pour ce scripte, il faut le fichier en.json trouver dans le projet statcanLang et le fichier LangData.csv
    var dataJason;

    d3.json("en.json", function(data) {
        dataJason = data;
    });



    d3.csv("LangData.csv", function(csv_data){
        var dataTemp,
            temp = dataJason.en.lang, //Cette variable enregistre tous les éléments dans dataJason en/lang{élément}
            json1 = {},
            geo = '00',
            count=0,                  //Ceci est le compteur de region.
            globCount=0,              //Ceci est le compteur pour l'ensemble de ligne a enregistrer.
            tab = [],
            keyT;                     // Cette variable est pour enregistrer les regions

        // Cette boucle incrémente un tableau contenant le nombre de langue par région ex: [189,250,97,4,2,1,6 ...].
        for(var i = 0; i<csv_data.length; i++){
            if(geo===csv_data[i].GEOCODE){
                count++;
            }else{
                tab.push(count);
                geo = csv_data[i].GEOCODE;
                count =1;
            }
        }

        // Cette boucle incrémente le nombre de région
        for(var x=0; x<tab.length-1; x++){
            keyT= csv_data[globCount].GEOCODE;
            if(keyT!=="00"&& keyT.length <=3){
                var json2 = {};
                //Cette boucle incrémente tous les langue pour chaque région
                for(var y = 0; y<tab[x];y++){
                    var temp2 = _.map(temp,function(value,key){
                        if (value===csv_data[globCount].LanguageEN){ return dataTemp = key;}
                    });
                    if(dataTemp!== undefined){
                        var keyLang = dataTemp;
                        json2[keyLang] = parseInt(csv_data[globCount].TOTAL) ;
                        globCount++;
                    }
                }
                json1[keyT]=json2;
            }else {
                for (var y = 0; y < tab[x]; y++) {
                    globCount++;
                }
            }
        }

        treeData = JSON.parse( JSON.stringify(json1) );
        var url = 'data:text/json;charset=utf8,' + encodeURIComponent( JSON.stringify(treeData));
        window.open(url, '_blank');
        window.focus();
    })
}


