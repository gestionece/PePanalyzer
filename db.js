let CalcTable = {
    EUP: [
        {
            key: "8400149083",
            label: "Parma",
            MF: 4.15,
            TF: 6.00,
            M2: 6.00
        }, {
            key: "8400150707",
            label: "Ferrara",
            MF: 3.57,
            TF: 6.40,
            M2: 6.40
        }, {
            key: "8400141787",
            label: "Firenze",
            MF: 3.83,
            TF: 6.00,
            M2: 6.00
        }, {
            key: "8400124337",
            label: "Reggio-Modena 1",
            MF: 4.44,
            TF: 6.90,
            M2: 6.90
        }, {
            key: "8400118979",
            label: "Rovigo 1",
            MF: 5.55,
            TF: 5.55,
            M2: 5.55
        }, {
            key: "8400141790",
            label: "Vicenza",
            MF: 4.60,
            TF: 6.40,
            M2: 6.40
        }, {
            key: "8400149736",
            label: "Mantova-Cremona",
            MF: 4.08,
            TF: 5.90,
            M2: 5.90
        }, {
            key: "8400149816",
            label: "Padova-Rovigo 2",
            MF: 4.00,
            TF: 5.90,
            M2: 5.90
        }, {
            key: "8400151041",
            label: "Reggio-Modena 2",
            MF: 4.15,
            TF: 5.90,
            M2: 5.90
        },],
    CEP: [

        //New DB
        {
            key: "CON",
            ripassi: false,
            label: "Eseguiti",
            MF: 2.50,
            TF: 3.50,
            M2: 4.00
        }, {
            key: "AV",
            label: "Acesso a Vuoto",
            MF: 2.50,
            TF: 3.50,
            M2: 4.00
        }, 
        //

        {
            label: "Eseguiti MF-TF",
            filter: "MF",
            key: "CON",
            value: 2.5
        } ,{
            label: "Eseguiti TF15/30",
            filter: "TF",
            key: "CON",
            value: 3.5
        }, {
            label: "Eseguiti M2",
            filter: "M2",
            key: "CON",
            value: 4.5
        }, {
            label: "Ripassi Eseguiti MF-TF",
            filter: "MF-R",
            key: "CON",
            value: 3.5
        }, {
            label: "Ripassi Eseguiti TF15/30",
            filter: "TF-R",
            key: "CON",
            value: 3.5
        }, { // INT
            label: "Interni",
            filter: "-",
            key: "INT",
            value: 1.00
        }, { //GG MF-R
            label: "Eseguiti <30 Giorni MF-TF",
            filter: "MF-R",
            key: "GG1",
            value: 3.50
        }, {
            label: "Eseguiti 30<>90 Giorni MF-TF",
            filter: "MF-R",
            key: "GG2",
            value: 2.50
        }, {
            label: "Eseguiti 90<>120 Giorni MF-TF",
            filter: "MF-R",
            key: "GG3",
            value: 1.50
        }, {
            label: "Eseguiti <30 Giorni  TF15/30",
            filter: "TF-R",
            key: "GG1",
            value: 3.50
        }, {
            label: "Eseguiti 30<>90 Giorni TF15/30",
            filter: "TF-R",
            key: "GG2",
            value: 2.50
        }, {
            label: "Eseguiti 90<>120 Giorni TF15/30",
            filter: "TF-R",
            key: "GG3",
            value: 1.50
        }, { // AV
            label: "Acesso a Vuoto",
            filter: "-",
            key: "AV",
            value: 1.20
        },
    ]
}