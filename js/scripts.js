(() => {
  const spBreak = 767.98;

  const isMobile = () => {
    return window.matchMedia(`(max-width: ${spBreak}px)`).matches;
  };

  const detectBrowsers = () => {
    const html = $("html");
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("mac") >= 0) {
      html.addClass("is-mac");
    }
    if (ua.indexOf("safari") !== -1) {
      if (ua.indexOf("chrome") > -1) {
        html.addClass("is-chrome");
      } else {
        html.addClass("is-safari");
      }
    }
    if (ua.indexOf("msie ") > -1 || ua.indexOf("trident/") > -1) {
      html.addClass("is-ie");
    }
    if (ua.indexOf("firefox") > -1) {
      html.addClass("is-firefox");
    }
    if (ua.indexOf("android") > -1) {
      html.addClass("is-android");
    }
    if (ua.match(/(iphone|ipod|ipad)/)) {
      html.addClass("is-ios");
    }
    if (ua.indexOf("edg/") > -1) {
      html.removeClass("is-chrome");
      html.addClass("is-chromium");
    }
  };

  const tabletViewport = () => {
    const viewport = document.getElementById("viewport");
    let ua = "";
    const setViewport = () => {
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      if (window.screen.width < 375 && portrait) {
        viewport.setAttribute("content", "width=375, user-scalable=0");
      } else if (
        (window.screen.width >= 768 && window.screen.width <= 1199) ||
        (window.screen.width < 768 && window.screen.height >= 768 && !portrait)
      ) {
        viewport.setAttribute("content", "width=1300, user-scalable=0");
        ua = navigator.userAgent.toLowerCase();
        if (
          (/macintosh/i.test(ua) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 1) ||
          (ua.match(/(iphone|ipod|ipad)/) && !isMobile()) ||
          (ua.indexOf("android") > -1 && !isMobile())
        ) {
          $("html").addClass("is-tablet");
        }
      } else {
        viewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=0"
        );
        $("html").removeClass("is-tablet");
      }
    };
    setViewport();
    $(window).on("load resize", setViewport);
  };

  const smoothScroll = () => {
    const anchors = $('a[href*="#"]:not([href="#"])');
    const headerHeight = 0;
    const speed = 500;
    let timeout = 0;
    let position = 0;
    const triggerScroll = (context) => {
      const href =
        typeof context === "string"
          ? context
          : "#" + $(context).attr("href").split("#")[1];
      if (!$(context).hasClass("no-scroll") && $(href).length) {
        position = $(href).offset().top - headerHeight;
        $("body, html").animate({ scrollTop: position }, speed, "swing");
        return false;
      }
      return true;
    };
    setTimeout(() => {
      window.scroll(0, 0);
      $("html").removeClass("is-loading").addClass("is-visible");
    }, 1);
    if (window.location.hash) {
      window.scroll(0, 0);
      if (
        navigator.userAgent.indexOf("MSIE ") > -1 ||
        navigator.userAgent.indexOf("Trident/") > -1
      ) {
        timeout = 0;
      } else {
        timeout = 500;
      }
      setTimeout(() => {
        triggerScroll(window.location.hash);
      }, timeout);
    }
    anchors.on("click", (e) => triggerScroll(e.target.closest("a")));
  };

  $(() => {
    detectBrowsers();
    tabletViewport();
    smoothScroll();
  });
})();

///////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  function updateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Định dạng mới
    const formattedTime = `Ngày ${day} tháng ${month} năm ${year} | Giờ: ${hours}:${minutes}:${seconds}`;
    document.querySelector(".block-time").textContent = formattedTime;
  }

  // Cập nhật ngay khi tải trang
  updateTime();

  // Cập nhật mỗi giây
  setInterval(updateTime, 1000);
});
document.addEventListener("DOMContentLoaded", function () {
  const inputIds = [
  "sofile",
  "FCL",
  "soMBL",
  "soCoint",
  "soRoute",
  "soETD",
  "soETA",
  "tenTau",
  "soCont",
  "hangTau",
  "ketQua",
];

  const specialPrefixes = {
    soMBL: "MBL ",
    soETD: "ETD ",
    soETA: "ETA ",
  };

  const sectionShow = document.querySelector(".list-show");
  const sofileInput = document.getElementById("sofile");
  const ketQuaInput = document.getElementById("ketQua");

  // Chỉ cho phép nhập tối đa 6 số ở input đầu tiên
  sofileInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 6);
  });

  // Kiểm tra khi người dùng nhấn Tab hoặc rời khỏi input đầu tiên
  sofileInput.addEventListener("keydown", function (event) {
    if (event.key === "Tab" || event.key === "Enter") {
      if (this.value.length !== 6) {
        event.preventDefault(); // Ngăn chặn tab đi tiếp
        alert("Hãy nhập 6 chữ số");
        this.focus();
      }
    }
  });

  // Xử lý khi nhấn Enter ở input cuối cùng
  ketQuaInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      let resultText = "";

      // Kiểm tra nếu input cuối cùng rỗng thì báo lỗi
      if (ketQuaInput.value.trim() === "") {
        alert("Hãy nhập kết quả cuối cùng");
        ketQuaInput.focus();
        return;
      }

      inputIds.forEach((id, index) => {
        let inputValue = document.getElementById(id).value.trim();

        if (inputValue.toLowerCase() === "z") return; // Bỏ qua nếu "z" hoặc "Z"
        if (inputValue === "") {
          inputValue = "   ";
          if (specialPrefixes[id]) specialPrefixes[id] = ""; // (nếu bạn vẫn muốn reset prefix khi trống)
        }

        if (id === "sofile") {
          resultText += inputValue + ":";
        } else if (id === "ketQua") {
          resultText += " => " + inputValue;
        } else if (id === "hangTau") {
          resultText += " " + inputValue;
        } else {
  let prefix = specialPrefixes[id] || "";

  // Xử lý soETD: đổi prefix thành ETD hoặc LTD
  if (id === "soETD" && /^\d{4}$/.test(inputValue)) {
    const day = inputValue.slice(0, 2);
    const month = inputValue.slice(2);
    inputValue = `${day}-${month}`;

    const today = new Date();
    const inputDate = new Date(today.getFullYear(), parseInt(month) - 1, parseInt(day));
    const isFuture = inputDate > today.setHours(0, 0, 0, 0);

    prefix = isFuture ? "ETD " : "ATD ";
  }

  // Xử lý soETA: đổi prefix thành ETA hoặc LTA
  if (id === "soETA" && /^\d{4}$/.test(inputValue)) {
    const day = inputValue.slice(0, 2);
    const month = inputValue.slice(2);
    inputValue = `${day}-${month}`;

    const today = new Date();
    const inputDate = new Date(today.getFullYear(), parseInt(month) - 1, parseInt(day));
    const isFuture = inputDate > today.setHours(0, 0, 0, 0);

    prefix = isFuture ? "ETA " : "ATA ";
  }

  if (id === "FCL") {
    const fclValue = inputValue.toLowerCase();
    inputValue = fclValue === "f" ? "FCL" : fclValue === "l" ? "LCL" : inputValue;
  }

  // Bỏ prefix nếu là soMBL
  if (id === "soMBL") prefix = "";

  resultText += " " + prefix + inputValue + " /";
}
      });

      resultText = resultText.replace(/\s\/$/, "");

      const newListItem = document.createElement("li");
      newListItem.classList.add("list-item");

      const wrapperDiv = document.createElement("div");
      wrapperDiv.classList.add("item-wrapper");
      wrapperDiv.textContent = resultText;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");

      // ✅ Gắn SVG icon vào mọi button (không kiểm tra lẻ/chẵn ở đây)
      const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgIcon.setAttribute("viewBox", "0 0 448 512");
      svgIcon.classList.add("svgIcon");

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute(
        "d",
        "M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
      );
      svgIcon.appendChild(path);
      deleteButton.appendChild(svgIcon);

      // Xử lý sự kiện delete
      deleteButton.addEventListener("click", function () {
        newListItem.remove();
      });

      // Thêm button delete và edit vào wrapper
      wrapperDiv.appendChild(deleteButton);


// ➕ Nút Sửa
const editButton = document.createElement("button");
editButton.classList.add("edit-button");

const span = document.createElement("span");
span.textContent = "Sửa"; // ← nội dung nằm trong span
editButton.appendChild(span);

wrapperDiv.appendChild(editButton);

// Xử lý khi nhấn nút Sửa
editButton.addEventListener("click", function () {
  if (span.textContent === "Sửa") {
    wrapperDiv.contentEditable = true;
    wrapperDiv.focus();
    wrapperDiv.classList.add("editing");
    span.textContent = "Lưu";
  } else {
    wrapperDiv.contentEditable = false;
    wrapperDiv.classList.remove("editing");
    span.textContent = "Sửa";
  }
});

// ✅ Thêm tính năng nhấn Enter để lưu
wrapperDiv.addEventListener("keydown", function (e) {
  if (wrapperDiv.isContentEditable && e.key === "Enter") {
    e.preventDefault(); // ❌ Ngăn xuống dòng

    // Kết thúc chỉnh sửa như khi nhấn nút Lưu
    wrapperDiv.contentEditable = false;
    wrapperDiv.classList.remove("editing");
    span.textContent = "Sửa";
  }
});




      newListItem.appendChild(wrapperDiv);
      sectionShow.appendChild(newListItem);

      // Reset input về trống để nhập bản ghi mới
      inputIds.forEach((id) => {
        document.getElementById(id).value = "";
      });

      sofileInput.focus(); // Quay lại input đầu tiên
    }
  });
});
const fclInput = document.getElementById("FCL");
const soContInput = document.getElementById("soCont");
const soCointInput = document.getElementById("soCoint");

// Theo dõi khi người dùng nhập vào ô FCL
fclInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();

  // Reset trạng thái
  soContInput.disabled = false;
  soContInput.classList.remove("disabled");

  soCointInput.disabled = false;
  soCointInput.classList.remove("disabled");

  if (value === "f") {
    // Ngăn nhập soCont
    soContInput.disabled = true;
    soContInput.classList.add("disabled");
    soContInput.value = ""; // Option: xóa luôn nếu đã nhập trước đó
  } else if (value === "l") {
    // Ngăn nhập soCoint
    soCointInput.disabled = true;
    soCointInput.classList.add("disabled");
    soCointInput.value = ""; // Option: xóa luôn nếu đã nhập trước đó
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".section-show .wrapper");

  // Tạo nút Copy All
  const copyButton = document.createElement("button");
  copyButton.textContent = "Copy All";
  copyButton.id = "copyButton";
  copyButton.classList.add("btn-copy");

  wrapper.insertBefore(copyButton, wrapper.firstChild); // Thêm vào đầu wrapper

  // Modal để xác nhận sao chép
  const confirmBox = document.createElement("div");
  confirmBox.classList.add("confirm-box");
  confirmBox.innerHTML = `
    <div class="confirm-content">
      <div class="love">
        <input id="switch" type="checkbox">
        <label class="love-heart" for="switch">
          <i class="left"></i>
          <i class="right"></i>
          <i class="bottom"></i>
          <div class="round"></div>
        </label>
      </div>
      <p>Em có đang nhớ Bình Phạm không?</p>
      <button class="card save-btn">
        <p class=heading>Tất nhiên là cóoooooo!!</p>
      </button>
      <button class="cancel-btn">Ai thèm nhớ là gì</button>
    </div>
  `;
  document.body.appendChild(confirmBox);
  confirmBox.style.display = "none"; // Ẩn modal ban đầu

  // Modal thông báo cần lưu
  const warningBox = document.createElement("div");
  warningBox.classList.add("warning-box");
  warningBox.innerHTML = `<p>Em trả lời sai rồi</p>`;
  document.body.appendChild(warningBox);
  warningBox.style.display = "none"; // Ẩn modal cảnh báo

  // Lắng nghe sự kiện click trên nút Copy All
 copyButton.addEventListener("click", function () {
  const records = document.querySelectorAll(".item-wrapper");
  let textToCopy = "";
  let validCount = 0; // Số item hợp lệ

  records.forEach((record) => {
    // Tạo bản sao để loại bỏ các nút
    const clonedRecord = record.cloneNode(true);
    clonedRecord.querySelectorAll("button").forEach((btn) => btn.remove());

    const textContent = clonedRecord.textContent.trim();
    if (textContent) {
      textToCopy += textContent + "\n";
      validCount++; // Tăng đếm nếu nội dung không rỗng
    }
  });

  if (validCount === 0) {
    alert("Không có bản ghi nào để sao chép!");
    return;
  }

  // Hiển thị modal xác nhận sao chép
  confirmBox.style.display = "block";

  const saveButton = confirmBox.querySelector(".save-btn");
  const cancelButton = confirmBox.querySelector(".cancel-btn");

  // Xử lý khi nhấn "Tất nhiên là cóoooooo!!"
  const handleSave = () => {
    confirmBox.style.backgroundColor = "#d4edda";

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        confirmBox.style.display = "none";
        alert(`Đã sao chép ${validCount} bản ghi!`); // ✅ Thông báo số lượng bản ghi đã copy
      })
      .catch(() => {
        alert("Lỗi khi sao chép!");
      });

    saveButton.removeEventListener("click", handleSave); // tránh gắn trùng nhiều lần
    cancelButton.removeEventListener("click", handleCancel);
  };

  // Xử lý khi nhấn "Ai thèm nhớ là gì"
  const handleCancel = () => {
    confirmBox.style.display = "none";
    warningBox.style.display = "block";
    setTimeout(() => {
      warningBox.style.display = "none";
      confirmBox.style.display = "block";
    }, 1000);

    saveButton.removeEventListener("click", handleSave);
    cancelButton.removeEventListener("click", handleCancel);
  };

  saveButton.addEventListener("click", handleSave);
  cancelButton.addEventListener("click", handleCancel);
});

});
