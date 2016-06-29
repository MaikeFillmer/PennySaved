
var currentURL = window.location.origin;

$(document).ready(function() {
	// Initialize collapse button
$(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
$('.collapsible').collapsible();

	
$('#date').pickadate({
  	format: 'yy-mm-dd',
	formatSubmit: "yy-mm-dd"
});


// function clearForm(){
//     $("#restaurant").empty();
//     $('input[name="group1"]:checked').prop( "checked", false );
//     $("#cost").val('');
//     $("#date").val('');
// };


//what happens when the add button is selected

	$(".add").click(function() {
            $('#modal1').openModal();
        });
	$(".modal-close").click(function() {
            Materialize.toast('Thanks!', 3000)
        });

	$("#addinfo").click(function() {
            $('#modal1').closeModal();
            //regex to strip off potential illegal character esp. $
            var cleanCost = $("#cost").val().replace(/[\|&;\$%@"<>\(\)\+,]/g, "");
            
            // console.log(cleanCost);
            
            var newInfo = {

            	"mealtype": $('input[name="group1"]:checked').val(),
            	"date": $("#date").val(),
            	"restaurant": $("#restaurant").val(),
            	"cost": cleanCost
            }


            $.post(currentURL + "/enter", newInfo, function(data) {
                
                

                return false;
            });
            $('.inputForm').reset();

        }); //end of click
//what happens when timeframe is selected
	//dropdown time menu that is passed to the post
	$(document).on('click', '#dropdown2 li', function() {
           
             // var value = $(this).val();
             requestedTimeFrame = $(this).children().data('value');
             $(".btnText").text("Last " + requestedTimeFrame + " days")
             // console.log(requestedTimeFrame);
             //userDataRetrieve(requestedTimeFrame,userName)
        });


	//$('.brand-logo right').html(user.username + "'s Dash");




 AmCharts.makeChart("chartCard1",{
	"type": "pie",
	"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
	"innerRadius": "60%", 
	"labelsEnabled": false,
  	"autoMargins": false,
  	"marginTop": 1,
 	"marginBottom": 5,
	"marginLeft": 0,
  	"marginRight": 0,
  	"pullOutRadius": 0,
	"labelRadius": 5,
	"titleField": "category",
	"valueField": "column-1",
	"allLabels": [],
	"balloon": {},
	"legend": {
		"enabled": false
	},
	"titles": [],
	"dataProvider": [
		{
			"category": "category 1",
			"column-1": 8
		},
		{
			"category": "category 2",
			"column-1": 6
		},
		{
			"category": "category 3",
			"column-1": 2
		}
	]
})

AmCharts.makeChart("chartCard2",{
	"type": "serial",
	"categoryField": "category",
	"startDuration": 1,
	"categoryAxis": {
		"gridPosition": "start"
	},
	"trendLines": [],
	"graphs": [
		{
			"balloonText": "[[title]] of [[category]]:[[value]]",
			"fillAlphas": 1,
			"id": "AmGraph-1",
			"title": "graph 1",
			"type": "column",
			"valueField": "column-1"
		},
		{
			"balloonText": "[[title]] of [[category]]:[[value]]",
			"fillAlphas": 1,
			"id": "AmGraph-2",
			"title": "graph 2",
			"type": "column",
			"valueField": "column-2"
		}
	],
	"guides": [],
	"valueAxes": [
		{
			"id": "ValueAxis-1",
			"title": "Axis title"
		}
	],
	"allLabels": [],
	"balloon": {},
	"legend": {
		"enabled": false
	},
	"titles": [],
	"dataProvider": [
		{
			"category": "category 1",
			"column-1": 8
		},
		{
			"category": "category 2",
			"column-1": 6
		},
		{
			"category": "category 3",
			"column-1": 2
		}
	]
})
AmCharts.makeChart("chartCard3",{
	"type": "serial",
	"categoryField": "category",
	"startDuration": 1,
	"theme": "light",
	"categoryAxis": {
		"gridPosition": "start"
	},
	"trendLines": [],
	"graphs": [
		{
			"balloonText": "[[title]] of [[category]]:[[value]]",
			"fillAlphas": 0.7,
			"id": "AmGraph-1",
			"lineAlpha": 0,
			"title": "graph 1",
			"valueField": "column-1"
		},
		{
			"balloonText": "[[title]] of [[category]]:[[value]]",
			"fillAlphas": 0.7,
			"id": "AmGraph-2",
			"lineAlpha": 0,
			"title": "graph 2",
			"valueField": "column-2"
		}
	],
	"guides": [],
	"valueAxes": [
		{
			"id": "ValueAxis-1",
			"stackType": "regular",
			"title": "Axis title"
		}
	],
	"allLabels": [],
	"balloon": {},
	"legend": {
		"enabled": false
	},
	"titles": [],
	"dataProvider": [
		{
			"category": "category 1",
			"column-1": 8,
			"column-2": 5
		},
		{
			"category": "category 2",
			"column-1": 6,
			"column-2": 7
		},
		{
			"category": "category 3",
			"column-1": 2,
			"column-2": 3
		},
		{
			"category": "category 4",
			"column-1": 1,
			"column-2": 3
		},
		{
			"category": "category 5",
			"column-1": 2,
			"column-2": 1
		},
		{
			"category": "category 6",
			"column-1": 3,
			"column-2": 2
		},
		{
			"category": "category 7",
			"column-1": 6,
			"column-2": 8
		}
	]
})

AmCharts.makeChart("chartCard4",{
	"type": "serial",
	"categoryField": "category",
	"startDuration": 1,
	"theme": "light",
	"categoryAxis": {
		"gridPosition": "start"
	},
	"trendLines": [],
	"graphs": [
		{
			"balloonText": "[[title]] of [[category]]:[[value]]",
			"fillAlphas": 0.7,
			"id": "AmGraph-1",
			"lineAlpha": 0,
			"title": "graph 1",
			"valueField": "column-1"
		},
		{
			"balloonText": "[[title]] of [[category]]:[[value]]",
			"fillAlphas": 0.7,
			"id": "AmGraph-2",
			"lineAlpha": 0,
			"title": "graph 2",
			"valueField": "column-2"
		}
	],
	"guides": [],
	"valueAxes": [
		{
			"id": "ValueAxis-1",
			"stackType": "regular",
			"title": "Axis title"
		}
	],
	"allLabels": [],
	"balloon": {},
	"legend": {
		"enabled": false
	},
	"titles": [],
	"dataProvider": [
		{
			"category": "category 1",
			"column-1": 4,
			"column-2": 2
		},
		{
			"category": "category 2",
			"column-1": 6,
			"column-2": 4
		},
		{
			"category": "category 3",
			"column-1": 2,
			"column-2": 3
		},
		{
			"category": "category 4",
			"column-1": 5,
			"column-2": 3
		},
		{
			"category": "category 5",
			"column-1": 2,
			"column-2": 1
		},
		{
			"category": "category 6",
			"column-1": 3,
			"column-2": 3
		},
		{
			"category": "category 7",
			"column-1": 6,
			"column-2": 1
		}
	]
})




});