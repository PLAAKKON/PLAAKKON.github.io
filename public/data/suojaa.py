
import json
import re
import sys
from pathlib import Path

def remove_age_mentions(text):
    if not isinstance(text, str):
        return text
    return re.sub(r'(\d{1,3})(?=.{0,4}vuotias)', '[REDACTED]', text, flags=re.IGNORECASE)

def fully_anonymize_profile(profile):
    pii_keys = ["puhelin", "sähköposti", "some", "some_link", "id", "esittely_10sanaa"]
    keywords_to_redact = ["linkedin", "twitter", "instagram", "facebook", "tiktok", "github", "keybase", "portfolio",
                          ".fi", ".com", ".net", "http", "https", "@", "email"]

    for key in pii_keys:
        if key in profile:
            profile[key] = "[REDACTED]"

    for key, value in profile.items():
        if isinstance(value, str):
            if any(k in value.lower() for k in keywords_to_redact):
                profile[key] = "[REDACTED]"
            else:
                profile[key] = remove_age_mentions(value)
        elif isinstance(value, list):
            cleaned_list = []
            for item in value:
                if isinstance(item, str):
                    if any(k in item.lower() for k in keywords_to_redact):
                        cleaned_list.append("[REDACTED]")
                    else:
                        cleaned_list.append(remove_age_mentions(item))
                elif isinstance(item, list):
                    cleaned_sublist = [
                        "[REDACTED]" if isinstance(subitem, str) and any(k in subitem.lower() for k in keywords_to_redact) else remove_age_mentions(subitem)
                        for subitem in item
                    ]
                    cleaned_list.append(cleaned_sublist)
                else:
                    cleaned_list.append(item)
            profile[key] = cleaned_list

    return profile

def main():
    if len(sys.argv) < 2:
        print("Käyttö: python suojaa.py profiilit.json")
        return

    input_file = Path(sys.argv[1])
    output_file = input_file.with_name(input_file.stem + "_anonymized.json")

    with open(input_file, encoding="utf-8") as f:
        data = json.load(f)

    anonymized_data = [fully_anonymize_profile(profile) for profile in data]

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(anonymized_data, f, ensure_ascii=False, indent=2)

    print(f"Anonymisoitu tiedosto tallennettu: {output_file}")

if __name__ == "__main__":
    main()
