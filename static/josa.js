/*!
Copyright (c) 2012-2018 Jaemin Jo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function () {
  var _f = [
      function (string) {
        //을/를 구분
        return _hasJong(string) ? "을" : "를";
      },
      function (string) {
        //은/는 구분
        return _hasJong(string) ? "은" : "는";
      },
      function (string) {
        //이/가 구분
        return _hasJong(string) ? "이" : "가";
      },
      function (string) {
        //와/과 구분
        return _hasJong(string) ? "과" : "와";
      },
      function (string) {
        //으로/로 구분
        return _hasJong(string) ? "으로" : "로";
      },
    ],
    _formats = {
      "을/를": _f[0],
      을: _f[0],
      를: _f[0],
      을를: _f[0],
      "은/는": _f[1],
      은: _f[1],
      는: _f[1],
      은는: _f[1],
      "이/가": _f[2],
      이: _f[2],
      가: _f[2],
      이가: _f[2],
      "와/과": _f[3],
      와: _f[3],
      과: _f[3],
      와과: _f[3],
      "으로/로": _f[4],
      으로: _f[4],
      로: _f[4],
      으로로: _f[4],
    };

  function _hasJong(string) {
    //string의 마지막 글자가 받침을 가지는지 확인
    string = string.charCodeAt(string.length - 1);
    return (string - 0xac00) % 28 > 0;
  }

  var josa = {
    c: function (word, format) {
      if (typeof _formats[format] === "undefined") throw "Invalid format!";
      return _formats[format](word);
    },
    r: function (word, format) {
      return word + josa.c(word, format);
    },
  };

  if (typeof define == "function" && define.amd) {
    define(function () {
      return josa;
    });
  } else if (typeof module !== "undefined") {
    module.exports = josa;
  } else {
    window.Josa = josa;
  }
})();
