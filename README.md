웹 프로그래밍 AI Art Gallery - 보고서

                                                                                  학번: 20101280
                                                                                                     이름: 자워키르베크


 서론
목표/동기
• 텍스트 프롬프트로 AI이미지를 생성하고, 생성물과 예시 갤러리를 한번에감상할 수 있는 가벼운 웹서비스를 구현.
• 이미지 생성 API 호출을 서버에서 프록시하여 키를 안전하게 관리하고,프론트에서는 간단한 UI로 생성·저장·검색을 제공하는 것이 목표.

기획/설계
• 전체 흐름: 사용자가 create.html에서 프롬프트·스타일을입력→서버(server.js)가
StabilityAPI에 요청→Base64 이미지를 받아 바로 렌더링→로컬 스토리지에 저장→ index.html 갤러리에서 로컬 저장본과 기본 예시(data/gallery.json)를
함께 조회.

• 프론트구조:
– create.html/create.js: 생성UI, 결과 렌더링, 갤러리저장.
– index.html/script.js: 예시데이터+로컬 생성본을 카드형 그리드로
표시,검색/태그필터,모달 상세 보기.

• 서버구조: Express기반 프록시(server.js)가 /api/generate 엔드포인트를
 제공. 프론트가 직접 외부 API키를 다루지 않도록하고,스타일 프리셋 맵핑을 제공.

• 데이터: 기본 샘플(data/gallery.json)과 사용자 생성본(localStorage
generatedArt)을 병합해 갤러리를 구성.






화면캡쳐
• 메인 갤러리:index.html 로드 후 카드/모달/검색·태그 필터 동작화면.
• 이미지생성: create.html에서 프롬프트 입력→생성 결과→“SavetoGallery”
버튼.


<img width="1440" height="900" alt="Screenshot 2025-12-14 at 6 37 18 PM" src="https://github.com/user-attachments/assets/649dfa86-cdf1-43b5-a4b3-4a322d2eb193" />



<img width="1440" height="900" alt="Screenshot 2025-12-14 at 6 37 22 PM" src="https://github.com/user-attachments/assets/92e22b70-b60c-49f7-95ae-4c59c1578989" />





실행 영상: 
https://youtu.be/ccwdsuZrhbs?si=3XT7-hthiChLGkKB


메뉴/동작설명
• Create AI Artwork 페이지:프롬프트 입력→스타일 선택(Realistic/Anime/Digital Art/Fantasy/Cyberpunk)→Generate Art 클릭→생성된 이미지 미리 보기 및 Save to Gallery로 저장.• 저장기능:로컬스토리지generatedArt에제목(프롬프트앞20자),태그(스타일),
원본프롬프트,이미지URL을객체로저장.
• 갤러리페이지:예시+저장본을카드로나열,상단검색창으로제목/프롬프트전체
검색,태그드롭다운필터,카드클릭시모달로큰이미지와프롬프트열람.
• 모달닫기:닫기버튼또는배경클릭으로닫힘.
코드설명
• create.js: 버튼클릭시입력검증→/api/generate POST→Base64Data
URL수신후화면표시및저장버튼제공.로컬저장함수saveToGallery가JSON
직렬화로localStorage에누적.
• script.js: data/gallery.json 로드 후 localStorage 저장본을 병합해
artworks 배열생성,검색·필터조건으로렌더링,카드클릭시모달열기.
(중복 fetch 호출이 있어도 동일 데이터라 동작에는 문제없지만, 리팩터링 여지
있음.)
• server.js: Express+CORS 구성, Stability API 키(STABILITY_API_KEY)를
환경변수로읽어스타일프리셋매핑후이미지생성요청.응답오류메시지정규화
후Base64이미지를DataURL로반환.
• style.css: 다크톤그리드레이아웃,카드호버효과,모달/입력폼/버튼스타일
정의.
• data/gallery.json:초기예시3건(사이버펑크시티,판타지포레스트,AI조각
초상)제공.
결론
추후보완사항
• StabilityAPI호출실패시재시도/대기열및남은크레딧표시.
• 사용자계정/백엔드DB를도입해로컬스토리지대신서버저장및공유기능제공.
• 생성이력관리(시간순,태그편집,삭제),즐겨찾기/다운로드버튼추가.
• 이미지최적화(썸네일리사이즈,LazyLoading)로초기로드성능개선.
• UI개선:다국어지원,접근성(ARIA레이블보강),반응형레이아웃튜닝.
