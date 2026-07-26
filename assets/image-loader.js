/* ============================================================
   플랫클린 이미지 자동 인식 로더
   ------------------------------------------------------------
   assets 폴더에 이미지를 새로 넣을 때, 파일 형식(jpg, jpeg, png,
   webp, gif, svg)에 상관없이 "파일 이름"만 같으면 자동으로
   화면에 표시됩니다.

   예) 로고를 바꾸고 싶다면 assets 폴더에
       "logo-banner.png" 또는 "logo-banner.webp" 등
       어떤 형식으로 저장해도, 파일 이름 앞부분(logo-banner)만
       같으면 이 스크립트가 알아서 찾아서 보여줍니다.
       (기존 파일은 지우거나 다른 이름으로 바꿔주세요 —
        같은 이름의 확장자만 다른 파일이 여러 개 있으면
        먼저 찾은 파일이 우선 표시됩니다: jpg > jpeg > png > webp > gif > svg)

   ※ PDF는 이미지가 아니라서 <img> 태그로는 표시되지 않습니다.
      PDF 파일을 넣고 싶다면 jpg나 png로 먼저 변환해서 저장해주세요.
      (사진 앱, 미리보기, 또는 온라인 변환 사이트에서 몇 초면 가능해요)

   ※ "작업사례(전후)" 사진처럼 아직 실제 사진을 안 넣으셨다면,
      임시로 보여줄 예시 사진(fallback)이 대신 나타납니다.
      실제 사진을 assets 폴더에 넣으시는 순간, 예시 사진 대신
      자동으로 실제 사진으로 바뀝니다. 별도 설정 필요 없음.
   ============================================================ */
(function () {
  var EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif", "svg"];

  function tryLoad(img, base, index) {
    if (index >= EXTENSIONS.length) {
      var fallback = img.getAttribute("data-fallback");
      if (fallback) {
        // 로컬 파일이 없으면 지정된 기본(예시) 이미지를 대신 보여줌
        img.onerror = null;
        img.src = fallback;
      } else {
        // 대체 이미지도 없는 경우: 깨진 이미지 대신 자리만 비워둠
        img.style.display = "none";
        console.warn("[이미지 로더] 파일을 찾을 수 없습니다: " + base + " (jpg/jpeg/png/webp/gif/svg 중 하나로 저장해주세요)");
      }
      return;
    }
    var candidate = base + "." + EXTENSIONS[index];
    img.onerror = function () {
      tryLoad(img, base, index + 1);
    };
    img.onload = function () {
      img.style.display = "";
    };
    img.src = candidate;
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("img[data-base]").forEach(function (img) {
      var base = img.getAttribute("data-base");
      tryLoad(img, base, 0);
    });
  });
})();
