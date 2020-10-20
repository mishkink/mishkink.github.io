google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawData);

function drawData() {
    drawSheet('mil_exp_total', 'SELECT A,L', MilMeanResponseHandler);
    drawSheet('mil_exp_total', 'SELECT A,P,S', GDPScatterResponseHandler);
    drawSheet('mil_exp_asperc_gdp', 'SELECT A,B,I', military_vs_gdp);
    drawSheet('mil_exp_pc', 'SELECT L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,AE', MilPCResponseHandler);
    drawSheet('compareAll', 'SELECT A,B,D', health_vs_military);
    drawSheet('health_exp_asperc_gdp', 'SELECT A,K', health_vs_gdp);
    drawSheet('percentage_change_pc', 'SELECT A,B,C,D,E', HealthPcPercentualChangeResponseHandler);
    drawSheet('health_exp_pc', 'SELECT N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,AE,AF,AG', health_1);
    drawSheet('compareAll', 'SELECT J,L,M', Edu_vs_military);
    drawSheet('health_private-public_exp_pc', 'SELECT A,K,W', health_pub_private);
    drawSheet('life_expectancy', 'SELECT A,L,O,N', health_vs_life);
    drawSheet('compareAll', 'SELECT R,C,D', MeanExpEmergingResponseHandler);
    drawSheet('percentage_change_pc', 'SELECT H,I,J,K,L', Education_vs_gdp);
    drawSheet('edu_exp_pc', 'SELECT N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,AE,AF,AG', Education_per_person);
    drawSheet('gdp', 'SELECT AK,AL', GDPbyTypeResponseHandler);
    drawSheet('compareALL', 'SELECT F,G', Conclusion_pie);
    drawSheet('GDP','SELECT A,K,L',Edu_vs_GDP);
    drawSheet('compareAll','SELECT O,P,Q',health4)
    drawSheet('compareAll','SELECT O,P,R',edu3)
    drawSheet('compareAll','SELECT O,P,S',military2)
    drawSheet('edu_exp_pc', 'SELECT N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,AE,AF,AG',new1);
    drawSheet(drawMap);
} // drawData

function drawSheet(sheetName, query, responseHandler) {
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1_KE6QoLuCAdVAcXrmKK389DP1REJCQpjcAiUQAqDtK4/gviz/tq?sheet=' 
                + sheetName + '&headers=1&tq=' + queryString); //Query
    query.send(responseHandler);
} //drawSheet

//------------- Charts ---------------
function MilMeanResponseHandler(response) {
    var data = response.getDataTable();
    data.sort({column: 1, desc: true});
    var options = {
        colors: ['#cccccc','#222529'], 
        backgroundColor: '#f8f9fa',
        legend: {
            textStyle: {color: '#222529',bold: true, fontSize:12},
            numberFormat: '#.#'
        }
    };
    var chart = new google.visualization.GeoChart(document.getElementById("mil_mean_div"));
    chart.draw(data, options);
} // 1) Map: mean military expenditure of G20 countries (2010-2017)

function GDPScatterResponseHandler(response){
    var data = response.getDataTable();
    data.sort({column: 2, desc: false});
    var options = {
        chartArea:{width:'75%',height:'65%'},
        title: 'How many times does the U.S. spend more on the military sector with respect to other countries from the G20?',
        titleTextStyle: {color: '#222529', bold: true, fontSize: 12},
        backgroundColor: '#f8f9fa',
        vAxis: {
            
            viewWindowMode:'pretty',
            title: "x times more",
            direction:1
            }, //textPosition:'none'
        legend: {
            textStyle:{
                color: '#222529',
                bold:true,
                fontSize:11
            }
        },
    };
    var chart = new google.visualization.BubbleChart(document.getElementById('mean_ratio_mil_div'));
    chart.draw(data, options);
} //2) Scatter: mean ratio of military spending with respect to the US. (2010-2017)

function military_vs_gdp(response) {
    var data = response.getDataTable();
    data.sort({column: 1, desc: true});
    var options = {
        chartArea:{width:'75%',height:'65%'},
        title: 'Military spending of G20 as percentage of GDP in 2010 and 2017',
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        colors: ['#69c78a','#222529'], 
        backgroundColor: '#f8f9fa', 
        vAxis: {
            title: 'Percentage',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
            },
        },  
        hAxis: {
            title: 'Countries',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,
            },
        },
        legend: {
            textStyle:{
                color: '#222529',
                bold:true,
                fontSize:11
            }
        },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("military1_div"));
    chart.draw(data, options);
} // 3) Double Bars: Military expenditure as percentage of GDP 

function MilPCResponseHandler(response) {
    var data = response.getDataTable();
    var options = {
        chartArea:{width:'75%',height:'65%'},
        title: 'Military spending per person of G20 (2010-2017)',
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        colors: ['#2afa7a','#434a45','#2afa7a','#434a45','#d13d3d','#434a45','#434a45',
        '#2afa7a','#2afa7a','#434a45','#434a45','#2afa7a','#2afa7a','#2afa7a','#2afa7a',
        '#2afa7a','#434a45','#434a45','#2afa7a'], // #9c7605
        backgroundColor: '#f8f9fa', 
        vAxis: {
            title: 'Current USD',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
            },
            minorGridlines: {count:0},
            gridlines: {color:'#e8e8e8'}
        },
        hAxis: {
            format: '####',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,
            },
            minorGridlines: {count:0}
        },
        legend: {
            textStyle:{
                bold:true,
                fontSize:10.5
            }
        },
    };
    var chart = new google.visualization.LineChart(document.getElementById("mil_pc_div"));
    chart.draw(data, options);
} // 4) Lines: Per capita military expenditure 2012-2018 

function health_vs_military(response) {
    var data = response.getDataTable();
    data.sort({column: 1, desc: true});
    var options = {
        chartArea:{width:'75%',height:'65%'},
        title: 'Average health and military spending of G20 (2010-2017)',
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        colors: ['#A41709','#F0E319'],
        vAxis: {
            title: 'USD Billions (log scale)',
            //format: 'short',
            scaleType: 'log',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
            },
        },
        hAxis: {
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,
            },
        },
        legend: {
            textStyle:{
                bold:true,
                fontSize:11
            }
        },
    };
    var chart = new google.visualization.AreaChart(document.getElementById("health3_div"));
    chart.draw(data, options);
} // 5) Lines-log: average expenditure on health 2012-2016

// function health_vs_gdp (response) {
//     var data = response.getDataTable();
//     data.sort({column: 1, desc: true});

    
//     var options = {
//         chartArea:{width:'75%',height:'75%'},
//         title: 'Average health spending as percentage of GDP of G20 (2010-2017)',
//         titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
//         colors: ['#222529'],
//         dataOpacity: .95,
//         vAxis: {
//             textStyle: {
//                 fontSize: 12,
//                 color: '#28302b',
//                 bold: true,
//             },
//             maxValue: 18.0
//         },  
//         hAxis: {
//             textPosition: 'none',
//             title: 'Percentage',   
//         },
//         legend: 'none',
//     };
    
//     var view = new google.visualization.DataView(data);
//     view.setColumns([0, 1,{ 
//         calc: "stringify",
//         sourceColumn: 1,
//         type: "string",
//         role: "annotation" }]);

//     var chart = new google.visualization.BarChart(document.getElementById("health2_div"));
//     chart.draw(view, options);
// } // 6) Bars: Average health expenditure as percentage of GDP (2011-2016)




function health_vs_gdp (response) {
    var data = response.getDataTable();
    data.sort({column: 1, desc: true});

    
    var options = {
        chartArea:{width:'75%',height:'75%'},
        is3D: true,
        title: 'Average health spending as percentage of GDP of G20 (2010-2017)',
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        // colors: ['#222529'],
        dataOpacity: .95,
        vAxis: {
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,
            },
            maxValue: 18.0
        },  
        hAxis: {
            textPosition: 'none',
            title: 'Percentage',   
        },
        legend: 'none',
    };
    
    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,{ 
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation" }]);

    var chart = new google.visualization.PieChart(document.getElementById("health2_div"));
    chart.draw(view, options);
} // 6) Bars: Average health expenditure as percentage of GDP (2011-2016)







function HealthPcPercentualChangeResponseHandler (response) {
    var data = response.getDataTable();
    data.sort({column: 1, desc: true});
    var options = { 
        chartArea:{width:'75%',height:'65%'},
        title: "Percentage change on health expenditure as percentage of GDP of G20 (2017 with respect to 2010)",
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        bar: { groupWidth: '75%' },
        candlestick: {
            fallingColor: { strokeWidth: 0, fill: '#d13d3d' }, // red
            risingColor: { strokeWidth: 0, fill: '#69c78a' }   // green
        },
        vAxis: {
            title: 'Percentage change',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
            },
        },
        hAxis: {
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,
            },
        },
        legend:'none',
    };
    var chart = new google.visualization.CandlestickChart(document.getElementById('health_pc_perc_change_div'));
    chart.draw(data, options);
} // 8) Waterfall: Percentage change on Health Expenditure

function health_1 (response) {
    var data = response.getDataTable();
    var options = {
        chartArea:{width:'75%',height:'65%'},
        title: 'Health Expenditure per person of G-20 (from 2010 to 2017)',
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        
        vAxis: {
            title: 'Current USD',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
            },
            minorGridlines: {count:0},
            gridlines: {color:'#e8e8e8'}
        },
        hAxis: {
            format: '####',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,
            },
            minorGridlines: {count:0}
        },
        legend: {
            textStyle:{
                bold:true,
                fontSize:10.5
            }
        },
    };
    var chart = new google.visualization.LineChart(document.getElementById("health1_div"));
    chart.draw(data, options);
} // 7) Lines: Change on health expenditure 2010-2017 (absolute values)  

function health_pub_private (response) {
    var data = response.getDataTable();
    data.sort({column: 1, desc: true});

    var options = {
        title : 'Monthly Coffee Production by Country',
        vAxis: {title: 'Cups'},
        hAxis: {title: 'Month'},
        seriesType: 'bars',
        series: {5: {type: 'line'}}
      };
    // var options = {
    //     chartArea:{width:'75%',height:'65%'},
    //     title: 'Average private and public spending per person on health of G20 (2010-2017)' ,
    //     titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
    //     connectSteps: false,
    //     colors: ['#222529','#69c78a'],
    //     vAxis: {
    //         title: "Percentage",
    //         textStyle: {
    //             fontSize: 12,
    //             color: '#28302b',
    //         },
    //     },
    //     hAxis: {
    //         textStyle: {
    //             fontSize: 12,
    //             color: '#28302b',
    //             bold: true,
    //         },
    //     },
    //     legend: {
    //         textStyle:{
    //             bold:true,
    //             fontSize:11
    //         },
    //     },
    //     isStacked: true,
    // };
    var chart = new google.visualization.B(document.getElementById('health5_div'));
    chart.draw(data, options);
} // 9) Stepped Area: comparison between public and private health spending


function health_vs_life (response) {
    var data = response.getDataTable();
    var options = {
        chartArea:{width:'75%',height:'65%'},
        title: "Life expectancy in 2018 vs Average public health spending per person of G20 from 2010 to 2017",
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        colors: ['#222529'],
        colors: ['#222529','#69c78a','#bf9a2a','#d13d3d'],
        vAxis: {
            title: "Percentage",
            minValue: -10,
            textStyle: {
                fontSize: 12,
                color: '#28302b',
            },
            minValue: 0,
        },
        hAxis: {
            title: "Life expectancy",
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,
            },
        },
        bubble: {
            textStyle: {
            auraColor: 'none',
            fontSize: 12,
            bold: true,
            color: 'white',
            },
            opacity: .6,
        },
        legend: {
            textStyle:{
                bold:true,
                fontSize:11
            },
        },
        //explorer: { 
         //   axis: 'horizontal',
         //   keepInBounds: true,
         //   maxZoomIn: .5,
         //   maxZoomOut: .8,
        //},
    };
    var chart = new google.visualization.BubbleChart(document.getElementById('health5_div'));
    chart.draw(data, options);    
} // 10) Bubbles: life expectancy vs public health spending p/c (2017)


function MeanExpEmergingResponseHandler (response) {
    var data = response.getDataTable();
    data.sort({column: 1, desc: true});
    var options = {
        chartArea:{width:'75%',height:'65%'},
        title: "Average expenditure on education vs military of G20 (2010-2017)",
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        colors: ['#bf9a2a','#69c78a','#d13d3d','#222529'], //#fdc92b
        backgroundColor: '#f8f9fa',
        vAxis: {
            title: "Military Expenditure in USD Billions (log scale)",
            logScale: true,
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,              
            },
        },
        hAxis: {
            title: "Education Expenditure in USD Billions (log scale)",
            logScale: true,
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,
            },
        },
        legend: {
            textStyle:{
                bold:true,
                fontSize:11
            },
        },
        bubble: {
            textStyle: {
            auraColor: 'none',
            fontSize: 12,
            bold: true,
            color: 'white',
            },
            opacity: .6,
        },
        //bar: {groupWidth: '75%'},
        //isStacked: true
    };
    var chart = new google.visualization.ScatterChart(document.getElementById('edu_mil_compared_div'));
    chart.draw(data, options);
} // 11) Bubbles: Expenditure on Education vs military 

function Edu_vs_military (response) {
    var data = response.getDataTable();
    data.sort({column: 1, desc: true});
    var options = {
        colors: ['#7C7E0A','#7E150A'], //  ['#d9d9d9','#69c78a','#4a5c50']
        title : 'Average Expenditure on Eduaction vs Military Expenditure',
        vAxis: {title: 'Expenditure'},
        hAxis: {title: 'Countries'},
        seriesType: 'bars',
        
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('edu4_div'));
    chart.draw(data, options);
} // 12) Comparison between education and military per capita expenditure, average spending 2012-2016

function Education_vs_gdp (response) {
    //data.sort({column: 4, desc: true});
    var data = response.getDataTable();
    var options = {
        legend:'none',
        chartArea:{width:'75%',height:'65%'},
        title: "Education Expenditure percentage change as per GDP for G20 counries(2010-2016)",
        titleTextStyle: {color: '#180401', bold: true, fontSize: 16},
        backgroundColor: 'FDFDFA',
        vAxis: {    title: "Percentage change",
                    textStyle: {
                        fontSize: 12,
                        //color: '#fff',
                        bold: true,
                    },
                },
                hAxis: {
                    title: 'Countries',
                    //titleTextStyle: {color: 'white'},
                    textStyle: {fontSize: 12, color:  '#28302b', bold:true},
                },
        candlestick: {
            fallingColor: { strokeWidth: 0, fill: '#084F45' }, // red
            risingColor: { strokeWidth: 0, fill: '#C0D41C' }   // green
          }
        
      };

    var chart = new google.visualization.CandlestickChart(document.getElementById('edu2_div'));
    // var chart = new google.visualization.CandlestickChart(document.getElementById('edu2_div'));
    chart.draw(data, options);
} // 14) Waterfall: Percentage change on Education Expenditure

function Education_per_person (response) {
    var data = response.getDataTable();
    var options = {
        chartArea:{width:'75%',height:'65%'},
        title: 'Education expenditure per person of G-20 (from 2010 to 2016)',
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        colors: ['#2afa7a','#434a45','#2afa7a','#434a45','#2afa7a','#434a45','#434a45',
        '#2afa7a','#2afa7a','#434a45','#434a45','#2afa7a','#2afa7a','#2afa7a','#2afa7a',
        '#2afa7a','#434a45','#434a45','#2afa7a'],
        backgroundColor: '#f8f9fa',
        vAxis: {
            title: 'Current USD',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
            },
            minorGridlines: {count:0},
            gridlines: {color:'#e8e8e8'}
        },
        hAxis: {
            format: '####',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,
            },
            minorGridlines: {count:0}
        },
        legend: {
            textStyle:{
                bold:true,
                fontSize:10.5
            }
        },
    };
    var chart = new google.visualization.LineChart(document.getElementById("edu1_div"));
    chart.draw(data, options);
} // 13) Lines: Change on education expenditure 2010-2017 (absolute values)  

function GDPbyTypeResponseHandler (response) {
    var data = response.getDataTable();
    var options = {
        chartArea:{width:'75%',height:'65%'},
        title: 'GDP of emerging (green) and developed (black) economis of G20 (2018)',
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        colors: ['#4ac274','#8dc4a1','#8dc4a1','#8dc4a1','#8dc4a1','#8dc4a1','#8dc4a1','#8dc4a1',
        '#8dc4a1','#8dc4a1','#8dc4a1','#595d63','#595d63','#595d63','#595d63','#595d63','#595d63',
        '#595d63','#222529'],
        pieSliceText: 'label', 
        legend:'none'
    };
    var chart = new google.visualization.PieChart(document.getElementById('gdp2018_div'));
    chart.draw(data, options);
} // Pie: GDP by country on 2018

function Conclusion_pie (response) {
    var data = response.getDataTable();

   
    var options = {
        
        pieHole: 0.5,
        chartArea:{width:'75%',height:'65%'},
        title: 'Overall expenditure in Healthcare, Education and Military',
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        colors: ["E12371","239FE1","9323E1"],
        
        pieSliceText: 'label', 
        legend:'none'
    };
    var chart = new google.visualization.PieChart(document.getElementById('concl_div'));
        chart.draw(data, options);
} // Pie: GDP by country on 2018



function Edu_vs_GDP(response) {
    var data = response.getDataTable();
    data.sort({column: 1, desc: true});
    var options = {
        chartArea:{width:'75%',height:'65%'},
        title: 'Comparison of Total country expenditure vs Education expenditure(2010-2018)',
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        colors: ['#69c78a','#222529'],
        vAxis: {
            title: 'USD Billions (log scale)',
            //format: 'short',
            scaleType: 'log',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
            },
        },
        hAxis: {
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,
            },
        },
        legend: {
            textStyle:{
                bold:true,
                fontSize:11
            }
        },
    };
    var chart = new google.visualization.AreaChart(document.getElementById("edu5_div"));
    chart.draw(data, options);}





// function new1() {
//         // Some raw data (not necessarily accurate)
//         var data = response.getDataTable();
        

//     var options = {
        
//         title : 'Education Expenditure per person in G20 countries',
//         vAxis: {title: 'Education Expenditure'},
//         hAxis: {title: 'Year'},
//         seriesType: 'bars',
//         series: {5: {type: 'line'}}
//         };

//     var chart = new google.visualization.ComboChart(document.getElementById('edu11_div'));}
//     chart.draw(data, options);}    

//     $( "#menu" ).click(function() {
//         $( "#map" ).toggle( "slow" );
//         if ($( "#leftpanel" ).css("display") == "none") {
//             $(function() {
//                 $( "#leftpanel").css("display", "block");
//                 var accordHt = $( "#leftpanel" ).css( "height" );
//                     $( "#accordion").css("height", accordHt);
//                 $( "#accordion" ).accordion({
//                     heightStyle: "fill",
//                       collapsible: true
//                 });
//            });
//         };
//     }); 
  
function new1 (response) {
    var data = response.getDataTable();
    var options = {
        chartArea:{width:'75%',height:'65%'},
        title: 'Education expenditure per capita of G-20 (from 2010 to 2016)',
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        backgroundColor: '#f8f9fa',
        bar: { groupWidth: "90%"},
        vAxis: {
            title: 'Current USD',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
            },
            minorGridlines: {count:0},
            gridlines: {color:'#e8e8e8'}
        },
        hAxis: {
            format: '####',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,
            },
            minorGridlines: {count:0}
        },
        legend: {
            textStyle:{
                bold:true,
                fontSize:10.5
            }
        },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("edu11_div"));
    chart.draw(data, options);
}

function health4 (response) {
    var data = response.getDataTable();
    var options = {
        chartArea:{width:'75%',height:'65%'},
        title: 'Compare the per person healthcare spending to the per person GDP',
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        backgroundColor: '#f8f9fa',
        bar: { groupWidth: "90%"},
        vAxis: {
            title: 'Current USD',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
            },
            minorGridlines: {count:0},
            gridlines: {color:'#e8e8e8'}
        },
        hAxis: {
            format: '####',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,
            },
            minorGridlines: {count:0}
        },
        legend: {
            textStyle:{
                bold:true,
                fontSize:10.5
            }
        },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("health4_div"));
    chart.draw(data, options);
}

function edu3 (response) {
    var data = response.getDataTable();
    var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

    var options = {
        chartArea:{width:'75%',height:'65%'},
        title: 'Comparison of the per person educational spending to the per person GDP',
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        backgroundColor: '#f8f9fa',
        
        bar: { groupWidth: "90%"},
        vAxis: {
            title: 'Countries',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
            },
            minorGridlines: {count:0},
            gridlines: {color:'#e8e8e8'}
        },
        hAxis: {
            title:"Spending in USD",
            format: '####',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,
            },
            minorGridlines: {count:0}
        },
        legend: {
            textStyle:{
                bold:true,
                fontSize:10.5
            }
        },
    };
    var chart = new google.visualization.BarChart(document.getElementById("edu3_div"));
    chart.draw(data, options);
}


function military2 (response) {
    var data = response.getDataTable();
    var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

    var options = {
        colors: ["E18523", "A915C1"],
        chartArea:{width:'75%',height:'65%'},
        title: 'Comparison of the per person Military spending to the per person GDP',
        titleTextStyle: {color: '#222529', bold: true, fontSize: 18},
        backgroundColor: '#f8f9fa',
        
        bar: { groupWidth: "90%"},
        vAxis: {
            title: 'Countries',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
            },
            minorGridlines: {count:0},
            gridlines: {color:'#e8e8e8'}
        },
        hAxis: {
            title:"Spending in USD",
            format: '####',
            textStyle: {
                fontSize: 12,
                color: '#28302b',
                bold: true,
            },
            minorGridlines: {count:0}
        },
        legend: {
            textStyle:{
                bold:true,
                fontSize:10.5
            }
        },
    };
    var chart = new google.visualization.BarChart(document.getElementById("military2_div"));
    chart.draw(data, options);
}





function drawMap() {
    var data = google.visualization.arrayToDataTable([
      ['Country', 'Population'],
      ['China', 'China: 1,363,800,000'],
      ['India', 'India: 1,242,620,000'],
      ['US', 'US: 317,842,000'],
      ['Indonesia', 'Indonesia: 247,424,598'],
      ['Brazil', 'Brazil: 201,032,714'],
      ['Pakistan', 'Pakistan: 186,134,000'],
      ['Nigeria', 'Nigeria: 173,615,000'],
      ['Bangladesh', 'Bangladesh: 152,518,015'],
      ['Russia', 'Russia: 146,019,512'],
      ['Japan', 'Japan: 127,120,000']
    ]);

  var options = {
    
    showTooltip: true,
    showInfoWindow: true
  };

  var map = new google.visualization.Map(document.getElementById('chart_div'));

  map.draw(data, options);
};