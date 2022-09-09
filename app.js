const listsInfo = document.querySelector(".lists__info");
const createBtnEl = document.querySelector(".btn.btn-create");
const updateBtnEl = document.querySelector(".btn.btn-update");
console.log(updateBtnEl);
// EVENT
// Add event
createBtnEl.addEventListener("click", addInfoHandle);

// Delete Event
listsInfo.addEventListener("click", removeInfo);

// Edit Event
listsInfo.addEventListener("click", editInfo);

// Update event
updateBtnEl.addEventListener("click", updateInfo);

var infoLists = getTaskFromLocalStorage();
renderListInfo(infoLists);

function addInfoHandle(e) {
  e.preventDefault();
  let name = document.querySelector(".name").value.trim();
  let age = document.querySelector(".age").value.trim();
  let phone = document.querySelector(".phone").value.trim();
  let address = document.querySelector(".address").value.trim();
  if (name != "" && age != "" && phone != "" && address != "") {
    // save in localStorage
    var arr = {
      name: name,
      age: age,
      phone: phone,
      address: address,
    };
    let infoLists = localStorage.getItem("infoLists")
      ? JSON.parse(localStorage.getItem("infoLists"))
      : [];
    // đưa giá trị vào mảng
    infoLists.push(arr);
    localStorage.setItem("infoLists", JSON.stringify(infoLists));

    // display UI
    renderListInfo(infoLists);

    clearFiled();

    showAlert("Thêm thông tin thành công");
  } else {
    showAlert("Vui lòng nhập thông tin");
  }
}
function renderListInfo(infoLists = []) {
  let template = "";
  infoLists.forEach((info, index) => {
    index++;
    template += `
    <div class="info">
          <li><strong>ID: </strong>${index}</li>
          <li><strong>Name: </strong>${info.name}</li>
          <li><strong>Age: </strong>${info.age}</li>
          <li><strong>Phone: </strong>${info.phone}</li>
          <li><strong>Address: </strong>${info.address}</li>
          <div class="controls">
              <a href="" class="delete" data-del=${index - 1} >X</a>
              <a href="" class="edit" data-edit=${index - 1}  >Edit</a>
          </div>
      </div>`;
  });
  listsInfo.innerHTML = template;
}

// handle remove
function removeInfo(e) {
  e.preventDefault();
  let index = e.target.getAttribute("data-del");
  if (e.target.classList.contains("delete")) {
    listsInfo.removeChild(e.target.parentElement.parentElement);
    let infoLists = localStorage.getItem("infoLists")
      ? JSON.parse(localStorage.getItem("infoLists"))
      : [];
    if (confirm("Bạn có muốn xóa?")) {
      infoLists.splice(index, 1);
      showAlert("Xóa thông tin thành công");
    }
    localStorage.setItem("infoLists", JSON.stringify(infoLists));
  }
}

// handle edit
function editInfo(e) {
  e.preventDefault();
  let index = e.target.getAttribute("data-edit");
  console.log(index);
  let infoLists = localStorage.getItem("infoLists")
    ? JSON.parse(localStorage.getItem("infoLists"))
    : [];

  document.getElementById("name").value = infoLists[index].name;
  document.getElementById("age").value = infoLists[index].age;
  document.getElementById("phone").value = infoLists[index].phone;
  document.getElementById("address").value = infoLists[index].address;
  document.getElementById("index").value = index;

  document.querySelector(".btn-create").style.display = "none";
  document.querySelector(".btn-update").style = "display:block";
}

//handle update
function updateInfo(e) {
  e.preventDefault();
  let infoLists = localStorage.getItem("infoLists")
    ? JSON.parse(localStorage.getItem("infoLists"))
    : [];
  let index = document.getElementById("index").value;

  infoLists[index] = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
  };

  localStorage.setItem("infoLists", JSON.stringify(infoLists));
  showAlert("Cập nhập thành công");

  renderListInfo(infoLists);
  document.querySelector(".btn-create").style.display = "block";
  document.querySelector(".btn-update").style = "display:none";
  clearFiled();
}

function showAlert(message = "Đã xử lý") {
  let alertEl = document.querySelector(".show-alert");
  alertEl.textContent = message;
  alertEl.style = "display: block";
  setTimeout(() => {
    alertEl.style = "display: none";
  }, 3000);
}
function getTaskFromLocalStorage() {
  return localStorage.getItem("infoLists")
    ? JSON.parse(localStorage.getItem("infoLists"))
    : [];
}
// clearfield
function clearFiled() {
  document.getElementById("age").value = "";
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
}
