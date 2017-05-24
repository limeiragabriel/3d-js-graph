// base de dados principal =================================================================
		var dataset = [[1,"sol1061.py",100,1,1,3,6],
						[3,"sol1063.py",0,1,1,4,8],
						[2,"sol1062.py",100,1,1,4,8]
						[4,"sol1064.py",0,1,1,4,8],
						[5,"sol1065.py",100,1,1,4,8],
						[6,"sol1066.py",100,1,1,3,6],
						[7,"sol1067.py",71,0,1,3,6],
						[8,"sol1068.py",100,1,1,3,6],
						[9,"sol1069.py",100,1,1,3,6],
						[10,"sol10610.py",0,0,1,3,6],
						[11,"sol10611.py",0,1,1,3,6],
						[12,"sol10612.py",0,1,1,3,6],
						[13,"sol10613.py",100,1,1,3,6],
						[14,"sol10614.py",0,0,1,3,11],
						[15,"sol10615.py",0,0,1,3,11],
						[16,"sol10616.py",0,1,1,3,6],
						[17,"sol10617.py",0,1,1,3,6],
						[18,"sol10618.py",100,1,1,3,6],
						[19,"sol10619.py",100,1,1,3,6],
						[20,"sol10620.py",0,0,1,3,6]
						];
		//============================================================================================
		// dados filtrados ===========================================================================
		var filterdata = [];
		//============================================================================================

		//valor correspondente as posicoes na base de dados (valor = posicao)=========================
		var id = 0;
		var nomeArq = 1;
		var corretudeFunc = 2;
		var corretudeSint = 3;
		var complexidade = 4;
		var operadores = 5;
		var operandos = 6;
		//============================================================================================

		//eixos   =  define quais valores(posicao da base principal) serao exibidas no grafico =======
		var x = parseInt(document.getElementById("x_value").value);
		var y = parseInt(document.getElementById("y_value").value);
		var z = parseInt(document.getElementById("x_value").value);
		//============================================================================================
		//======================get valores ==========================================================
		//function getCoord(coord,html_id) {
		//	var coord_value = document.getElementById(html_id).value;

		//	console.log(coord_value);
		//}
		//getCoord(x,"x_value");


		function getCoords() {
			var coord_x = document.getElementById("x_value").value;
			var coord_y = document.getElementById("y_value").value;
			var coord_z = document.getElementById("z_value").value;

			x = parseInt(coord_x);
			y = parseInt(coord_y);
			z = parseInt(coord_z);

			console.log(x,y,z);

			filterdata = []
			for(key in dataset){
				add(dataset[key]);
			}
			options.series[0].data = filterdata;

			var chart = new Highcharts.Chart(options);
			rotation();

		}


		// configuracoes do grafico ==================================================================
		var options = {

		    chart: {

		        renderTo: 'plot',
		        margin: 100,
		        type: 'scatter',
		        options3d: {
		            enabled: true,
		            alpha: 10,
		            beta: 30,
		            depth: 250,
		            viewDistance: 5,
		            fitToPlot: false,
		            frame: {
		                bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
		                back: { size: 1, color: 'rgba(0,0,0,0.04)' },
		                side: { size: 1, color: 'rgba(0,0,0,0.06)' }
		            }
		        }
		    },
		    title: {
		        text: 'Grafico 3d'
		    },
		    subtitle: {
		        text: 'Alguma coisa adsfadsfadf'
		    },
		    plotOptions: {
		        scatter: {
		            width: 10,
		            height: 10,
		            depth: 10
		        }
		    },
		    yAxis: {
		        min: 0,
		        title: null
		    },
		    xAxis: {
		        min: 0,
		        gridLineWidth: 1
		    },
		    zAxis: {
		        min: 0,
		        showFirstLabel: false
		    },
		    legend: {
		        enabled: false
		    },

		    
		    series: [{
		    	name: 'Codigos de alguma coisa',
		        colorByPoint: true,

		    	data: []

		    }]

		};
		
		// filtra os valores com os parametros x, y, z definidos ====================================
		function add(dataset){

			var listalocal = [];

			for(key in dataset){
				if (key==x || key==y || key==z){
					listalocal.push(dataset[key]);
				}
			}
			filterdata.push(listalocal);
		}
		//===========================================================================================

		// para cada item na base de dados faz o filtro e adiciona a lista filtrada =================
		for(key in dataset){
			add(dataset[key]);
		}
		//===========================================================================================

		// dados do grafico = filtro de dados =======================================================
		options.series[0].data = filterdata;
		//===========================================================================================

		// cria o grafico com as configuracoes definidas ============================================
		var chart = new Highcharts.Chart(options);
		//===========================================================================================

		// evento do mouse para rotacao =============================================================
		function rotation(){

			$(chart.container).on('mousedown.hc touchstart.hc', function (eStart) {

			    eStart = chart.pointer.normalize(eStart);

			    var posX = eStart.pageX,
			        posY = eStart.pageY,
			        alpha = chart.options.chart.options3d.alpha,
			        beta = chart.options.chart.options3d.beta,
			        newAlpha,
			        newBeta,
			        sensitivity = 5; // quanto menor - mais sensivel

			    $(document).on({
			        'mousemove.hc touchdrag.hc': function (e) {
			            // Run beta
			            newBeta = beta + (posX - e.pageX) / sensitivity;
			            chart.options.chart.options3d.beta = newBeta;

			            // Run alpha
			            newAlpha = alpha + (e.pageY - posY) / sensitivity;
			            chart.options.chart.options3d.alpha = newAlpha;

			            chart.redraw(false);
			        },
			        'mouseup touchend': function () {
			            $(document).off('.hc');
			        }
			    });
			});
		}
		rotation();