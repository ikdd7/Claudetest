# idea

아이디어의 씨앗을 모으는 저장소입니다. 현재 두 가지를 담고 있습니다.

1. **`painpoint.md`** — 한국인이 일상에서 겪는 니치한 페인포인트 모음 (아이디어 발굴용)
2. **`gmail_system/`** — Gmail SMTP 이메일 발송 Python 모듈

---

## 1. painpoint.md — 한국인의 니치한 고통 모음

아주 사소하고 디테일한, 한국인 특유의 일상 페인포인트를 모은 컬렉션입니다.
신규 서비스·제품 아이디어의 출발점으로 쓰려고 수집했습니다.

- **현재 260개** 수록 (배치 26개, 각 10개씩)
- 각 항목은 `상황 제목` + `구체적 묘사` 형태로 작성
- 배치마다 **한국시간(KST)** 기록을 남겨 누적 이력을 관리 (모든 날짜·시각 표기는 KST 기준)

### 카테고리 예시

수집된 페인포인트는 대체로 아래 영역에 걸쳐 있습니다.

| 영역 | 예시 |
|------|------|
| 식당·외식 | 가위 주도권, 셀프 물, 반찬 리필 타이밍, 호칭 객관식 |
| 배달·택배 | 최소주문금액, 운송장 개인정보, 부재 시 경비실 |
| 교통 | 하차벨 눈치, 환승할인 30분, 역방향 좌석 |
| 직장 | 단톡방 읽씹, "넵" 온도 조절, 회식 술잔 거절 |
| 디지털·앱 | 키오스크 줄 압박, 위치공유로 들통난 거짓말, 마침표 해석학 |
| 주거 | 도어락 등 뒤 인기척, 층간소음 공지, 분리수거 죄책감 |

### 기여(추가) 형식

새 배치는 파일 끝에 다음 형식으로 덧붙입니다.

```markdown
## Batch N — YYYY-MM-DD HH:MM KST

NNN. **상황을 요약한 제목**: 구체적이고 공감되는 상황 묘사.
...
```

---

## 2. gmail_system — Gmail 이메일 발송 시스템

Gmail SMTP를 통해 이메일을 발송하는 Python 시스템입니다.

### 사전 준비: Google 앱 비밀번호 발급

Gmail은 일반 계정 비밀번호 대신 **앱 비밀번호**를 사용해야 합니다.

1. [Google 계정 보안 설정](https://myaccount.google.com/security) 접속
2. **2단계 인증** 활성화 (필수)
3. 검색창에 **"앱 비밀번호"** 검색 → 앱 비밀번호 생성
4. 앱: **메일**, 기기: **Windows 컴퓨터** (또는 기타) 선택
5. 생성된 **16자리 비밀번호** 복사

### 설치 및 설정

```bash
# 환경변수 파일 생성
cp .env.example .env
```

`.env` 파일을 열고 값을 입력하세요:

```
GMAIL_ADDRESS=your@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   # 앱 비밀번호 (공백 제거해도 됨)
```

### 사용법

```python
from gmail_system.email_sender import GmailSender

sender = GmailSender("your@gmail.com", "앱비밀번호16자리")

# 텍스트 이메일
sender.send(
    to="받는사람@example.com",
    subject="제목",
    body="본문 내용",
)

# HTML 이메일
sender.send(
    to="받는사람@example.com",
    subject="HTML 제목",
    body="<h1>안녕하세요</h1>",
    body_type="html",
)

# 여러 수신자 + 참조 + 첨부파일
sender.send(
    to=["a@example.com", "b@example.com"],
    subject="공지",
    body="내용",
    cc="참조@example.com",
    bcc="숨은참조@example.com",
    attachments=["파일경로.pdf"],
)
```

환경변수를 이용한 실행:

```bash
python gmail_system/main.py
```

---

## 파일 구조

```
├── painpoint.md          # 한국인 니치 페인포인트 모음 (260개)
├── gmail_system/
│   ├── email_sender.py   # 핵심 발송 클래스
│   ├── config.py         # 환경변수 설정 로더
│   └── main.py           # 사용 예제
├── .env.example          # 환경변수 템플릿
├── .env                  # 실제 설정 (git 제외)
├── .gitignore
└── README.md
```

## 주의사항

- `.env` 파일은 절대 git에 커밋하지 마세요.
- 앱 비밀번호는 16자리이며 공백은 무시됩니다.
- 2단계 인증이 비활성화되어 있으면 앱 비밀번호를 만들 수 없습니다.

---

## 마지막 업데이트

2026-06-13 20:59 KST (batch 26 기준) — 이 저장소의 모든 날짜·시각 표기는 한국시간(KST, UTC+9) 기준입니다.
