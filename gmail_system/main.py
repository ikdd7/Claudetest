"""
Gmail 이메일 발송 시스템 - 사용 예제
"""

from email_sender import GmailSender
from config import GmailConfig


def main():
    # 환경변수에서 설정 로드
    config = GmailConfig.from_env()
    sender = GmailSender(config.sender_email, config.app_password)

    # 예제 1: 일반 텍스트 이메일
    sender.send(
        to="recipient@example.com",
        subject="안녕하세요!",
        body="이것은 테스트 이메일입니다.",
    )

    # 예제 2: HTML 이메일
    sender.send(
        to="recipient@example.com",
        subject="HTML 이메일",
        body="<h1>안녕하세요</h1><p>HTML 형식의 이메일입니다.</p>",
        body_type="html",
    )

    # 예제 3: 여러 수신자 + 참조 + 첨부파일
    sender.send(
        to=["user1@example.com", "user2@example.com"],
        subject="공지사항",
        body="여러 수신자에게 보내는 이메일입니다.",
        cc="manager@example.com",
        attachments=["report.pdf"],  # 파일이 존재하는 경우에만
    )


if __name__ == "__main__":
    main()
