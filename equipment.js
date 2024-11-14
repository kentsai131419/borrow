document.addEventListener("DOMContentLoaded", () => {
    const equipmentTable = document.getElementById("equipment-list");
    const addFormContainer = document.createElement("div");
    addFormContainer.classList.add("form-popup");

    // 新增設備按鈕事件，打開輸入介面
    document.querySelector("button[onclick='openAddForm()']").addEventListener("click", openAddForm);

    function openAddForm() {
        addFormContainer.innerHTML = `
            <form id="addForm" class="form-container">
                <h2>新增設備</h2>
                <label for="device-name">裝置名稱</label>
                <input type="text" id="device-name" required>

                <label for="device-model">設備型號</label>
                <input type="text" id="device-model" required>

                <label for="serial-number">序號</label>
                <input type="text" id="serial-number" required>

                <label for="status">目前狀態</label>
                <input type="text" id="status" required>

                <label for="notes">備註</label>
                <input type="text" id="notes">

                <button type="button" onclick="addEquipment()">提交</button>
                <button type="button" onclick="closeAddForm()">取消</button>
            </form>
        `;
        document.body.appendChild(addFormContainer);
        addFormContainer.style.display = "block";
    }

    function closeAddForm() {
        addFormContainer.style.display = "none";
    }

    // 新增設備到列表
    window.addEquipment = function() {
        const deviceName = document.getElementById("device-name").value;
        const deviceModel = document.getElementById("device-model").value;
        const serialNumber = document.getElementById("serial-number").value;
        const status = document.getElementById("status").value;
        const notes = document.getElementById("notes").value;

        if (deviceName && deviceModel && serialNumber && status) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${deviceName}</td>
                <td>${deviceModel}</td>
                <td>${serialNumber}</td>
                <td>${status}</td>
                <td>${notes}</td>
                <td>
                    <button onclick="editEquipment(this)">編輯</button>
                    <button onclick="deleteEquipment(this)">刪除</button>
                </td>
            `;
            equipmentTable.appendChild(newRow);
            closeAddForm();
        } else {
            alert("請填寫所有必填欄位");
        }
    };

    // 編輯設備
    window.editEquipment = function(button) {
        const row = button.parentElement.parentElement;
        const cells = row.getElementsByTagName("td");
        
        const deviceName = prompt("裝置名稱", cells[0].innerText);
        const deviceModel = prompt("設備型號", cells[1].innerText);
        const serialNumber = prompt("序號", cells[2].innerText);
        const status = prompt("目前狀態", cells[3].innerText);
        const notes = prompt("備註", cells[4].innerText);

        if (deviceName && deviceModel && serialNumber && status) {
            cells[0].innerText = deviceName;
            cells[1].innerText = deviceModel;
            cells[2].innerText = serialNumber;
            cells[3].innerText = status;
            cells[4].innerText = notes;
        }
    };

    // 刪除設備
    window.deleteEquipment = function(button) {
        const row = button.parentElement.parentElement;
        row.remove();
    };
});
