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

    MF: { //Object.keys(CalcTable.CEP[2]);   //Object.keys(CalcTable["MF"])
        TOT: 0.00, //TEST
        CON: 2.50,
        AV: 1.20,
        INT: 1.00,
    },
    TF: {
        CON: 3.50,
        AV: 1.20,
        INT: 1.00,
    },
    M2: {
        CON: 4.50,
        AV: 1.20,
        INT: 1.00,
    },
    MF_R: {
        CON: 3.50,
        AV: 1.20,
        GG1: 3.50,
        GG2: 2.50,
        GG3: 1.50,
        INTR: 1.00,
    },
    TF_R: {
        CON: 3.50,
        AV: 1.20,
        GG1: 3.50,
        GG2: 2.50,
        GG3: 1.50,
        INTR: 1.00,
    },
    Label: {
        CON: "Eseguiti",
        GG1: "Premio Accelerazione <30 giorni",
        GG2: "Premio Accelerazione 30<>90 giorni",
        GG3: "Premio Accelerazione 90<>120 giorni",
        INT: "Premio interni",
        INTR: "Premio interni ripassi(no <30 giorni)",
        AV: "Acesso a Vuoto",
        TOT: "Totali",
        ANN: "Annullati",

        MF: "MF-TF",
        TF: "TF-15/30",
        M2: "M2",
        MF_R: "MF-TF Ripassi",
        TF_R: "TF-15/30 Ripassi",

        CN: "Contratto",
        LCL: "LCL",
        TYPE: "Tipo LCL",
        DATE: "Data inizio LCL",

        ST_Annullato: "SmarTest Annullato",
        ST_Carico: "SmarTest Sotto soglia",
        ST_Connect: "SmarTest Errore di conessione",
        ST_Eseguito: "SmarTest Eseguito",
    },
}


/*

<div id="litepicker"></div>
            <script>
              const picker = new Litepicker({
                element: document.getElementById('litepicker'),
                format: "DD-MM-YYYY",
                inlineMode: true,
                singleMode: false,
                lang: "it-IT",
                tooltipText: {"one":"giorno","other":"giorni"},
                setup: (picker) => {
                  picker.on('selected', (dateStart, dateEnd) => {
                    console.log(dateStart.dateInstance);
                    console.log(dateEnd.dateInstance);
                  });
                },
              });
            </script>
            <style>
              :root {
                --litepicker-is-start-color-bg: #4CAF50 !important;
                --litepicker-is-end-color-bg: #4CAF50 !important;
                --litepicker-is-in-range-color: #7be47f !important;
                --litepicker-day-color-hover: #2c8a30 !important;
                --litepicker-button-prev-month-color-hover: #4CAF50 !important;
                --litepicker-button-next-month-color-hover: #4CAF50 !important;
                --litepicker-day-width: 30px;
              }
            </style>

*/
