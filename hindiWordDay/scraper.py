import requests
from bs4 import BeautifulSoup

URL = "https://www.shabdkosh.com/word-of-the-day/hindi-english"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

job_elements = soup.find_all("p", class_="pt-3")
print(job_elements[0].find_all("a")[1].text.strip())

# for job_element in job_elements:
#     inner_as = job_element.find_all("a")
#     all_a.append(inner_as[1].text.strip())

# print(all_a)