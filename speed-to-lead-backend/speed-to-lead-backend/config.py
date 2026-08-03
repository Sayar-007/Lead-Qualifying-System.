"""
Centralized settings. Everything pulls from here so there's exactly one
place to change when you move from demo mode to a real client's keys.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # LLM
    anthropic_api_key: str = ""
    qualification_model: str = "claude-haiku-4-5-20251001"  # fast + cheap, used per chat turn
    scoring_model: str = "claude-sonnet-4-6"  # used once per lead, quality matters more here

    # Database
    supabase_url: str = ""
    supabase_key: str = ""

    # Calendar
    calcom_api_key: str = ""
    calcom_event_type_id: str = ""
    calcom_api_base: str = "https://api.cal.com/v2"

    # Messaging
    twilio_account_sid: str = ""
    twilio_auth_token: str = ""
    twilio_from_whatsapp: str = ""
    twilio_from_sms: str = ""
    business_owner_phone: str = ""

    # App behavior
    demo_mode: bool = True


settings = Settings()
