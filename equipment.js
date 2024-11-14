// 設備數據存儲模擬（這裡可以用陣列模擬，也可以改用 Google Sheets API 或其他儲存方案）
let equipmentList = [];

// 取得 DOM 元素
const equipmentTableBody = document.getElementById('equipment-list');

// 開啟新增設備表單
function openAddForm() {
    const formHtml = `
        <div id="addFormPopup" class="form-popup">
            <form id="addForm" class="form-container">
                <h2>新增設備</h2>
                <label for="deviceName">裝置名稱</label>
                <input type="text" id="deviceName" required>

                <label for="deviceModel">設備型號</label>
                <input type="text" id="deviceModel" required>

                <label for="serialNumber">序號</label>
                <input type="text" id="serialNumber" required>

                <label for="status">目前狀態</label>
                <input type="text" id="status" required>

                <label for="notes">備註</label>
                <input type="text" id="notes">

                <button type="button" onclick="addEquipment()">新增</button>
                <button type="button" onclick="closeForm()">取消</button>
            </form>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', formHtml);
}

// 關閉新增/編輯表單
function closeForm() {
    const formPopup = document.getElementById('addFormPopup');
    if (formPopup) formPopup.remove();
}

// 新增設備函式
function addEquipment() {
    // 取得輸入資料
    const deviceName = document.getElementById('deviceName').value;
    const deviceModel = document.getElementById('deviceModel').value;
    const serialNumber = document.getElementById('serialNumber').value;
    const status = document.getElementById('status').value;
    const notes = document.getElementById('notes').value;

    // 建立設備物件
    const newEquipment = {
        deviceName,
        deviceModel,
        serialNumber,
        status,
        notes
    };

    // 將新設備加入設備列表
    equipmentList.push(newEquipment);
    renderEquipmentList();

    // 關閉表單
    closeForm();
}

// 渲染設備列表至頁面
function renderEquipmentList() {
    equipmentTableBody.innerHTML = ''; // 清空表格內容

    equipmentList.forEach((equipment, index) => {
        const row = document.createElement('tr');

        // 設備資料欄位
        row.innerHTML = `
            <td>${equipment.deviceName}</td>
            <td>${equipment.deviceModel}</td>
            <td>${equipment.serialNumber}</td>
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

// 編輯設備資料
function editEquipment(index) {
    const equipment = equipmentList[index];

    // 打開編輯表單，預填舊數據
    const formHtml = `
        <div id="addFormPopup" class="form-popup">
            <form id="addForm" class="form-container">
                <h2>編輯設備</h2>
                <label for="deviceName">裝置名稱</label>
                <input type="text" id="deviceName" value="${equipment.deviceName}" required>

                <label for="deviceModel">設備型號</label>
                <input type="text" id="deviceModel" value="${equipment.deviceModel}" required>

                <label for="serialNumber">序號</label>
                <input type="text" id="serialNumber" value="${equipment.serialNumber}" required>

                <label for="status">目前狀態</label>
                <input type="text" id="status" value="${equipment.status}" required>

                <label for="notes">備註</label>
                <input type="text" id="notes" value="${equipment.notes}">

                <button type="button" onclick="updateEquipment(${index})">更新</button>
                <button type="button" onclick="closeForm()">取消</button>
            </form>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', formHtml);
}

// 更新設備資料
function updateEquipment(index) {
    // 取得新的輸入值
    equipmentList[index].deviceName = document.getElementById('deviceName').value;
    equipmentList[index].deviceModel = document.getElementById('deviceModel').value;
    equipmentList[index].serialNumber = document.getElementById('serialNumber').value;
    equipmentList[index].status = document.getElementById('status').value;
    equipmentList[index].notes = document.getElementById('notes').value;

    // 更新並重新渲染設備列表
    renderEquipmentList();
    closeForm();
}

// 刪除設備資料
function deleteEquipment(index) {
    equipmentList.splice(index, 1); // 從設備列表中移除指定設備
    renderEquipmentList(); // 重新渲染設備列表
}

// 初始化頁面並渲染設備列表
document.addEventListener('DOMContentLoaded', renderEquipmentList);
