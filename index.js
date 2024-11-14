document.addEventListener("DOMContentLoaded", function() {
  // 顯示最新借還紀錄
  const latestRecords = [
    { borrower: "Melissa Yen", phone: "8714", device: "TW006ITLNBX028", model: "Model A", borrowDate: "2024-11-01", returnDate: "2024-11-10" },
    { borrower: "John Doe", phone: "1234", device: "TW005ITLNBX027", model: "Model B", borrowDate: "2024-11-05", returnDate: "2024-11-15" }
  ];

  const latestRecordsList = document.getElementById("latest-records");
  latestRecords.forEach(record => {
    const li = document.createElement("li");
    li.textContent = `${record.device} - ${record.borrower}#${record.phone} (借出日期: ${record.borrowDate}, 歸還日期: ${record.returnDate})`;
    latestRecordsList.appendChild(li);
  });

  // 彈出表單邏輯
  const openFormBtn = document.getElementById("openFormBtn");
  const modal = document.getElementById("borrowForm");
  const closeForm = document.getElementById("closeForm");

  openFormBtn.onclick = function() {
    modal.style.display = "block";
  }

  closeForm.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

  // 填充裝置名稱和型號的下拉清單
  const deviceData = [
    { name: "裝置 A", models: ["Model A", "Model B"] },
    { name: "裝置 B", models: ["Model X", "Model Y"] }
  ];

  const deviceNameSelect = document.getElementById("deviceName");
  const deviceModelSelect = document.getElementById("deviceModel");

  deviceData.forEach(device => {
    const option = document.createElement("option");
    option.value = device.name;
    option.textContent = device.name;
    deviceNameSelect.appendChild(option);
  });

  deviceNameSelect.onchange = function() {
    // 更新設備型號選擇
    deviceModelSelect.innerHTML = "";
    const selectedDevice = deviceData.find(device => device.name === deviceNameSelect.value);
    selectedDevice.models.forEach(model => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      deviceModelSelect.appendChild(option);
    });
  };

  // 提交表單
  const borrowForm = document.getElementById("borrowFormContent");
  borrowForm.onsubmit = function(event) {
    event.preventDefault();
    const formData = {
      borrowerName: document.getElementById("borrowerName").value,
      borrowerPhone: document.getElementById("borrowerPhone").value,
      borrowDate: document.getElementById("borrowDate").value,
      returnDate: document.getElementById("returnDate").value,
      deviceName: document.getElementById("deviceName").value,
      deviceModel: document.getElementById("deviceModel").value
    };
    console.log(formData);
    // 這裡可以將表單資料送到伺服器或本地儲存
    modal.style.display = "none"; // 提交後關閉表單
  };
});
