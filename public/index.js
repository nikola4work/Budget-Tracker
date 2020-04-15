if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then(reg => {
            console.log("Service worker registered.", reg);
        });
    });
}

$(".clear").click(function() {
    $("td").empty();
});

$("#add-btn").on("click", event => {
    event.preventDefault();
    const newBudget = {
        transaction: $("#transaction").val(),
        amount: $("#amount").val(),
        date: Date.now()
    };

    $.post("/api/budget/deposit", newBudget)
        .then(data => {
            console.log(data);
            displayData(data);
            transactions = data;
        })
        .catch(err => {
            saveRecord(newBudget);
            displayData(transactions);
        });
});

$("#sub-btn").on("click", event => {
    event.preventDefault();
    const newBudget = {
        transaction: $("#transaction").val(),
        amount: "-" + $("#amount").val(),
        date: Date.now()
    };

    $.post("/api/budget/withdraw", newBudget)
        .then(data => {
            console.log(data);
            displayData(data);
            transactions = data;
        })
        .catch(err => {
            saveRecord(newBudget);
            displayData(transactions);
        });
});

const displayData = data => {
    $("#tbody").empty();
    data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    let totalAmount = 0;
    for (let i = 0; i < data.length; i++) {
        let tr = $("<tr>");
        let td1 = $("<td>").text(data[i].transaction);
        let td2 = $("<td>").text("$" + data[i].amount);

        console.log(td2[0].innerText);

        if (td2[0].innerText.indexOf("-") === -1) {
            td2.css({ color: "#34a853" });
        } else {
            td2.css({ color: "#ff5a59" });
        }

        let year = data[i].date.slice(0, 4);
        let month = data[i].date.slice(6, 7);
        let day = data[i].date.slice(8, 10);
        let date = month + "/" + day + "/" + year;

        let td3 = $("<td>").text(date);

        tr.append(td3, td1, td2);
        $("#tbody").append(tr);

        totalAmount += parseFloat(data[i].amount);
    }

    $("#total").text(totalAmount);
};

const loadData = () => {
    $.get("/api/budget").then(data => {
        displayData(data);
    });
};

loadData();