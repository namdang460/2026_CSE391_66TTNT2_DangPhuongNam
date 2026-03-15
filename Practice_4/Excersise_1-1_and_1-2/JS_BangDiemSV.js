let students = []

let nameInput = document.getElementById("input-name")
let scoreInput = document.getElementById("input-score")
let addBtn = document.getElementById("addBtn")
let table = document.querySelector("table")
let searchInput = document.getElementById("searchInput")
let filterRank = document.getElementById("filterRank")
let scoreHeader = document.getElementById("scoreHeader")
let filteredStudents = []
let sortAsc = true

function xepLoai(score){
    if(score >= 8.5){
        return "Giỏi"
    }
    else if(score >= 7){
        return "Khá"
    }
    else if(score >= 5){
        return "Trung bình"
    }
    else{
        return "Yếu"
    }
}
addBtn.onclick = function(){
    let name = nameInput.value.trim()
    let score = parseFloat(scoreInput.value)
    if(name == "" || isNaN(score) || score < 0 || score > 10){
        alert("Dữ liệu không hợp lệ")
        return
    }
    students.push({
        id: Date.now(),
        name: name,
        score: score
    })
    applyFilters()
    nameInput.value = ""
    scoreInput.value = ""
    nameInput.focus()
}
function renderTable(){
    let rows = table.querySelectorAll("tr")
    rows.forEach(function(row,index){
        if(index != 0){
            row.remove()
        }
    })
    filteredStudents.forEach(function(sv,index){
        let rank = xepLoai(sv.score)
        let tr = document.createElement("tr")
        if(sv.score < 5){
            tr.style.background = "yellow"
        }
        tr.innerHTML = `
        <td>${index+1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${rank}</td>
        <td><button class="btn-delete" data-id="${sv.id}">Xóa</button></td>
        `
        table.appendChild(tr)

    })
    if(filteredStudents.length === 0){
        let tr = document.createElement("tr")
        tr.innerHTML = `<td colspan="5">Không có kết quả</td>`
        table.appendChild(tr)
    }
    let stat = document.getElementById("stat")

    if(!stat){
        stat = document.createElement("p")
        stat.id = "stat"
        table.after(stat)
    }
    let total = 0
    students.forEach(function(sv){
        total += sv.score
    })
    let avg = students.length ? (total / students.length).toFixed(2) : 0
    stat.innerText =
        "Tổng sinh viên: " + students.length +
        " | Điểm trung bình: " + avg

}

function applyFilters(){

    let keyword = searchInput.value.toLowerCase()
    let rankFilter = filterRank.value
    filteredStudents = students.filter(function(sv){
        let matchName = sv.name.toLowerCase().includes(keyword)
        let rank = xepLoai(sv.score)
        let matchRank = (rankFilter === "all" || rank === rankFilter)
        return matchName && matchRank
    })
    filteredStudents.sort(function(a,b){
        if(sortAsc){
            return a.score - b.score
        }
        else{
            return b.score - a.score
        }
    })
    renderTable()
}
table.addEventListener("click",function(e){
    if(e.target.classList.contains("btn-delete")){

        let id = e.target.dataset.id

        students = students.filter(function(sv){
            return sv.id != id
        })

        applyFilters()
    }

})
searchInput.addEventListener("input",function(){
    applyFilters()
})
filterRank.addEventListener("change",function(){
    applyFilters()
})
scoreHeader.addEventListener("click",function(){

    if(sortAsc == true){
        sortAsc = false
        scoreHeader.innerText = "Điểm ▼"
    }
    else{
        sortAsc = true
        scoreHeader.innerText = "Điểm ▲"
    }

    applyFilters()

})
scoreInput.addEventListener("keydown",function(e){

    if(e.key === "Enter"){
        addBtn.click()
    }

})
applyFilters()