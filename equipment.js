// 取得設備列表的 DOM 元素
const equipmentTableBody = document.getElementById("equipment-list");

// 顯示設備列表
function renderEquipmentList() {
    equipmentTableBody.innerHTML = ""; // 清空表格
    equipmentList.forEach((equipment, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${equipment.name}</td>
            <td>${equipment.model}</td>
            <td>${equipment.serial}</td>
            <td>${equipment.status}</td>
            <td>${equipment.notes}</td>
            <td>
                <button onclick="editEquipment(${index})">編輯</button>
                <button onclick="deleteEquipment(${index})">刪除</button>
            </td>
        `;
        equipmentTableBody.appendChild(row);
    });
}

// 新增設備
function addEquipment() {
    const name = prompt("輸入裝置名稱");
    const model = prompt("輸入設備型號");
    const serial = prompt("輸入序號");
    const status = prompt("輸入目前狀態");
    const notes = prompt("輸入備註（可留空）");

    if (name && model && serial && status) {
        equipmentList.push({ name, model, serial, status, notes });
        renderEquipmentList();
    } else {
        alert("請填寫所有必要的設備資訊！");
    }
}

// 編輯設備
function editEquipment(index) {
    const equipment = equipmentList[index];
    const name = prompt("裝置名稱", equipment.name);
    const model = prompt("設備型號", equipment.model);
    const serial = prompt("序號", equipment.serial);
    const status = prompt("目前狀態", equipment.status);
    const notes = prompt("備註", equipment.notes);

    if (name && model && serial && status) {
        equipmentList[index] = { name, model, serial, status, notes };
        renderEquipmentList();
    } else {
        alert("請填寫所有必要的設備資訊！");
    }
}

// 刪除設備
function deleteEquipment(index) {
    if (confirm("確定要刪除這個設備嗎？")) {
        equipmentList.splice(index, 1);
        renderEquipmentList();
    }
}

// 初始渲染設備列表
renderEquipmentList();
