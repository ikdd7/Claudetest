"""
환경변수에서 Gmail 설정을 로드합니다.
.env 파일 또는 시스템 환경변수를 사용하세요.
"""

import os
from dataclasses import dataclass


@dataclass
class GmailConfig:
    sender_email: str
    app_password: str

    @classmethod
    def from_env(cls) -> "GmailConfig":
        sender_email = os.environ.get("GMAIL_ADDRESS")
        app_password = os.environ.get("GMAIL_APP_PASSWORD")

        if not sender_email:
            raise ValueError("환경변수 GMAIL_ADDRESS가 설정되지 않았습니다.")
        if not app_password:
            raise ValueError("환경변수 GMAIL_APP_PASSWORD가 설정되지 않았습니다.")

        return cls(sender_email=sender_email, app_password=app_password)
