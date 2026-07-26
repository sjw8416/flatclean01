/* ============================================================
   플랫클린 연락처 링크 설정 (이 파일 하나만 수정하면 됩니다)
   ------------------------------------------------------------
   아래 phone / kakao / naver / blog 값만 바꿔서 저장하면,
   index.html을 포함한 모든 페이지의 우측 하단
   [전화 상담] [카카오톡 상담] [네이버 상담] [블로그] 버튼에
   자동으로 반영됩니다. (버튼을 찾아다니며 일일이 수정할 필요 없음)
   ============================================================ */
window.FLATCLEAN_LINKS = {
  // 전화번호: 숫자와 하이픈(-)만 입력하세요. 예) "010-8421-8416"
  phone: "010-8421-8416",

  // 카카오톡 채널 상담 URL. 카카오톡 채널 관리자센터에서 발급받은 주소를 넣으세요.
  // 예) "https://pf.kakao.com/_abcdEfg"
  kakao: "http://pf.kakao.com/_KCzxnX/chat",

  // 네이버 톡톡(상담) URL. 네이버 톡톡 파트너센터에서 발급받은 주소를 넣으세요.
  // 예) "https://talk.naver.com/ct/w4p8x9"  (톡톡 파트너센터 > 설정 > 상담버튼 URL에서 확인)
  naver: "https://talk.naver.com/YOUR_TALKTALK_ID",

  // 블로그 URL. 네이버 블로그를 쓰신다면 블로그 주소를,
  // 사이트 내 블로그(blog.html)를 쓰시려면 "blog.html"로 두세요.
  blog: "https://blog.naver.com/bellir/224265421232"
};

document.addEventListener("DOMContentLoaded", function () {
  var L = window.FLATCLEAN_LINKS || {};

  // 우측 하단 플로팅 버튼에 자동 반영
  var callBtn = document.querySelector(".fab-call");
  var kakaoBtn = document.querySelector(".fab-kakao");
  var naverBtn = document.querySelector(".fab-naver");
  var blogBtn = document.querySelector(".fab-blog");

  if (callBtn && L.phone) {
    callBtn.setAttribute("href", "tel:" + L.phone);
  }
  if (kakaoBtn && L.kakao) {
    kakaoBtn.setAttribute("href", L.kakao);
  }
  if (naverBtn && L.naver) {
    naverBtn.setAttribute("href", L.naver);
  }
  if (blogBtn && L.blog) {
    blogBtn.setAttribute("href", L.blog);
    // 외부 블로그(네이버 등)로 연결되는 경우 새 탭에서 열기
    if (/^https?:\/\//.test(L.blog)) {
      blogBtn.setAttribute("target", "_blank");
      blogBtn.setAttribute("rel", "noopener");
    } else {
      blogBtn.removeAttribute("target");
      blogBtn.removeAttribute("rel");
    }
  }

  // "더 알아보기" 등 본문 내 블로그/카카오채널/네이버 링크도 동일하게 동기화
  if (L.kakao) {
    document.querySelectorAll(".js-kakao-link").forEach(function (el) {
      el.setAttribute("href", L.kakao);
    });
  }
  if (L.naver) {
    document.querySelectorAll(".js-naver-link").forEach(function (el) {
      el.setAttribute("href", L.naver);
    });
  }
  if (L.blog) {
    document.querySelectorAll(".js-blog-link").forEach(function (el) {
      el.setAttribute("href", L.blog);
      if (/^https?:\/\//.test(L.blog)) {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      } else {
        el.removeAttribute("target");
        el.removeAttribute("rel");
      }
    });
  }

  // 헤더에 표시되는 전화번호 텍스트(.nav-tel)도 함께 반영
  if (L.phone) {
    document.querySelectorAll(".nav-tel").forEach(function (el) {
      el.textContent = L.phone;
    });
  }
});
