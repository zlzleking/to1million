import json
import requests as rqs
import datetime as dt
import time

url = "https://win.theminjoo.kr/apis/stats/counts/total"

while(True):
    d = dt.datetime.now()
    dtNow = "{0}년 {1}월 {2}일 {3}시 {4}분".format(
        d.year, d.month, d.day, d.hour, d.minute)

    data = rqs.get(url).text
    datajson = json.loads(data[9:-2])
    print(datajson)

    file = open("data.json", 'r', encoding='UTF8')
    fileJson = json.loads(file.read())
    file.close()
    fileJson['meta']['total'] = datajson['count']
    fileJson['meta']['lastmodified'] = "마지막 업데이트 - " + dtNow
    file = open("data.json", 'w', encoding='UTF8')
    file.write(json.dumps(fileJson, ensure_ascii=False))
    file.close()
    print("업데이트됨 - " + dtNow)
    time.sleep(600)
