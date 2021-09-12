var graphs = [];
var graphnum = 0;
var get = 0;
var tot = 2062103;
var need = tot / 2;

var resultdata = {};
var entiredata = [
  {
    name: "이재명",
    member: 0,
    delegate: 0,
    citizen: 0,
    entire: 0,
  },
  {
    name: "김두관",
    member: 0,
    delegate: 0,
    citizen: 0,
    entire: 0,
  },
  {
    name: "정세균",
    member: 0,
    delegate: 0,
    citizen: 0,
    entire: 0,
  },
  {
    name: "이낙연",
    member: 0,
    delegate: 0,
    citizen: 0,
    entire: 0,
  },
  {
    name: "박용진",
    member: 0,
    delegate: 0,
    citizen: 0,
    entire: 0,
  },
  {
    name: "추미애",
    member: 0,
    delegate: 0,
    citizen: 0,
    entire: 0,
  },
];

function getdata() {
  fetch("./data.json")
    .then((response) => response.text())
    .then(function (data) {
      var jsondat = JSON.parse(data);
      var localdata = jsondat.local;
      var onlinedata = jsondat.online;
      localdata.forEach(function (element) {
        makelocalgraph(element);
      });
      onlinedata.forEach(function (element) {
        makeOnlineGraph(element);
      });
      makeentiregraph();
      graphs.forEach(function (element) {
        element.flush();
      });
    });
}

function makeentiregraph() {
  var entirecol = [];
  var delegatecol = [];
  var membercol = [];
  var citizencol = [];
  var membersum = 0;
  var delegatesum = 0;
  var citizensum = 0;

  entiredata.forEach(function (element) {
    membersum += element.member;
    delegatesum += element.delegate;
    citizensum += element.citizen;
  });

  entiredata.forEach(function (element) {
    var entire = element.member + element.delegate + element.citizen;
    var delegatepercent =
      Math.round(((element.delegate * 100) / delegatesum) * 100) / 100;
    var memberpercent =
      Math.round(((element.member * 100) / membersum) * 100) / 100;
    var citiaenpercent =
      Math.round(((element.citizen * 100) / citizensum) * 100) / 100;
    var entirepercent =
      Math.round(
        ((entire * 100) / (membersum + delegatesum + citizensum)) * 100
      ) / 100;
    entirecol.push([element.name, entirepercent]);
    delegatecol.push([element.name, delegatepercent]);
    citizencol.push([element.name, citiaenpercent]);
    membercol.push([element.name, memberpercent]);
  });
  get = entiredata[0].entire;
  var perc = Math.round((get / need) * 10000) / 100;
  var remainpeople = Math.ceil(need - get);
  var remaincol = [["달성률", perc]];

  drawDounutGraph(graphs, entirecol, "graph_entire");
  drawDounutGraph(graphs, delegatecol, "graph_delegate");
  drawDounutGraph(graphs, membercol, "graph_member");
  drawDounutGraph(graphs, citizencol, "graph_citizen");

  graphs.push(
    bb.generate({
      data: {
        columns: remaincol,
        type: "gauge",
        order: "null",
      },
      gauge: {
        label: {
          format: function (value) {
            return remainpeople + "명";
          },
        },
      },
      color: {},
      bindto: "#" + "remain",
    })
  );
}

function makeOnlineGraph(data) {
  var entirecol = [];
  var membersum = 0;

  data.result.forEach(function (element) {
    membersum += element.member;
  });

  data.result.forEach(function (element) {
    var entire = element.member;
    var memberpercent =
      Math.round(((element.member * 100) / membersum) * 100) / 100;
    entirecol.push([element.name, memberpercent]);

    var target = entiredata.find(function (ele) {
      if (ele.name == element.name) {
        return true;
      }
    });
    if (target != undefined) {
      target.entire += entire;
      target.citizen += entire;
    }
  });
  var par = document.getElementById("onlineresult");
  var item = document.createElement("DIV");
  item.className = "resultArea";

  var resultarea = document.createElement("DIV");
  resultarea.className = "graphArea";

  var entirearea = makeGraphArea(data.name, graphnum);
  graphnum++;

  resultarea.appendChild(entirearea);

  item.appendChild(resultarea);

  item.id = data.name;

  par.appendChild(item);

  drawDounutGraph(graphs, entirecol, entirearea.getAttribute("gnum"));
}

function makelocalgraph(data) {
  var entirecol = [];
  var delegatecol = [];
  var membercol = [];
  var citizencol = [];
  var membersum = 0;
  var delegatesum = 0;
  var citizensum = 0;

  data.result.forEach(function (element) {
    membersum += element.member;
    delegatesum += element.delegate;
    citizensum += element.citizen;
  });

  data.result.forEach(function (element) {
    var entire = element.member + element.delegate + element.citizen;
    var delegatepercent =
      Math.round(((element.delegate * 100) / delegatesum) * 100) / 100;
    var memberpercent =
      Math.round(((element.member * 100) / membersum) * 100) / 100;
    var citiaenpercent =
      Math.round(((element.citizen * 100) / citizensum) * 100) / 100;
    var entirepercent =
      Math.round(
        ((entire * 100) / (membersum + delegatesum + citizensum)) * 100
      ) / 100;
    entirecol.push([element.name, entirepercent]);
    delegatecol.push([element.name, delegatepercent]);
    citizencol.push([element.name, citiaenpercent]);
    membercol.push([element.name, memberpercent]);

    var target = entiredata.find(function (ele) {
      if (ele.name == element.name) {
        return true;
      }
    });

    target.member += element.member;
    target.entire += entire;
    target.delegate += element.delegate;
    target.citizen += element.citizen;
  });

  var par = document.getElementById("localresult");
  var item = document.createElement("DIV");
  item.className = "resultArea";
  var item_header = document.createElement("H2");
  item_header.textContent = data.name;

  var resultarea = document.createElement("DIV");
  resultarea.className = "graphArea";

  var entirearea = makeGraphArea("전체 결과", graphnum);
  graphnum++;
  var delegatearea = makeGraphArea("대의원", graphnum);
  graphnum++;
  var memberarea = makeGraphArea("권리당원", graphnum);
  graphnum++;
  var citizenarea = makeGraphArea("일반당원, 시민선거인단", graphnum);
  graphnum++;

  resultarea.appendChild(entirearea);
  resultarea.appendChild(delegatearea);
  resultarea.appendChild(memberarea);
  resultarea.appendChild(citizenarea);

  item.appendChild(item_header);
  item.appendChild(resultarea);

  item.id = data.name;

  par.appendChild(item);

  drawDounutGraph(graphs, entirecol, entirearea.getAttribute("gnum"));
  drawDounutGraph(graphs, delegatecol, delegatearea.getAttribute("gnum"));
  drawDounutGraph(graphs, membercol, memberarea.getAttribute("gnum"));
  drawDounutGraph(graphs, citizencol, citizenarea.getAttribute("gnum"));
}

function makeGraphArea(title, graphnum) {
  var graphArea = document.createElement("DIV");
  graphArea.className = "graphSection";
  var areaHeader = document.createElement("H3");
  areaHeader.textContent = title;
  var graph = document.createElement("DIV");
  graphArea.setAttribute("gnum", "graph" + graphnum);
  graph.id = "graph" + graphnum;
  graphArea.appendChild(areaHeader);
  graphArea.appendChild(graph);
  return graphArea;
}

function drawDounutGraph(graphList, col, target) {
  graphList.push(
    bb.generate({
      data: {
        columns: col,
        type: "donut",
        order: "null",
      },
      donut: {
        label: {
          format: function (value) {
            return value + "%";
          },
        },
      },
      color: {},
      bindto: "#" + target,
      tooltip: {
        show: true,
      },
    })
  );
}

window.addEventListener("load", function (event) {
  getdata();
});
