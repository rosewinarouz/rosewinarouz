import PyPDF2
import os

pdf_files = [f for f in os.listdir('.') if f.endswith('.pdf')]
for pdf in pdf_files:
    try:
        reader = PyPDF2.PdfReader(pdf)
        page = reader.pages[0].extract_text()
        print(f"\n{'='*50}\nFILE: {pdf}\n{'='*50}")
        print(page[:1500])
    except Exception as e:
        print(f"Error reading {pdf}: {e}")
