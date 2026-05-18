# Gmail 이메일 발송 시스템

`Xx@gmail.com` 계정으로 Gmail SMTP를 통해 이메일을 발송하는 Python 시스템입니다.

## 사전 준비: Google 앱 비밀번호 발급

Gmail은 일반 계정 비밀번호 대신 **앱 비밀번호**를 사용해야 합니다.

1. [Google 계정 보안 설정](https://myaccount.google.com/security) 접속
2. **2단계 인증** 활성화 (필수)
3. 검색창에 **"앱 비밀번호"** 검색 → 앱 비밀번호 생성
4. 앱: **메일**, 기기: **Windows 컴퓨터** (또는 기타) 선택
5. 생성된 **16자리 비밀번호** 복사

## 설치 및 설정

```bash
# 환경변수 파일 생성
cp .env.example .env
```

`.env` 파일을 열고 값을 입력하세요:

```
GMAIL_ADDRESS=Xx@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   # 앱 비밀번호 (공백 제거해도 됨)
```

## 사용법

### 직접 코드에서 사용

```python
from gmail_system.email_sender import GmailSender

sender = GmailSender("Xx@gmail.com", "앱비밀번호16자리")

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

### 환경변수를 이용한 실행

```bash
# .env 로드 후 실행 (python-dotenv 사용 시)
python gmail_system/main.py
```

## 파일 구조

```
├── gmail_system/
│   ├── email_sender.py   # 핵심 발송 클래스
│   ├── config.py         # 환경변수 설정 로더
│   └── main.py           # 사용 예제
├── .env.example          # 환경변수 템플릿
├── .env                  # 실제 설정 (git 제외)
└── .gitignore
```

## 주의사항

- `.env` 파일은 절대 git에 커밋하지 마세요.
- 앱 비밀번호는 16자리이며 공백은 무시됩니다.
- 2단계 인증이 비활성화되어 있으면 앱 비밀번호를 만들 수 없습니다.
