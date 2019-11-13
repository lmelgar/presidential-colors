let divMultiples = document.getElementById("graphic-presidents"),
divMosaic = document.getElementById("bar-presidents"),
divBar = document.getElementById("perc-colors"),
buttons = document.getElementsByClassName("buttons"),
firstPoint = buttons[0].firstElementChild.childNodes[1],
secondPoint = buttons[0].lastElementChild.childNodes[1],
t = 1,
v = 0;

function barchartColors() {
  d3.csv("data/colors-perc.csv").then(function(data) {

    data.sort(function(a, b){
      return b.perc_colors-a.perc_colors
    });

    data = data.filter(function(e) {
      return e.family != "undefined"
    })

    for(i in data) {

      let barColor = data[i].family,
      perc = +data[i].perc_colors,
      perc_bar = (perc / data[0].perc_colors) * 100;

      divBar.innerHTML += `<div class="bar" id="${barColor}">
      <div class="color-name">${barColor} tones</div>
      <div class="this-bar">
      <div class="actual-bar" style="background-color:${barColor}; width:${perc_bar}%;"></div>
      <div class="the-number"><p>${perc}%</p></div>
      </div>
      </div>`
    }
  }); //d3.csv ends
}

function smallPres() {

  d3.csv("data/presidents-colors.csv").then(function(data) {

    let presidents = d3.nest()
    .key(d => d.id)
    .entries(data);

    for(i in presidents) {

      divMultiples.innerHTML += `<div class="container-president">
      <div class="side-bar">
      <p class="name"><span class="strong-name"></span></p>
      <p class="presidency"></p>
      </div>
      <div class="president"></div>
      </div>`

      let divPresidents = document.getElementsByClassName("president")[i],
      loop = presidents[i].values;

      for(e=0; e < loop.length; e++) {
        divPresidents.innerHTML += `<div class="blocks"></div>`
      }
    }
  }); //d3.csv ends
}

smallPres();


function paint(key_order, var_order) {

  d3.csv("data/presidents-colors.csv").then(function(data) {

    for (var i = 0; i < data.length; i++) {
      data[i].Presidency = +data[i].Presidency;
    }

    if(key_order == "Presidency") {
      if(var_order < 1) {
        data.sort(function(a, b){return a[key_order]-b[key_order]});
        firstPoint.style.transform = "rotate(1turn)";
      } else {
        data.sort(function(a, b){return b[key_order]-a[key_order]});
        firstPoint.style.transform = "rotate(0.5turn)";
        t = 0;
      }
    } else {
      if(var_order < 1) {
        data.sort();
        secondPoint.style.transform = "rotate(1turn)";
      } else {
        data.reverse();
        secondPoint.style.transform = "rotate(0.5turn)";
        v = 0;
      }
    }

    let presidents = d3.nest()
    .key(d => d.id)
    .entries(data);

    for(i in presidents) {

      let containers = document.getElementsByClassName("container-president")[i], names = document.getElementsByClassName("name")[i],
      presidency = document.getElementsByClassName("presidency")[i];

      containers.id = presidents[i].values[0].id;
      names.innerHTML = `<span class="strong-name">${presidents[i].values[0].name}</span> ${presidents[i].values[0].lastName}`;
      presidency.innerText = presidents[i].values[0].time;

      let loop = presidents[i].values,
      divPresidents = document.getElementsByClassName("president")[i];

      for(e=0; e < loop.length; e++) {

        let blocks = divPresidents.getElementsByClassName("blocks")[e],
        colorPresident = loop[e].vector;

        blocks.style.backgroundColor = colorPresident;
        blocks.style.borderColor = colorPresident;

      }
    }
  }); //d3.csv ends
}

paint("Presidency", t);

document.getElementById("order-presidency").addEventListener("click", function() {

  secondPoint.style.transform = "rotate(0.25turn)";
  paint("Presidency", t);

  t = t + 1;

});

document.getElementById("order-last-name").addEventListener("click", function() {

  firstPoint.style.transform = "rotate(0.25turn)";
  paint("lastName", v);

  v = v + 1;
});

function colorBars() {
  d3.csv("data/total-colors.csv").then(function(data) {

    data = data.filter(function(e) {
      return e.color != "undefined"
    })

    data.sort(function(a, b){return a.h-b.h});

    for(i in data) {
      let color = data[i].vector;
      divMosaic.innerHTML +=`<div class="bar-color" style="background:${color};"</div>`
    }
  });
}

colorBars();
