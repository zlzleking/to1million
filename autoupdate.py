import json
import requests as rqs
import datetime as dt
from flask import Flask, request


def init():
    d = dt.datetime.now()
    dtNow = "{0}년 {1}월 {2}일 {3}시 {4}분".format(
        d.year, d.month, d.day, d.hour, d.minute)

    data = rqs.get(url).text
    datajson = json.loads(data[9:-2])
    print(datajson)

    file = open("initdata.json", 'r', encoding='UTF8')
    fileJson = json.loads(file.read())
    file.close()
    fileJson['meta']['total'] = datajson['count']
    fileJson['meta']['lastmodified'] = "마지막 업데이트 - " + dtNow
    print("초기화 완료 - " + dtNow)
    print(d)
    return fileJson, d


def update(dat):
    d = dt.datetime.now()
    dtNow = "{0}년 {1}월 {2}일 {3}시 {4}분".format(
        d.year, d.month, d.day, d.hour, d.minute)

    data = rqs.get(url).text
    datajson = json.loads(data[9:-2])
    print(datajson)
    dat['meta']['total'] = datajson['count']
    dat['meta']['lastmodified'] = "마지막 업데이트 - " + dtNow
    print("데이터 업데이트 완료 - " + dtNow)
    print(d)
    return dat, d


url = "https://win.theminjoo.kr/apis/stats/counts/total"
dat, lastmod = init()

app = Flask(__name__)

@app.route('/')
@app.route('/data.json')
def servedata():
    global lastmod, dat
    d = dt.datetime.now()
    if ((d - lastmod).seconds / 60 > 10):
        dat, lastmod = update(dat)
    return dat


if __name__ == '__main__':
    app.run(debug=True, port=8033, host='0.0.0.0')
