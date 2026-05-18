"""
Gmail Email Sender System
Gmail SMTP를 통해 이메일을 보내는 시스템
"""

import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from typing import Optional


class GmailSender:
    """Gmail SMTP를 이용한 이메일 발송 클래스"""

    SMTP_HOST = "smtp.gmail.com"
    SMTP_PORT = 587

    def __init__(self, sender_email: str, app_password: str):
        """
        Args:
            sender_email: 발신자 Gmail 주소 (예: Xx@gmail.com)
            app_password: Google 앱 비밀번호 (구글 계정 > 보안 > 앱 비밀번호에서 생성)
        """
        self.sender_email = sender_email
        self.app_password = app_password

    def send(
        self,
        to: str | list[str],
        subject: str,
        body: str,
        body_type: str = "plain",
        cc: Optional[str | list[str]] = None,
        bcc: Optional[str | list[str]] = None,
        attachments: Optional[list[str]] = None,
    ) -> bool:
        """
        이메일 발송

        Args:
            to: 수신자 이메일 (문자열 또는 리스트)
            subject: 제목
            body: 본문 내용
            body_type: 'plain' 또는 'html'
            cc: 참조 이메일 (선택)
            bcc: 숨은 참조 이메일 (선택)
            attachments: 첨부파일 경로 리스트 (선택)

        Returns:
            발송 성공 여부
        """
        msg = MIMEMultipart()
        msg["From"] = self.sender_email
        msg["To"] = ", ".join(to) if isinstance(to, list) else to
        msg["Subject"] = subject

        if cc:
            msg["Cc"] = ", ".join(cc) if isinstance(cc, list) else cc
        if bcc:
            msg["Bcc"] = ", ".join(bcc) if isinstance(bcc, list) else bcc

        msg.attach(MIMEText(body, body_type, "utf-8"))

        if attachments:
            for file_path in attachments:
                self._attach_file(msg, file_path)

        all_recipients = self._collect_recipients(to, cc, bcc)

        try:
            with smtplib.SMTP(self.SMTP_HOST, self.SMTP_PORT) as server:
                server.ehlo()
                server.starttls()
                server.login(self.sender_email, self.app_password)
                server.sendmail(self.sender_email, all_recipients, msg.as_string())
            print(f"[OK] 이메일 발송 완료: {all_recipients}")
            return True
        except smtplib.SMTPAuthenticationError:
            print("[ERROR] 인증 실패 - 이메일/앱 비밀번호를 확인하세요.")
        except smtplib.SMTPException as e:
            print(f"[ERROR] SMTP 오류: {e}")
        except Exception as e:
            print(f"[ERROR] 발송 실패: {e}")
        return False

    def _attach_file(self, msg: MIMEMultipart, file_path: str) -> None:
        if not os.path.isfile(file_path):
            print(f"[WARN] 첨부파일 없음: {file_path}")
            return
        with open(file_path, "rb") as f:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(f.read())
        encoders.encode_base64(part)
        filename = os.path.basename(file_path)
        part.add_header("Content-Disposition", f'attachment; filename="{filename}"')
        msg.attach(part)

    def _collect_recipients(
        self,
        to: str | list[str],
        cc: Optional[str | list[str]],
        bcc: Optional[str | list[str]],
    ) -> list[str]:
        recipients = [to] if isinstance(to, str) else list(to)
        if cc:
            recipients += [cc] if isinstance(cc, str) else list(cc)
        if bcc:
            recipients += [bcc] if isinstance(bcc, str) else list(bcc)
        return recipients
