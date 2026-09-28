# Joins the footer-less cover and the body into the final PDF.
from pypdf import PdfReader, PdfWriter

w = PdfWriter()
for f in ['_cover.pdf', '_body.pdf']:
    for page in PdfReader(f).pages:
        w.add_page(page)
w.add_metadata({
    '/Title': 'ALQAIRA Wholesale — Growth Plan',
    '/Author': 'ALQAIRA',
    '/Subject': 'Step-by-step plan to start and grow a thobe, jubba and kurta wholesale business',
})
w.write('ALQAIRA-Wholesale-Growth-Plan.pdf')
print('pages', len(w.pages))
