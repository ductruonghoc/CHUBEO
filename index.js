var order = document.getElementById("orderHere");
var rowQuantity = 10;
var rowQHTML = document.getElementById("ROQ");
const form = document.getElementById('orderForm');
var disSel = document.getElementById("QUA");
var total = 0;
var items = [
    {
        "Id": "HUV",
        "Name": "Hùm Viên",
        "Price": 80
    },
    {
        "Id": "TDH",
        "Name": "Tôm Định Hình",
        "Price": 80
    },
    {
        "Id": "GAG",
        "Name": "Gà Giòn",
        "Price": 117
    },
    {
        "Id": "DHM",
        "Name": "Đậu Hũ Mặt Cười",
        "Price": 95
    },
    {
        "Id": "PMQ",
        "Name": "Phô Mai Que",
        "Price": 77
    },
    {
        "Id": "BAB",
        "Name": "Bắp Bò",
        "Price": 86
    },
    {
        "Id": "BAN",
        "Name": "Bao Nhím",
        "Price": 96
    },
    {
        "Id": "BCB",
        "Name": "Ba Chỉ Bò",
        "Price": 98
    },
    {
        "Id": "BCH",
        "Name": "Ba Chỉ Heo",
        "Price": 78
    },
    {
        "Id": "BLL",
        "Name": "Bò Lá Lốt",
        "Price": 80
    },
    {
        "Id": "BOT",
        "Name": "Bò Tảng",
        "Price": 96
    },
    {
        "Id": "BOV",
        "Name": "Bò Viên",
        "Price": 55
    },
    {
        "Id": "CAG",
        "Name": "Cánh Gà",
        "Price": 82
    },
    {
        "Id": "CAV",
        "Name": "Cá Viên",
        "Price": 55
    },
    {
        "Id": "CCM",
        "Name": "Cốm Cam Mayo",
        "Price": 70
    },
    {
        "Id": "CHC",
        "Name": "Chả Cá",
        "Price": 80
    },
    {
        "Id": "CHG",
        "Name": "Chân Gà",
        "Price": 89
    },
    {
        "Id": "HET",
        "Name": "Heo Tảng",
        "Price": 80
    },
    {
        "Id": "PLN",
        "Name": "Phi Lê Nai",
        "Price": 78
    },
    {
        "Id": "LUN",
        "Name": "Lườn Ngỗng",
        "Price": 90
    },
    {
        "Id": "VUH",
        "Name": "Vú Heo",
        "Price": 100
    },
    {
        "Id": "MUH",
        "Name": "Mực Hoa",
        "Price": 47
    },
    {
        "Id": "RAT",
        "Name": "Râu Tuộc",
        "Price": 56
    },
    {
        "Id": "DOS",
        "Name": "Dồi Sụn",
        "Price": 65
    },
    {
        "Id": "XUX",
        "Name": "Xúc Xích",
        "Price": 75
    },
    {
        "Id": "DHP",
        "Name": "Đậu Hũ Phô Mai",
        "Price": 95
    },
    {
        "Id": "MUX",
        "Name": "Mực Xoắn",
        "Price": 80
    },
    {
        "Id": "MXU",
        "Name": "Mực Xù",
        "Price": 85
    },
    {
        "Id": "LUH",
        "Name": "Luỡi Heo",
        "Price": 68
    },
    {
        "Id": "HER",
        "Name": "Heo Rừng",
        "Price": 83
    },
    {
        "Id": "CHA",
        "Name": "Chạo",
        "Price": 0
    }
]

var selectedData = [
    { "Value": "", "Quantity": 0 }
];

function editOrder(i, v, q) {
    var it = 'MAH' + i;
    var quant = 'SOL' + i;

    document.getElementById(it).value = v;
    document.getElementById(quant).value = q;
}


function addOrder(i) {
    var selectListId = 'MAH' + i;
    var selectList = undefined;

    order.innerHTML += '<div class="row">'
        + '<div class="form-group col-sm row" style="margin-top: 0; margin-bottom: 0">'
        + '<label class="col-auto" for="' + selectListId + '">' + i + '.</label>'
        + '<select  class="form-control col" id="' + selectListId + '" name="' + selectListId + '"></select>'
        + '</div >'
        + '<div class="form-group col-sm">'
        + '<input type="number" value="0" min="0" class="form-control" id="SOL' + i + '" name="SOL' + i + '" placeholder="Số lượng">'
        + '</div>'
        + '<div class="col-sm">'
        + '<p id="v' + i + '">0 VND</p></div>'
        + '</div>';

    selectList = document.getElementById(selectListId);

    items.forEach((e) => { selectList.innerHTML += '<option value="' + e['Id'] + '">' + e['Name'] + '</option>' });

    if (i === 1) {
        selectedData[0]["Value"] = selectList.value;
        selectedData[0]["Quantity"] = 0
    }
    else {
        selectedData.push({
            "Value": selectList.value,
            "Quantity": 0
        })
    }

    console.log(selectedData);
}

function orderMultipleAdd(i) {
    var j = 0;
    while (j < i) {
        addOrder(j + 1);
        j++;
    }
}

function addNewOrder() {
    var i = 1;

    rowQuantity += 1;
    rowQHTML.value = rowQuantity;
    addOrder(rowQuantity);

    while (i < rowQuantity) {
        editOrder(i, selectedData[i - 1]["Value"], selectedData[i - 1]["Quantity"]);
        i++;
    }

    allListenerId();
    allListenerQuant();

    document.getElementById("MAH" + rowQuantity).focus();
}

function eventListenerQuant(i) {
    const input = document.getElementById("SOL" + i);

    input.addEventListener("input", (e) => {
        var log = document.getElementById("v" + i);
        var selected = document.getElementById("MAH" + i);
        var curItem = items.find((e) => e["Id"] === selected.value);
        var price = 0;

        if (selectedData[i - 1]["Quantity"] !== input.value) {
            total -= selectedData[i - 1]["Quantity"] * curItem["Price"];
            price = e.target.value * curItem["Price"];
            total += price;
        }
        if (input.value === 0 || input.value === "") {
            log.innerHTML = "0 VND";
        }
        else {
            log.innerHTML = (price * 1000).toLocaleString('en-US') + " VND";
        }

        selectedData[i - 1]["Quantity"] = Number(input.value);
        document.getElementById("Total").innerHTML = (total * 1000).toLocaleString('en-US') + " VND";

        console.log(total);

    });

    input.addEventListener("keypress", (e) => {
        if (i < rowQuantity && e.key === "Enter") {
            var nextItem = "MAH" + (i + 1);
            document.getElementById(nextItem).focus();
        }
        else if (i === rowQuantity && e.key === "Enter") {
            addNewOrder();
        }
    })
}


function eventListenerId(i) {
    const input = document.getElementById("MAH" + i);

    input.addEventListener("keypress", (e) => {
        var nextItem = "MAH" + i;
        if (e.key === "Enter") {
            nextItem = "SOL" + i;
        }
        document.getElementById(nextItem).focus();
    });

    input.addEventListener("change", (e) => {
        var log = document.getElementById("v" + i);
        var price = 0;
        
        if (selectedData[i - 1]["Value"] !== input.value) {
            var curItem = items.find((item)=>item["Id"] === e.target.value);
            var oldItem = items.find((item)=>item["Id"] === selectedData[i -1]["Value"]);

            total -= selectedData[i -1]["Quantity"]*oldItem["Price"];
            price =  selectedData[i -1]["Quantity"]*curItem["Price"];
            total += price;
        }
        if (input.value === 0 || input.value === "") {
            log.innerHTML = "0 VND";
        }
        else {
            log.innerHTML = (price * 1000).toLocaleString('en-US') + " VND";
        }

        document.getElementById("Total").innerHTML = (total * 1000).toLocaleString('en-US') + " VND";

        selectedData[i - 1]["Value"] = input.value;

        console.log(selectedData);
    })
}

function allListenerQuant() {
    var i = 0;
    while (i < rowQuantity) {
        eventListenerQuant(i + 1);
        i++;
    }
}

function allListenerId() {
    var i = 0;
    while (i < rowQuantity) {
        eventListenerId(i + 1);
        i++;
    }
}

function initOrderDef() {
    order.innerHTML = "";
    orderMultipleAdd(rowQuantity);
    rowQHTML.value = rowQuantity.toString();
    allListenerQuant();
    allListenerId();
}

form.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
    }
});

disSel.addEventListener('change', () => {
    rowQuantity = 10;
    selectedData = [{ "Value": "", "Quantity": 0 }];
    initOrderDef();
})

items.sort((a, b) => a["Id"].localeCompare(b["Id"]));
initOrderDef();