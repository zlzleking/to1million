var graphs;
var elecData;

// 페이지 초기화
function initpage() {
  graphs = {
    entire: [],
    local: [],
    online: [],
    doomcounter: [],
  };
  elecData = {
    total: 0,
    notElec: 0,
    persnonEntire: [
      {
        name: "이재명",
        member: 1,
        delegate: 1,
        citizen: 1,
        entire: 1,
        is_retire: false,
      },
      {
        name: "김두관",
        member: 1,
        delegate: 1,
        citizen: 1,
        entire: 1,
        is_retire: false,
      },
      {
        name: "정세균",
        member: 1,
        delegate: 1,
        citizen: 1,
        entire: 1,
        is_retire: false,
      },
      {
        name: "이낙연",
        member: 1,
        delegate: 1,
        citizen: 1,
        entire: 1,
        is_retire: false,
      },
      {
        name: "박용진",
        member: 1,
        delegate: 1,
        citizen: 1,
        entire: 1,
        is_retire: false,
      },
      {
        name: "추미애",
        member: 1,
        delegate: 1,
        citizen: 1,
        entire: 1,
        is_retire: false,
      },
    ],
  };
  var entireResultArea = document.getElementById("entireResult");
  entireResultArea.innerHTML = "";
  drawEntireGraph(elecData.persnonEntire, false);
  drawEntireGraph(elecData.persnonEntire, true);
}

// 전체 결과 그래프 생성
function drawEntireGraph(data, includeRetire) {
  var graphElement = {
    entire: [],
    delegate: [],
    member: [],
    citizen: [],
  };

  // 각 후보마다 연산 수행
  data.forEach((element) => {
    if (element.is_retire == true && includeRetire == false) {
    } else {
      graphElement.entire.push([element.name, element.entire]);
      graphElement.delegate.push([element.name, element.delegate]);
      graphElement.member.push([element.name, element.member]);
      graphElement.citizen.push([element.name, element.citizen]);
    }
  });

  var entireResultArea = document.getElementById("entireResult");
  // 사퇴여부 포함 여부 결정해서 헤더 이름 결정
  var sectionName = !includeRetire ? "전체 결과" : "사퇴자 포함 결과";
  var sectionHeader = document.createElement("H2");
  sectionHeader.textContent = sectionName;
  entireResultArea.appendChild(sectionHeader);

  // 그래프 표시 영역 만들기
  var drawArea = document.createElement("DIV");
  drawArea.className = "graphArea";
  entireResultArea.appendChild(drawArea);

  // 그래프 영역 생성 그리고 초기 렌더링
  var entirearea = makeGraphArea("전체 결과", graphs.entire, "entire");
  drawArea.appendChild(entirearea.data);

  var delegatearea = makeGraphArea("대의원", graphs.entire, "entire");
  drawArea.appendChild(delegatearea.data);

  var memberarea = makeGraphArea("권리당원", graphs.entire, "entire");
  drawArea.appendChild(memberarea.data);

  var citizenarea = makeGraphArea(
    "일반당원, 시민선거인단",
    graphs.entire,
    "entire"
  );
  drawArea.appendChild(citizenarea.data);

  drawDounutGraph(graphs.entire, graphElement.entire, entirearea.id);
  drawDounutGraph(graphs.entire, graphElement.delegate, delegatearea.id);
  drawDounutGraph(graphs.entire, graphElement.citizen, memberarea.id);
  drawDounutGraph(graphs.entire, graphElement.member, citizenarea.id);
}

// 온라인 투표 결과 생성
// 각 온라인 투표 결과를 받을 것
function makeOnlineGraph(data) {
  var graphElement = [];

  // 그래프 생성 지점 확정
  var onlineResultArea = document.getElementById("onlineresult");
  onlineResultArea.innerHTML = "";
  // 각 투표마다 실행
  data.forEach((element) => {
    // 그래프 데이터 생성, 각 후보마다 시행
    element.result.forEach((ele) => {
      graphElement.push([ele.name, ele.member]);
    });

    // 헤더 생성
    var sectionName = element.name;
    var sectionHeader = document.createElement("H2");
    sectionHeader.textContent = sectionName;
    onlineResultArea.appendChild(sectionHeader);

    // 그래프 표시 영역 만들기
    var drawArea = document.createElement("DIV");
    drawArea.className = "graphArea";
    onlineResultArea.appendChild(drawArea);

    // 그래프 영역 생성 그리고 초기 렌더링
    var entirearea = makeGraphArea(
      data.name,
      graphs.online,
      "online_" + graphs.online.length
    );
    drawArea.appendChild(entirearea.data);
    drawDounutGraph(graphs.online, graphElement, entirearea.id);
  });
}

// 각 지역 투표결과 그래프 생성
// 각 지역 투표 결과를 받을 것
function makelocalgraph(data) {
  // 그래프 생성 지점 확정
  var localResultArea = document.getElementById("localresult");
  localResultArea.innerHTML = "";
  // 각 지역마다 실행
  data.forEach((element) => {
    var graphElement = {
      entire: [],
      delegate: [],
      member: [],
      citizen: [],
    };
    var graphStorage = [];
    // 그래프 데이터 생성, 각 후보마다 시행
    element.result.forEach((ele) => {
      graphElement.entire.push([
        ele.name,
        ele.delegate + ele.member + ele.citizen,
      ]);
      graphElement.delegate.push([ele.name, ele.delegate]);
      graphElement.member.push([ele.name, ele.member]);
      graphElement.citizen.push([ele.name, ele.citizen]);
    });

    // 헤더 생성
    var sectionName = element.name;
    var sectionHeader = document.createElement("H2");
    sectionHeader.textContent = sectionName;
    localResultArea.appendChild(sectionHeader);

    // 그래프 표시 영역 만들기
    var drawArea = document.createElement("DIV");
    drawArea.className = "graphArea";
    localResultArea.appendChild(drawArea);

    // 그래프 영역 생성 그리고 초기 렌더링
    var entirearea = makeGraphArea(
      "전체 결과",
      graphStorage,
      "local_" + graphs.local.length
    );
    drawArea.appendChild(entirearea.data);

    var delegatearea = makeGraphArea(
      "대의원",
      graphStorage,
      "local_" + graphs.local.length
    );
    drawArea.appendChild(delegatearea.data);

    var memberarea = makeGraphArea(
      "권리당원",
      graphStorage,
      "local_" + graphs.local.length
    );
    drawArea.appendChild(memberarea.data);

    var citizenarea = makeGraphArea(
      "일반당원, 시민선거인단",
      graphStorage,
      "local_" + graphs.local.length
    );
    drawArea.appendChild(citizenarea.data);
    drawDounutGraph(graphStorage, graphElement.entire, entirearea.id);
    drawDounutGraph(graphStorage, graphElement.delegate, delegatearea.id);
    drawDounutGraph(graphStorage, graphElement.member, memberarea.id);
    drawDounutGraph(graphStorage, graphElement.citizen, citizenarea.id);

    graphs.local.push(graphStorage);
  });
}

function getDoom(element) {
  const max = element.reduce((prev, current) =>
    prev.entire > current.entire ? prev : current
  );
  return max;
}

function makeDoomCounter(data) {
  var needs = (data.total - data.notElec) / 2;
  var doomArea = document.getElementById("remain");
  var doomPerson = getDoom(data.persnonEntire);
  var graphElement = [
    ["달성률", Math.round((doomPerson.entire / needs) * 100000) / 1000],
  ];
  // 헤더 이름 결정
  var sectionName = doomPerson.name;
  var sectionHeader = document.createElement("H2");
  sectionHeader.textContent =
    sectionName + Josa.c(sectionName, "이/가") + " 당선되기까지 남은 표";
  doomArea.appendChild(sectionHeader);

  // 그래프 영역 생성 그리고 초기 렌더링
  var doomGraphArea = makeGraphArea(
    "전체 결과",
    graphs.doomcounter,
    "doomGraph"
  );

  doomArea.appendChild(doomGraphArea.data);
  graphs.doomcounter.push(
    bb.generate({
      data: {
        columns: graphElement,
        type: "gauge",
        order: "null",
      },
      gauge: {
        label: {
          format: function (value) {
            return Math.ceil(needs - doomPerson.entire) + "명";
          },
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        show: true,
        format: {
          value: function (name, ratio, id, index) {
            return name + "%";
          },
        },
      },
      color: {},
      bindto: "#" + doomGraphArea.id,
    })
  );
}

function makeGraphArea(title, storage, id) {
  var graphArea = document.createElement("DIV");
  graphArea.className = "graphSection";
  var areaHeader = document.createElement("H3");
  areaHeader.textContent = title;
  var graph = document.createElement("DIV");
  graphArea.setAttribute("gnum", "graph" + storage.length);
  graph.id = "graph_" + id + "_" + storage.length;
  graphArea.appendChild(areaHeader);
  graphArea.appendChild(graph);

  returnData = {
    id: "graph_" + id + "_" + storage.length,
    data: graphArea,
  };
  storage.push({});
  return returnData;
}

function drawDounutGraph(graphList, col, target) {
  var returnData = {
    id: target,
    data: "",
  };
  var tgt = document.getElementById(target);
  var graphData = bb.generate({
    data: {
      columns: col,
      type: "donut",
      order: "null",
    },
    donut: {
      label: {
        format: function (value, id, i, j) {
          return Math.round(id * 10000) / 100 + "%";
        },
      },
    },
    color: {},
    bindto: tgt,
    tooltip: {
      show: true,
      format: {
        value: function (name, ratio, id, index) {
          return name + "표";
        },
      },
    },
  });
  returnData.data = graphData;
  graphList.pop();
  graphList.push(returnData);
}

// 데이터 업데이트
function updateData() {
  fetch("./data.json")
    .then((response) => response.text())
    .then(function (data) {
      var jsondat = JSON.parse(data);
      processData(jsondat);
      updateGraphs(jsondat);
      window.setTimeout(updateData, 60000);
    });
}

// 내장 데이터베이스 업데이트
function processData(data) {
  elecData.total = parseInt(data.meta.total);
  elecData.notElec = 0;
  var lastmodh = document.getElementById("updatedate");
  lastmodh.textContent = data.meta.lastmodified;

  // 사퇴여부 업데이트 및 데이터 초기화
  data.person.forEach((element) => {
    var target = elecData.persnonEntire.find(function (ele) {
      if (ele.name == element.name) {
        return true;
      }
    });
    target.is_retire = element.is_retire;
    target.member = 0;
    target.delegate = 0;
    target.citizen = 0;
    target.entire = 0;
  });

  // 온라인 투표 결과 업데이트
  data.online.forEach((element) => {
    // 미투표자 업데이트
    elecData.notElec += element.notElec;
    // 각 후보자별 데이터 업데이트
    element.result.forEach((el) => {
      var target = elecData.persnonEntire.find(function (ele) {
        if (ele.name == el.name) {
          return true;
        }
      });
      target.citizen += el.member;
      target.entire += el.member;
    });
  });

  // 지역 투표 결과 업데이트
  // 온라인 투표 결과 업데이트
  data.local.forEach((element) => {
    // 미투표자 업데이트
    elecData.notElec += element.notElec;
    // 각 후보자별 데이터 업데이트
    element.result.forEach((el) => {
      var target = elecData.persnonEntire.find(function (ele) {
        if (ele.name == el.name) {
          return true;
        }
      });
      target.member += el.member;
      target.delegate += el.delegate;
      target.citizen += el.citizen;
      target.entire += el.member + el.delegate + el.citizen;
    });
  });
}

// 그래프 재생성
function updateGraphs(data) {
  // 전체 그래프는 재생성해야함
  var entireResultArea = document.getElementById("entireResult");
  entireResultArea.innerHTML = "";
  drawEntireGraph(elecData.persnonEntire, false);
  drawEntireGraph(elecData.persnonEntire, true);

  // 온라인 투표 차트 재생성
  makeOnlineGraph(data.online);
  // 지역 투표 차트 재생성
  makelocalgraph(data.local);
  // 둠카운터 재생성
  makeDoomCounter(elecData);
}

window.addEventListener("load", function (event) {
  initpage();
  updateData();
});
