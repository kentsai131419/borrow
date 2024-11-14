let editRowIndex = null; // 用於跟踪當前編輯的行索引

// 開啟新增設備的表單
function openAddForm() {
    document.getElementById("addForm").style.display = "block";
}

// 關閉新增設備的表單
function closeAddForm() {
    document.getElementById("addForm").style.display = "none";
}

// 開啟編輯設備的表單
function openEditForm() {
    document.getElementById("editForm").style.display = "block";
}

// 關閉編輯設備的表單
function closeEditForm() {
    document.getElementById("editForm").style.display = "none";
}

// 新增設備資料
document.getElementById("addEquipmentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const deviceName = document.getElementById("device-name").value;
    const deviceModel = document.getElementById("device-model").value;
    const serialNumber = document.getElementById("serial-number").value;
    const status = document.getElementById("status").value;
    const notes = document.getElementById("notes").value;
    addEquipmentToList(deviceName, deviceModel, serialNumber, status, notes);
    document.getElementById("addEquipmentForm").reset();
    closeAddForm();
});

// 編輯設備資料
document.getElementById("editEquipmentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const deviceName = document.getElementById("edit-device-name").value;
    const deviceModel = document.getElementById("edit-device-model").value;
    const serialNumber = document.getElementById("edit-serial-number").value;
    const status = document.getElementById("edit-status").value;
    const notes = document.getElementById("edit-notes").value;
    
    // 更新行的內容
    updateEquipmentRow(editRowIndex, deviceName, deviceModel, serialNumber, status, notes);
    closeEditForm();
});

// 將設備新增到清單表格中
function addEquipmentToList(name, model, serial, status, notes) {
    const table = document.getElementById("equipment-list");
    const row = table.insertRow();
    
    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = model;
    row.insertCell(2).innerText = serial;
    row.insertCell(3).innerText = status;
    row.insertCell(4).innerText = notes;

    // 添加編輯和刪除按鈕
    const actionsCell = row.insertCell(5);
    actionsCell.innerHTML = `
        <button onclick="editEquipment(${row.rowIndex})">編輯</button>
        <button onclick="removeEquipment(${row.rowIndex})">刪除</button>
    `;
}

// 開始編輯設備
function editEquipment(index) {
    editRowIndex = index;
    const table = document.getElementById("equipment-list");
    const row = table.rows[index - 1];

    // 將該行的內容填入編輯表單
    document.getElementById("edit-device-name").value = row.cells[0].innerText;
    document.getElementById("edit-device-model").value = row.cells[1].innerText;
    document.getElementById("edit-serial-number").value = row.cells[2].innerText;
    document.getElementById("edit-status").value = row.cells[3].innerText;
    document.getElementById("edit-notes").value = row.cells[4].innerText;

    openEditForm();
}

// 更新表格中的設備資料
function updateEquipmentRow(index, name, model, serial, status, notes) {
    const table = document.getElementById("equipment-list");
    const row = table.rows[index - 1];

    row.cells[0].innerText = name;
    row.cells[1].innerText = model;
    row.cells[2].innerText = serial;
    row.cells[3].innerText = status;
    row.cells[4].innerText = notes;
}

// 移除設備資料
function removeEquipment(index) {
    document.getElementById("equipment-list").deleteRow(index - 1);
}
