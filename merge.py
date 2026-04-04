import re

files_to_merge = ["about.html", "skills.html", "projects.html", "certification.html", "contact.html"]
sections = []

for file in files_to_merge:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        match = re.search(r'(<section\s+id=.*?</section>)', content, re.DOTALL)
        if match:
            sections.append(match.group(1))

merged_sections = "\n\n".join(sections)

with open("index.html", 'r', encoding='utf-8') as f:
    index_content = f.read()

# Using regex to replace robustly against newlines
index_content = re.sub(r'</section>\s*</main>', f'</section>\n\n{merged_sections}\n    </main>', index_content)

old_footer_regex = r'<footer>.*?</footer>'
new_footer = """<footer id="footer-section">
        <div class="footer-container">
            <div class="footer-info">
                <h3>Karan Prajapati</h3>
                <p>AI/ML Engineer & Generative AI Expert</p>
                <p><i class="fas fa-map-marker-alt" style="color: #34d399;"></i> Indore, India</p>
                <p><i class="fas fa-envelope" style="color: #7dd3fc;"></i> <a href="mailto:karanpraja6@gmail.com">karanpraja6@gmail.com</a></p>
            </div>
            <div class="footer-social">
                <a href="https://www.linkedin.com/in/karanxprajapatix1/" class="social-btn" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="https://github.com/KaranXNandkishore01" class="social-btn" title="GitHub"><i class="fab fa-github"></i></a>
                <a href="#" class="social-btn" title="Naukri"><i class="fas fa-briefcase"></i></a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; Built and Designed by <a href="https://sites.google.com/view/thevisarggalaxy/home">TheVisargGalaxy</a></p>
        </div>
    </footer>"""

index_content = re.sub(old_footer_regex, new_footer, index_content, flags=re.DOTALL)

with open("index.html", 'w', encoding='utf-8') as f:
    f.write(index_content)
    
print("Merged successfully!")
