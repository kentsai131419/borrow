// 選取所需的 HTML 元素
const equipmentList = document.getElementById("equipment-list");
const addEquipmentBtn = document.getElementById("add-equipment-btn");
let editingRow = null;

// 新增設備表單元素的創建
function openAddForm() {
    // 檢查是否已經有開啟的表單，避免重複生成
    if (document.getElementById("addForm")) {
        return;
    }

    const formContainer = document.createElement("div");
    formContainer.id = "addForm";
    formContainer.className = "form-popup";

    formContainer.innerHTML = `
        <h2>新增設備</h2>
        <label>裝置名稱</label>
        <input type="text" id="deviceName" required>
        
        <label>設備型號</label>
        <input type="text" id="deviceModel" required>
        
        <label>序號</label>
        <input type="text" id="serialNumber" required>
        
        <label>目前狀態</label>
        <input type="text" id="currentStatus" required>
        
        <label>備註</label>
        <input type="text" id="notes">
        
        <button onclick="submitEquipment()">提交</button>
        <button onclick="closeAddForm()">取消</button>
    `;

    document.body.appendChild(formContainer);
}

// 關閉新增設備表單
function closeAddForm() {
    const formContainer = document.getElementById("addForm");
    if (formContainer) {
        document.body.removeChild(formContainer);
    }
}

// 提交設備表單
function submitEquipment() {
    const deviceName = document.getElementById("deviceName").value;
    const deviceModel = document.getElementById("deviceModel").value;
    const serialNumber = document.getElementById("serialNumber").value;
    const currentStatus = document.getElementById("currentStatus").value;
    const notes = document.getElementById("notes").value;

    if (editingRow) {
        // 更新已存在的行
        editingRow.cells[0].textContent = deviceName;
        editingRow.cells[1].textContent = deviceModel;
        editingRow.cells[2].textContent = serialNumber;
        editingRow.cells[3].textContent = currentStatus;
        editingRow.cells[4].textContent = notes;
        editingRow = null;
    } else {
        // 新增一行設備
        addEquipmentRow(deviceName, deviceModel, serialNumber, currentStatus, notes);
    }

    closeAddForm();
}

// 新增一列設備到表格
function addEquipmentRow(deviceName, deviceModel, serialNumber, currentStatus, notes) {
    const row = equipmentList.insertRow();

    row.insertCell(0).textContent = deviceName;
    row.insertCell(1).textContent = deviceModel;
    row.insertCell(2).textContent = serialNumber;
    row.insertCell(3).textContent = currentStatus;
    row.insertCell(4).textContent = notes;

    // 編輯按鈕
    const editCell = row.insertCell(5);
    const editButton = document.createElement("button");
    editButton.textContent = "編輯";
    editButton.onclick = function() {
        editEquipment(row);
    };
    editCell.appendChild(editButton);

    // 刪除按鈕
    const deleteCell = row.insertCell(6);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "刪除";
    deleteButton.onclick = function() {
        deleteEquipment(row);
    };
    deleteCell.appendChild(deleteButton);
}

// 編輯設備資料
function editEquipment(row) {
    openAddForm();

    document.getElementById("deviceName").value = row.cells[0].textContent;
    document.getElementById("deviceModel").value = row.cells[1].textContent;
    document.getElementById("serialNumber").value = row.cells[2].textContent;
    document.getElementById("currentStatus").value = row.cells[3].textContent;
    document.getElementById("notes").value = row.cells[4].textContent;

    editingRow = row;
}

// 刪除設備資料
function deleteEquipment(row) {
    if (confirm("確定要刪除此設備嗎？")) {
        row.remove();
    }
}

// 設置「新增設備」按鈕點擊事件
addEquipmentBtn.onclick = openAddForm;
