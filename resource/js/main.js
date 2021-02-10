var app1 = new Vue({
    el: '#app-1',
    data: {
        message: 'Привет, Vue!'
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'Вы загрузили эту страницу: ' + new Date().toLocaleString()
    }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    },
    methods: {
        show: function () {
            this.seen = !this.seen;
        }
    }
});

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: 'Изучить JavaScript' },
            { text: 'Изучить Vue' },
            { text: 'Создать что-нибудь классное' }
        ]
    }
});

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Привет, Vue.js!',
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('');
            this.seen = !this.seen;
        }
    }
});

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Привет, Vue!'
    }
});


////// TEST LCL \\\\\\
var app = new Vue({
    el: '#app',
    data: {
        LCList: {},
    },
    methods: {
        loadFile: function () {
            
            /*this.LCList.push("6600060602");
            this.LCList.push("6600060603");
            console.log(this.LCList);*/

            var selectedFile = document.querySelector("#input").files[0];
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

                        rowObject.forEach(row => {
                            this.LCList[row.CODICE_LCL] = row.CODICE_LCL;
                        });
                        //this.LCList = rowObject;
                        console.log(rowObject);

                    });
                }
            }
        }
    }
});