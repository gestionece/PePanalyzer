let selectedFile;
//console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let saveLoadFile;
document.getElementById('button').addEventListener("click", () => {
    let data = [{}];
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary", cellDates: true, dateNF: 'dd/mm/yyyy' });
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

                saveLoadFile = rowObject;
                getLCL(rowObject);
            });
        }
    }
});

let saveListLCL = [];
function getLCL(data) {
    let LCLs = [];
    data.forEach(row => {
        var LCLexist = false;
        LCLs.forEach(lcl => {
            if (row.CODICE_LCL == lcl.CODICE_LCL) {
                LCLexist = true;
            }
        });

        if (LCLexist == false) {
            LCLexist = false;

            //Castel per determinare se è 15/30
            var typelcl = "MF";
            var typeCE = row.CODICE_ANTE_SOSTITUZIONE.substring(4, 5);
            if (row.MOTIV_RICH == "PRM2") {
                typelcl = "M2";
            }
            else if (row.MOTIV_RICH == "RI2G" && typeCE != "F") {
                typelcl = "MF_R";
            }
            else if (row.MOTIV_RICH == "RI2G" && typeCE == "F") {
                typelcl = "TF_R";
            }
            else if (row.MOTIV_RICH == "MA2G" && typeCE != "F") {
                typelcl = "MF";
            }
            else if (row.MOTIV_RICH == "MA2G" && typeCE == "F") {
                typelcl = "TF";
            }

            let LCL = {
                "CODICE_CONTRATTO": row.CODICE_CONTRATTO,
                "CODICE_LCL": row.CODICE_LCL,
                "TIPO_LCL": typelcl,
                "STATO_LCL": row.STATO_LCL,
                "DATA_INIZIO_LCL": row.DATA_INIZIO_LCL,
                "DATA_FINE_LCL": row.DATA_FINE_LCL,
                "SELECT": true,
            };

            LCLs.push(LCL);
        }
    });
    //console.log(LCLs);
    saveListLCL = LCLs;
    loadData(LCLs);
}

function loadData(data) {
    data.sort(function (a, b) {
        return a.CODICE_LCL - b.CODICE_LCL;
    });
    data.forEach(row => {
        var element = document.createElement("li");
        element.classList.add("w3-display-container");
        element.setAttribute("onclick", 'if(event.target === this) { modalEditLCL(this); }');
        element.id = row.CODICE_LCL;

        var cnLabel = row.CODICE_CONTRATTO;
        CalcTable.EUP.forEach(Contratto => {
            if (row.CODICE_CONTRATTO == Contratto.key) {
                cnLabel = Contratto.label;
            }
        });

        element.innerHTML = '<b>' + row.CODICE_LCL + '</b><i class="w3-tiny"> (' + cnLabel + ', ' + CalcTable.Label[row.TIPO_LCL] + ')</i><span onclick="changeCN(this.parentElement)" class="w3-button w3-transparent w3-display-right">&times;</span>';
        document.querySelector("#addListLCL").appendChild(element);
    });

    document.querySelector("#loadFile").style.display = "none";
    document.querySelector("#selectLCL").style.display = "block";
}

/////////////////
window.options = function () {
    var divObject = document.createElement('div');
    divObject.classList.add("w3-containery");
    divObject.classList.add("w3-light-grey");
    divObject.classList.add("w3-card-4");
    divObject.classList.add("w3-center");
    divObject.innerHTML = '<h2>' + "€/Punto" + '</h2><table id="lclPerCent" class="w3-table-all w3-hoverable w3-margin-bottom w3-border-0"><thead><tr class="w3-blue"><th>Contratto</th><th class="w3-center">MF-TF</th><th class="w3-center">TF15-30</th><th class="w3-center">M2</th></tr></thead><!-- Injection JavaScript --></table>';
    
    CalcTable.EUP.forEach(Contratto => {
        var row = document.createElement("tr");
        row.id = Contratto.key;
        row.setAttribute("onclick", "ediTable(this)");
        row.innerHTML = "<td><b>" + Contratto.label + "</b><i class='w3-tiny'>(" + Contratto.key + ")</i></td><td class='w3-center'>" + parseFloat(Contratto.MF).toFixed(2) + "<i class='w3-tiny'>€</i></td><td class='w3-center'>" + parseFloat(Contratto.TF).toFixed(2) + "<i class='w3-tiny'>€</i></td><td class='w3-center'>" + parseFloat(Contratto.M2).toFixed(2) + "<i class='w3-tiny'>€</i></td>";
        divObject.querySelector("#lclPerCent").appendChild(row);
    });
    
    document.querySelector("#optionsList").appendChild(divObject);

    element = document.createElement("ul");
    element.classList.add("w3-ul");
    element.classList.add("w3-card-4");
    element.classList.add("w3-margin-top");
    element.classList.add("w3-margin-bottom");
    element.innerHTML = '<!-- Injection JavaScript --><li><h2>Contatore/Punto</h2></li>';

    for (let i = 0; i < CalcTable.CEP.length; i++) {
        element.innerHTML += '<li class="w3-display-container"><b>' + CalcTable.CEP[i].label + '</b><span title="Edit" class="w3-button w3-transparent w3-display-right w3-hover-yellow">' + parseFloat(CalcTable.CEP[i].value).toFixed(2) + '<i class="w3-tiny">p</i></span></li>';
    }

    document.querySelector("#optionsList").appendChild(element);

    document.querySelector('#selectLCL').style.display = 'none';
    document.querySelector('#optionsTab').style.display = 'block';
}

const elementID = document.querySelector('#ModalButtonSave');
function ediTable(element) {

    CalcTable.EUP.forEach(contratto => {
        if (contratto.key == element.id) {
            document.querySelector('#labelCN').innerHTML = contratto.label + '<i class="w3-small">(' + contratto.key + ')</i>';
            document.querySelector('#epMF').value = contratto.MF;
            document.querySelector('#epTF').value = contratto.TF;
            document.querySelector('#epM2').value = contratto.M2;
        }
    });

    document.getElementById('modalEditOp').style.display = "block";

    elementID.addEventListener('click', saveCalcTable, false);
    elementID.myParam = element;
}

function saveCalcTable(evt) {
    CalcTable.EUP.forEach(contratto => {
        if (contratto.key == evt.currentTarget.myParam.id) {
            document.querySelector('#labelCN').innerHTML = contratto.label + '<i class="w3-small">(' + contratto.key + ')</i>';
            contratto.MF = document.querySelector('#epMF').value;
            contratto.TF = document.querySelector('#epTF').value;
            contratto.M2 = document.querySelector('#epM2').value;

            alert(document.querySelector('#epMF').value + "\n" + document.querySelector('#epTF').value + "\n" +document.querySelector('#epM2').value);

            //localStorage.setItem("calcTable", JSON.stringify(loadCalcTable));
            document.getElementById('modalEditOp').style.display = "none";
            document.querySelector("#optionsList").innerHTML = "<!-- Injection JavaScript -->";
            options();
        }
    });
    elementID.removeEventListener('click', saveCalcTable);
}

function closeModal() {
    document.querySelector('#labelCN').innerHTML = "<!-- Injection JavaScript -->";
    document.querySelector('#epMF').value = "";
    document.querySelector('#epTF').value = "";
    document.querySelector('#epM2').value = "";
    document.getElementById('modalEditOp').style.display = 'none';
    elementID.removeEventListener('click', saveCalcTable);
}

function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

const elementIDlcl = document.querySelector('#ModalButtonSaveLCL');
function modalEditLCL(element) {
    document.getElementById('modalEditLCL').style.display = "block";

    saveListLCL.forEach(lcl => {
        if (lcl.CODICE_LCL == element.id) {
            
            var cnLabel = lcl.CODICE_CONTRATTO;
            CalcTable.EUP.forEach(Contratto => {
                if (lcl.CODICE_CONTRATTO == Contratto.key) {
                    cnLabel = Contratto.label;
                }
            });

            document.querySelector('#labelLCL').innerHTML = lcl.CODICE_LCL + '<i class="w3-small">(' + cnLabel + ')</i>';
            document.querySelector('#dateLCL').value = dateToYMD(new Date(lcl.DATA_FINE_LCL));
            document.querySelector('#typeLCL').value = lcl.TIPO_LCL;

            elementIDlcl.addEventListener('click', saveCalcTableLCL, false);
            elementIDlcl.myParam = element;
        }
    });
}

function saveCalcTableLCL(evt) {
    document.querySelector('#labelLCL').innerHTML = "<!-- Injection JavaScript -->";
    document.getElementById('modalEditLCL').style.display = 'none';
    saveListLCL.forEach(lcl => {
        if (lcl.CODICE_LCL == evt.currentTarget.myParam.id) {
            lcl.DATA_FINE_LCL = new Date(document.querySelector('#dateLCL').value);
            lcl.TIPO_LCL = document.querySelector('#typeLCL').value;

            var cnLabel = lcl.CODICE_CONTRATTO;
            CalcTable.EUP.forEach(Contratto => {
                if (lcl.CODICE_CONTRATTO == Contratto.key) {
                    cnLabel = Contratto.label;
                }
            });
            evt.currentTarget.myParam.innerHTML = '<b>' + lcl.CODICE_LCL + '</b><i class="w3-tiny"> (' + cnLabel + ', ' + CalcTable.Label[lcl.TIPO_LCL] + ')</i><span onclick="changeCN(this.parentElement)" class="w3-button w3-transparent w3-display-right">&times;</span>';
        }        
    });

    elementID.removeEventListener('click', saveCalcTableLCL);
}

function closeModaLCL() {
    document.querySelector('#labelLCL').innerHTML = "<!-- Injection JavaScript -->";
    document.getElementById('modalEditLCL').style.display = 'none';
    elementID.removeEventListener('click', saveCalcTableLCL);
}

let saveResultBeneficit;
function calcBeneficit() {
    let LCLs = [];

    saveListLCL.forEach(rowLCL => {
        if (rowLCL.SELECT == true) {

            let LCL = {
                CN: rowLCL.CODICE_CONTRATTO,
                LCL: rowLCL.CODICE_LCL,
                TYPE: rowLCL.TIPO_LCL,
                DATE: rowLCL.DATA_INIZIO_LCL,
                TOT: 0,
                CON: 0,
                ANN: 0,
                AV: 0,
                GG1: 0,
                GG2: 0,
                GG3: 0,
                INT: 0,
                INTR: 0,
                //OPR: [],
                ST_Eseguito: 0,
                ST_Annullato: 0,
                ST_Carico: 0,
                ST_Connect: 0,
                ST_Negativo: 0,
            };

            /*let OPRs = {

            };*/

            saveLoadFile.forEach(row => {
                if (rowLCL.CODICE_LCL == row.CODICE_LCL) {
                    LCL.TOT += 1;
                    if (row.STATO_RDA == "ANN") {
                        if (row.MOTIVO_ANNULLAMENTO == "Annullata per insuccesso") {
                            LCL.AV += 1;
                        } else {
                            LCL.ANN += 1;
                        }
                    } else if (row.STATO_RDA == "CON") {
                        LCL.CON += 1;

                        const diffTime = Math.abs(new Date(row.DATA_INIZIO_LCL) - new Date(row.DATA_INSTALLAZIONE));
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
                        if (diffDays <= 30) {
                            LCL.GG1 += 1;
                        } else if (diffDays > 30 && diffDays <= 90) {
                            LCL.GG2 += 1;
                            if (row.POSIZIONE_MIS_POST_SOST == "1 - Nell'appartamento" && new Date(row.DATA_INSTALLAZIONE) >= new Date("8/11/2020")) {//dopo l’11/8/20 – data in cui è stata accettata la comunicazione che la introduceva
                                LCL.INTR += 1;
                            }
                        } else if (diffDays > 90 && diffDays <= 120) {
                            LCL.GG3 += 1;
                            if (row.POSIZIONE_MIS_POST_SOST == "1 - Nell'appartamento" && new Date(row.DATA_INSTALLAZIONE) >= new Date("8/11/2020")) {//dopo l’11/8/20 – data in cui è stata accettata la comunicazione che la introduceva
                                LCL.INTR += 1;
                            }
                        }

                        if (row.ESITO_SMARTEST == "Positivo" || row.ESITO_SMARTEST == "Negativo") {
                            LCL.ST_Eseguito += 1;
                            
                        } else if (row.ESITO_SMARTEST == "Non eseguibile per carico sotto soglia") {
                            LCL.ST_Carico += 1;
                            
                        } else if (row.ESITO_SMARTEST == "Non eseguibile per Errore di connessione con la sonda BIRD" || row.ESITO_SMARTEST == "Non eseguibile per Errore di connessione con la sonda ARES") {
                            LCL.ST_Connect += 1;

                        } else {
                            LCL.ST_Annullato += 1;

                        }

                        if (row.POSIZIONE_MIS_POST_SOST == "1 - Nell'appartamento" && new Date(row.DATA_INSTALLAZIONE) >= new Date("8/11/2020")) {//dopo l’11/8/20 – data in cui è stata accettata la comunicazione che la introduceva
                            LCL.INT += 1;
                        }
                    }
                }
            });
            LCLs.push(LCL);  //get IMEI https://valve.github.io/fingerprintjs2/%20fb75c2cb884840f5c73eb87825035249

            //CODE
            var divObject = document.createElement('div');
            divObject.classList.add("w3-containery");
            divObject.classList.add("w3-light-grey");
            divObject.classList.add("w3-card-4");

            var typeLCL = CalcTable.Label[rowLCL.TIPO_LCL];

            var eurPuntoCN = 0;

            var cnLabel = rowLCL.CODICE_CONTRATTO;
            
            CalcTable.EUP.forEach(Contratto => {
                if (rowLCL.CODICE_CONTRATTO == Contratto.key) {
                    cnLabel = Contratto.label;
                    eurPuntoCN = Contratto[(rowLCL.TIPO_LCL).substring(0, 2)]
                }
            });

            divObject.innerHTML = '<h2>' + rowLCL.CODICE_LCL + '<i class="w3-small"> (' + cnLabel + ', ' + typeLCL + ')</i></h2><table id="lclPerCent" class="w3-table-all w3-hoverable w3-margin-bottom"><thead><tr class="w3-green"><th style="width: 40%;">Causale</th><th class="w3-center">Contatori</th><th class="w3-center">Punti</th><th class="w3-center">€/Punto</th><th class="w3-center">€</th></tr></thead><!-- Injection JavaScript --></table>';
            var formatter = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

            var subTot = 0;

            Object.keys(CalcTable[rowLCL.TIPO_LCL]).forEach(DB_Key => {
                var rowTable = document.createElement("tr");

                var tot = LCL[DB_Key] * CalcTable[rowLCL.TIPO_LCL][DB_Key] * eurPuntoCN;
                subTot += tot;

                //ADD alert triangle
                /*var warningTriangle = "";
                if (DB_CEP.key == "GG1" || DB_CEP.key == "GG2" || DB_CEP.key == "GG3") {
                    warningTriangle = '<b><span class="w3-text-orange" title="I dati sono aprosimativi(per la mancanza di calcolo CE precedenti)">&#x26A0;</span></b>';
                }*/

                rowTable.innerHTML = "<td>" + CalcTable.Label[DB_Key] + "</td ><td class='w3-center'>" + LCL[DB_Key] + "</td><td class='w3-center'>" + parseFloat(CalcTable[rowLCL.TIPO_LCL][DB_Key]).toFixed(1) + "<i class='w3-tiny'>p</i></td><td class='w3-center'>" + parseFloat(eurPuntoCN).toFixed(2) + "€" + "</td><td class='w3-center'>" + formatter.format(tot) + "</td>";
                divObject.querySelector("#lclPerCent").appendChild(rowTable);
            });

            //Totale
            var row = document.createElement("tr");
            row.innerHTML = "<td>" + "Totale:" + "</td><td></td><td></td><td></td><td class='w3-center'>" + formatter.format(subTot) + "</td>";
            divObject.querySelector("#lclPerCent").appendChild(row);

            //Smartest
            var rowST = document.createElement("thead");
            rowST.innerHTML = "<tr class='w3-green'><td></td ><td class='w3-center'>Totale RCMI</td><td class='w3-center'>Annullati</td><td class='w3-center'>Errore di Connessione</td><td class='w3-center'>Eseguiti</td></tr>";
            divObject.querySelector("#lclPerCent").appendChild(rowST);
            var rowST = document.createElement("tr");
            rowST.innerHTML = "<td>SmarTest:</td ><td class='w3-center'>" + LCL.CON + "</td><td class='w3-center'>" + Number(LCL.ST_Annullato * 100 / LCL.CON).toFixed(0) + "%<i class='w3-tiny'>(" + LCL.ST_Annullato + ")</i></td><td class='w3-center'>" + Number(LCL.ST_Connect * 100 / LCL.CON).toFixed(0) + "%<i class='w3-tiny'>(" + LCL.ST_Connect + ")</i></td><td class='w3-center'>" + Number((LCL.ST_Eseguito + LCL.ST_Carico) * 100 / LCL.CON).toFixed(0) + "%<i class='w3-tiny'>(" + (LCL.ST_Eseguito + LCL.ST_Carico) + ")</i></td>";
            divObject.querySelector("#lclPerCent").appendChild(rowST);


            document.querySelector("#listCnLCL").appendChild(divObject);
        }
    });

    saveResultBeneficit = LCLs;

    document.querySelector("#selectLCL").style.display = "none";
    document.querySelector("#BeneficitTab").style.display = "block";
}

window.Print = function () {
    var resultList = document.querySelector("#BeneficitTab").innerHTML;

    var a = window.open('', '', 'width=733,height=454');
    a.document.open("text/html");
    a.document.write('<html><head><title>');
    a.document.write('Beneficit LCL');
    a.document.write('</title>');
    a.document.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">');
    a.document.write('<style>body{opacity: 0}@media print { body{opacity: 1}}</style>');
    a.document.write('</head><body style="overflow: hidden;">');
    a.document.write(resultList);
    a.document.write("</body><!--FIX LIVE SERVER--></html>");

    a.document.close(); // necessary for IE >= 10
    a.focus(); // necessary for IE >= 10*/

    setTimeout(function () { a.print(); a.close(); }, 600);
}

function download_csv(filename = "beneficit") {

    var csv = 'CalcBeneficit,,,,\n';
    for (let i = 0; i < saveResultBeneficit.length; i++) {
        //Start Header CSV
        var row = saveResultBeneficit[i].LCL + ',';
        for (let cnI = 0; cnI < CalcTable.EUP.length; cnI++) {
            if (saveResultBeneficit[i].CN == CalcTable.EUP[cnI].key) {
                row += CalcTable.EUP[cnI].label + ',';
            }
        }
        var typeLCL = CalcTable.Label[saveListLCL[i].TYPE];
        row += typeLCL + ',,\n';
        row += 'Causale,Contatori,Punti,Euro/Punto,Euro\n';
        //Start Table CSV
        var subTot = 0;
        for (let j = 0; j < CalcTable.CEP.length; j++) {
            for (let jj = 0; jj < CalcTable.EUP.length; jj++) {
                if (saveListLCL[i].TYPE == CalcTable.CEP[j].filter && saveListLCL[i].CN == CalcTable.EUP[jj].key) {

                    var numVar = 0;
                    switch (CalcTable.CEP[j].key) {
                        case "CON":
                            numVar = saveResultBeneficit[i].CON;
                            break;
                        case "AV":
                            numVar = saveResultBeneficit[i].AV;
                            break;
                        case "GG1":
                            numVar = saveResultBeneficit[i].GG1;
                            break;
                        case "GG2":
                            numVar = saveResultBeneficit[i].GG2;
                            break;
                        case "GG3":
                            numVar = saveResultBeneficit[i].GG3;
                            break;
                        default:
                            break;
                    }
                    var tot = numVar * CalcTable.CEP[j].value * CalcTable.EUP[jj].value;
                    subTot += tot;

                    //console.log(  (tot).toString().replace(".",",")   );

                    row += CalcTable.CEP[j].label + ',' + numVar + ',' + CalcTable.CEP[j].value + ',' + CalcTable.EUP[jj].value + ',' + tot + '\n';
                }
            }
        }

        //console.log( (subTot).toString().replace(".",",") );

        row += 'Totale:,,,,' + subTot + '\n';
        csv += row;
        csv += ',,,,\n,,,,\n';
    }

    var a = document.createElement("a");
    var url = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    a.href = url;
    a.download = filename + '.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}