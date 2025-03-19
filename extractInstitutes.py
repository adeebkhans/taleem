import pdfplumber
import re
import json

def extract_data_from_pdf(pdf_path):
    data = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                # Regex pattern to match the required data format
                matches = re.findall(
                    r'(\d+)\s+([\d\w\s]+of\s+\d+)\s+(.+?)\s+([A-Za-z\s/]+)\s+(\d{1,2}/\d{1,2}/\d{4})\s+([A-Za-z]+)',
                    text,
                    re.DOTALL
                )
                for match in matches:
                    sl_no, case_no, name, state, date_of_issue, community = match
                    data.append({
                        "sl_no": sl_no.strip(),
                        "case_no": case_no.strip(),
                        "name": name.strip().replace('\n', ' '),
                        "state": state.strip(),
                        "date_of_issue": date_of_issue.strip(),
                        "community": community.strip()
                    })
    return data

# Specify your PDF file path here
pdf_file_path = "Minority Institutions list.pdf"
extracted_data = extract_data_from_pdf(pdf_file_path)

# Output to JSON
with open("institutions.json", "w", encoding='utf-8') as f:
    json.dump(extracted_data, f, ensure_ascii=False, indent=4)

print("Data extraction completed. Check institutions.json.")
