import requests
from bs4 import BeautifulSoup

BASE_URL = "https://woodbine.com"
page = requests.get(BASE_URL)

soup = BeautifulSoup(page.content, "html.parser")
FILTERED_PAGE = ["/tag/", "/mohawk-news/", "/woodbine-news/", ".jpg", ".png", ".jpeg", ".pdf", "#", "/corporate/"]
LIMITED = 20
tags = soup.find_all("a")

main_page_text = soup.text

scrapped_url = []
sub_page_texts = []

def scrap_web(href):
    """Scrap web site recursively"""
    try:
        if href and (BASE_URL in href) and href not in scrapped_url:
            for filter in FILTERED_PAGE:
                if filter in href:
                    return None
            scrapped_url.append(href)
            print(href, len(scrapped_url))

            sub_page_content = None
            if BASE_URL in href:
                sub_page_content = requests.get(href)
            else:
                sub_page_content = requests.get(f"{BASE_URL}{href}")
            
            if sub_page_content:
                sub_soup = BeautifulSoup(sub_page_content.content, "html.parser")

                sub_a = sub_soup.find_all("a")

                with open("page.txt", "a+") as writer:
                    writer.write(sub_soup.text.replace("\n", "") + "\n\n\n###\n\n\n")
                

    except Exception as error:
        print(error)

for tag in tags:
    scrap_web(tag.get("href"))

with open("page.txt", 'a+') as writer:
    writer.write(main_page_text)



