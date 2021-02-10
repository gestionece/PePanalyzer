Vue.component('lcl-item', {
    props: ['lcl'],
    template: '<li class="w3-display-container"><b>{{lcl.CODICE_LCL}}</b><i class="w3-tiny"> ({{lcl.CODICE_CONTRATTO}})</i><span class="w3-button w3-transparent w3-display-right">&times;</span></li>'
  })

var app = new Vue({
    el: '#app',
    data: {
        LCList: {},
        loadFileData: {},
        page_loadFile: true,
        page_LCList: false
    },
    methods: {
        loadFile: function () {
            var selectedFile = this.$refs.inputLoadFile.files[0];
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

                        this.loadFileData = rowObject;

                        let lcl = {};
                        rowObject.forEach(row => {
                            lcl[row.CODICE_LCL] = {
                                "CODICE_CONTRATTO": row.CODICE_CONTRATTO,
                                "CODICE_LCL": row.CODICE_LCL,
                                "STATO_LCL": row.STATO_LCL,
                                "SELECT": true,
                            };
                        });

                        this.LCList = lcl;

                        this.page_loadFile = false;
                        this.page_LCList = true;

                    });
                }
            }
        },
        backLCList: function () {
            this.page_loadFile = true;
            this.page_LCList = false;
        }
    }
});