# Claudetest

Claude Code로 작업한 결과물을 모아둔 저장소입니다. 현재 두 가지 산출물이 들어 있습니다.

1. **`business-ideas.md`** — 자동 생성 루프로 누적한 사업 아이디어 모음 (총 930개)
2. **`gmail_system/`** — Gmail SMTP 기반 이메일 발송 Python 시스템

---

## 1. 사업 아이디어 모음 (`business-ideas.md`)

5~10분 주기의 자동 생성 루프로 쌓아 올린 사업 아이디어 컬렉션입니다. 매 배치(10개)마다 커밋·푸시되어 누적됩니다.

### 구성

| 구분 | 배치 수 | 아이디어 수 | 콘셉트 |
|------|--------:|------------:|--------|
| **시즌 1** | 46 | 460 | 전혀 새로운 관점·뜬금없는 조합·숨은 니치마켓의 일반 사업 아이디어 (오프라인·서비스 포함) |
| **시즌 2** | 47 | 470 | **바이브코딩(AI 코딩)으로 혼자 MVP 구현 가능한** 소프트웨어 중심 아이디어 |
| **합계** | **93** | **930** | |

### 시즌 2의 영역별 특집 배치

반복을 피하기 위해 중간중간 영역을 묶어 생성했습니다.

- 뜬금없는 단어×상황 조합 (배치 32, 41)
- 새 영역 확장 — 취미·크리에이터·도시농업 (배치 38)
- 전문직·B2B 니치 (배치 39)
- 1인 가구·청년 (배치 43)
- 시니어·돌봄 (배치 44)
- 여행·이동 (배치 45)
- 멘탈·관계 (배치 46)
- 취미·자기계발 (배치 47)

### 아이디어 작성 형식

각 항목은 `굵은 제목 — 한 줄 설명 + 수익 모델 + (니치/조합 포인트)` 구조로 적혀 있습니다.

> 예: **냉장고 속 재료 사진 → 오늘 뭐 먹지 결정기 '잔반 셰프'** — 냉장고를 한 장 찍으면 식별된 재료로 만들 수 있는 요리를 '버려지기 직전 재료 우선'으로 추천하는 비전+레시피 앱. … (니치: 매일 저녁의 결정 피로)

---

## 2. Gmail 이메일 발송 시스템 (`gmail_system/`)

Gmail 계정으로 Gmail SMTP를 통해 이메일을 발송하는 Python 시스템입니다.

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
GMAIL_ADDRESS=you@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   # 앱 비밀번호 (공백 제거해도 됨)
```

### 사용법

#### 직접 코드에서 사용

```python
from gmail_system.email_sender import GmailSender

sender = GmailSender("you@gmail.com", "앱비밀번호16자리")

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

#### 환경변수를 이용한 실행

```bash
# .env 로드 후 실행 (python-dotenv 사용 시)
python gmail_system/main.py
```

### 주의사항

- `.env` 파일은 절대 git에 커밋하지 마세요.
- 앱 비밀번호는 16자리이며 공백은 무시됩니다.
- 2단계 인증이 비활성화되어 있으면 앱 비밀번호를 만들 수 없습니다.

---

## 저장소 구조

```
├── business-ideas.md     # 사업 아이디어 모음 (시즌 1·2, 총 930개)
├── gmail_system/
│   ├── email_sender.py   # 핵심 발송 클래스
│   ├── config.py         # 환경변수 설정 로더
│   └── main.py           # 사용 예제
├── .env.example          # 환경변수 템플릿
├── .env                  # 실제 설정 (git 제외)
├── .gitignore
├── vercel.json           # Vercel 자동 배포 비활성화 설정
└── README.md
```

### `vercel.json` 참고

이 저장소는 배포할 웹앱이 아니라 문서·스크립트 모음이라, git 푸시마다 Vercel이 빈 빌드를 시도해 실패하는 것을 막기 위해 자동 배포를 꺼 두었습니다.

```json
{ "git": { "deploymentEnabled": false } }
```
