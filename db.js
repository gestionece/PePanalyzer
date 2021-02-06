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
        }
    ],

    CEP: [
        /*{
            key: "MF",
            label: "MF-TF",
            CON: 2.50,
            INT: 1.00,
            AV: 1.20,
        }, {
            key: "TF",
            label: "TF15/30",
            CON: 3.50,
            INT: 1.00,
            AV: 1.20,
        }, {
            key: "M2",
            label: "M2",
            CON: 4.50,
            INT: 1.00,
            AV: 1.20,
        }, {
            key: "MF_R",
            label: "MF-TF Ripassi",
            CON: 3.50,
            GG1: 3.50,
            GG2: 2.50,
            GG3: 1.50,
            INTR: 1.00,
            AV: 1.20,
        }, {
            key: "TF_R",
            label: "TF15/30 Ripassi",
            CON: 3.50,
            GG1: 3.50,
            GG2: 2.50,
            GG3: 1.50,
            INTR: 1.00,
            AV: 1.20,
        },*/
        
        
        
        
        
        
        
        
        
        {
            key: "CON",
            label: "Eseguiti",
            MF: 2.50,
            TF: 3.50,
            M2: 4.50,
            MF_R: 3.50,
            TF_R: 3.50,
        }, {
            key: "AV",
            label: "Acesso a Vuoto",
            MF: 1.20,
            TF: 1.20,
            M2: 1.20,
            MF_R: 1.20,
            TF_R: 1.20,
        }, { //Premi
            key: "GG1",
            label: "Premio Accelerazione <30 giorni",
            MF_R: 3.50,
            TF_R: 3.50,
        }, { //Premi
            key: "GG2",
            label: "Premio Accelerazione 30<>90 giorni",
            MF_R: 2.50,
            TF_R: 2.50,
        }, { //Premi
            key: "GG3",
            label: "Premio Accelerazione 90<>120 giorni",
            MF_R: 1.50,
            TF_R: 1.50,
        }, {
            key: "INT",
            label: "Premio interni",
            MF: 1.00,
            TF: 1.00,
            M2: 1.00,
        }, {
            key: "INTR",
            label: "Premio interni ripassi(no <30 giorni)",
            MF_R: 1.00,
            TF_R: 1.00,
        }
    ]
}