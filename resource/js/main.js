var app = new Vue({
    el: '#app',
    data: {
        LCList: [],
        loadFileData: {},
        page_loadFile: true,
        page_LCList: false,
        page_addLCL: false,
    },
    mounted() {

    },
    computed: {
        activeLCL() {
            return this.LCList.filter(lcl => lcl.SELECT == true);
        },
        deactiveLCL() {
            return this.LCList.filter(lcl => lcl.SELECT == false);
        },
    },
    methods: {
        loadFile() {
            var selectedFile = this.$refs.inputLoadFile.files[0];
            if (selectedFile && window.Worker) {
                const worker = new Worker('resource/js/worker.js'); //https://dog.ceo/dog-api/
                worker.postMessage(selectedFile);
                worker.onmessage = (e) => {

                    this.loadFileData = e.data; // uso worker.js per caricare e leggere il file, ma per conversione delle pagine diverse uso main.js
                    this.LCList = [];

                    this.loadFileData.forEach(row => {
                        const found = this.LCList.some(oneLCL => oneLCL.CODICE_LCL === row.CODICE_LCL);
                        if (!found) this.LCList.push({
                            "CODICE_CONTRATTO": row.CODICE_CONTRATTO,
                            "CODICE_LCL": row.CODICE_LCL,
                            "STATO_LCL": row.STATO_LCL,
                            "SELECT": true,
                        });
                    });

                    this.page_addLCL = false;
                    this.page_loadFile = false;
                    this.page_LCList = true;
                }
            }
        },
        backLCList() {
            this.page_loadFile = true;
            this.page_LCList = false;
        },
        changeLCL(value) {

            if (this.activeLCL.length > 1) {
                value.SELECT = !value.SELECT;
            } else {
                value.SELECT = true;
            }

            if (this.deactiveLCL.length > 0) {
                this.page_addLCL = true;
            } else {
                this.page_addLCL = false;
            }
        }
    }
});



/*let workbook = e.data; // uso worker.js per caricare e leggere il file, ma per conversione delle pagine diverse uso main.js
workbook.SheetNames.forEach(sheet => {
    let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    this.loadFileData = rowObject;
    this.LCList = [];

    rowObject.forEach(row => {
        const found = this.LCList.some(oneLCL => oneLCL.CODICE_LCL === row.CODICE_LCL);
        if (!found) this.LCList.push({
            "CODICE_CONTRATTO": row.CODICE_CONTRATTO,
            "CODICE_LCL": row.CODICE_LCL,
            "STATO_LCL": row.STATO_LCL,
            "SELECT": true,
        });
    });

    this.page_addLCL = false;
    this.page_loadFile = false;
    this.page_LCList = true;
});*/

                    //worker.terminate();

/* https://ru.vuejs.org/v2/guide/forms.html
<input type="checkbox" id="jack" value="Джек" v-model="checkedNames">
<label for="jack">Джек</label>
<input type="checkbox" id="john" value="Джон" v-model="checkedNames">
<label for="john">Джон</label>
<input type="checkbox" id="mike" value="Майк" v-model="checkedNames">
<label for="mike">Майк</label>
<br>
<span>Отмеченные имена: {{ checkedNames }}</span>
new Vue({
  el: '...',
  data: {
    checkedNames: []
  }
})
*/