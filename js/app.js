

function init() {
  d3.json("samples.json").then((data) => {
  var samples = data.samples;
  // console.log(samples.id);
  var metadata = data.metadata;
  var resultArray = metadata.filter(sampleObj => sampleObj.id);
  // console.log(resultArray);
  var result = resultArray[0];
  var id_sample = result.id;
  console.log(id_sample);
  d3.select("#sample-metadata").insert("p").text("id: " + id_sample);
  var id_ethnicity = result.ethnicity;
  d3.select("#sample-metadata").insert("p").text("ethnicity: " + id_ethnicity);
  var id_gender = result.gender;
  d3.select("#sample-metadata").insert("p").text("gender: " + id_gender);
  var id_age = result.age;
  d3.select("#sample-metadata").insert("p").text("age: " + id_age);
  var id_location = result.location;
  d3.select("#sample-metadata").insert("p").text("location: " + id_location);
  var id_type = result.bbtype;
  d3.select("#sample-metadata").insert("p").text("bbtype: " + id_type);
  var id_freq = result.wfreq;
  d3.select("#sample-metadata").insert("p").text("wfreq: " + id_freq);

  
  var firstSample = samples[0];
  // console.log(firstSample);
  var otuIDs = Object.values(firstSample.otu_ids);
  // console.log(otuIDs)
  otuIDs_string = otuIDs.toString();
  // console.log(otuIDs_string);
  var values = Object.values(firstSample.sample_values);
  var labels = Object.values(firstSample.otu_labels);
  var data_OTU = [];
  for (var i=0; i < 10; i++) {
    data_OTU.push(otuIDs[i]);
  }
  // console.log(data_OTU);
  var sample_values = [];
  for (var i=0; i < 10; i++) {
    sample_values.push(values[i]);
  }
  // console.log(sample_values);
  var str_OTU = data_OTU.toString();
  var sample_labels = [];
  for (var i=0; i < 10; i++) {
    sample_labels.push(labels[i]);
  }
  // console.log(str_OTU);
  
  var str_OTU = [];
  for (var i=0; i < 10; i++) {
    var str_add = "OTU" + " ";
    str_OTU.push(str_add + otuIDs[i]);
  }

  var result = [];
    for (var i=0; i < samples.length; i++) {
      var sample = Object.values(samples[i])
      var sample_id = sample[0];
      result.push(sample_id);
    }
    


var trace1 = {
  type: 'bar',
  // y: ['OTU 1167', 'OTU 2859', 'OTU 482', 'OTU 2264', 'OTU 41', 'OTU 1189', 'OTU 352', 'OTU 189', 'OTU 2318', 'OTU 1977'],
  x: sample_values,
  y: str_OTU,
  text: sample_labels,
  orientation: 'h',
  marker: {
      color: '#C8A2C8',
      line: {
          width: 2.5
      }
  }
};

var data = [ trace1 ];

var layout = {
  autosize: true,
  width: 500,
  height: 500,
  yaxis: {
    autorange: 'reversed',
    showticklabels: true,
    tickmode: 'array',
    automargin: true,
    titlefont: { size:30 },
  },
  paper_bgcolor: '#faf9f7',
  plot_bgcolor: '#c7c7c7'
};

//col-md-12
var config = {responsive: true};
Plotly.newPlot(d3.selectAll("#bar").node(), data, layout, config);

var trace2 = {
  x: otuIDs,
  y: values,
  text: labels,
  mode: 'markers',
  marker: {
    color: otuIDs,
    opacity: values/100,
    size: values
  }
};

var data2 = [trace2];

var layout = {
  showlegend: false,
  height: 600,
  width: 1000
};

Plotly.newPlot(d3.selectAll("#bubble").node(), data2, layout);


var select = document.getElementById("selDataset"); 
var options = result;

//from: https://stackoverflow.com/questions/9895082/javascript-populate-drop-down-list-with-array
select.innerHTML = "";
// Populate list with options:
for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
}
});

}


/// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("onchange", optionChanged);

// Function called by DOM changes
function optionChanged() {
  d3.select("#sample-metadata").html("");
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  d3.json("samples.json").then((data) => {
  var metadata = data.metadata;
  
  var samples = data.samples;
  // console.log(samples);

  
  var newSample = dataset;
  var result = [];
  for (var i=0; i < samples.length; i++) {
    var sample = Object.values(samples[i])
    var sample_id = sample[0];
    result.push(sample_id);
  }
  // console.log(result)

  var j = result.indexOf(newSample);
  console.log(j);
  var newSampleSet = samples[j];
  var resultArray = metadata.filter(sampleObj => sampleObj.id);
  // console.log(resultArray);
  var result = resultArray[j];
  var id_sample = result.id;
  console.log(id_sample);
  d3.select("#sample-metadata").insert("p").text("id: " + id_sample);
  var id_ethnicity = result.ethnicity;
  d3.select("#sample-metadata").insert("p").text("ethnicity: " + id_ethnicity);
  var id_gender = result.gender;
  d3.select("#sample-metadata").insert("p").text("gender: " + id_gender);
  var id_age = result.age;
  d3.select("#sample-metadata").insert("p").text("age: " + id_age);
  var id_location = result.location;
  d3.select("#sample-metadata").insert("p").text("location: " + id_location);
  var id_type = result.bbtype;
  d3.select("#sample-metadata").insert("p").text("bbtype: " + id_type);
  var id_freq = result.wfreq;
  d3.select("#sample-metadata").insert("p").text("wfreq: " + id_freq);

  // console.log(newSampleSet);
  var new_otuIDs = Object.values(newSampleSet.otu_ids);
  console.log(new_otuIDs);
  var new_str_OTU = [];
  for (var i=0; i < 10; i++) {
    var str_add = "OTU" + " ";
    new_str_OTU.push(str_add + new_otuIDs[i]);
  }
  // console.log(new_sample_values);
  var values = Object.values(newSampleSet.sample_values);
  var new_sample_values = [];
  for (var i=0; i < 10; i++) {
    new_sample_values.push(values[i]);
  }
  // console.log(new_sample_values);
  var labels = Object.values(newSampleSet.otu_labels);
  var new_sample_labels = [];
  for (var i=0; i < 10; i++) {
    new_sample_labels.push(labels[i]);
  }
 
  

   var trace1 = {
    type: 'bar',
    x: new_sample_values,
    y: new_str_OTU,
    text: new_sample_labels,
    orientation: 'h',
    marker: {
        color: '#C8A2C8',
        line: {
            width: 2.5
        }
    }
  };
  
  var data1 = [ trace1 ];

  var layout1 = {
    autosize: true,
    width: 500,
    height: 500,
    yaxis: {
      autorange: 'reversed',
      showticklabels: true,
      tickmode: 'array',
      automargin: true,
      titlefont: { size:30 },
    },
    paper_bgcolor: '#faf9f7',
    plot_bgcolor: '#c7c7c7'
  };
  var config = {responsive: true};
  
  var trace2 = {
    x: new_otuIDs,
    y: values,
    text: labels,
    mode: 'markers',
    marker: {
      color: new_otuIDs,
      opacity: values/100,
      size: values
    }
  };
  
  var data2 = [trace2];
  
  var layout2 = {
    showlegend: false,
    height: 600,
    width: 1000
  };
  
  
  
   Plotly.newPlot(d3.selectAll("#bar").node(), data1, layout1, config);
   Plotly.newPlot(d3.selectAll("#bubble").node(), data2, layout2);
    }
  
    
  )}


  
init();
// HINT 2

// Event Listener is different in this html, review id="selDataset" in index.html
// <select id="selDataset" onchange="optionChanged(this.value)"></select>





